import { Metadata } from 'next';
import { Suspense } from 'react';
import { Container } from '@/components/ui/Container';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { SearchContent } from './SearchContent';

export const metadata: Metadata = {
  title: 'Search',
  description: 'Search projects, blog posts, and skills on Franck\'s portfolio',
  openGraph: {
    title: 'Search | Franck - Full-Stack Developer',
    description: 'Search projects, blog posts, and skills on Franck\'s portfolio',
  },
  twitter: {
    title: 'Search | Franck - Full-Stack Developer',
    description: 'Search projects, blog posts, and skills on Franck\'s portfolio',
  },
};

export default function SearchPage() {
  return (
    <Container className="py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Search</h1>
          <p className="text-muted-foreground text-lg">
            Search across projects, blog posts, and skills
          </p>
        </div>
        
        <Suspense fallback={<LoadingSpinner />}>
          <SearchContent />
        </Suspense>
      </div>
    </Container>
  );
}