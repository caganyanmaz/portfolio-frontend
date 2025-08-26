import type { BlocksContent } from "@strapi/blocks-react-renderer";
// --- JSON -
type JsonPrimitive = string | number | boolean | null;
export type JsonValue = JsonPrimitive | { [k: string]: JsonValue } | JsonValue[];
export type JsonArray = JsonValue[];
export type RichBlocks = BlocksContent;

// --- Base / responses ---
export interface PaginationMeta {
  page: number; pageSize: number; pageCount: number; total: number;
}
export interface CollectionResponse<T> { data: T[]; meta: { pagination?: PaginationMeta } }
export interface SingleResponse<T> { data: T | null; meta: Record<string, unknown> }

export interface BaseDoc {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
}

// --- Media (lightweight for cards) ---
export interface MediaThumb {
  url: string;
  alternativeText?: string | null;
  name?: string | null;
}

// --- Tags ---
export interface SimpleTag {
  id: number;
  documentId: string;
  name: string;
}

// --- Project ---
export interface Project extends BaseDoc {
  title: string;
  description: string;
  thumbnail?: MediaThumb | null;
  sourceLink?: string;
  demoLink?: string;
  tags?: SimpleTag[];
}

// --- Blog (list vs detail) ---
export interface BlogBase extends BaseDoc {
  title: string;
  summary?: string | null;
  thumbnail?: MediaThumb | null;
  tags?: SimpleTag[];
}

export type BlogList = BlogBase;

export interface BlogDetail extends BlogBase {
  content: RichBlocks;
}

// --- Home / TechStack ---
export interface Tag extends BaseDoc { name: string; projects?: Project[] }
export interface TechStack extends BaseDoc { name: string; tags?: Tag[] }
export interface HomePage extends BaseDoc {
  introduction: string;
  HighlightedProjects?: Project[];
  projects?: Project[];
  techStacks?: TechStack[];
}

// --- Responses ---
export type ProjectsResponse = CollectionResponse<Project>;
export type ProjectResponse = SingleResponse<Project>;
export type TagsResponse = CollectionResponse<Tag>;
export type TagResponse = SingleResponse<Tag>;
export type HomePageResponse = SingleResponse<HomePage>;
export type TechStackResponse = CollectionResponse<TechStack>;
export type HighlightedProjectsResponse = CollectionResponse<Project>;
export type BlogsListResponse = CollectionResponse<BlogList>;
export type BlogDetailResponse = SingleResponse<BlogDetail>;
