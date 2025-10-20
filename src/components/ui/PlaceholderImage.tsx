'use client';

import { useState, useEffect } from 'react';

interface PlaceholderImageProps {
  title: string;
  category: string;
  className?: string;
  variant?: 'default' | 'hero' | 'card' | 'featured';
}

const categoryThemes: Record<string, {
  gradient: string;
  icon: string;
  pattern: 'circuit' | 'waves' | 'hexagon' | 'dots' | 'mesh' | 'geometric' | 'abstract' | 'network';
  colors: { primary: string; secondary: string; accent: string };
}> = {
  'Ethereum': {
    gradient: 'from-blue-500 via-indigo-600 to-purple-700',
    icon: '⚡',
    pattern: 'circuit',
    colors: { primary: '#627EEA', secondary: '#3B82F6', accent: '#8B5CF6' }
  },
  'DeFi': {
    gradient: 'from-emerald-500 via-teal-600 to-cyan-700',
    icon: '💰',
    pattern: 'hexagon',
    colors: { primary: '#10B981', secondary: '#14B8A6', accent: '#06B6D4' }
  },
  'NFTs': {
    gradient: 'from-pink-500 via-purple-600 to-indigo-700',
    icon: '🎨',
    pattern: 'abstract',
    colors: { primary: '#EC4899', secondary: '#9333EA', accent: '#6366F1' }
  },
  'Security': {
    gradient: 'from-red-500 via-orange-600 to-amber-700',
    icon: '🔒',
    pattern: 'mesh',
    colors: { primary: '#EF4444', secondary: '#F97316', accent: '#F59E0B' }
  },
  'Layer 2': {
    gradient: 'from-cyan-500 via-blue-600 to-indigo-700',
    icon: '🚀',
    pattern: 'waves',
    colors: { primary: '#06B6D4', secondary: '#3B82F6', accent: '#6366F1' }
  },
  'Staking': {
    gradient: 'from-violet-500 via-purple-600 to-fuchsia-700',
    icon: '💎',
    pattern: 'geometric',
    colors: { primary: '#8B5CF6', secondary: '#9333EA', accent: '#D946EF' }
  },
  'Gaming': {
    gradient: 'from-yellow-500 via-orange-600 to-red-700',
    icon: '🎮',
    pattern: 'dots',
    colors: { primary: '#EAB308', secondary: '#F97316', accent: '#EF4444' }
  },
  'Governance': {
    gradient: 'from-indigo-500 via-purple-600 to-pink-700',
    icon: '🏛️',
    pattern: 'network',
    colors: { primary: '#6366F1', secondary: '#9333EA', accent: '#EC4899' }
  },
  'default': {
    gradient: 'from-slate-500 via-gray-600 to-zinc-700',
    icon: '📄',
    pattern: 'dots',
    colors: { primary: '#64748B', secondary: '#6B7280', accent: '#71717A' }
  }
};

