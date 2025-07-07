'use client';

import { useState, useEffect } from 'react';
import { GitHubStats as GitHubStatsType } from '@/types';
import { Card } from '@/components/ui/Card';
import { Heading, Text } from '@/components/ui/Typography';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

interface GitHubStatsProps {
  githubUrl: string;
  className?: string;
}

export function GitHubStats({ githubUrl, className = '' }: GitHubStatsProps) {
  const [stats, setStats] = useState<GitHubStatsType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchGitHubStats = async () => {
      try {
        // Extract owner and repo from GitHub URL
        const match = githubUrl.match(/github\.com\/([^\/]+)\/([^\/]+)/);
        if (!match) {
          setError(true);
          setLoading(false);
          return;
        }

        const [, , repo] = match;
        
        // Simulate API call with mock data for now
        // In a real implementation, you would call the GitHub API
        // const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`);
        
        // For demo purposes, we'll use mock data based on the repo name
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
        
        const mockStats: GitHubStatsType = {
          stars: Math.floor(Math.random() * 1000) + 100,
          forks: Math.floor(Math.random() * 200) + 20,
          watchers: Math.floor(Math.random() * 100) + 10,
          language: getLanguageByRepo(repo),
          lastUpdate: new Date().toISOString().split('T')[0],
          openIssues: Math.floor(Math.random() * 20),
        };

        setStats(mockStats);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubStats();
  }, [githubUrl]);

  if (loading) {
    return (
      <Card className={`p-6 ${className}`}>
        <div className="flex items-center justify-center">
          <LoadingSpinner size="sm" />
          <Text className="ml-2 text-secondary-600 dark:text-secondary-400">
            Loading GitHub stats...
          </Text>
        </div>
      </Card>
    );
  }

  if (error || !stats) {
    return (
      <Card className={`p-6 ${className}`}>
        <Text className="text-secondary-600 dark:text-secondary-400 text-center">
          Unable to load GitHub stats
        </Text>
      </Card>
    );
  }

  return (
    <Card className={`p-6 ${className}`}>
      <div className="flex items-center mb-4">
        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
        <Heading as="h3" className="font-semibold text-secondary-900 dark:text-secondary-100">
          GitHub Stats
        </Heading>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
            {stats.stars.toLocaleString()}
          </div>
          <Text className="text-xs text-secondary-600 dark:text-secondary-400">Stars</Text>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {stats.forks.toLocaleString()}
          </div>
          <Text className="text-xs text-secondary-600 dark:text-secondary-400">Forks</Text>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            {stats.watchers.toLocaleString()}
          </div>
          <Text className="text-xs text-secondary-600 dark:text-secondary-400">Watchers</Text>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-red-600 dark:text-red-400">
            {stats.openIssues}
          </div>
          <Text className="text-xs text-secondary-600 dark:text-secondary-400">Issues</Text>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-secondary-200 dark:border-secondary-700">
        <div className="flex justify-between items-center text-sm">
          <Text className="text-secondary-600 dark:text-secondary-400">Language:</Text>
          <Text className="font-medium text-secondary-900 dark:text-secondary-100">{stats.language}</Text>
        </div>
        <div className="flex justify-between items-center text-sm mt-2">
          <Text className="text-secondary-600 dark:text-secondary-400">Updated:</Text>
          <Text className="font-medium text-secondary-900 dark:text-secondary-100">{stats.lastUpdate}</Text>
        </div>
      </div>
    </Card>
  );
}

function getLanguageByRepo(repo: string): string {
  const repoLower = repo.toLowerCase();
  
  if (repoLower.includes('enterprise') || repoLower.includes('ecommerce')) {
    return 'TypeScript';
  }
  if (repoLower.includes('collaboration') || repoLower.includes('suite')) {
    return 'JavaScript';
  }
  if (repoLower.includes('ai') || repoLower.includes('weather') || repoLower.includes('ml')) {
    return 'Python';
  }
  if (repoLower.includes('fintech') || repoLower.includes('dashboard')) {
    return 'TypeScript';
  }
  if (repoLower.includes('ui') || repoLower.includes('component')) {
    return 'TypeScript';
  }
  
  return 'TypeScript'; // Default
}