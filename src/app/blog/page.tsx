import ScrollAnimation from '@/components/ScrollAnimation';
import { StaggeredAnimation, StaggeredItem } from '@/components/ScrollAnimation';
import Link from 'next/link';

export default function Blog() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-gray-900">
      {/* Header Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <ScrollAnimation>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Blog
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Thoughts on programming, algorithms, and my journey in computer science.
          </p>
        </ScrollAnimation>
      </section>

      {/* Blog Posts */}
      <section className="container mx-auto px-4 py-16">
        <StaggeredAnimation staggerDelay={0.1}>
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Blog posts will be populated from Strapi */}
            <StaggeredItem>
              <article className="bg-gray-800 rounded-lg p-8 hover:bg-gray-700 transition-colors">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-sm text-gray-400">Coming Soon</span>
                  <span className="text-sm text-blue-400">Programming</span>
                </div>
                <h2 className="text-2xl font-bold text-white mb-3">
                  Building a Neural Network from Scratch
                </h2>
                <p className="text-gray-300 mb-4">
                  A deep dive into the mathematical foundations of neural networks and how I implemented 
                  one using only Python and NumPy. This project taught me the importance of understanding 
                  the underlying algorithms rather than just using libraries.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs">Python</span>
                    <span className="bg-green-600 text-white px-2 py-1 rounded text-xs">Machine Learning</span>
                    <span className="bg-purple-600 text-white px-2 py-1 rounded text-xs">Algorithms</span>
                  </div>
                  <Link href="#" className="text-blue-400 hover:text-blue-300 text-sm">
                    Read More →
                  </Link>
                </div>
              </article>
            </StaggeredItem>

            <StaggeredItem>
              <article className="bg-gray-800 rounded-lg p-8 hover:bg-gray-700 transition-colors">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-sm text-gray-400">Coming Soon</span>
                  <span className="text-sm text-green-400">Web Development</span>
                </div>
                <h2 className="text-2xl font-bold text-white mb-3">
                  Learning Next.js and Modern React
                </h2>
                <p className="text-gray-300 mb-4">
                  My experience transitioning from vanilla JavaScript to React and Next.js. 
                  How the component-based architecture changed my approach to building user interfaces 
                  and the benefits of server-side rendering.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs">React</span>
                    <span className="bg-green-600 text-white px-2 py-1 rounded text-xs">Next.js</span>
                    <span className="bg-purple-600 text-white px-2 py-1 rounded text-xs">JavaScript</span>
                  </div>
                  <Link href="#" className="text-blue-400 hover:text-blue-300 text-sm">
                    Read More →
                  </Link>
                </div>
              </article>
            </StaggeredItem>

            <StaggeredItem>
              <article className="bg-gray-800 rounded-lg p-8 hover:bg-gray-700 transition-colors">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-sm text-gray-400">Coming Soon</span>
                  <span className="text-sm text-yellow-400">Algorithms</span>
                </div>
                <h2 className="text-2xl font-bold text-white mb-3">
                  Solving Minesweeper with Probability
                </h2>
                <p className="text-gray-300 mb-4">
                  How I built an AI bot that solves Minesweeper using probability theory and logical deduction. 
                  This project combined my interest in algorithms with practical web automation using Selenium.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs">Python</span>
                    <span className="bg-green-600 text-white px-2 py-1 rounded text-xs">Selenium</span>
                    <span className="bg-purple-600 text-white px-2 py-1 rounded text-xs">Probability</span>
                  </div>
                  <Link href="#" className="text-blue-400 hover:text-blue-300 text-sm">
                    Read More →
                  </Link>
                </div>
              </article>
            </StaggeredItem>
          </div>
        </StaggeredAnimation>
      </section>
    </div>
  );
} 