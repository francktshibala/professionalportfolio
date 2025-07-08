'use client';

import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

declare global {
  interface Window {
    gtag: (command: string, targetId: string, config?: Record<string, unknown>) => void;
  }
}

export function GoogleAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    if (GA_MEASUREMENT_ID && typeof window.gtag === 'function') {
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: pathname,
      });
    }
  }, [pathname]);

  if (!GA_MEASUREMENT_ID) {
    return null;
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        strategy="afterInteractive"
        id="google-analytics"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
              anonymize_ip: true,
              allow_google_signals: false,
              allow_ad_personalization_signals: false,
            });
          `,
        }}
      />
    </>
  );
}

export function trackEvent(eventName: string, parameters?: Record<string, unknown>) {
  if (GA_MEASUREMENT_ID && typeof window.gtag === 'function') {
    window.gtag('event', eventName, parameters);
  }
}

export const analytics = {
  trackContact: () => trackEvent('contact_form_submit'),
  trackProjectView: (projectId: string) => trackEvent('project_view', { project_id: projectId }),
  trackBlogView: (blogSlug: string) => trackEvent('blog_view', { blog_slug: blogSlug }),
  trackDownload: (fileName: string) => trackEvent('file_download', { file_name: fileName }),
  trackSocialClick: (platform: string) => trackEvent('social_click', { platform }),
};