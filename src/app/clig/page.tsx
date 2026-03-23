import type { Metadata } from 'next';
import CLIGContent from './CLIGContent';

export const metadata: Metadata = {
  title: 'CLIG - Collective Investment Legacy Group | Strategic Analysis',
  description: 'Bilingual research presentation for a 15-member real estate investment LLC in Salt Lake City, Utah. Strategic analysis and projections for long-term wealth building.',
  keywords: ['real estate investment', 'LLC', 'Salt Lake City', 'Utah', 'investment group', 'duplex', 'ADU', 'assumable loans', 'CLIG'],
  authors: [{ name: 'Collective Investment Legacy Group' }],
  openGraph: {
    title: 'CLIG - Strategic Analysis',
    description: 'Research presentation for our 15-member investment group. Starting May 2026.',
    type: 'website',
    locale: 'fr_FR',
    url: 'https://portfolio-4u8c.vercel.app/clig',
    siteName: 'CLIG Strategic Analysis',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CLIG - Strategic Analysis',
    description: 'Research presentation for our 15-member investment group.',
  },
  alternates: {
    canonical: 'https://portfolio-4u8c.vercel.app/clig',
  },
};

export default function CLIGPage() {
  return <CLIGContent />;
}
