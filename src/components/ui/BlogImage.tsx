'use client';

import { useState } from 'react';
import Image from 'next/image';

interface BlogImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
  priority?: boolean;
}

export default function BlogImage({ 
  src, 
  alt, 
  className = '', 
  fallbackSrc = '/placeholder-blog.jpg',
  priority = false 
}: BlogImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    setHasError(true);
    if (fallbackSrc && imgSrc !== fallbackSrc) {
      setImgSrc(fallbackSrc);
    }
  };

  // For external URLs, use regular img tag
  if (imgSrc.startsWith('http')) {
    return (
      <div className={`relative ${className}`}>
        {isLoading && !hasError && (
          <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-blue-100 animate-pulse rounded-lg" />
        )}
        <img
          src={imgSrc}
          alt={alt}
          className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
          onLoad={() => setIsLoading(false)}
          onError={handleError}
        />
        {hasError && imgSrc === fallbackSrc && (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg">
            <div className="text-center p-4">
              <div className="text-4xl mb-2">🖼️</div>
              <p className="text-sm text-gray-600">Image unavailable</p>
            </div>
          </div>
        )}
      </div>
    );
  }

  // For local images, use Next.js Image component
  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-blue-100 animate-pulse rounded-lg" />
      )}
      <Image
        src={imgSrc}
        alt={alt}
        fill
        className={`object-cover ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        onLoad={() => setIsLoading(false)}
        onError={handleError}
        priority={priority}
      />
    </div>
  );
}