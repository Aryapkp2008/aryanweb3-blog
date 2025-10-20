'use client';

import { useState, useRef, MouseEvent } from 'react';
import Link from 'next/link';
import PlaceholderImage from './PlaceholderImage';
import { format } from 'date-fns';
import { ArrowRight, Calendar, Clock, Sparkles } from 'lucide-react';

interface Card3DProps {
  post: {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    coverImage: string;
    date: string;
    category: string;
    tags: string[];
    readTime: string;
    featured?: boolean;
  };
}

export default function Card3D({ post }: Card3DProps) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    const rotateXValue = (mouseY / (rect.height / 2)) * -10;
    const rotateYValue = (mouseX / (rect.width / 2)) * 10;
    
    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => {
    setIsHovering(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div 
      className="relative perspective-1000"
      style={{ perspective: '1000px' }}
    >
      <div
        ref={cardRef}
        className="relative bg-white rounded-2xl shadow-xl transition-all duration-300 transform-gpu"
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) ${isHovering ? 'translateZ(20px) scale(1.02)' : ''}`,
          transformStyle: 'preserve-3d',
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Glowing border effect */}
        <div className={`absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 rounded-2xl opacity-0 ${isHovering ? 'opacity-100' : ''} transition-opacity duration-300 blur-xl -z-10`} />
        
        {/* Card content */}
        <div className="relative overflow-hidden rounded-2xl border border-gray-100">
          {/* Image section with parallax */}
          <div 
            className="relative h-56 overflow-hidden"
            style={{
              transform: `translateZ(30px)`,
              transformStyle: 'preserve-3d',
            }}
          >
            <PlaceholderImage 
              title={post.title}
              category={post.category}
              variant="card"
              className="w-full h-full"
            />
            
            {/* Floating category badge */}
            <div 
              className="absolute top-4 left-4 z-20"
              style={{
                transform: `translateZ(50px)`,
              }}
            >
              <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg border border-white/50">
                <span className="text-xs font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  {post.category}
                </span>
              </div>
            </div>
            
            {/* Featured badge */}
            {post.featured && (
              <div 
                className="absolute top-4 right-4 z-20"
                style={{
                  transform: `translateZ(50px)`,
                }}
              >
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1.5 rounded-full shadow-lg flex items-center space-x-1">
                  <Sparkles className="w-3 h-3" />
                  <span className="text-xs font-bold">Featured</span>
                </div>
              </div>
            )}
          </div>
          
          {/* Content section */}
          <div 
            className="p-6"
            style={{
              transform: `translateZ(20px)`,
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Meta info */}
            <div className="flex items-center gap-4 mb-3 text-sm text-gray-500">
              <span className="flex items-center">
                <Calendar className="w-3 h-3 mr-1" />
                {format(new Date(post.date), 'MMM dd, yyyy')}
              </span>
              <span className="flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                {post.readTime}
              </span>
            </div>
            
            {/* Title with gradient on hover */}
            <h3 className="text-xl font-bold mb-3 line-clamp-2 transition-all duration-300">
              <span className={`${isHovering ? 'bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent' : 'text-gray-900'}`}>
                {post.title}
              </span>
            </h3>
            
            {/* Excerpt */}
            <p className="text-gray-600 mb-4 line-clamp-3">
              {post.excerpt}
            </p>
            
            {/* Action */}
            <div className="flex items-center justify-end">
              <Link 
                href={`/blog/${post.slug}`}
                className="group/link flex items-center text-purple-600 hover:text-purple-800 font-medium"
                style={{
                  transform: `translateZ(30px)`,
                }}
              >
                <span className="mr-1">Read</span>
                <ArrowRight className={`w-4 h-4 transition-transform ${isHovering ? 'translate-x-1' : ''}`} />
              </Link>
            </div>
          </div>
        </div>
        
        {/* Shine effect */}
        <div 
          className={`absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 ${isHovering ? 'opacity-100' : ''} transition-opacity duration-700 pointer-events-none rounded-2xl`}
          style={{
            background: `linear-gradient(105deg, transparent 40%, rgba(255, 255, 255, 0.2) 50%, transparent 60%)`,
            transform: isHovering ? 'translateX(100%)' : 'translateX(-100%)',
            transition: 'transform 0.6s',
          }}
        />
      </div>
    </div>
  );
}