import type { Metadata } from 'next';
import { AboutContent } from '@/components/pages/AboutContent';

export const metadata: Metadata = {
  title: "About Franck - Senior Full-Stack Developer Story & Experience",
  description: "Learn about Franck's journey as a Senior Full-Stack Developer. 5+ years of experience building scalable web applications with React, TypeScript, and modern technologies. Career timeline, achievements, and technical expertise.",
  keywords: ["Franck", "About", "Full-Stack Developer", "Career", "Experience", "React Developer", "TypeScript", "Web Development", "Portfolio", "Biography"],
  openGraph: {
    title: "About Franck - Senior Full-Stack Developer Story & Experience",
    description: "Learn about Franck's journey as a Senior Full-Stack Developer. 5+ years of experience building scalable web applications with React, TypeScript, and modern technologies.",
    url: "https://portfolio-4u8c.vercel.app/about",
    images: [
      {
        url: "/og-about.jpg",
        width: 1200,
        height: 630,
        alt: "Franck - About Page - Senior Full-Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Franck - Senior Full-Stack Developer Story & Experience",
    description: "Learn about Franck's journey as a Senior Full-Stack Developer. 5+ years of experience building scalable web applications.",
    images: ["/og-about.jpg"],
  },
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return <AboutContent />;
}

