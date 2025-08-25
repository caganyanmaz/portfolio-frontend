import Link from 'next/link';
import Image from 'next/image';
import ScrollAnimation, { StaggeredAnimation, StaggeredItem } from '@/components/ScrollAnimation';
import { portfolioApi } from '@/lib/portfolio-api';
import { processHomePage, getImageUrl } from '@/lib/strapi-utils';
import { unstable_cache as cache } from 'next/cache';

export const revalidate = 60;

// Cached loader (tagged for revalidation)
const getHomePageCached = cache(
  async () => {
    const raw = await portfolioApi.getHomePage();
    return raw ? processHomePage(raw) : null;
  },
  ['home-page'],
  { tags: ['home', 'projects'] }
);

const getRandomColorClass = (index: number): string => {
  const colors = [
    'color-1','color-2','color-3','color-4','color-5','color-6',
    'color-7','color-8','color-9','color-10','color-11','color-12'
  ];
  return colors[index % colors.length];
};
const getRandomProjectTagColor = (index: number): string => getRandomColorClass(index);

export default async function Home() {
  const homePage = await getHomePageCached();

  // ✅ just take everything Strapi returns
  const featuredProjects = homePage?.HighlightedProjects ?? [];
  const techStacks = homePage?.techStacks ?? [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <ScrollAnimation delay={0.2}>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Cagan Yanmaz
            </h1>
          </ScrollAnimation>
          <ScrollAnimation delay={0.4}>
            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              CS & Mathematics Student | Aspiring Software Engineer
            </p>
          </ScrollAnimation>
          <ScrollAnimation delay={0.6}>
            <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
              {homePage?.introduction || 'f'}
            </p>
          </ScrollAnimation>
          <ScrollAnimation delay={0.8}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/projects"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                View My Work
              </Link>
              <Link
                href="/contact"
                className="border border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Get In Touch
              </Link>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Featured Projects Preview */}
      <section className="container mx-auto px-4 py-16">
        <ScrollAnimation>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Featured Projects
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Here are some of my recent projects that showcase my skills and passion for development.
            </p>
          </div>
        </ScrollAnimation>

        <StaggeredAnimation staggerDelay={0.2}>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {featuredProjects.length > 0 ? (
              featuredProjects.map((project) => (
                <StaggeredItem key={project.id}>
                  <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors">
                    <div className="h-48 bg-gray-700 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                      {project.thumbnail ? (
                        <Image
                          src={getImageUrl(project.thumbnail)}
                          alt={project.thumbnail.alternativeText || project.title}
                          width={400}
                          height={200}
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <span className="text-gray-500">No Image</span>
                      )}
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
                    <p
                      className="text-gray-400 mb-4 overflow-hidden text-ellipsis"
                      style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}
                    >
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
                </StaggeredItem>
              ))
            ) : (
              <div className="col-span-full text-center text-gray-400">
                No projects available at the moment.
              </div>
            )}
          </div>
        </StaggeredAnimation>
      </section>
     {/* Skills Preview */}
      <section className="container mx-auto px-4 py-16">
        <ScrollAnimation>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Skills & Technologies
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              I work with a variety of technologies to create robust and scalable applications.
            </p>
          </div>
        </ScrollAnimation>

        <StaggeredAnimation staggerDelay={0.1}>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {techStacks && techStacks.length > 0 ? (
              techStacks.map((techStack, index) => (
                <StaggeredItem key={techStack.id}>
                  <div className="text-center group">
                    <h3 className="text-xl font-semibold text-white mb-4 transition-all duration-300 group-hover:text-blue-400">
                      {techStack.name}
                    </h3>
                    <div className="space-y-2">
                      {techStack.tags && techStack.tags.length > 0 ? (
                        techStack.tags.map((tag, tagIndex) => (
                          <div 
                            key={tag.id} 
                            className={`tech-stack-item ${getRandomColorClass(tagIndex)} rounded-lg p-3 transition-all duration-500 ease-in-out transform hover:scale-105 cursor-default animate-fade-in-up hover:animate-pulse-glow`}
                            style={{
                              animationDelay: `${(index * 0.1) + (tagIndex * 0.05)}s`,
                              animationFillMode: 'both'
                            }}
                          >
                            <span className="text-gray-300 hover:text-white transition-colors duration-300 select-none font-medium">
                              {tag.name}
                            </span>
                          </div>
                        ))
                      ) : (
                        <div className="text-gray-500 text-sm">No tags available</div>
                      )}
                    </div>
                  </div>
                </StaggeredItem>
              ))
            ) : (
              // Fallback to hardcoded skills if no tech stacks are available
              <>
                <StaggeredItem>
                  <div className="text-center group">
                    <h3 className="text-xl font-semibold text-white mb-4 transition-all duration-300 group-hover:text-blue-400">Programming Languages</h3>
                    <div className="space-y-2">
                      <div className={`tech-stack-item ${getRandomColorClass(0)} rounded-lg p-3 transition-all duration-500 ease-in-out transform hover:scale-105 cursor-default animate-fade-in-up hover:animate-pulse-glow`} style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
                        <span className="text-gray-300 hover:text-white transition-colors duration-300 select-none font-medium">Python</span>
                      </div>
                      <div className={`tech-stack-item ${getRandomColorClass(1)} rounded-lg p-3 transition-all duration-500 ease-in-out transform hover:scale-105 cursor-default animate-fade-in-up hover:animate-pulse-glow`} style={{ animationDelay: '0.15s', animationFillMode: 'both' }}>
                        <span className="text-gray-300 hover:text-white transition-colors duration-300 select-none font-medium">JavaScript</span>
                      </div>
                      <div className={`tech-stack-item ${getRandomColorClass(2)} rounded-lg p-3 transition-all duration-500 ease-in-out transform hover:scale-105 cursor-default animate-fade-in-up hover:animate-pulse-glow`} style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
                        <span className="text-gray-300 hover:text-white transition-colors duration-300 select-none font-medium">Java</span>
                      </div>
                    </div>
                  </div>
                </StaggeredItem>

                <StaggeredItem>
                  <div className="text-center group">
                    <h3 className="text-xl font-semibold text-white mb-4 transition-all duration-300 group-hover:text-blue-400">Web Development</h3>
                    <div className="space-y-2">
                      <div className={`tech-stack-item ${getRandomColorClass(3)} rounded-lg p-3 transition-all duration-500 ease-in-out transform hover:scale-105 cursor-default animate-fade-in-up hover:animate-pulse-glow`} style={{ animationDelay: '0.25s', animationFillMode: 'both' }}>
                        <span className="text-gray-300 hover:text-white transition-colors duration-300 select-none font-medium">Django</span>
                      </div>
                      <div className={`tech-stack-item ${getRandomColorClass(4)} rounded-lg p-3 transition-all duration-500 ease-in-out transform hover:scale-105 cursor-default animate-fade-in-up hover:animate-pulse-glow`} style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
                        <span className="text-gray-300 hover:text-white transition-colors duration-300 select-none font-medium">React</span>
                      </div>
                      <div className={`tech-stack-item ${getRandomColorClass(5)} rounded-lg p-3 transition-all duration-500 ease-in-out transform hover:scale-105 cursor-default animate-fade-in-up hover:animate-pulse-glow`} style={{ animationDelay: '0.35s', animationFillMode: 'both' }}>
                        <span className="text-gray-300 hover:text-white transition-colors duration-300 select-none font-medium">MongoDB</span>
                      </div>
                    </div>
                  </div>
                </StaggeredItem>

                <StaggeredItem>
                  <div className="text-center group">
                    <h3 className="text-xl font-semibold text-white mb-4 transition-all duration-300 group-hover:text-blue-400">Data Science</h3>
                    <div className="space-y-2">
                      <div className={`tech-stack-item ${getRandomColorClass(6)} rounded-lg p-3 transition-all duration-500 ease-in-out transform hover:scale-105 cursor-default animate-fade-in-up hover:animate-pulse-glow`} style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
                        <span className="text-gray-300 hover:text-white transition-colors duration-300 select-none font-medium">NumPy</span>
                      </div>
                      <div className={`tech-stack-item ${getRandomColorClass(7)} rounded-lg p-3 transition-all duration-500 ease-in-out transform hover:scale-105 cursor-default animate-fade-in-up hover:animate-pulse-glow`} style={{ animationDelay: '0.45s', animationFillMode: 'both' }}>
                        <span className="text-gray-300 hover:text-white transition-colors duration-300 select-none font-medium">Pandas</span>
                      </div>
                      <div className={`tech-stack-item ${getRandomColorClass(8)} rounded-lg p-3 transition-all duration-500 ease-in-out transform hover:scale-105 cursor-default animate-fade-in-up hover:animate-pulse-glow`} style={{ animationDelay: '0.5s', animationFillMode: 'both' }}>
                        <span className="text-gray-300 hover:text-white transition-colors duration-300 select-none font-medium">Machine Learning</span>
                      </div>
                    </div>
                  </div>
                </StaggeredItem>

                <StaggeredItem>
                  <div className="text-center group">
                    <h3 className="text-xl font-semibold text-white mb-4 transition-all duration-300 group-hover:text-blue-400">Tools</h3>
                    <div className="space-y-2">
                      <div className={`tech-stack-item ${getRandomColorClass(9)} rounded-lg p-3 transition-all duration-500 ease-in-out transform hover:scale-105 cursor-default animate-fade-in-up hover:animate-pulse-glow`} style={{ animationDelay: '0.55s', animationFillMode: 'both' }}>
                        <span className="text-gray-300 hover:text-white transition-colors duration-300 select-none font-medium">Git</span>
                      </div>
                      <div className={`tech-stack-item ${getRandomColorClass(10)} rounded-lg p-3 transition-all duration-500 ease-in-out transform hover:scale-105 cursor-default animate-fade-in-up hover:animate-pulse-glow`} style={{ animationDelay: '0.6s', animationFillMode: 'both' }}>
                        <span className="text-gray-300 hover:text-white transition-colors duration-300 select-none font-medium">Docker</span>
                      </div>
                      <div className={`tech-stack-item ${getRandomColorClass(11)} rounded-lg p-3 transition-all duration-500 ease-in-out transform hover:scale-105 cursor-default animate-fade-in-up hover:animate-pulse-glow`} style={{ animationDelay: '0.65s', animationFillMode: 'both' }}>
                        <span className="text-gray-300 hover:text-white transition-colors duration-300 select-none font-medium">Linux</span>
                      </div>
                    </div>
                  </div>
                </StaggeredItem>
              </>
            )}
          </div>
        </StaggeredAnimation>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <ScrollAnimation>
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Work Together?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              I&apos;m always interested in new opportunities and exciting projects. 
              Let&apos;s discuss how we can bring your ideas to life.
            </p>
            <Link 
              href="/contact" 
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors inline-block"
            >
              Get In Touch
            </Link>
          </div>
        </ScrollAnimation>
      </section>
    </div>
  );
}
