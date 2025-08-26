// /src/lib/strapi-utils.ts
import { getStrapiAssetBase } from '@/lib/strapi-config';
import type { Project, Tag, HomePage, TechStack, SimpleTag, BlogList, BlogDetail } from '@/types/strapi';

// Get base lazily so env is read in the right runtime (server/client)
const toAbsolute = (url?: string, base?: string) => {
  if (!url) return '';
  if (url.startsWith('http')) return url;
  const b = (base ?? getStrapiAssetBase()).replace(/\/$/, '');
  return b ? `${b}${url}` : url; // if base is empty, return as-is (relative)
};

/** Media URL helper (supports string, {url}, or Strapi media { data: { attributes: { url, formats } } }) */
export function getImageUrl(
  media: any,
  size: 'thumbnail' | 'small' | 'medium' | 'large' = 'medium',
  base?: string // optional override per-call
): string {
  if (!media) return '';

  if (typeof media === 'string') return toAbsolute(media, base);

  if (media?.data?.attributes) {
    const attr = media.data.attributes;
    const formats = attr.formats || {};
    const sized = formats[size]?.url;
    return toAbsolute(sized || attr.url, base);
  }

  if (media?.url) return toAbsolute(media.url, base);

  return '';
}

/** Recursively flatten Strapi relations (keeps ids) */
export const processRelations = (data: any): any => {
  if (!data) return data;

  if (Array.isArray(data)) return data.map(processRelations);

  if (typeof data === 'object') {
    if ('data' in data) {
      const v = (data as any).data;
      return Array.isArray(v) ? v.map(processRelations) : processRelations(v);
    }

    if ('attributes' in data && (data as any).attributes) {
      const { id, attributes } = data as any;
      return { id, ...processRelations(attributes) };
    }

    const out: any = {};
    for (const [k, v] of Object.entries(data)) out[k] = processRelations(v);
    return out;
  }

  return data;
};

/** Project helpers (tolerant to missing fields) */
export const processSimpleTag = (tag: any): SimpleTag => ({
  id: tag?.id || 0,
  documentId: String(tag?.id || ''),
  name: tag?.Name || tag?.name || '',
});

export const processProjects = (projects: any[]): Project[] => {
  if (!Array.isArray(projects)) return [];
  return projects
    .map((p) => {
      if (!p) return null;
      const tags = (processRelations(p.tags) || []).map(processSimpleTag);
      return {
        id: p.id || 0,
        title: p.Title || p.title || '',
        description: processRichText(p.Description || p.description) || '',
        thumbnail: p.Thumbnail
          ? {
              url: getImageUrl(p.Thumbnail),
              alternativeText:
                p.Thumbnail?.alternativeText || p.Title || p.title || '',
            }
          : undefined,
        sourceLink: p.SourceLink || p.sourceLink || '',
        demoLink: p.DemoLink || p.demoLink || '',
        tags,
        createdAt: p.createdAt || new Date().toISOString(),
        updatedAt: p.updatedAt || new Date().toISOString(),
      };
    })
    .filter(Boolean) as Project[];
};

export const processTags = (tags: any[]): Tag[] => {
  if (!Array.isArray(tags)) return [];
  return tags
    .map((t) => {
      if (!t) return null;
      return {
        id: t.id || 0,
        name: t.Name || t.name || '',
        projects: processRelations(t.Projects || t.projects) || [],
        createdAt: t.CreatedAt || t.createdAt || new Date().toISOString(),
        updatedAt: t.UpdatedAt || t.updatedAt || new Date().toISOString(),
      };
    })
    .filter(Boolean) as Tag[];
};

export const processTechStacks = (techStacks: any[]): TechStack[] => {
  if (!Array.isArray(techStacks)) return [];
  return techStacks
    .map((ts) => {
      if (!ts) return null;
      return {
        id: ts.id || 0,
        name: ts.Name || ts.name || '',
        tags: processTags(ts.tags),
      };
    })
    .filter(Boolean) as TechStack[];
};

export const processHomePage = (homePage: any): HomePage | null => {
  if (!homePage) return null;

  // NOTE: Your payload shows HighlightedProjects is an object with { id, projects: [...] }.
  // If you want just the list, map it accordingly (keep as you prefer):
  const highlightedProjects = Array.isArray(homePage.HighlightedProjects?.projects)
    ? processProjects(homePage.HighlightedProjects.projects)
    : Array.isArray(homePage.HighlightedProjects)
    ? processProjects(homePage.HighlightedProjects) // fallback if already flattened elsewhere
    : [];

  return {
    id: homePage.id || 1,
    documentId: homePage.documentId,
    introduction: homePage.Introduction || homePage.introduction || '',
    HighlightedProjects: highlightedProjects,
    projects: processProjects(homePage.Projects || []),
    techStacks: processTechStacks(homePage.TechStacks || []),
    createdAt: homePage.createdAt || new Date().toISOString(),
    updatedAt: homePage.updatedAt || new Date().toISOString(),
  };
};

