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
  thumbnail?: {
    url: string;
    alternativeText?: string;
  };
  sourceLink?: string;
  demoLink?: string;
  tags?: SimpleTag[];
  createdAt: string;
  updatedAt: string;
}

export interface Tag {
  id: number;
  name: string;
  projects?: Project[];
  createdAt: string;
  updatedAt: string;
}

export interface SimpleTag {
  id: number;
  name: string;
}

export interface TechStack {
  id: number;
  name: string;
  tags?: Tag[];
}

export interface HomePage {
  id: number;
  introduction: string;
  HighlightedProjects?: Project[];
  projects?: Project[];
  techStacks?: TechStack[];
  createdAt: string;
  updatedAt: string;
}



// API response types
export type ProjectsResponse = StrapiResponse<StrapiEntity[]>;
export type ProjectResponse = StrapiResponse<StrapiEntity>;
export type TagsResponse = StrapiResponse<StrapiEntity[]>;
export type TagResponse = StrapiResponse<StrapiEntity>;
export type HomePageResponse = StrapiResponse<StrapiEntity>;
export type TechStackResponse = StrapiResponse<StrapiEntity>;
export type HighlightedProjectsResponse = StrapiResponse<StrapiEntity>; 