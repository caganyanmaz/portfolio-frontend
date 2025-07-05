import { api } from './api';
import type { Project, Tag, HomePage, TechStack, HighlightedProjects } from '@/types/strapi';

// Portfolio-specific API functions
export const portfolioApi = {
  // HomePage (Single Type) - Single API call with all relations
  getHomePage: async (): Promise<HomePage | null> => {
    try {
      const response = await api.getSingle<HomePage>(
        "/home-page?populate[HighlightedProjects][populate][projects][populate][0]=tags&populate[TechStacks][populate][0]=tags");
      return response
    } catch (error) {
      console.error('Error fetching home page:', error);
      return null;
    }
  },

  // Projects
  getAllProjects: async (): Promise<Project[]> => {
    return await api.getMany<Project>('projects?populate=*');
  },

  getProjectById: async (id: string | number): Promise<Project | null> => {
    return await api.getById<Project>('projects', id);
  },

  getProjectsByTag: async (tagId: string | number): Promise<Project[]> => {
    return await api.getWithFilters<Project>('projects', {
      'filters[tags][id][$eq]': tagId,
      'populate': '*'
    });
  },

  // Tags
  getAllTags: async (): Promise<Tag[]> => {
    return await api.getMany<Tag>('tags?pagination[limit]=100');
  },

  getTagById: async (id: string | number): Promise<Tag | null> => {
    return await api.getById<Tag>('tags', id);
  },

}; 