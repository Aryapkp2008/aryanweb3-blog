'use client';

import React, { useState, useEffect } from 'react';
import { Clock, BookOpen, TrendingUp } from 'lucide-react';
import { trackReadingProgress } from '@/lib/analytics';

interface ReadingProgressProps {
  content?: string;
  postSlug?: string;
  trackProgress?: boolean;
}

export default function ReadingProgress({ content, postSlug, trackProgress = true }: ReadingProgressProps) {
  const [progress, setProgress] = useState(0);
  const [readingTime, setReadingTime] = useState(0);
  const [wordsRead, setWordsRead] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [lastTrackedProgress, setLastTrackedProgress] = useState(0);

  useEffect(() => {
    if (content) {
      // Calculate reading time (200 words per minute average)
      const words = content.split(' ').length;
      setReadingTime(Math.ceil(words / 200));
    }
  }, [content]);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      
      // Calculate progress
      const scrollPercentage = (scrollTop / (documentHeight - windowHeight)) * 100;
      setProgress(Math.min(100, Math.max(0, scrollPercentage)));
      
      // Show/hide based on scroll position
      setIsVisible(scrollTop > 100);
      
      // Calculate approximate words read
      if (content) {
        const totalWords = content.split(' ').length;
        const wordsReadCount = Math.floor((scrollPercentage / 100) * totalWords);
        setWordsRead(wordsReadCount);
      }

      // Track reading progress milestones (every 25%)
      if (trackProgress && postSlug) {
        const milestones = [25, 50, 75, 100];
        for (const milestone of milestones) {
          if (scrollPercentage >= milestone && lastTrackedProgress < milestone) {
            trackReadingProgress(postSlug, milestone);
            setLastTrackedProgress(milestone);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [content]);

  return (
    <>
      {/* Top Progress Bar */}
      <div 
        className={`fixed top-0 left-0 right-0 z-[60] transition-transform duration-300 ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="h-1.5 bg-gray-200 dark:bg-gray-800 shadow-sm">
          <div 
            className="h-full bg-gradient-to-r from-purple-500 to-blue-500 dark:from-purple-400 dark:to-blue-400 transition-all duration-150 shadow-lg"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        {/* Progress Stats */}
        <div className="bg-white/90 dark:bg-gray-900/80 backdrop-blur supports-[backdrop-filter]:backdrop-blur-md border-b border-gray-200 dark:border-gray-700 px-4 py-2 shadow-md">
          <div className="max-w-7xl mx-auto flex items-center justify-between text-sm">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <TrendingUp className="w-4 h-4 text-purple-600 dark:text-purple-300" suppressHydrationWarning />
                <span className="font-medium text-gray-900 dark:text-white">{Math.round(progress)}%</span>
                <span className="text-xs">complete</span>
              </div>
              
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <Clock className="w-4 h-4 text-blue-600 dark:text-blue-300" suppressHydrationWarning />
                <span className="font-medium text-gray-900 dark:text-white">{readingTime} min</span>
                <span className="text-xs">to read</span>
              </div>
              
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <BookOpen className="w-4 h-4 text-green-600 dark:text-green-300" suppressHydrationWarning />
                <span className="font-medium text-gray-900 dark:text-white">{wordsRead}</span>
                <span className="text-xs">words read</span>
              </div>
            </div>
            
            {/* Milestone Messages */}
            <div className="hidden sm:block text-xs text-gray-500 dark:text-gray-300">
              {progress === 0 && "Let's start reading! 📚"}
              {progress > 0 && progress < 25 && "Great start! Keep going! 🚀"}
              {progress >= 25 && progress < 50 && "Quarter way through! 💪"}
              {progress >= 50 && progress < 75 && "Halfway there! You're doing great! 🎯"}
              {progress >= 75 && progress < 100 && "Almost finished! Final stretch! 🏁"}
              {progress === 100 && "Congratulations! You've finished! 🎉"}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Progress Circle (Mobile) */}
      <div 
        className={`fixed bottom-8 right-8 sm:hidden z-40 transition-all duration-300 ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
        }`}
      >
        <div className="relative w-16 h-16 bg-white/95 dark:bg-gray-900/85 backdrop-blur supports-[backdrop-filter]:backdrop-blur-md rounded-full shadow-xl ring-1 ring-black/5 dark:ring-white/10 border border-gray-200 dark:border-gray-700 p-1">
          <svg className="w-14 h-14 transform -rotate-90" suppressHydrationWarning>
            <circle
              cx="28"
              cy="28"
              r="24"
              stroke="currentColor"
              strokeWidth="3"
              fill="none"
              className="text-gray-200 dark:text-gray-600"
              suppressHydrationWarning
            />
            <circle
              cx="28"
              cy="28"
              r="24"
              stroke="currentColor"
              strokeWidth="3"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 24}`}
              strokeDashoffset={`${2 * Math.PI * 24 * (1 - progress / 100)}`}
              className="text-purple-600 dark:text-purple-300 transition-all duration-150"
              suppressHydrationWarning
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-bold text-gray-900 dark:text-white">{Math.round(progress)}%</span>
          </div>
        </div>
      </div>
    </>
  );
}