'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Typography } from '@/components/ui/Typography';
import { ChevronDown, ChevronRight, Calendar, Archive } from 'lucide-react';
import Link from 'next/link';
import { BlogPost } from '@/types/blog';

interface ArchiveEntry {
  year: number;
  month: number;
  count: number;
  posts: BlogPost[];
}

interface BlogArchiveProps {
  archive: ArchiveEntry[];
  className?: string;
}

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export function BlogArchive({ archive, className = '' }: BlogArchiveProps) {
  const [expandedEntries, setExpandedEntries] = useState<Set<string>>(new Set());
  
  const toggleExpanded = (key: string) => {
    const newExpanded = new Set(expandedEntries);
    if (newExpanded.has(key)) {
      newExpanded.delete(key);
    } else {
      newExpanded.add(key);
    }
    setExpandedEntries(newExpanded);
  };

  if (archive.length === 0) return null;

  return (
    <Card className={`p-6 ${className}`}>
      <div className="flex items-center gap-2 mb-4">
        <Archive size={20} />
        <Typography variant="h3" className="text-lg font-semibold">
          Archive
        </Typography>
      </div>
      
      <div className="space-y-2">
        {archive.map((entry) => {
          const key = `${entry.year}-${entry.month}`;
          const isExpanded = expandedEntries.has(key);
          
          return (
            <div key={key} className="border-l-2 border-gray-200 dark:border-gray-700 pl-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleExpanded(key)}
                className="w-full justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  <span className="font-medium">
                    {MONTH_NAMES[entry.month]} {entry.year}
                  </span>
                  <span className="text-xs bg-gray-200 dark:bg-gray-700 rounded-full px-2 py-0.5">
                    {entry.count}
                  </span>
                </div>
                {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </Button>
              
              {isExpanded && (
                <div className="mt-2 ml-4 space-y-1">
                  {entry.posts.map((post) => (
                    <Link
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      className="block p-2 rounded hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {post.title}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(post.date).toLocaleDateString()} • {post.readingTime}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
}