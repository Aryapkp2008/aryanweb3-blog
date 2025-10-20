'use client';

import { useEffect } from 'react';
import { trackPageLoad, trackImageLoad } from '@/lib/analytics';

export default function PerformanceMonitor() {
  useEffect(() => {
    // Track page load performance
    const trackPagePerformance = () => {
      if (typeof window !== 'undefined' && 'performance' in window) {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        
        if (navigation) {
          const loadTime = navigation.loadEventEnd - navigation.fetchStart;
          trackPageLoad(window.location.pathname, loadTime);
        }
      }
    };

    // Track image load performance
    const trackImagePerformance = () => {
      if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.entryType === 'resource' && entry.name.includes('images.unsplash.com')) {
              const resource = entry as PerformanceResourceTiming;
              const loadTime = resource.responseEnd - resource.requestStart;
              trackImageLoad(resource.name, loadTime);
            }
          }
        });

        observer.observe({ entryTypes: ['resource'] });

        return () => observer.disconnect();
      }
    };

    // Track Core Web Vitals
    const trackWebVitals = () => {
      if (typeof window !== 'undefined' && 'web-vital' in window) {
        // This would integrate with web-vitals library
        // For now, we'll use a simple approach
        const trackCLS = () => {
          let clsValue = 0;
          let clsEntries: PerformanceEntry[] = [];

          const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
              if (!(entry as any).hadRecentInput) {
                clsEntries.push(entry);
                clsValue += (entry as any).value;
              }
            }
          });

          observer.observe({ entryTypes: ['layout-shift'] });

          // Report CLS when page is hidden
          document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'hidden') {
              observer.takeRecords();
              observer.disconnect();
              
              // Track CLS
              if (typeof window !== 'undefined' && window.gtag) {
                window.gtag('event', 'web_vitals', {
                  metric_name: 'CLS',
                  metric_value: clsValue,
                  metric_rating: clsValue <= 0.1 ? 'good' : clsValue <= 0.25 ? 'needs-improvement' : 'poor',
                });
              }
            }
          });
        };

        const trackLCP = () => {
          const observer = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            
            if (typeof window !== 'undefined' && window.gtag) {
              window.gtag('event', 'web_vitals', {
                metric_name: 'LCP',
                metric_value: lastEntry.startTime,
                metric_rating: lastEntry.startTime <= 2500 ? 'good' : lastEntry.startTime <= 4000 ? 'needs-improvement' : 'poor',
              });
            }
          });

          observer.observe({ entryTypes: ['largest-contentful-paint'] });
        };

        const trackFID = () => {
          const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
              const fid = (entry as any).processingStart - entry.startTime;
              
              if (typeof window !== 'undefined' && window.gtag) {
                window.gtag('event', 'web_vitals', {
                  metric_name: 'FID',
                  metric_value: fid,
                  metric_rating: fid <= 100 ? 'good' : fid <= 300 ? 'needs-improvement' : 'poor',
                });
              }
            }
          });

          observer.observe({ entryTypes: ['first-input'] });
        };

        // Track all Web Vitals
        trackCLS();
        trackLCP();
        trackFID();
      }
    };

    // Track scroll depth
    const trackScrollDepth = () => {
      let maxScrollDepth = 0;
      const milestones = [25, 50, 75, 90, 100];
      const trackedMilestones = new Set<number>();

      const handleScroll = () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = Math.round((scrollTop / docHeight) * 100);
        
        maxScrollDepth = Math.max(maxScrollDepth, scrollPercent);

        // Track milestones
        for (const milestone of milestones) {
          if (scrollPercent >= milestone && !trackedMilestones.has(milestone)) {
            trackedMilestones.add(milestone);
            
            if (typeof window !== 'undefined' && window.gtag) {
              window.gtag('event', 'scroll_depth', {
                depth_percentage: milestone,
                page: window.location.pathname,
              });
            }
          }
        }
      };

      window.addEventListener('scroll', handleScroll, { passive: true });

      // Track final scroll depth when leaving page
      const handleBeforeUnload = () => {
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'scroll_depth', {
            depth_percentage: maxScrollDepth,
            page: window.location.pathname,
          });
        }
      };

      window.addEventListener('beforeunload', handleBeforeUnload);

      return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('beforeunload', handleBeforeUnload);
      };
    };

    // Track time on page
    const trackTimeOnPage = () => {
      const startTime = Date.now();
      
      const handleBeforeUnload = () => {
        const timeOnPage = Math.round((Date.now() - startTime) / 1000);
        
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'time_on_page', {
            time_seconds: timeOnPage,
            page: window.location.pathname,
          });
        }
      };

      window.addEventListener('beforeunload', handleBeforeUnload);

      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
      };
    };

    // Initialize all tracking
    const cleanupFunctions = [
      trackPagePerformance(),
      trackImagePerformance(),
      trackWebVitals(),
      trackScrollDepth(),
      trackTimeOnPage(),
    ].filter(Boolean);

    return () => {
      cleanupFunctions.forEach(cleanup => cleanup?.());
    };
  }, []);

  return null; // This component doesn't render anything
}
