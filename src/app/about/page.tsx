import type { Metadata } from 'next';
import { AboutContent } from '@/components/pages/AboutContent';

export const metadata: Metadata = {
  title: "About François - BookBridge Founder Story & Mission",
  description: "Meet François, founder of BookBridge - transforming literacy for 1.5B ESL students worldwide through AI. From Congo to creating Netflix for books, discover how public libraries inspired a digital reading revolution.",
  keywords: ["François", "BookBridge", "Founder Story", "ESL", "AI Reading", "Digital Literacy", "Congo", "EdTech", "MVP", "Entrepreneur", "Reading Platform"],
  openGraph: {
    title: "About François - BookBridge Founder Story & Mission",
    description: "From Congo to creating BookBridge - discover how François is democratizing reading for 1.5B ESL students worldwide through AI-powered literacy solutions.",
    url: "https://portfolio-4u8c.vercel.app/about",
    images: [
      {
        url: "/og-about.jpg",
        width: 1200,
        height: 630,
        alt: "François - BookBridge Founder Story",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About François - BookBridge Founder Story & Mission",
    description: "From Congo to creating BookBridge - discover how François is democratizing reading for 1.5B ESL students worldwide.",
    images: ["/og-about.jpg"],
  },
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return <AboutContent />;
}

