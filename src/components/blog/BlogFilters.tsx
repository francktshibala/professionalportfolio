'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Search, Filter, X } from 'lucide-react';

interface BlogFiltersProps {
  tags: string[];
  categories: string[];
  currentTag?: string;
  currentCategory?: string;
  currentSearch?: string;
  onTagChange: (tag: string | undefined) => void;
  onCategoryChange: (category: string | undefined) => void;
  onSearchChange: (search: string) => void;
}

export function BlogFilters({
  tags,
  categories,
  currentTag,
  currentCategory,
  currentSearch,
  onTagChange,
  onCategoryChange,
  onSearchChange,
}: BlogFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchInput, setSearchInput] = useState(currentSearch || '');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchChange(searchInput);
  };

  const clearFilters = () => {
    onTagChange(undefined);
    onCategoryChange(undefined);
    onSearchChange('');
    setSearchInput('');
  };

  const hasActiveFilters = currentTag || currentCategory || currentSearch;

  return (
    <Card className="p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Filter size={20} />
          <h3 className="font-semibold">Filters</h3>
        </div>
        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-red-600 hover:text-red-700"
            >
              <X size={16} />
              Clear All
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden"
          >
            {isOpen ? 'Hide' : 'Show'} Filters
          </Button>
        </div>
      </div>

      <div className={`space-y-6 ${isOpen ? 'block' : 'hidden'} md:block`}>
        <form onSubmit={handleSearchSubmit} className="flex gap-2">
          <div className="flex-1 relative">
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search posts..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
            />
          </div>
          <Button type="submit" variant="primary" size="sm">
            Search
          </Button>
        </form>

        <div>
          <h4 className="font-medium mb-3">Categories</h4>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={currentCategory === category ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => onCategoryChange(currentCategory === category ? undefined : category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-3">Tags</h4>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Button
                key={tag}
                variant={currentTag === tag ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => onTagChange(currentTag === tag ? undefined : tag)}
              >
                {tag}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}