/** Misc helpers */
export const filterProjectsByTag = (projects: Project[], tagName: string): Project[] =>
  projects.filter((p) => p.tags?.some((t) => t.name.toLowerCase() === tagName.toLowerCase()));

export const getUniqueTagsFromProjects = (projects: Project[]) => {
  const map = new Map<number, SimpleTag>();
  projects.forEach((p) => p.tags?.forEach((t) => { if (!map.has(t.id)) map.set(t.id, t); }));
  return [...map.values()];
};

export const processRichText = (richText: any): string => {
  if (!richText) return '';
  if (typeof richText === 'string') return richText;
  if (Array.isArray(richText)) {
    return richText
      .map((block) => {
        if (block?.type === 'paragraph' && block.children) {
          return block.children.map((c: any) => c.text || '').join('');
        }
        if (block?.type === 'list' && block.children) {
          return block.children
            .map((item: any) => (item?.children ? item.children.map((c: any) => c.text || '').join('') : ''))
            .join(' • ');
        }
        return '';
      })
      .join(' ');
  }
  return '';
};

const normalizeKeysShallow = (obj: any) => {
  if (!obj || typeof obj !== 'object') return obj;
  const out: Record<string, any> = { ...obj };
  for (const [k, v] of Object.entries(obj)) {
    if (!k) continue;
    const alias = k.charAt(0).toLowerCase() + k.slice(1); // Title -> title
    if (!(alias in out)) out[alias] = v;                  // don't overwrite if already present
  }
  return out;
};


/** Normalize a single blog-like object (works for v4 {attributes} and v5 flat) */
const normalizeBlogSource = (raw: any) => {
  if (!raw) return {};

  // v4: { id, attributes: {...} }
  if (raw?.attributes) {
    const { id } = raw;
    const a = raw.attributes ?? {};
    // keep documentId if present on either level
    const documentId = a.documentId ?? raw.documentId;
    return { id, documentId, ...a };
  }

  // v5 (already flat)
  return normalizeKeysShallow(raw);
};

/** Convert a normalized blog into BlogList fields */
const makeBlogList = (p: any): BlogList => {
  // relations
  const tags = (processRelations(p.tags) || []).map(processSimpleTag);

  // media (support both flat media & strapi media object)
  const thumb = p.thumbnail || p.Thumbnail;
  const thumbnail = thumb
    ? {
        url: getImageUrl(thumb, 'medium'),
        alternativeText:
          thumb?.alternativeText ||
          p.title ||
          p.Title ||
          undefined,
        name: thumb?.name || undefined,
      }
    : undefined;

  return {
    id: p.id || 0,
    documentId: p.documentId || p.documentID || p.DocumentId || undefined,
    title: p.title ?? p.Title ?? '',
    summary:
      typeof p.summary === 'string'
        ? p.summary
        : typeof p.Summary === 'string'
        ? p.Summary
        : processRichText(p.summary || p.Summary) || null,
    thumbnail,
    tags,
    createdAt: p.createdAt || new Date().toISOString(),
    updatedAt: p.updatedAt || new Date().toISOString(),
    publishedAt: p.publishedAt ?? null,
  };
};

/** Convert a normalized blog into BlogDetail fields (adds `content`) */
const makeBlogDetail = (p: any): BlogDetail => {
  const base = makeBlogList(p);
  // Strapi rich text/dynamic zone field commonly "content" (fallback to "Content")
  const content = (p.content ?? p.Content ?? []) as unknown as BlogDetail['content'];
  return { ...base, content };
};

/** Process a blogs collection response (array) into BlogList[] */
export const processBlogsList = (blogs: any[]): BlogList[] => {
  if (!Array.isArray(blogs)) return [];
  return blogs
    .map((b) => {
      if (!b) return null;
      const src = normalizeBlogSource(b);
      return makeBlogList(src);
    })
    .filter(Boolean) as BlogList[];
};

/** Process a single blog into BlogDetail (rich content preserved) */
export const processBlogDetail = (blog: any): BlogDetail | null => {
  if (!blog) return null;
  const src = normalizeBlogSource(blog);
  return makeBlogDetail(src);
};