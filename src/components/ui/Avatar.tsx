'use client';

import { useState } from 'react';

interface AvatarProps {
  src: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg';
  fallbackText?: string;
}

export default function Avatar({ src, alt, size = 'md', fallbackText }: AvatarProps) {
  const [hasError, setHasError] = useState(false);
  
  const sizeClasses = {
    sm: 'w-6 h-6 text-xs',
    md: 'w-8 h-8 text-sm',
    lg: 'w-10 h-10 text-base'
  };

  const initial = fallbackText || alt.charAt(0).toUpperCase();

  if (hasError) {
    return (
      <div className={`${sizeClasses[size]} rounded-full flex items-center justify-center bg-gradient-to-br from-purple-500 to-blue-500 text-white font-bold`}>
        {initial}
      </div>
    );
  }

  return (
    <div className={`relative ${sizeClasses[size]} rounded-full overflow-hidden bg-gradient-to-br from-purple-100 to-blue-100`}>
      <img 
        src={src} 
        alt={alt}
        className="w-full h-full object-cover"
        onError={() => setHasError(true)}
      />
    </div>
  );
}