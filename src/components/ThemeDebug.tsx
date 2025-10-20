'use client';

import { useTheme } from '@/contexts/ThemeContext';
import { useEffect, useState } from 'react';

export default function ThemeDebug() {
  const { theme, resolvedTheme } = useTheme();
  const [htmlClasses, setHtmlClasses] = useState('');
  const [bodyClasses, setBodyClasses] = useState('');

  useEffect(() => {
    const updateClasses = () => {
      setHtmlClasses(document.documentElement.className);
      setBodyClasses(document.body.className);
    };

    updateClasses();
    
    // Monitor changes
    const observer = new MutationObserver(updateClasses);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    
    return () => observer.disconnect();
  }, []);

  if (process.env.NODE_ENV === 'production') return null;

  return (
    <div className="fixed bottom-4 left-4 bg-black/80 text-white p-3 rounded-lg text-xs font-mono z-50 max-w-xs">
      <div>Theme: <span className="text-yellow-400">{theme}</span></div>
      <div>Resolved: <span className="text-green-400">{resolvedTheme}</span></div>
      <div>HTML: <span className="text-blue-400">{htmlClasses || 'none'}</span></div>
      <div>Body: <span className="text-purple-400">{bodyClasses || 'none'}</span></div>
    </div>
  );
}