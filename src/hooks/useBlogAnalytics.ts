'use client';

import { useEffect, useRef } from 'react';

interface BlogAnalyticsData {
  slug: string;
  title: string;
  category: string;
  tags: string[];
  readingTime: string;
}

export function useBlogAnalytics(data: BlogAnalyticsData) {
  const startTime = useRef<number>(Date.now());
  const maxScrollRef = useRef<number>(0);
  const isReadingRef = useRef<boolean>(false);

  useEffect(() => {
    const trackPageView = () => {
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'page_view', {
          page_title: data.title,
          page_location: window.location.href,
          content_group1: data.category,
          custom_map: {
            dimension1: data.tags.join(','),
            dimension2: data.readingTime,
          },
        });
      }
    };

    const trackScrollDepth = () => {
      const scrollTop = window.pageYOffset;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.round((scrollTop / documentHeight) * 100);
      
      if (scrollPercent > maxScrollRef.current) {
        maxScrollRef.current = scrollPercent;
        
        if (scrollPercent >= 25 && scrollPercent < 50) {
          trackEvent('scroll_depth', { depth: '25%' });
        } else if (scrollPercent >= 50 && scrollPercent < 75) {
          trackEvent('scroll_depth', { depth: '50%' });
        } else if (scrollPercent >= 75 && scrollPercent < 90) {
          trackEvent('scroll_depth', { depth: '75%' });
        } else if (scrollPercent >= 90) {
          trackEvent('scroll_depth', { depth: '90%' });
        }
      }
    };

    const trackReadingTime = () => {
      const currentTime = Date.now();
      const timeOnPage = Math.round((currentTime - startTime.current) / 1000);
      
      if (timeOnPage >= 30 && !isReadingRef.current) {
        isReadingRef.current = true;
        trackEvent('reading_engagement', { time_threshold: '30s' });
      }
    };

    const trackEvent = (eventName: string, parameters: any = {}) => {
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', eventName, {
          content_title: data.title,
          content_category: data.category,
          ...parameters,
        });
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        const timeOnPage = Math.round((Date.now() - startTime.current) / 1000);
        trackEvent('time_on_page', { duration: timeOnPage });
      }
    };

    trackPageView();
    
    const scrollHandler = () => {
      trackScrollDepth();
      trackReadingTime();
    };

    window.addEventListener('scroll', scrollHandler);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('scroll', scrollHandler);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      
      const finalTime = Math.round((Date.now() - startTime.current) / 1000);
      trackEvent('session_end', { 
        duration: finalTime, 
        max_scroll: maxScrollRef.current 
      });
    };
  }, [data]);

  const trackInteraction = (action: string, details?: any) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', action, {
        content_title: data.title,
        content_category: data.category,
        ...details,
      });
    }
  };

  return { trackInteraction };
}