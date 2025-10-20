import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

// Custom event tracking
export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, {
      custom_parameter: properties,
    });
  }
};

// Blog-specific tracking events
export const trackBlogPostView = (postTitle: string, postSlug: string, category: string) => {
  trackEvent('blog_post_view', {
    post_title: postTitle,
    post_slug: postSlug,
    category: category,
  });
};

export const trackSearch = (query: string, resultsCount: number) => {
  trackEvent('search', {
    search_term: query,
    results_count: resultsCount,
  });
};

export const trackNewsletterSignup = (email: string) => {
  trackEvent('newsletter_signup', {
    email: email,
  });
};

export const trackThemeToggle = (theme: 'light' | 'dark' | 'auto') => {
  trackEvent('theme_toggle', {
    theme: theme,
  });
};

export const trackShare = (platform: string, postTitle: string, postSlug: string) => {
  trackEvent('share', {
    platform: platform,
    post_title: postTitle,
    post_slug: postSlug,
  });
};

export const trackReadingProgress = (postSlug: string, progress: number) => {
  trackEvent('reading_progress', {
    post_slug: postSlug,
    progress_percentage: progress,
  });
};

// Performance tracking
export const trackPageLoad = (page: string, loadTime: number) => {
  trackEvent('page_load', {
    page: page,
    load_time: loadTime,
  });
};

export const trackImageLoad = (imageSrc: string, loadTime: number) => {
  trackEvent('image_load', {
    image_src: imageSrc,
    load_time: loadTime,
  });
};

// User engagement tracking
export const trackScrollDepth = (depth: number, page: string) => {
  trackEvent('scroll_depth', {
    depth_percentage: depth,
    page: page,
  });
};

export const trackTimeOnPage = (timeInSeconds: number, page: string) => {
  trackEvent('time_on_page', {
    time_seconds: timeInSeconds,
    page: page,
  });
};

// Error tracking
export const trackError = (error: string, page: string, userId?: string) => {
  trackEvent('error', {
    error_message: error,
    page: page,
    user_id: userId,
  });
};

// Export the analytics components
export { Analytics, SpeedInsights };

// Google Analytics configuration
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || '';

export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

// Extend Window interface for gtag
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event',
      targetId: string,
      config?: Record<string, any>
    ) => void;
  }
}
