import Link from 'next/link';
import ScrollAnimation from '@/components/ScrollAnimation';
import { StaggeredAnimation, StaggeredItem } from '@/components/ScrollAnimation';

export default function Home() {
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
              I&apos;m a second year Computer Science and Mathematics student at University of Oxford, passionate about software engineering, 
              algorithms, and building practical applications. I enjoy solving complex problems and learning 
              new technologies through hands-on projects. Currently focused on web development, data structures, 
              and exploring the intersection of CS and mathematics.
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
          {/* Project Cards - These will be populated from Strapi */}
          <StaggeredItem>
            <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors">
              <div className="h-48 bg-gray-700 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-gray-500">Project Image</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">CPU Neural Network</h3>
              <p className="text-gray-400 mb-4">
                A neural network implementation from scratch using only CPU computations. Built to understand 
                the mathematical foundations of machine learning algorithms.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-blue-600 text-white px-2 py-1 rounded text-sm">Python</span>
                <span className="bg-green-600 text-white px-2 py-1 rounded text-sm">NumPy</span>
                <span className="bg-purple-600 text-white px-2 py-1 rounded text-sm">Machine Learning</span>
              </div>
              <div className="flex gap-4">
                <Link href="https://github.com/caganyanmaz/cpu-neural-network" className="text-blue-400 hover:text-blue-300 text-sm">
                  View Project →
                </Link>
                <Link href="https://github.com/caganyanmaz/cpu-neural-network" className="text-gray-400 hover:text-gray-300 text-sm">
                  GitHub →
                </Link>
              </div>
            </div>
          </StaggeredItem>

          <StaggeredItem>
            <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors">
              <div className="h-48 bg-gray-700 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-gray-500">Project Image</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Minesweeper Bot</h3>
              <p className="text-gray-400 mb-4">
                An AI-powered bot that automatically solves Minesweeper puzzles using probability algorithms 
                and logical deduction. Demonstrates algorithmic problem-solving skills.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-blue-600 text-white px-2 py-1 rounded text-sm">Python</span>
                <span className="bg-green-600 text-white px-2 py-1 rounded text-sm">Selenium</span>
                <span className="bg-purple-600 text-white px-2 py-1 rounded text-sm">Algorithms</span>
              </div>
              <div className="flex gap-4">
                <Link href="https://github.com/caganyanmaz/minesweeper-bot" className="text-blue-400 hover:text-blue-300 text-sm">
                  View Project →
                </Link>
                <Link href="https://github.com/caganyanmaz/minesweeper-bot" className="text-gray-400 hover:text-gray-300 text-sm">
                  GitHub →
                </Link>
              </div>
            </div>
          </StaggeredItem>

          <StaggeredItem>
            <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors">
              <div className="h-48 bg-gray-700 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-gray-500">Project Image</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Text Editor</h3>
              <p className="text-gray-400 mb-4">
                A feature-rich text editor built with modern web technologies. Includes syntax highlighting, 
                file management, and a clean, intuitive interface for code editing.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-blue-600 text-white px-2 py-1 rounded text-sm">JavaScript</span>
                <span className="bg-green-600 text-white px-2 py-1 rounded text-sm">HTML/CSS</span>
                <span className="bg-purple-600 text-white px-2 py-1 rounded text-sm">Web APIs</span>
              </div>
              <div className="flex gap-4">
                <Link href="https://github.com/caganyanmaz/text-editor" className="text-blue-400 hover:text-blue-300 text-sm">
                  View Project →
                </Link>
                <Link href="https://github.com/caganyanmaz/text-editor" className="text-gray-400 hover:text-gray-300 text-sm">
                  GitHub →
                </Link>
              </div>
            </div>
          </StaggeredItem>
        </div>

        </StaggeredAnimation>
        
        <ScrollAnimation>
          <div className="text-center mt-12">
            <Link 
              href="/projects" 
              className="inline-flex items-center text-blue-400 hover:text-blue-300 font-semibold"
            >
              View All Projects
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </ScrollAnimation>
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
          <StaggeredItem>
            <div className="text-center">
              <h3 className="text-xl font-semibold text-white mb-4">Programming Languages</h3>
              <div className="space-y-2">
                <div className="bg-gray-800 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 rounded-lg p-3 transition-all duration-500 ease-in-out transform hover:scale-105 cursor-default">
                  <span className="text-gray-300 hover:text-white transition-colors duration-300 select-none">Python</span>
                </div>
                <div className="bg-gray-800 hover:bg-gradient-to-r hover:from-yellow-500 hover:to-orange-500 rounded-lg p-3 transition-all duration-500 ease-in-out transform hover:scale-105 cursor-default">
                  <span className="text-gray-300 hover:text-white transition-colors duration-300 select-none">JavaScript</span>
                </div>
                <div className="bg-gray-800 hover:bg-gradient-to-r hover:from-red-600 hover:to-pink-600 rounded-lg p-3 transition-all duration-500 ease-in-out transform hover:scale-105 cursor-default">
                  <span className="text-gray-300 hover:text-white transition-colors duration-300 select-none">Java</span>
                </div>
              </div>
            </div>
          </StaggeredItem>

          <StaggeredItem>
            <div className="text-center">
              <h3 className="text-xl font-semibold text-white mb-4">Web Development</h3>
              <div className="space-y-2">
                <div className="bg-gray-800 hover:bg-gradient-to-r hover:from-orange-500 hover:to-red-500 rounded-lg p-3 transition-all duration-500 ease-in-out transform hover:scale-105 cursor-default">
                  <span className="text-gray-300 hover:text-white transition-colors duration-300 select-none">Django</span>
                </div>
                <div className="bg-gray-800 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-500 rounded-lg p-3 transition-all duration-500 ease-in-out transform hover:scale-105 cursor-default">
                  <span className="text-gray-300 hover:text-white transition-colors duration-300 select-none">React</span>
                </div>
                <div className="bg-gray-800 hover:bg-gradient-to-r hover:from-purple-600 hover:to-indigo-600 rounded-lg p-3 transition-all duration-500 ease-in-out transform hover:scale-105 cursor-default">
                  <span className="text-gray-300 hover:text-white transition-colors duration-300 select-none">MongoDB</span>
                </div>
              </div>
            </div>
          </StaggeredItem>

          <StaggeredItem>
            <div className="text-center">
              <h3 className="text-xl font-semibold text-white mb-4">Data Science</h3>
              <div className="space-y-2">
                <div className="bg-gray-800 hover:bg-gradient-to-r hover:from-green-500 hover:to-emerald-500 rounded-lg p-3 transition-all duration-500 ease-in-out transform hover:scale-105 cursor-default">
                  <span className="text-gray-300 hover:text-white transition-colors duration-300 select-none">NumPy</span>
                </div>
                <div className="bg-gray-800 hover:bg-gradient-to-r hover:from-teal-500 hover:to-cyan-500 rounded-lg p-3 transition-all duration-500 ease-in-out transform hover:scale-105 cursor-default">
                  <span className="text-gray-300 hover:text-white transition-colors duration-300 select-none">Pandas</span>
                </div>
                <div className="bg-gray-800 hover:bg-gradient-to-r hover:from-violet-600 hover:to-purple-600 rounded-lg p-3 transition-all duration-500 ease-in-out transform hover:scale-105 cursor-default">
                  <span className="text-gray-300 hover:text-white transition-colors duration-300 select-none">Machine Learning</span>
                </div>
              </div>
            </div>
          </StaggeredItem>

          <StaggeredItem>
            <div className="text-center">
              <h3 className="text-xl font-semibold text-white mb-4">Tools</h3>
              <div className="space-y-2">
                <div className="bg-gray-800 hover:bg-gradient-to-r hover:from-orange-600 hover:to-red-600 rounded-lg p-3 transition-all duration-500 ease-in-out transform hover:scale-105 cursor-default">
                  <span className="text-gray-300 hover:text-white transition-colors duration-300 select-none">Git</span>
                </div>
                <div className="bg-gray-800 hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-500 rounded-lg p-3 transition-all duration-500 ease-in-out transform hover:scale-105 cursor-default">
                  <span className="text-gray-300 hover:text-white transition-colors duration-300 select-none">Docker</span>
                </div>
                <div className="bg-gray-800 hover:bg-gradient-to-r hover:from-yellow-500 hover:to-orange-500 rounded-lg p-3 transition-all duration-500 ease-in-out transform hover:scale-105 cursor-default">
                  <span className="text-gray-300 hover:text-white transition-colors duration-300 select-none">Linux</span>
                </div>
              </div>
            </div>
          </StaggeredItem>
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
