// /src/lib/portfolio-api.ts
import type {
  Project,
  Tag,
  HomePage,
  BlogList,
  BlogDetail,
} from "@/types/strapi";
import { api, type WithId } from "@/lib/api";

const isServer = typeof window === "undefined";

async function getJSON<T>(path: string): Promise<T> {
  const res = await fetch(path, { cache: "no-store" });
  if (!res.ok) throw new Error(`${path} -> ${res.status}`);
  return res.json() as Promise<T>;
}

export const portfolioApi = {
  // =========================
  // Home Page
  // =========================
  async getHomePage(): Promise<HomePage | null> {
    if (isServer) {
      return api.getSingle<HomePage>("/home-page", {
        populate: {
          HighlightedProjects: { populate: ["tags", "Thumbnail"] },
          TechStacks: { populate: ["tags"] },
        },
      });
    }
    const { home } = await getJSON<{ home: HomePage | null }>("/api/home-page");
    return home;
  },

  // =========================
  // Projects
  // =========================
  async getAllProjects(): Promise<Array<WithId<Project>>> {
    if (isServer) return api.getList<Project>("projects", { populate: "*" });
    const { projects } = await getJSON<{ projects: Array<WithId<Project>> }>(
      "/api/projects",
    );
    return projects;
  },

  async getProjectById(
    id: string | number,
  ): Promise<WithId<Project> | null> {
    if (isServer)
      return api.getById<Project>("projects", id, { populate: "*" });
    const { project } = await getJSON<{
      project: WithId<Project> | null;
    }>(`/api/projects/${id}`);
    return project;
  },

  async getProjectsByTag(tagId: string | number): Promise<Array<WithId<Project>>> {
    if (isServer) {
      return api.getList<Project>("projects", {
        filters: { tags: { id: { $eq: tagId } } },
        populate: "*",
      });
    }
    const qs = new URLSearchParams({ tagId: String(tagId) }).toString();
    const { projects } = await getJSON<{ projects: Array<WithId<Project>> }>(
      `/api/projects?${qs}`,
    );
    return projects;
  },

  // =========================
  // Tags
  // =========================
  async getAllTags(): Promise<Array<WithId<Tag>>> {
    if (isServer) return api.getList<Tag>("tags", { pagination: { limit: 100 } });
    const { tags } = await getJSON<{ tags: Array<WithId<Tag>> }>("/api/tags");
    return tags;
  },

  async getTagById(id: string | number): Promise<WithId<Tag> | null> {
    if (isServer) return api.getById<Tag>("tags", id);
    const { tag } = await getJSON<{ tag: WithId<Tag> | null }>(
      `/api/tags/${id}`,
    );
    return tag;
  },

  // =========================
  // Blogs
  // =========================

  /**
   * Fetch a paginated list of blogs (NO `content`).
   * Server: query Strapi v5 directly with `fields` and `populate`.
   * Client: hit your Next.js proxy route `/api/blogs`.
   */
  async getBlogsList(
    page = 1,
    pageSize = 10,
  ): Promise<{ blogs: Array<WithId<BlogList>>; meta: any }> {
    if (isServer) {
      // Strapi v5: avoid `content` in list by selecting only needed fields
      const data = await api.getList<BlogList>("/blogs", {
        sort: ["publishedAt:desc"],
        pagination: { page, pageSize },
        populate: "*"
      });

      // `api.getList` is assumed to return { data, meta } or flattened array depending on your helper.
      // If it returns just an array, wrap it with empty meta to keep client/server parity.
      const blogs = Array.isArray(data) ? data : data ?? [];
      const meta = Array.isArray(data) ? {} : data ?? {};
      return { blogs, meta };
    }

    // Client: use your Next.js API (from previous step: /app/api/blogs/route.ts)
    const qs = new URLSearchParams({
      "pagination[page]": String(page),
      "pagination[pageSize]": String(pageSize),
    }).toString();

    const { data, meta } = await getJSON<{
      data: Array<WithId<BlogList>>;
      meta: any;
    }>(`/api/blogs?${qs}`);

    return { blogs: data, meta };
  },

  /**
   * Fetch a single blog by documentId (WITH `content`).
   * Server: call Strapi v5 `/blogs/:documentId` with `populate` for relations.
   * Client: hit your Next.js proxy route `/api/blogs/[documentId]`.
   */
  async getBlogByDocumentId(
    documentId: string,
  ): Promise<WithId<BlogDetail> | null> {
    if (isServer) {
      // You can use api.getById with the documentId in Strapi v5
      return api.getById<BlogDetail>("/blogs", documentId, {
        populate: {
          Thumbnail: { fields: ["url", "name", "alternativeText"] },
          tags: { fields: ["Name"] },
        },
      });
    }

    const { data } = await getJSON<{ data: WithId<BlogDetail> | null }>(
      `/api/blogs/${documentId}`,
    );
    return data;
  },
};