export default function PlaceholderImage({ 
  title, 
  category, 
  className = '',
  variant = 'default' 
}: PlaceholderImageProps) {
  const theme = categoryThemes[category] || categoryThemes.default;
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Generate unique ID for SVG patterns
  const patternId = `pattern-${title.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}`;
  
  // Calculate text positioning based on variant
  const variantStyles = {
    default: 'text-6xl',
    hero: 'text-8xl',
    card: 'text-5xl',
    featured: 'text-7xl'
  };
  
  const renderPattern = () => {
    switch (theme.pattern) {
      case 'circuit':
        return (
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id={patternId} x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <circle cx="5" cy="5" r="2" fill="white" opacity="0.3" />
                <circle cx="95" cy="5" r="2" fill="white" opacity="0.3" />
                <circle cx="50" cy="50" r="3" fill="white" opacity="0.4" />
                <circle cx="5" cy="95" r="2" fill="white" opacity="0.3" />
                <circle cx="95" cy="95" r="2" fill="white" opacity="0.3" />
                <path d="M5,5 L50,50 M95,5 L50,50 M5,95 L50,50 M95,95 L50,50" stroke="white" strokeWidth="0.5" opacity="0.2" />
                <rect x="20" y="20" width="60" height="60" fill="none" stroke="white" strokeWidth="0.5" opacity="0.15" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#${patternId})`} />
          </svg>
        );
      case 'waves':
        return (
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id={patternId} x="0" y="0" width="200" height="40" patternUnits="userSpaceOnUse">
                <path d="M0,20 Q50,0 100,20 T200,20" stroke="white" strokeWidth="1" fill="none" opacity="0.3" />
                <path d="M0,30 Q50,10 100,30 T200,30" stroke="white" strokeWidth="1" fill="none" opacity="0.2" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#${patternId})`} />
          </svg>
        );
      case 'hexagon':
        return (
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id={patternId} x="0" y="0" width="60" height="52" patternUnits="userSpaceOnUse">
                <polygon points="30,0 45,15 45,37 30,52 15,37 15,15" fill="none" stroke="white" strokeWidth="0.5" opacity="0.3" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#${patternId})`} />
          </svg>
        );
      case 'mesh':
        return (
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id={patternId} x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M0,25 L25,0 L50,25 L25,50 Z" fill="none" stroke="white" strokeWidth="0.5" opacity="0.2" />
                <circle cx="25" cy="25" r="2" fill="white" opacity="0.3" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#${patternId})`} />
          </svg>
        );
      case 'geometric':
        return (
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id={patternId} x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                <rect x="0" y="0" width="40" height="40" fill="white" opacity="0.05" />
                <rect x="40" y="40" width="40" height="40" fill="white" opacity="0.05" />
                <path d="M40,0 L40,80 M0,40 L80,40" stroke="white" strokeWidth="0.5" opacity="0.2" />
                <circle cx="40" cy="40" r="20" fill="none" stroke="white" strokeWidth="0.5" opacity="0.15" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#${patternId})`} />
          </svg>
        );
      case 'abstract':
        return (
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id={patternId} x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <circle cx="50" cy="50" r="40" fill="none" stroke="white" strokeWidth="0.5" opacity="0.1" />
                <circle cx="50" cy="50" r="25" fill="none" stroke="white" strokeWidth="0.5" opacity="0.15" />
                <circle cx="50" cy="50" r="10" fill="none" stroke="white" strokeWidth="0.5" opacity="0.2" />
                <path d="M10,10 Q50,30 90,10 T90,90" fill="none" stroke="white" strokeWidth="1" opacity="0.1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#${patternId})`} />
          </svg>
        );
      case 'network':
        return (
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id={patternId} x="0" y="0" width="150" height="150" patternUnits="userSpaceOnUse">
                <circle cx="30" cy="30" r="3" fill="white" opacity="0.3" />
                <circle cx="120" cy="30" r="3" fill="white" opacity="0.3" />
                <circle cx="75" cy="75" r="4" fill="white" opacity="0.4" />
                <circle cx="30" cy="120" r="3" fill="white" opacity="0.3" />
                <circle cx="120" cy="120" r="3" fill="white" opacity="0.3" />
                <path d="M30,30 L75,75 M120,30 L75,75 M30,120 L75,75 M120,120 L75,75" stroke="white" strokeWidth="0.5" opacity="0.2" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#${patternId})`} />
          </svg>
        );
      default: // dots
        return (
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id={patternId} x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
                <circle cx="15" cy="15" r="2" fill="white" opacity="0.3" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#${patternId})`} />
          </svg>
        );
    }
  };

  return (
    <div className={`relative bg-gradient-to-br ${theme.gradient} ${className} flex items-center justify-center overflow-hidden group`}>
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-black/20 opacity-50" />
      
      {/* Pattern overlay */}
      <div className="absolute inset-0 opacity-30">
        {mounted && renderPattern()}
      </div>
      
      {/* Floating orbs for depth */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white/5 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>
      
      {/* Central content */}
      <div className="relative z-10 text-center p-8">
        {/* Main icon with glow effect */}
        <div className="relative inline-block">
          <div className={`${variantStyles[variant]} drop-shadow-2xl animate-float transition-transform group-hover:scale-110`}>
            {theme.icon}
          </div>
          <div className="absolute inset-0 blur-xl opacity-50">
            <div className={`${variantStyles[variant]}`}>{theme.icon}</div>
          </div>
        </div>
        
        {/* Category badge */}
        <div className="mt-4">
          <div className="inline-flex items-center px-4 py-2 bg-white/90 text-gray-900 rounded-full border border-white/60 shadow">
            <span className="font-semibold text-sm">{category}</span>
          </div>
        </div>
        
        {/* Title preview (first few words) */}
        {variant === 'hero' && (
          <div className="mt-4 max-w-md mx-auto">
            <p className="text-white/70 text-sm font-medium line-clamp-1">
              {title}
            </p>
          </div>
        )}
      </div>
      
      {/* Multiple gradient overlays for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/30" />
      
      {/* Shimmer effect on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shimmer" />
      </div>
    </div>
  );
}
