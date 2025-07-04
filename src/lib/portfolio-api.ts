import { api } from './api';
import type { Project, Skill, Experience, Education, PersonalInfo } from '@/types/strapi';

// Portfolio-specific API functions
export const portfolioApi = {
  // Personal Information
  getPersonalInfo: async (): Promise<PersonalInfo | null> => {
    return await api.getById<PersonalInfo>('personal-info', 1);
  },

  // Projects
  getAllProjects: async (): Promise<Project[]> => {
    return await api.getAll<Project>('projects?sort=order:asc');
  },

  getFeaturedProjects: async (): Promise<Project[]> => {
    return await api.getWithFilters<Project>('projects', {
      'filters[featured][$eq]': true,
      'sort': 'order:asc'
    });
  },

  getProjectById: async (id: string | number): Promise<Project | null> => {
    return await api.getById<Project>('projects', id);
  },

  // Skills
  getAllSkills: async (): Promise<Skill[]> => {
    return await api.getAll<Skill>('skills?sort=order:asc');
  },

  getSkillsByCategory: async (category: Skill['category']): Promise<Skill[]> => {
    return await api.getWithFilters<Skill>('skills', {
      'filters[category][$eq]': category,
      'sort': 'order:asc'
    });
  },

  // Experience
  getAllExperience: async (): Promise<Experience[]> => {
    return await api.getAll<Experience>('experiences?sort=order:desc');
  },

  getCurrentExperience: async (): Promise<Experience[]> => {
    return await api.getWithFilters<Experience>('experiences', {
      'filters[current][$eq]': true,
      'sort': 'order:desc'
    });
  },

  // Education
  getAllEducation: async (): Promise<Education[]> => {
    return await api.getAll<Education>('education?sort=order:desc');
  },

  // Contact form submission
  submitContactForm: async (data: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }): Promise<boolean> => {
    try {
      await api.post('contact-messages', { data });
      return true;
    } catch (error) {
      console.error('Error submitting contact form:', error);
      return false;
    }
  },
}; 