'use client';

import { useEffect } from 'react';

export default function DarkReaderProtection() {
  useEffect(() => {
    // Check if Dark Reader is active
    const checkDarkReader = () => {
      const isDarkReaderActive = 
        document.documentElement.getAttribute('data-darkreader-mode') ||
        document.documentElement.getAttribute('data-darkreader-scheme');
      
      if (isDarkReaderActive) {
        // Add a class to the body to handle Dark Reader
        document.body.classList.add('darkreader-active');
        
        // Force proper text colors
        const style = document.createElement('style');
        style.innerHTML = `
          .darkreader-active * {
            color: var(--foreground) !important;
            opacity: 1 !important;
          }
          
          .darkreader-active .text-white {
            color: #ffffff !important;
          }
          
          .darkreader-active .text-gray-900 {
            color: #111827 !important;
          }
          
          .darkreader-active .dark\\:text-white {
            color: #ffffff !important;
          }
          
          .darkreader-active .dark\\:text-gray-100 {
            color: #f3f4f6 !important;
          }
          
          /* Prevent Dark Reader from inverting our dark mode */
          .darkreader-active.dark {
            filter: none !important;
            background: #09090b !important;
          }
          
          .darkreader-active.dark * {
            filter: none !important;
          }
        `;
        document.head.appendChild(style);
        
        // Show a warning to the user
        console.info(
          '%c🔔 Dark Reader Detected!',
          'color: #fbbf24; font-size: 14px; font-weight: bold;'
        );
        console.info(
          '%cThis website has its own dark mode. Consider disabling Dark Reader for the best experience.',
          'color: #60a5fa; font-size: 12px;'
        );
      } else {
        document.body.classList.remove('darkreader-active');
      }
    };
    
    // Check on mount
    checkDarkReader();
    
    // Observe changes to html attributes
    const observer = new MutationObserver(checkDarkReader);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-darkreader-mode', 'data-darkreader-scheme']
    });
    
    return () => observer.disconnect();
  }, []);
  
  return null;
}