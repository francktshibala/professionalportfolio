'use client';

import { MotionDiv } from './MotionComponents';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function LoadingSpinner({ size = 'md', className = '' }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <MotionDiv 
      className={`${sizeClasses[size]} ${className}`}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    >
      <div className="w-full h-full border-2 border-primary-200 dark:border-primary-800 border-t-primary-600 dark:border-t-primary-400 rounded-full"></div>
    </MotionDiv>
  );
}

export function LoadingDots({ className = '' }: { className?: string }) {
  return (
    <div className={`flex space-x-1 ${className}`}>
      <MotionDiv 
        className="w-2 h-2 bg-primary-600 rounded-full"
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 1, repeat: Infinity, delay: 0 }}
      />
      <MotionDiv 
        className="w-2 h-2 bg-primary-600 rounded-full"
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
      />
      <MotionDiv 
        className="w-2 h-2 bg-primary-600 rounded-full"
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
      />
    </div>
  );
}

export function LoadingBar({ 
  progress, 
  className = ''
}: { 
  progress?: number; 
  className?: string;
}) {
  return (
    <div className={`w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 ${className}`}>
      <MotionDiv
        className="bg-primary-600 h-2 rounded-full"
        initial={{ width: 0 }}
        animate={{ width: progress ? `${progress}%` : '100%' }}
        transition={{ duration: 0.5 }}
      />
    </div>
  );
}

export function SkeletonCard() {
  return (
    <MotionDiv 
      className="rounded-lg bg-secondary-100 dark:bg-secondary-800 p-6 animate-pulse"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center space-x-4 mb-4">
        <div className="w-12 h-12 bg-secondary-200 dark:bg-secondary-700 rounded-full"></div>
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-secondary-200 dark:bg-secondary-700 rounded w-3/4"></div>
          <div className="h-3 bg-secondary-200 dark:bg-secondary-700 rounded w-1/2"></div>
        </div>
      </div>
      <div className="space-y-3">
        <div className="h-3 bg-secondary-200 dark:bg-secondary-700 rounded"></div>
        <div className="h-3 bg-secondary-200 dark:bg-secondary-700 rounded w-5/6"></div>
        <div className="h-3 bg-secondary-200 dark:bg-secondary-700 rounded w-4/6"></div>
      </div>
    </MotionDiv>
  );
}

export function SkeletonText({ lines = 3 }: { lines?: number }) {
  return (
    <MotionDiv 
      className="animate-pulse space-y-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {Array.from({ length: lines }, (_, i) => (
        <div 
          key={i}
          className={`h-4 bg-secondary-200 dark:bg-secondary-700 rounded ${
            i === lines - 1 ? 'w-3/4' : 'w-full'
          }`}
        />
      ))}
    </MotionDiv>
  );
}