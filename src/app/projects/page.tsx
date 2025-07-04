import ScrollAnimation from '@/components/ScrollAnimation';
import { StaggeredAnimation, StaggeredItem } from '@/components/ScrollAnimation';
import Link from 'next/link';

export default function Projects() {
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
        <StaggeredAnimation staggerDelay={0.2}>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Project cards will be populated from Strapi */}
            <StaggeredItem>
              <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors">
                <div className="h-48 bg-gray-700 rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-gray-500">Project Image</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">CPU Neural Network</h3>
                <p className="text-gray-400 mb-4">
                  A neural network implementation from scratch using only CPU computations.
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
                  An AI-powered bot that automatically solves Minesweeper puzzles using probability algorithms.
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
                  A feature-rich text editor built with modern web technologies.
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
      </section>
    </div>
  );
} 