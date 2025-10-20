'use client';

import React, { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Sun, Moon, Monitor } from 'lucide-react';

export default function ThemeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [showTooltip, setShowTooltip] = useState(false);

  const toggleTheme = () => {
    const themes: Array<'light' | 'dark' | 'auto'> = ['light', 'dark', 'auto'];
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  const getThemeLabel = () => {
    switch(theme) {
      case 'light': return 'Light Mode';
      case 'dark': return 'Dark Mode';
      case 'auto': return `Auto (${resolvedTheme === 'dark' ? 'Dark' : 'Light'})`;
      default: return 'Toggle Theme';
    }
  };

  const getNextThemeLabel = () => {
    switch(theme) {
      case 'light': return 'Switch to Dark Mode';
      case 'dark': return 'Switch to Auto Mode';
      case 'auto': return 'Switch to Light Mode';
      default: return 'Toggle Theme';
    }
  };

  return (
    <div className="relative">
      <button
        onClick={toggleTheme}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="relative p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 hover:scale-110"
        aria-label={getNextThemeLabel()}
      >
        <div className="relative w-6 h-6">
          {theme === 'light' && (
            <Sun className="w-6 h-6 text-yellow-500 animate-fade-in" suppressHydrationWarning />
          )}
          {theme === 'dark' && (
            <Moon className="w-6 h-6 text-blue-500 animate-fade-in" suppressHydrationWarning />
          )}
          {theme === 'auto' && (
            <Monitor className="w-6 h-6 text-purple-500 animate-fade-in" suppressHydrationWarning />
          )}
        </div>
      </button>
      
      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute top-full mt-2 right-0 px-3 py-1 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs rounded-lg whitespace-nowrap z-50 pointer-events-none animate-fade-in">
          <div className="font-medium">{getThemeLabel()}</div>
          <div className="text-gray-300 dark:text-gray-600 text-[10px]">{getNextThemeLabel()}</div>
          <div className="absolute -top-1 right-3 w-2 h-2 bg-gray-900 dark:bg-gray-100 rotate-45"></div>
        </div>
      )}
    </div>
  );
}
