'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Typography } from '@/components/ui/Typography';
import { Search, Loader2, X, Clock, AlertCircle } from 'lucide-react';
import { SearchResultsSkeleton } from './BlogSkeletons';
import { NetworkErrorFallback } from '@/components/ui/ErrorBoundary';
import { useUserPreferences } from '@/hooks/useUserPreferences';
import { useAsyncCallback } from '@/hooks/useAsyncState';
import Link from 'next/link';

interface SearchResult {
  slug: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  date: string;
  author: string;
  readingTime: string;
}

export function AdvancedSearch() {
  const [query, setQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const { preferences, addToSearchHistory, clearSearchHistory } = useUserPreferences();
  
  const { data: results, loading, error, execute } = useAsyncCallback(
    async (searchQuery: string) => {
      if (!searchQuery.trim()) {
        return [];
      }
      
      const response = await fetch(`/api/blog/search?q=${encodeURIComponent(searchQuery)}`);
      if (!response.ok) {
        throw new Error(`Search failed: ${response.status}`);
      }
      
      const data = await response.json();
      return data.results || [];
    },
    []
  );

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setShowResults(false);
      return;
    }

    const searchResults = await execute(searchQuery);
    if (searchResults) {
      addToSearchHistory(searchQuery);
      setShowResults(true);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(query);
  };

  const clearSearch = () => {
    setQuery('');
    setShowResults(false);
    setShowHistory(false);
  };

  const handleHistoryClick = (historyQuery: string) => {
    setQuery(historyQuery);
    handleSearch(historyQuery);
    setShowHistory(false);
  };

  const handleInputFocus = () => {
    if (preferences.searchHistory.length > 0 && !query) {
      setShowHistory(true);
    }
  };

  const handleInputBlur = () => {
    setTimeout(() => setShowHistory(false), 200);
  };

  useEffect(() => {
    const handleClickOutside = () => {
      setShowHistory(false);
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="relative">
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Search size={20} />
          <Typography variant="h3" className="text-lg font-semibold">
            Advanced Search
          </Typography>
        </div>

        <form onSubmit={handleSubmit} className="mb-4">
          <div className="flex gap-2 mb-2">
            <div className="flex-1 relative">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search blog content, titles, tags..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
              />
              {query && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X size={16} />
                </button>
              )}
              
              {showHistory && preferences.searchHistory.length > 0 && (
                <div className="absolute top-full left-0 right-0 z-10 mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                  <div className="p-2 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Clock size={14} className="text-gray-400" />
                        <Typography variant="small" className="text-gray-600 dark:text-gray-400">
                          Recent searches
                        </Typography>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={clearSearchHistory}
                        className="text-xs"
                      >
                        Clear
                      </Button>
                    </div>
                  </div>
                  <div className="py-1">
                    {preferences.searchHistory.map((historyQuery, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => handleHistoryClick(historyQuery)}
                        className="w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm"
                      >
                        {historyQuery}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <Button type="submit" variant="primary" disabled={loading}>
              {loading ? <Loader2 size={16} className="animate-spin" /> : 'Search'}
            </Button>
          </div>
        </form>

        {(showResults || loading || error) && (
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            {loading && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <Typography variant="small" className="text-gray-600 dark:text-gray-400">
                    Searching...
                  </Typography>
                </div>
                <SearchResultsSkeleton />
              </div>
            )}
            
            {error && (
              <NetworkErrorFallback
                error={error}
                retry={() => handleSearch(query)}
                className="mt-4"
              />
            )}
            
            {showResults && !loading && !error && results && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <Typography variant="small" className="text-gray-600 dark:text-gray-400">
                    {results.length} result{results.length !== 1 ? 's' : ''} found
                  </Typography>
                  <Button variant="ghost" size="sm" onClick={clearSearch}>
                    Clear Results
                  </Button>
                </div>
                
                {results.length === 0 ? (
                  <div className="text-center py-8">
                    <AlertCircle size={32} className="mx-auto mb-4 text-gray-400" />
                    <Typography variant="body" className="text-gray-600 dark:text-gray-400">
                      No results found for &quot;{query}&quot;
                    </Typography>
                    <Typography variant="small" className="text-gray-500 dark:text-gray-500 mt-2">
                      Try different keywords or browse all posts
                    </Typography>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {results.map((post: SearchResult) => (
                      <Link
                        key={post.slug}
                        href={`/blog/${post.slug}`}
                        className="block p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        <div className="font-medium text-gray-900 dark:text-gray-100 mb-1">
                          {post.title}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          {post.description}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                            {post.category}
                          </span>
                          <span>{new Date(post.date).toLocaleDateString()}</span>
                          <span>{post.readingTime}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </Card>
    </div>
  );
}