'use client';

import Layout from '@/components/layout/Layout';
import PlaceholderImage from '@/components/ui/PlaceholderImage';
import Card3D from '@/components/ui/Card3D';
import { featuredPosts } from '@/data/blogPosts';

export default function ShowcasePage() {
  const categories = ['Ethereum', 'DeFi', 'NFTs', 'Security', 'Layer 2', 'Staking', 'Gaming', 'Governance'];
  const samplePost = featuredPosts[0];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzlIj48cGF0aCBkPSJNIDYwIDAgTCAwIDAgMCA2MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Image Design Showcase
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto">
              Explore our sophisticated, AI-enhanced image designs for blog articles
            </p>
          </div>
        </div>
      </section>

      {/* Hero Variant */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Hero Image Variant</h2>
          <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
            <PlaceholderImage 
              title="The Future of Decentralized Finance"
              category="DeFi"
              variant="hero"
              className="w-full h-full"
            />
          </div>
        </div>
      </section>

      {/* Featured Variant Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Article Images</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {categories.slice(0, 4).map((category) => (
              <div key={category} className="relative h-64 rounded-xl overflow-hidden shadow-xl group">
                <PlaceholderImage 
                  title={`Advanced ${category} Technology`}
                  category={category}
                  variant="featured"
                  className="w-full h-full group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Card Variant Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Card Image Variants</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.slice(0, 6).map((category) => (
              <div key={category} className="relative h-48 rounded-lg overflow-hidden shadow-lg">
                <PlaceholderImage 
                  title={`Understanding ${category}`}
                  category={category}
                  variant="card"
                  className="w-full h-full"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3D Card Showcase */}
      <section className="py-16 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">3D Interactive Card</h2>
          <p className="text-gray-600 mb-8">Hover and move your mouse over the card to see the 3D effect</p>
          <div className="max-w-md mx-auto">
            <Card3D post={samplePost} />
          </div>
        </div>
      </section>

      {/* All Categories Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">All Category Designs</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category) => (
              <div key={category} className="space-y-2">
                <div className="relative h-32 rounded-lg overflow-hidden shadow-md">
                  <PlaceholderImage 
                    title={category}
                    category={category}
                    variant="default"
                    className="w-full h-full"
                  />
                </div>
                <p className="text-center text-sm font-medium text-gray-700">{category}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Animation Showcase */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8">Animated Effects</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="relative h-48 rounded-lg overflow-hidden mb-4">
                <PlaceholderImage 
                  title="Hover Effect"
                  category="Ethereum"
                  variant="card"
                  className="w-full h-full"
                />
              </div>
              <h3 className="font-semibold mb-2">Shimmer on Hover</h3>
              <p className="text-gray-400 text-sm">Hover to see the shimmer effect</p>
            </div>
            <div className="text-center">
              <div className="relative h-48 rounded-lg overflow-hidden mb-4">
                <PlaceholderImage 
                  title="Floating Elements"
                  category="NFTs"
                  variant="card"
                  className="w-full h-full"
                />
              </div>
              <h3 className="font-semibold mb-2">Floating Orbs</h3>
              <p className="text-gray-400 text-sm">Animated background elements</p>
            </div>
            <div className="text-center">
              <div className="relative h-48 rounded-lg overflow-hidden mb-4">
                <PlaceholderImage 
                  title="Pattern Animation"
                  category="Gaming"
                  variant="card"
                  className="w-full h-full"
                />
              </div>
              <h3 className="font-semibold mb-2">Dynamic Patterns</h3>
              <p className="text-gray-400 text-sm">Unique pattern per category</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}