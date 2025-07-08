'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { List, ChevronRight, ChevronDown } from 'lucide-react';

interface TocItem {
  level: number;
  text: string;
  id: string;
}

interface TableOfContentsProps {
  toc: TocItem[];
  className?: string;
}

export function TableOfContents({ toc, className = '' }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);
        if (visibleEntries.length > 0) {
          setActiveId(visibleEntries[0].target.id);
        }
      },
      { rootMargin: '-20% 0px -80% 0px' }
    );

    const headings = toc.map((item) => document.getElementById(item.id)).filter(Boolean);
    headings.forEach((heading) => {
      if (heading) observer.observe(heading);
    });

    return () => observer.disconnect();
  }, [toc]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (toc.length === 0) return null;

  return (
    <Card className={`p-4 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <List size={16} />
          <h3 className="font-semibold text-sm">Table of Contents</h3>
        </div>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
        >
          {isCollapsed ? <ChevronRight size={16} /> : <ChevronDown size={16} />}
        </button>
      </div>
      
      {!isCollapsed && (
        <nav className="space-y-1">
          {toc.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToHeading(item.id)}
              className={`block w-full text-left px-2 py-1 rounded text-sm transition-colors ${
                activeId === item.id
                  ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                  : 'text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800'
              }`}
              style={{ paddingLeft: `${(item.level - 1) * 12 + 8}px` }}
            >
              {item.text}
            </button>
          ))}
        </nav>
      )}
    </Card>
  );
}