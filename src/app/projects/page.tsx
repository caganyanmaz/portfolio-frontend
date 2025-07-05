import ScrollAnimation from '@/components/ScrollAnimation';
import { portfolioApi } from '@/lib/portfolio-api';
import { processProjects, processTags } from '@/lib/strapi-utils';
import ProjectFilter from '@/components/ProjectFilter';

export default async function Projects() {
  // Server-side data fetching
  const [projectsData, tagsData] = await Promise.allSettled([
    portfolioApi.getAllProjects(),
    portfolioApi.getAllTags()
  ]);
  // Process the data
  const projects = projectsData.status === 'fulfilled' ? processProjects(projectsData.value) : [];
  const tags = tagsData.status === 'fulfilled' ? processTags(tagsData.value) : [];

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