'use client';

import { MotionDiv } from '@/components/ui/MotionComponents';
import { Card } from '@/components/ui/Card';

export function BlogCardSkeleton() {
  return (
    <Card className="p-6 animate-pulse">
      <div className="flex items-center justify-between mb-4">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
      </div>
      
      <div className="space-y-3 mb-4">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-12"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
        </div>
        <div className="flex space-x-2">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-12"></div>
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-16"></div>
        </div>
      </div>
    </Card>
  );
}

export function BlogListSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <MotionDiv
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <BlogCardSkeleton />
        </MotionDiv>
      ))}
    </div>
  );
}

export function BlogPostSkeleton() {
  return (
    <div className="max-w-4xl mx-auto animate-pulse">
      <div className="mb-8">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 mb-8"></div>
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 mb-6"></div>
        
        <div className="flex items-center space-x-6 mb-4">
          <div className="flex items-center space-x-2">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-16"></div>
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-20"></div>
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-12"></div>
        </div>
      </div>
      
      <div className="space-y-4 mb-8">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
      </div>
      
      <Card className="p-8 mb-8">
        <div className="space-y-4">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
          <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
        </div>
      </Card>
    </div>
  );
}

export function SearchResultsSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, index) => (
        <MotionDiv
          key={index}
          className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg animate-pulse"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-5/6 mb-2"></div>
          <div className="flex items-center space-x-2">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full w-12"></div>
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-12"></div>
          </div>
        </MotionDiv>
      ))}
    </div>
  );
}

export function TableOfContentsSkeleton() {
  return (
    <Card className="p-4 animate-pulse">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
        </div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4"></div>
      </div>
      
      <div className="space-y-2">
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-5/6 ml-3"></div>
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-4/6 ml-3"></div>
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4 ml-3"></div>
      </div>
    </Card>
  );
}