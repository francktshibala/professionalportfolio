'use client';

import React, { Component, ReactNode } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Typography } from '@/components/ui/Typography';
import { AlertTriangle, RefreshCw, Home, ArrowLeft } from 'lucide-react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    });

    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'exception', {
        description: error.message,
        fatal: false,
      });
    }
  }

  handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  handleGoBack = () => {
    window.history.back();
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <Card className="p-8 max-w-2xl mx-auto my-8 text-center">
          <div className="flex justify-center mb-6">
            <AlertTriangle size={48} className="text-red-500" />
          </div>
          
          <Typography variant="h2" className="mb-4 text-red-600">
            Oops! Something went wrong
          </Typography>
          
          <Typography variant="body" className="mb-6 text-gray-600 dark:text-gray-400">
            We encountered an unexpected error. Don&apos;t worry, our team has been notified and is working to fix it.
          </Typography>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <Button
              variant="primary"
              onClick={this.handleRetry}
              className="flex items-center gap-2"
            >
              <RefreshCw size={16} />
              Try Again
            </Button>
            <Button
              variant="secondary"
              onClick={this.handleGoBack}
              className="flex items-center gap-2"
            >
              <ArrowLeft size={16} />
              Go Back
            </Button>
            <Button
              variant="ghost"
              onClick={this.handleGoHome}
              className="flex items-center gap-2"
            >
              <Home size={16} />
              Go Home
            </Button>
          </div>
          
          {process.env.NODE_ENV === 'development' && this.state.error && (
            <details className="text-left mt-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <summary className="cursor-pointer font-medium mb-2">
                Error Details (Development Only)
              </summary>
              <pre className="text-sm overflow-auto text-red-600 dark:text-red-400">
                {this.state.error.toString()}
                {this.state.errorInfo?.componentStack}
              </pre>
            </details>
          )}
        </Card>
      );
    }

    return this.props.children;
  }
}

export function AsyncErrorBoundary({ 
  children, 
  fallback 
}: { 
  children: ReactNode; 
  fallback?: ReactNode; 
}) {
  const [error, setError] = React.useState<Error | null>(null);

  React.useEffect(() => {
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      setError(new Error(event.reason));
      event.preventDefault();
    };

    window.addEventListener('unhandledrejection', handleUnhandledRejection);
    return () => {
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  if (error) {
    return (
      <ErrorBoundary fallback={fallback}>
        {children}
      </ErrorBoundary>
    );
  }

  return <>{children}</>;
}

export function NetworkErrorFallback({ 
  error, 
  retry, 
  className 
}: { 
  error?: Error; 
  retry?: () => void; 
  className?: string; 
}) {
  return (
    <Card className={`p-6 text-center ${className}`}>
      <div className="flex justify-center mb-4">
        <AlertTriangle size={32} className="text-yellow-500" />
      </div>
      
      <Typography variant="h3" className="mb-2">
        Network Error
      </Typography>
      
      <Typography variant="body" className="mb-4 text-gray-600 dark:text-gray-400">
        Unable to load content. Please check your internet connection and try again.
      </Typography>
      
      {retry && (
        <Button
          variant="primary"
          onClick={retry}
          className="flex items-center gap-2 mx-auto"
        >
          <RefreshCw size={16} />
          Retry
        </Button>
      )}
      
      {process.env.NODE_ENV === 'development' && error && (
        <details className="text-left mt-4 p-3 bg-gray-100 dark:bg-gray-800 rounded">
          <summary className="cursor-pointer text-sm font-medium mb-2">
            Error Details
          </summary>
          <pre className="text-xs text-red-600 dark:text-red-400">
            {error.message}
          </pre>
        </details>
      )}
    </Card>
  );
}