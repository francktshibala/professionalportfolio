'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { RefreshCw, Home, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application Error:', error);
  }, [error]);

  return (
    <Container className="py-20 text-center">
      <div className="max-w-md mx-auto">
        <div className="mb-8">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Oops! Something went wrong
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            We encountered an unexpected error. Please try again or go back to the homepage.
          </p>
          
          {process.env.NODE_ENV === 'development' && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6 text-left">
              <h3 className="font-semibold text-red-800 dark:text-red-200 mb-2">Error Details:</h3>
              <pre className="text-sm text-red-700 dark:text-red-300 overflow-x-auto">
                {error.message}
              </pre>
            </div>
          )}
        </div>
        
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={reset}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
            <Link href="/">
              <Button variant="outline">
                <Home className="w-4 h-4 mr-2" />
                Go Home
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="mt-12 text-sm text-gray-500 dark:text-gray-400">
          <p>If this problem persists, please <Link href="/contact" className="text-blue-600 hover:underline">contact me</Link>.</p>
        </div>
      </div>
    </Container>
  );
}