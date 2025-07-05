'use client';

import { useState, useEffect } from 'react';
import type { Project, Tag } from '@/types/strapi';
import ScrollAnimation from '@/components/ScrollAnimation';
import { StaggeredAnimation, StaggeredItem } from '@/components/ScrollAnimation';
import Link from 'next/link';
import Image from 'next/image';
import { getImageUrl } from '@/lib/strapi-utils';

// Utility function to get a random color class for project tags
const getRandomProjectTagColor = (index: number): string => {
  const colors = [
    'color-1', 'color-2', 'color-3', 'color-4', 'color-5', 'color-6',
    'color-7', 'color-8', 'color-9', 'color-10', 'color-11', 'color-12'
  ];
  return colors[index % colors.length];
};

interface ProjectFilterProps {
  projects: Project[];
  tags: Tag[];
}

export default function ProjectFilter({ projects, tags }: ProjectFilterProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [hasFiltered, setHasFiltered] = useState(false);

  // Filter projects by selected tag
  const filteredProjects = selectedTag 
    ? projects.filter(project => 
        project.tags?.some(tag => tag.name.toLowerCase() === selectedTag.toLowerCase())
      )
    : projects;

  // Get tags that have associated projects
  const tagsWithProjects = tags.filter(tag => 
    projects.some(project => 
      project.tags?.some(projectTag => 
        projectTag.name.toLowerCase() === tag.name.toLowerCase()
      )
    )
  );



  // Track if user has filtered to disable animations after first filter
  useEffect(() => {
    if (selectedTag !== null && !hasFiltered) {
      setHasFiltered(true);
    }
  }, [selectedTag, hasFiltered]);

  return (
    <div>
      {/* Filter Tags */}
      {tagsWithProjects && tagsWithProjects.length > 0 && (
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          <button
            onClick={() => setSelectedTag(null)}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
              selectedTag === null
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            All Projects
          </button>
          {tagsWithProjects.map((tag) => (
            <button
              key={tag.id}
              onClick={() => setSelectedTag(tag.name)}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                selectedTag === tag.name
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {tag.name}
            </button>
          ))}
        </div>
      )}

      {/* Projects Count */}
      <div className="text-center mb-8">
        <p className="text-gray-400">
          {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''} found
          {selectedTag && ` for "${selectedTag}"`}
        </p>
      </div>

      {/* Filtered Projects */}
      {filteredProjects.length === 0 ? (
        <div className="text-center text-gray-400">
          {selectedTag ? `No projects found for "${selectedTag}"` : 'No projects available at the moment.'}
        </div>
      ) : hasFiltered ? (
        // Show projects without animations after first filter
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {filteredProjects.map((project) => (
            <div key={project.id} className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors">
              <div className="h-48 bg-gray-700 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                {project.thumbnail ? (
                  <Image
                    src={getImageUrl(project.thumbnail)}
                    alt={project.thumbnail.alternativeText || project.title}
                    width={400}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-gray-500">No Image</span>
                )}
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
              <p className="text-gray-400 mb-4 overflow-hidden text-ellipsis" style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
                {project.description}
              </p>
                                <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags?.slice(0, 3).map((tag, tagIndex) => (
                      <span 
                        key={tag.id} 
                        className={`project-tag ${getRandomProjectTagColor(tagIndex)} px-2 py-1 rounded text-sm font-medium`}
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>
              <div className="flex gap-4">
                {project.demoLink && (
                  <Link href={project.demoLink} className="text-blue-400 hover:text-blue-300 text-sm" target="_blank" rel="noopener noreferrer">
                    View Project →
                  </Link>
                )}
                {project.sourceLink && (
                  <Link href={project.sourceLink} className="text-gray-400 hover:text-gray-300 text-sm" target="_blank" rel="noopener noreferrer">
                    GitHub →
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Show projects with animations on initial load
        <StaggeredAnimation staggerDelay={0.2}>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {filteredProjects.map((project) => (
              <StaggeredItem key={project.id}>
                <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors">
                  <div className="h-48 bg-gray-700 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                    {project.thumbnail ? (
                      <Image
                        src={getImageUrl(project.thumbnail)}
                        alt={project.thumbnail.alternativeText || project.title}
                        width={400}
                        height={200}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-gray-500">No Image</span>
                    )}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
                  <p className="text-gray-400 mb-4 overflow-hidden text-ellipsis" style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags?.slice(0, 3).map((tag, tagIndex) => (
                      <span 
                        key={tag.id} 
                        className={`project-tag ${getRandomProjectTagColor(tagIndex)} px-2 py-1 rounded text-sm font-medium`}
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    {project.demoLink && (
                      <Link href={project.demoLink} className="text-blue-400 hover:text-blue-300 text-sm" target="_blank" rel="noopener noreferrer">
                        View Project →
                      </Link>
                    )}
                    {project.sourceLink && (
                      <Link href={project.sourceLink} className="text-gray-400 hover:text-gray-300 text-sm" target="_blank" rel="noopener noreferrer">
                        GitHub →
                      </Link>
                    )}
                  </div>
                </div>
              </StaggeredItem>
            ))}
          </div>
        </StaggeredAnimation>
      )}
    </div>
  );
} 