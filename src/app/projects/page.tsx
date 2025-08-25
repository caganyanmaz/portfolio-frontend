// /src/app/projects/page.tsx
import ScrollAnimation from '@/components/ScrollAnimation';
import ProjectFilter from '@/components/ProjectFilter';
import { portfolioApi } from '@/lib/portfolio-api';
import { processProjects, processTags } from '@/lib/strapi-utils';
import { unstable_cache as cache } from 'next/cache';

// Periodic fallback revalidation (seconds)
export const revalidate = 60;

// Cache + tag the data loads so Strapi webhook can revalidate on demand
const getProjectsCached = cache(
  async () => {
    const raw = await portfolioApi.getAllProjects();   // returns WithId<Project>[]
    return processProjects(raw as any);                // map to your UI shape
  },
  ['projects-list'],
  { tags: ['projects'] }
);

const getTagsCached = cache(
  async () => {
    const raw = await portfolioApi.getAllTags();       // returns WithId<Tag>[]
    return processTags(raw as any);
  },
  ['tags-list'],
  { tags: ['tags', 'projects'] } // tags usually affect project filters too
);

export default async function Projects() {
  // Server-side fetching through cached loaders
  const [projects, tags] = await Promise.all([getProjectsCached(), getTagsCached()]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-gray-900">
      {/* Header Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <ScrollAnimation>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            My Projects
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A collection of projects I&apos;ve built to learn new technologies and solve interesting problems.
          </p>
        </ScrollAnimation>
      </section>

      {/* Projects Grid */}
      <section className="container mx-auto px-4 py-16">
        <ProjectFilter projects={projects} tags={tags} />
      </section>
    </div>
  );
}
