import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Home, ArrowLeft, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <Container className="py-20 text-center">
      <div className="max-w-md mx-auto">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-2">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Page Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Sorry, the page you are looking for doesn&apos;t exist or has been moved.
          </p>
        </div>
        
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button>
                <Home className="w-4 h-4 mr-2" />
                Go Home
              </Button>
            </Link>
            <Link href="/blog">
              <Button variant="outline">
                <Search className="w-4 h-4 mr-2" />
                Browse Blog
              </Button>
            </Link>
          </div>
          
          <Link href="javascript:history.back()">
            <Button variant="ghost">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>
          </Link>
        </div>
        
        <div className="mt-12 text-sm text-gray-500 dark:text-gray-400">
          <p>If you think this is a mistake, please <Link href="/contact" className="text-blue-600 hover:underline">contact me</Link>.</p>
        </div>
      </div>
    </Container>
  );
}