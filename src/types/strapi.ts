// Base Strapi types
export interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiEntity {
  id: number;
  attributes: any;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// Portfolio-specific content types
export interface Project {
  id: number;
  title: string;
  description: string;
  shortDescription?: string;
  image?: {
    url: string;
    alternativeText?: string;
  };
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface Skill {
  id: number;
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'devops' | 'other';
  proficiency: number; // 1-100
  icon?: string;
  order: number;
}

export interface Experience {
  id: number;
  title: string;
  company: string;
  location?: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
  technologies: string[];
  order: number;
}

export interface Education {
  id: number;
  degree: string;
  institution: string;
  field: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description?: string;
  gpa?: number;
  order: number;
}

export interface PersonalInfo {
  id: number;
  name: string;
  title: string;
  email: string;
  phone?: string;
  location?: string;
  bio: string;
  shortBio: string;
  avatar?: {
    url: string;
    alternativeText?: string;
  };
  socialLinks: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
  resumeUrl?: string;
}

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

// API response types
export type ProjectsResponse = StrapiResponse<StrapiEntity[]>;
export type ProjectResponse = StrapiResponse<StrapiEntity>;
export type SkillsResponse = StrapiResponse<StrapiEntity[]>;
export type ExperienceResponse = StrapiResponse<StrapiEntity[]>;
export type EducationResponse = StrapiResponse<StrapiEntity[]>;
export type PersonalInfoResponse = StrapiResponse<StrapiEntity>; 