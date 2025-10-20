'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Search, X, Filter, Calendar, Tag, TrendingUp } from 'lucide-react';
import { blogPosts } from '@/data/blogPosts';
import Link from 'next/link';

interface SearchResult {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  date: string;
  tags: string[];
  score: number;
}

export default function SearchSystem() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [filters, setFilters] = useState({
    category: '',
    dateRange: 'all',
    sortBy: 'relevance'
  });
  const [showFilters, setShowFilters] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  // Keyboard shortcut (Ctrl/Cmd + K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  // Search function with scoring
  const performSearch = useCallback((searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    const searchTerms = searchQuery.toLowerCase().split(' ');
    
    const scoredResults = blogPosts.map(post => {
      let score = 0;
      const titleLower = post.title.toLowerCase();
      const contentLower = post.content.toLowerCase();
      const excerptLower = post.excerpt.toLowerCase();
      
      searchTerms.forEach(term => {
        // Title matches (highest weight)
        if (titleLower.includes(term)) score += 10;
        if (titleLower.startsWith(term)) score += 5;
        
        // Excerpt matches (medium weight)
        if (excerptLower.includes(term)) score += 5;
        
        // Content matches (lower weight)
        const contentMatches = (contentLower.match(new RegExp(term, 'g')) || []).length;
        score += Math.min(contentMatches * 2, 10);
        
        // Category/tag matches
        if (post.category.toLowerCase().includes(term)) score += 8;
        if (post.tags.some(tag => tag.toLowerCase().includes(term))) score += 6;
      });
      
      return { ...post, score };
    });

    // Apply filters
    let filtered = scoredResults.filter(post => post.score > 0);
    
    if (filters.category) {
      filtered = filtered.filter(post => post.category === filters.category);
    }
    
    if (filters.dateRange !== 'all') {
      const now = new Date();
      const postDate = (post: any) => new Date(post.date);
      
      switch (filters.dateRange) {
        case 'week':
          filtered = filtered.filter(post => 
            (now.getTime() - postDate(post).getTime()) <= 7 * 24 * 60 * 60 * 1000
          );
          break;
        case 'month':
          filtered = filtered.filter(post => 
            (now.getTime() - postDate(post).getTime()) <= 30 * 24 * 60 * 60 * 1000
          );
          break;
        case 'year':
          filtered = filtered.filter(post => 
            now.getFullYear() === postDate(post).getFullYear()
          );
          break;
      }
    }
    
    // Sort results
    if (filters.sortBy === 'relevance') {
      filtered.sort((a, b) => b.score - a.score);
    } else if (filters.sortBy === 'date') {
      filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }
    
    setResults(filtered.slice(0, 10));
  }, [filters]);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      performSearch(query);
    }, 200);
    
    return () => clearTimeout(timer);
  }, [query, performSearch]);

  // Save search to history
  const saveSearch = (searchTerm: string) => {
    if (!searchTerm.trim()) return;
    
    const updated = [searchTerm, ...recentSearches.filter(s => s !== searchTerm)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
  };

  // Get unique categories
  const categories = Array.from(new Set(blogPosts.map(post => post.category)));

  return (
    <>
      {/* Search Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      >
        <Search className="w-4 h-4" suppressHydrationWarning />
        <span className="hidden sm:inline">Search</span>
        <kbd className="hidden sm:inline px-2 py-0.5 text-xs bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded">⌘K</kbd>
      </button>

      {/* Search Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          
          <div className="relative min-h-screen flex items-start justify-center pt-20">
            <div className="relative bg-white dark:bg-gray-900 rounded-xl shadow-2xl w-full max-w-3xl mx-4 max-h-[80vh] overflow-hidden">
              {/* Search Header */}
              <div className="sticky top-0 bg-white dark:bg-gray-900 border-b dark:border-gray-800 z-10">
                <div className="flex items-center p-4">
                  <Search className="w-5 h-5 text-gray-400 mr-3" suppressHydrationWarning />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && query.trim()) {
                        saveSearch(query);
                        // If no specific result selected, go to blog with search
                        if (results.length === 0 || !e.shiftKey) {
                          window.location.href = `/blog?search=${encodeURIComponent(query.trim())}`;
                          setIsOpen(false);
                        } else if (results.length > 0) {
                          // Go to first result
                          window.location.href = `/blog/${results[0].slug}`;
                          setIsOpen(false);
                        }
                      }
                    }}
                    placeholder="Search articles, topics, tags..."
                    className="flex-1 bg-transparent outline-none text-lg dark:text-white"
                  />
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg mr-2"
                  >
                    <Filter className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Filters */}
                {showFilters && (
                  <div className="px-4 pb-4 flex flex-wrap gap-2">
                    <select
                      value={filters.category}
                      onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                      className="px-3 py-1 text-sm border rounded-lg dark:bg-gray-800 dark:border-gray-700"
                    >
                      <option value="">All Categories</option>
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                    
                    <select
                      value={filters.dateRange}
                      onChange={(e) => setFilters({ ...filters, dateRange: e.target.value })}
                      className="px-3 py-1 text-sm border rounded-lg dark:bg-gray-800 dark:border-gray-700"
                    >
                      <option value="all">All Time</option>
                      <option value="week">Past Week</option>
                      <option value="month">Past Month</option>
                      <option value="year">This Year</option>
                    </select>
                    
                    <select
                      value={filters.sortBy}
                      onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
                      className="px-3 py-1 text-sm border rounded-lg dark:bg-gray-800 dark:border-gray-700"
                    >
                      <option value="relevance">Relevance</option>
                      <option value="date">Latest First</option>
                    </select>
                  </div>
                )}
              </div>

              {/* Search Results */}
              <div className="overflow-y-auto max-h-[60vh]">
                {query ? (
                  results.length > 0 ? (
                    <div>
                      <div className="p-2">
                        {results.map(result => (
                        <Link
                          key={result.id}
                          href={`/blog/${result.slug}`}
                          onClick={() => {
                            saveSearch(query);
                            setIsOpen(false);
                          }}
                          className="block p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors cursor-pointer">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-900 dark:text-white line-clamp-1">
                                {result.title}
                              </h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                                {result.excerpt}
                              </p>
                              <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                                <span className="flex items-center gap-1">
                                  <Tag className="w-3 h-3" />
                                  {result.category}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Calendar className="w-3 h-3" />
                                  {new Date(result.date).toLocaleDateString()}
                                </span>
                                {result.tags && result.tags.length > 0 && (
                                  <span className="text-gray-400">•</span>
                                )}
                                {result.tags && result.tags.slice(0, 2).map((tag, idx) => (
                                  <span key={idx} className="text-gray-400">#{tag}</span>
                                ))}
                              </div>
                            </div>
                            {result.score > 20 && (
                              <div className="ml-3">
                                <span className="text-xs bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 px-2 py-1 rounded">
                                  Best Match
                                </span>
                              </div>
                            )}
                          </div>
                        </Link>
                      ))}
                      </div>
                      {results.length > 0 && (
                        <div className="border-t dark:border-gray-700 p-3">
                          <button
                            onClick={() => {
                              window.location.href = `/blog?search=${encodeURIComponent(query)}`;
                              setIsOpen(false);
                            }}
                            className="w-full text-center py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors text-sm font-medium"
                          >
                            View all {results.length} results on blog page →
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="p-8 text-center text-gray-500">
                      No results found for &quot;{query}&quot;
                    </div>
                  )
                ) : (
                  <div className="p-4">
                    {/* Recent Searches */}
                    {recentSearches.length > 0 && (
                      <div className="mb-6">
                        <h3 className="text-sm font-medium text-gray-500 mb-2">Recent Searches</h3>
                        <div className="flex flex-wrap gap-2">
                          {recentSearches.map((search, idx) => (
                            <button
                              key={idx}
                              onClick={() => setQuery(search)}
                              className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
                            >
                              {search}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Trending Topics */}
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-2 flex items-center gap-1">
                        <TrendingUp className="w-4 h-4" />
                        Trending Topics
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {['DeFi', 'NFTs', 'Layer 2', 'Ethereum', 'Smart Contracts'].map(topic => (
                          <button
                            key={topic}
                            onClick={() => setQuery(topic)}
                            className="px-3 py-1 text-sm bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-800"
                          >
                            {topic}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Search Instructions */}
                {!query && (
                  <div className="border-t dark:border-gray-700 px-4 py-3 bg-gray-50 dark:bg-gray-800">
                    <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                      Type to search • Press <kbd className="px-1.5 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-xs">Enter</kbd> to see all results • <kbd className="px-1.5 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-xs">ESC</kbd> to close
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}