import { SupportNeedsContent } from '@/components/pages/SupportNeedsContent';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Support Needs | BookBridge - Help Us Make Books Accessible',
  description: 'Learn how you can help BookBridge democratize reading for 1.5 billion ESL students worldwide. Every contribution matters.',
  openGraph: {
    title: 'Support BookBridge - Make Books Accessible to Everyone',
    description: 'Join us in building an AI-powered reading companion that helps people truly understand what they read.',
    type: 'website',
  },
};

export default function SupportNeedsPage() {
  return <SupportNeedsContent />;
}