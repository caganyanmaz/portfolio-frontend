import Link from 'next/link';
import Image from 'next/image';
import { getImageUrl } from '@/lib/strapi-utils';
import type { Project } from '@/types/strapi';

interface ProjectCardProps {
  project: Project;
  className?: string;
}

export default function ProjectCard({ project, className = '' }: ProjectCardProps) {
  return (
    <div className={`bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors ${className}`}>
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
        {project.tags?.slice(0, 3).map((tag) => (
          <span key={tag.id} className="bg-blue-600 text-white px-2 py-1 rounded text-sm">
            {tag.name}
          </span>
        ))}
      </div>
      
      <div className="flex gap-4">
        {project.demoLink && (
          <Link 
            href={project.demoLink} 
            className="text-blue-400 hover:text-blue-300 text-sm" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            View Project →
          </Link>
        )}
        {project.sourceLink && (
          <Link 
            href={project.sourceLink} 
            className="text-gray-400 hover:text-gray-300 text-sm" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            GitHub →
          </Link>
        )}
      </div>
    </div>
  );
} 