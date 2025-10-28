import type { Metadata } from 'next';
import FrancaisContent from './FrancaisContent';

export const metadata: Metadata = {
  title: 'BookBridge - Apprendre l\'Anglais pour Francophones',
  description: 'Application gratuite pour apprendre l\'anglais en lisant des livres adaptés à votre niveau. Créée pour les francophones du monde entier.',
  keywords: ['apprendre anglais', 'livres anglais', 'francophones', 'ESL', 'lecture anglais', 'BookBridge', 'Congo', 'Côte d\'Ivoire', 'France', 'apprentissage langue'],
  authors: [{ name: 'Franck Tshibala' }],
  openGraph: {
    title: 'BookBridge - Apprendre l\'Anglais pour Francophones',
    description: 'Application gratuite pour apprendre l\'anglais en lisant des livres adaptés à votre niveau.',
    type: 'website',
    locale: 'fr_FR',
    url: 'https://portfolio-4u8c.vercel.app/francais',
    siteName: 'BookBridge',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BookBridge - Apprendre l\'Anglais pour Francophones',
    description: 'Application gratuite pour apprendre l\'anglais en lisant des livres adaptés à votre niveau.',
  },
  alternates: {
    canonical: 'https://portfolio-4u8c.vercel.app/francais',
    languages: {
      'en': 'https://portfolio-4u8c.vercel.app/',
      'fr': 'https://portfolio-4u8c.vercel.app/francais',
    },
  },
};

export default function FrancaisPage() {
  return <FrancaisContent />;
}
