import LayoutWithTheme from '@/components/layout/LayoutWithTheme';
import { Compass, Beaker, Brain, PenTool, Layers, Cpu } from 'lucide-react';

export default function About() {
  return (
    <LayoutWithTheme>
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-700 dark:to-purple-700 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">About Web3 Insights</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto opacity-90">
            Where clear thinking meets ambitious ideas. We explore the decentralized web with rigor,
            curiosity, and craft.
          </p>
        </div>
      </section>

      {/* Our Story (enhanced) */}
      <section className="py-20 bg-white dark:bg-gray-950 transition-colors">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Lead narrative */}
          <div className="mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">Our Story</h2>
            <p className="text-lg md:text-xl leading-8 text-gray-700 dark:text-gray-300 first-letter:text-5xl first-letter:font-extrabold first-letter:text-indigo-600 dark:first-letter:text-indigo-400 first-letter:mr-2 first-letter:float-left">
              Web3 Insights began as a late‑night note about making complex ideas feel inevitable. Today, it’s
              a living lab: essays, experiments, and explainers that turn buzzwords into blueprints and
              abstractions into decisions.
            </p>
            <blockquote className="mt-6 border-l-4 border-indigo-500 pl-4 italic text-gray-700 dark:text-gray-300">
              The goal isn’t to predict the future of the internet — it’s to build the mental models you’ll need
              to navigate it.
            </blockquote>
          </div>

          {/* The Pillars */}
          <div className="grid md:grid-cols-3 gap-6 mb-14">
            <div className="group rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center gap-3 mb-3">
                <Compass className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                <h3 className="font-semibold text-gray-900 dark:text-white">Clarity</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                We reduce noise to signal—no fluff, just the concepts, trade‑offs, and mental shortcuts that matter.
              </p>
            </div>
            <div className="group rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center gap-3 mb-3">
                <Beaker className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                <h3 className="font-semibold text-gray-900 dark:text-white">Rigor</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                We test ideas against data, incentives, and implementation reality—then show our work.
              </p>
            </div>
            <div className="group rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center gap-3 mb-3">
                <Brain className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                <h3 className="font-semibold text-gray-900 dark:text-white">Curiosity</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                We explore the edges—L2s, modular stacks, restaking, zk systems—without losing the plot.
              </p>
            </div>
          </div>

          {/* Technology Stack (styled) */}
          <div className="mb-14">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900 dark:text-white">Technology Stack</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-5 bg-white dark:bg-gray-900">
                <div className="flex items-center gap-2 mb-2">
                  <Layers className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <span className="font-semibold">Next.js</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Hybrid rendering, routing, and performance primitives.</p>
              </div>
              <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-5 bg-white dark:bg-gray-900">
                <div className="flex items-center gap-2 mb-2">
                  <Cpu className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <span className="font-semibold">React</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Composable UI with modern hooks and patterns.</p>
              </div>
              <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-5 bg-white dark:bg-gray-900">
                <div className="flex items-center gap-2 mb-2">
                  <PenTool className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <span className="font-semibold">Tailwind CSS</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Design‑system velocity with dark‑mode first‑class support.</p>
              </div>
              <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-5 bg-white dark:bg-gray-900">
                <div className="flex items-center gap-2 mb-2">
                  <Cpu className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <span className="font-semibold">TypeScript</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Type safety, maintainability, and better DX at scale.</p>
              </div>
            </div>
          </div>

          {/* About the Developer (refined) */}
          <div className="mb-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-white">About the Developer</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-7">
              I’m building Web3 Insights to be the resource I wished I had: principled analysis, practical
              implementation notes, and writing that respects your time. Expect frameworks over hot takes,
              diagrams over jargon, and code when code clarifies the point.
            </p>
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900 transition-colors">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">Meet Me</h2>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg p-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="w-40 h-40 rounded-full mx-auto mb-6 bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <span className="text-white text-5xl font-bold">AP</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Aryan Pandey</h3>
              <p className="text-indigo-600 dark:text-indigo-400 text-lg mb-4">Founder & Developer</p>
              <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-lg mx-auto">
                I work at the intersection of systems, incentives, and design. My focus: translating Web3’s
                moving parts into mental models builders and readers can actually use.
              </p>
              
              {/* Social Links */}
              <div className="flex justify-center space-x-6">
                <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  <span className="sr-only">Twitter</span>
                  <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  <span className="sr-only">GitHub</span>
                  <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  <span className="sr-only">LinkedIn</span>
                  <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-indigo-700 dark:bg-indigo-800 text-white transition-colors">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Community</h2>
          <p className="text-xl mb-8">
            Subscribe to our newsletter to receive the latest updates and articles.
          </p>
          <div className="max-w-md mx-auto">
            <form className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 rounded-md flex-grow text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="submit"
                className="bg-white text-indigo-700 px-6 py-2 rounded-md font-medium hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-700 focus:ring-white"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </LayoutWithTheme>
  );
}
