// /src/lib/portfolio-api.ts
import type { Project, Tag, HomePage } from '@/types/strapi';
import { api, type WithId } from '@/lib/api';

const isServer = typeof window === 'undefined';

async function getJSON<T>(path: string): Promise<T> {
  const res = await fetch(path, { cache: 'no-store' });
  if (!res.ok) throw new Error(`${path} -> ${res.status}`);
  return res.json() as Promise<T>;
}

export const portfolioApi = {
	// Home Page
	async getHomePage(): Promise<HomePage | null> {
		if (typeof window === 'undefined') {
			return api.getSingle<HomePage>('/home-page', {
				populate: {
					HighlightedProjects: {
						populate: ['tags', 'Thumbnail'],
					},
					TechStacks: { populate: ['tags'] },
				},
			});
		}
		const { home } = await getJSON<{ home: HomePage | null }>('/api/home-page');
		return home;
	},


  // Projects
  async getAllProjects(): Promise<Array<WithId<Project>>> {
    if (isServer) return api.getList<Project>('projects', { populate: '*' });
    const { projects } = await getJSON<{ projects: Array<WithId<Project>> }>('/api/projects');
    return projects;
  },

  async getProjectById(id: string | number): Promise<WithId<Project> | null> {
    if (isServer) return api.getById<Project>('projects', id, { populate: '*' });
    const { project } = await getJSON<{ project: WithId<Project> | null }>(`/api/projects/${id}`);
    return project;
  },

  async getProjectsByTag(tagId: string | number): Promise<Array<WithId<Project>>> {
    if (isServer) {
      return api.getList<Project>('projects', {
        filters: { tags: { id: { $eq: tagId } } },
        populate: '*',
      });
    }
    const qs = new URLSearchParams({ tagId: String(tagId) }).toString();
    const { projects } = await getJSON<{ projects: Array<WithId<Project>> }>(`/api/projects?${qs}`);
    return projects;
  },

  // Tags
  async getAllTags(): Promise<Array<WithId<Tag>>> {
    if (isServer) return api.getList<Tag>('tags', { pagination: { limit: 100 } });
    const { tags } = await getJSON<{ tags: Array<WithId<Tag>> }>('/api/tags');
    return tags;
  },

  async getTagById(id: string | number): Promise<WithId<Tag> | null> {
    if (isServer) return api.getById<Tag>('tags', id);
    const { tag } = await getJSON<{ tag: WithId<Tag> | null }>(`/api/tags/${id}`);
    return tag;
  },
};

