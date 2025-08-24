import type { Project, Tag, HomePage, TechStack, HighlightedProjects, SimpleTag } from '@/types/strapi';

// Helper function to get image URL from Strapi media object
export const getImageUrl = (media: any, size: 'thumbnail' | 'small' | 'medium' | 'large' = 'medium'): string => {
  if (!media) return '';
  
  // If it's already a URL string
  if (typeof media === 'string') return media;
  
  // If it's a Strapi media object
  if (media.data) {
    const formats = media.data.attributes?.formats;
    if (formats && formats[size]) {
      return `${process.env.STRAPI_HOST_ADDRESS}${formats[size].url}`;
    }
    // Fallback to original URL
    return `${process.env.STRAPI_HOST_ADDRESS}${media.data.attributes?.url}`;
  }
  
  // If it's already processed
  if (media.url) {
    return media.url.startsWith('http') ? media.url : `${process.env.STRAPI_HOST_ADDRESS}${media.url}`;
  }
  
  return '';
};

// Helper function to extract and process Strapi relations
export const processRelations = (data: any): any => {
  if (!data) return data;

  // Directly handle arrays
  if (Array.isArray(data)) {
    return data.map(item => processRelations(item));
  }

  // Handle objects
  if (typeof data === 'object') {
    // Strapi relation wrapper { data: [...] } or { data: { ... } }
    if ('data' in data) {
      const value: any = (data as any).data;
      if (Array.isArray(value)) {
        return value.map((item: any) => processRelations(item));
      }
      if (value && typeof value === 'object') {
        return processRelations(value);
      }
    }

    // Flatten attribute objects { id, attributes: {...} }
    if ('attributes' in data && (data as any).attributes) {
      const { id, attributes } = data as any;
      return { id, ...processRelations(attributes) };
    }

    const processed: any = {};
    for (const [key, value] of Object.entries(data)) {
      processed[key] = processRelations(value);
    }
    return processed;
  }

  return data;
};

// Helper function to get projects with processed data
export const processProjects = (projects: any[]): Project[] => {
  if (!projects || !Array.isArray(projects)) return [];
  
  return projects.map(project => {
    if (!project) return null;
    
    return {
      id: project.id || 0,
      title: project.Title || '',
      description: processRichText(project.Description) || '',
      thumbnail: project.Thumbnail ? {
        url: getImageUrl(project.Thumbnail),
        alternativeText: project.Thumbnail.alternativeText || project.Title || ''
      } : undefined,
      sourceLink: project.SourceLink || '',
      demoLink: project.DemoLink || '',
      tags: project.tags ? processRelations(project.tags).map(processSimpleTag) : [],
      createdAt: project.createdAt || new Date().toISOString(),
      updatedAt: project.updatedAt || new Date().toISOString()
    };
  }).filter(Boolean) as Project[];
};

export const processSimpleTag = (tag: any): SimpleTag => {
  return {
    id: tag.id || 0,
    name: tag.Name || ''
  };
}


// Helper function to get tags with processed data
export const processTags = (tags: any[]): Tag[] => {
  if (!tags || !Array.isArray(tags)) return [];
  
  return tags.map(tag => {
    if (!tag) return null;
    
    return {
      id: tag.id || 0,
      name: tag.Name || '',
      projects: tag.Projects ? processRelations(tag.Projects) : [],
      createdAt: tag.CreatedAt || new Date().toISOString(),
      updatedAt: tag.UpdatedAt || new Date().toISOString()
    };
  }).filter(Boolean) as Tag[];
};

// Helper function to get tech stacks with processed data
export const processTechStacks = (techStacks: any[]): TechStack[] => {
  if (!techStacks || !Array.isArray(techStacks)) return [];
  
  return techStacks.map(techStack => {
    if (!techStack) return null;
    
    return {
      id: techStack.id || 0,
      name: techStack.Name || '',
      tags: processTags(techStack.tags),
    };
  }).filter(Boolean) as TechStack[];
};

// Helper function to get home page with processed data
export const processHomePage = (homePage: any): HomePage | null => {
  if (!homePage) return null;
  
  return {
    id: homePage.id || 1,
    introduction: homePage.Introduction || '',
    highlightedProjects: homePage.HighlightedProjects ? {
      id: homePage.HighlightedProjects.id || 1,
      projects: homePage.HighlightedProjects.projects ? processProjects(homePage.HighlightedProjects.projects) : []
    } : undefined,
    projects: homePage.Projects ? processProjects(homePage.Projects) : [],
    techStacks: homePage.TechStacks ? processTechStacks(homePage.TechStacks) : [],
    createdAt: homePage.createdAt || new Date().toISOString(),
    updatedAt: homePage.updatedAt || new Date().toISOString()
  };
};

// Helper function to filter projects by tag
export const filterProjectsByTag = (projects: Project[], tagName: string): Project[] => {
  return projects.filter(project => 
    project.tags?.some(tag => tag.name.toLowerCase() === tagName.toLowerCase())
  );
};

// Helper function to get unique tags from projects
export const getUniqueTagsFromProjects = (projects: Project[]): SimpleTag[] => {
  const tagMap = new Map<number, SimpleTag>();
  
  projects.forEach(project => {
    project.tags?.forEach(tag => {
      if (!tagMap.has(tag.id)) {
        tagMap.set(tag.id, tag);
      }
    });
  });
  
  return Array.from(tagMap.values());
};

// Helper function to process rich text content from Strapi
export const processRichText = (richText: any): string => {
  if (!richText) return '';
  
  // If it's already a string, return it
  if (typeof richText === 'string') return richText;
  
  // If it's an array of rich text blocks
  if (Array.isArray(richText)) {
    return richText.map(block => {
      if (block.type === 'paragraph' && block.children) {
        return block.children.map((child: any) => child.text || '').join('');
      } else if (block.type === 'list' && block.children) {
        return block.children.map((item: any) => {
          if (item.children) {
            return item.children.map((child: any) => child.text || '').join('');
          }
          return '';
        }).join(' • ');
      }
      return '';
    }).join(' ');
  }
  
  return '';
}; 