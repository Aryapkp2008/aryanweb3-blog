'use client';

import LayoutWithTheme from '@/components/layout/LayoutWithTheme';
import Link from 'next/link';
import { featuredPosts, recentPosts } from '@/data/blogPosts';
import { format } from 'date-fns';
import { ArrowRight, TrendingUp, Shield, Zap, Globe } from 'lucide-react';
import PlaceholderImage from '@/components/ui/PlaceholderImage';
import ReadingProgress from '@/components/ReadingProgress';
import { trackBlogPostView } from '@/lib/analytics';

export default function Home() {
  // Get content for reading progress (you can customize this)
  const pageContent = "Welcome to Web3 Insights, your premier destination for cutting-edge blockchain technology insights, expert analysis, and actionable strategies for navigating the decentralized future.";
  
  return (
    <LayoutWithTheme>
      <ReadingProgress content={pageContent} />
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-500 via-indigo-500 to-blue-500 dark:from-purple-900 dark:via-indigo-900 dark:to-blue-900 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzlIj48cGF0aCBkPSJNIDYwIDAgTCAwIDAgMCA2MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center mb-6 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full">
              <TrendingUp className="w-4 h-4 mr-2" suppressHydrationWarning />
              <span className="text-sm font-medium">Mastering Web3, Ethereum & Blockchain Innovation</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
              Web3 Insights
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-white/90">
              Your trusted source for expert insights on Ethereum, DeFi, NFTs, and the revolutionary decentralized web that's transforming our digital future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/blog" className="group bg-gradient-to-r from-blue-500 to-purple-600 text-white px-10 py-4 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 flex items-center justify-center transform hover:scale-105 hover:-translate-y-1 shadow-xl hover:shadow-2xl">
                <span className="mr-3">🚀 Explore Articles</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" suppressHydrationWarning />
              </Link>
              <Link href="#featured" className="group bg-white/10 backdrop-blur-sm text-white border border-white/20 px-8 py-4 rounded-xl font-medium hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                <span className="flex items-center">
                  ⭐ Featured Content
                  <TrendingUp className="ml-2 w-4 h-4 group-hover:rotate-12 transition-transform" suppressHydrationWarning />
                </span>
              </Link>
            </div>
            
            {/* Quick Access Bar */}
            <div className="mt-12 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <div className="text-center mb-4">
                <h3 className="text-lg font-semibold text-white mb-2">Explore by Category</h3>
                <p className="text-white/80 text-sm">Discover content tailored to your interests</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <Link href="/blog?category=DeFi" className="group bg-white/10 hover:bg-white/20 rounded-lg p-3 text-center transition-all duration-300 border border-white/10 hover:border-white/30">
                  <div className="text-2xl mb-1 group-hover:scale-110 transition-transform">💰</div>
                  <div className="text-white text-sm font-medium">DeFi</div>
                </Link>
                <Link href="/blog?category=NFTs" className="group bg-white/10 hover:bg-white/20 rounded-lg p-3 text-center transition-all duration-300 border border-white/10 hover:border-white/30">
                  <div className="text-2xl mb-1 group-hover:scale-110 transition-transform">🎨</div>
                  <div className="text-white text-sm font-medium">NFTs</div>
                </Link>
                <Link href="/blog?category=Ethereum" className="group bg-white/10 hover:bg-white/20 rounded-lg p-3 text-center transition-all duration-300 border border-white/10 hover:border-white/30">
                  <div className="text-2xl mb-1 group-hover:scale-110 transition-transform">⚡</div>
                  <div className="text-white text-sm font-medium">Ethereum</div>
                </Link>
                <Link href="/blog?category=Gaming" className="group bg-white/10 hover:bg-white/20 rounded-lg p-3 text-center transition-all duration-300 border border-white/10 hover:border-white/30">
                  <div className="text-2xl mb-1 group-hover:scale-110 transition-transform">🎮</div>
                  <div className="text-white text-sm font-medium">Gaming</div>
                </Link>
              </div>
            </div>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            <div className="text-center group animate-fade-in-up" style={{animationDelay: '0.1s'}}>
              <div className="flex justify-center mb-2">
                <Globe className="w-8 h-8 text-blue-300 group-hover:scale-125 transition-transform duration-300 animate-float" style={{animationDelay: '0s'}} suppressHydrationWarning />
              </div>
              <div className="text-2xl font-bold text-white group-hover:text-blue-200 transition-colors">$2.5T+</div>
              <div className="text-sm text-white/80 group-hover:text-blue-100 transition-colors">Global Crypto Market</div>
            </div>
            <div className="text-center group animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              <div className="flex justify-center mb-2">
                <Shield className="w-8 h-8 text-purple-300 group-hover:scale-125 transition-transform duration-300 animate-float" style={{animationDelay: '1s'}} suppressHydrationWarning />
              </div>
              <div className="text-2xl font-bold text-white group-hover:text-purple-200 transition-colors">15M+</div>
              <div className="text-sm text-white/80 group-hover:text-purple-100 transition-colors">Ethereum Secured</div>
            </div>
            <div className="text-center group animate-fade-in-up" style={{animationDelay: '0.3s'}}>
              <div className="flex justify-center mb-2">
                <Zap className="w-8 h-8 text-yellow-300 group-hover:scale-125 transition-transform duration-300 animate-float" style={{animationDelay: '2s'}} suppressHydrationWarning />
              </div>
              <div className="text-2xl font-bold text-white group-hover:text-yellow-200 transition-colors">1000+</div>
              <div className="text-sm text-white/80 group-hover:text-yellow-100 transition-colors">Active Protocols</div>
            </div>
            <div className="text-center group animate-fade-in-up" style={{animationDelay: '0.4s'}}>
              <div className="flex justify-center mb-2">
                <TrendingUp className="w-8 h-8 text-green-300 group-hover:scale-125 transition-transform duration-300 animate-float" style={{animationDelay: '3s'}} suppressHydrationWarning />
              </div>
              <div className="text-2xl font-bold text-white group-hover:text-green-200 transition-colors">$50B+</div>
              <div className="text-sm text-white/80 group-hover:text-green-100 transition-colors">Total Value Locked</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section id="featured" className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Featured Insights</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              In-depth analysis of the latest breakthroughs in Web3, blockchain technology, and the decentralized revolution reshaping our digital landscape.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPosts.map((post) => (
              <div key={post.id} className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border border-gray-100 dark:border-gray-700 group">
                <div className="relative h-56 overflow-hidden">
                  <PlaceholderImage 
                    title={post.title}
                    category={post.category}
                    variant="featured"
                    className="w-full h-full group-hover:scale-110 transition-transform duration-500" 
                  />
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-white dark:bg-white/90 text-gray-900 dark:text-gray-900 text-xs font-semibold px-3 py-1 rounded-full shadow-lg border border-white/60">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-3 text-sm text-gray-500 dark:text-gray-400">
                    <span>{format(new Date(post.date), 'MMM dd, yyyy')}</span>
                    <span className="mx-2">•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-end">
                    <Link 
                      href={`/blog/${post.slug}`} 
                      onClick={() => trackBlogPostView(post.title, post.slug, post.category)}
                      className="inline-flex items-center px-3 py-1.5 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-indigo-500 dark:text-white dark:hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 transition-colors"
                    >
                      Read More
                      <ArrowRight className="ml-1 w-4 h-4" suppressHydrationWarning />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Posts */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Latest Updates</h2>
              <p className="text-gray-600 dark:text-gray-400">Stay ahead with the newest Web3 innovations and market insights</p>
            </div>
            <Link 
              href="/blog" 
              className="text-purple-600 hover:text-purple-800 font-medium flex items-center group"
            >
              Browse All
              <ArrowRight className="ml-1 w-4 h-4 transform group-hover:translate-x-1 transition-transform" suppressHydrationWarning />
            </Link>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {recentPosts.slice(0, 4).map((post) => (
              <div 
                key={post.id} 
                className="group bg-gray-50 dark:bg-gray-800 rounded-xl p-6 hover:bg-white dark:hover:bg-gray-700 hover:shadow-lg transition-all duration-300 border border-transparent hover:border-gray-200 dark:hover:border-gray-600"
              >
                <div className="flex items-center mb-3">
                  <span className="bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900 dark:to-blue-900 text-purple-800 dark:text-purple-200 text-xs font-semibold px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400 text-sm ml-3">
                    {format(new Date(post.date), 'MMM dd, yyyy')}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400 text-sm ml-auto">
                    {post.readTime}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-end">
                  <Link 
                    href={`/blog/${post.slug}`} 
                    onClick={() => trackBlogPostView(post.title, post.slug, post.category)}
                    className="inline-flex items-center px-3 py-1.5 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-indigo-500 dark:text-white dark:hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 transition-colors text-sm"
                  >
                    Explore Article
                    <ArrowRight className="ml-1 w-3 h-3" suppressHydrationWarning />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-gradient-to-br from-purple-500 via-indigo-500 to-blue-500 dark:from-purple-900 dark:via-indigo-900 dark:to-blue-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzlIj48cGF0aCBkPSJNIDYwIDAgTCAwIDAgMCA2MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-white/10 backdrop-blur-md p-8 md:p-12 rounded-2xl border border-white/20">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center mb-4 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full">
                <Zap className="w-4 h-4 mr-2 text-yellow-300" suppressHydrationWarning />
                <span className="text-sm font-medium text-white">Join the Web3 Movement</span>
              </div>
              <h2 className="text-4xl font-bold text-white mb-4">
                Join the Web3 Revolution
              </h2>
              <p className="text-xl text-white/90 mb-8">
                Get exclusive insights, expert analysis, and actionable strategies on Ethereum, DeFi, NFTs, and blockchain innovation delivered directly to your inbox.
              </p>
              <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-grow px-6 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
                  required
                />
                <button
                  type="submit"
                  className="bg-gradient-to-r from-purple-500 to-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-blue-700 transition duration-300 transform hover:scale-105 shadow-lg"
                >
                  Get Started
                </button>
              </form>
              <p className="mt-4 text-sm text-white/80">
                Join 10,000+ Web3 professionals and enthusiasts. Zero spam, instant unsubscribe.
              </p>
            </div>
          </div>
        </div>
      </section>
    </LayoutWithTheme>
  );
}
