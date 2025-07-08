'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { projects, technologies } from '@/lib/projects';
import { BlogPost } from '@/types/blog';
import { Project } from '@/types';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

type SearchResults = {
  projects: Project[];
  blogPosts: BlogPost[];
};

// Utility function to highlight search terms
const highlightText = (text: string, query: string) => {
  if (!query.trim()) return text;
  
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  return text.replace(regex, '<mark class="bg-yellow-200 px-1 rounded">$1</mark>');
};

// Search Result Card with highlighting
const SearchResultCard = ({ project, query }: { project: Project; query: string }) => {
  return (
    <Card className="p-6 hover:shadow-lg transition-shadow">
      <div className="space-y-4">
        <div>
          <h3 
            className="text-xl font-semibold mb-2"
            dangerouslySetInnerHTML={{ __html: highlightText(project.title, query) }}
          />
          <p 
            className="text-muted-foreground"
            dangerouslySetInnerHTML={{ __html: highlightText(project.shortDescription, query) }}
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span
              key={tech.name}
              className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
              dangerouslySetInnerHTML={{ __html: highlightText(tech.name, query) }}
            />
          ))}
        </div>
        
        <div className="flex gap-2">
          <Button size="sm" variant="outline">
            <a href={`/projects/${project.id}`} className="block">
              View Project
            </a>
          </Button>
          {project.demoUrl && (
            <Button size="sm" variant="outline">
              <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                Demo
              </a>
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

// Blog Search Result Card with highlighting
const BlogSearchResultCard = ({ post, query }: { post: BlogPost; query: string }) => {
  return (
    <Card className="p-6 hover:shadow-lg transition-shadow">
      <div className="space-y-4">
        <div>
          <h3 
            className="text-xl font-semibold mb-2"
            dangerouslySetInnerHTML={{ __html: highlightText(post.title, query) }}
          />
          <p 
            className="text-muted-foreground"
            dangerouslySetInnerHTML={{ __html: highlightText(post.description, query) }}
          />
        </div>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span>{post.date}</span>
          <span>•</span>
          <span>{post.readingTime}</span>
          <span>•</span>
          <span className="bg-gray-100 px-2 py-1 rounded">
            {post.category}
          </span>
        </div>
        
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                dangerouslySetInnerHTML={{ __html: highlightText(tag, query) }}
              />
            ))}
          </div>
        )}
        
        <div>
          <Button size="sm" variant="outline">
            <a href={`/blog/${post.slug}`} className="block">
              Read More
            </a>
          </Button>
        </div>
      </div>
    </Card>
  );
};

export function SearchContent() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [results, setResults] = useState<SearchResults>({ projects: [], blogPosts: [] });
  const [loading, setLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'all' | 'projects' | 'blog'>('all');
  const [technologyFilter, setTechnologyFilter] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('');

  // Search function using API
  const performSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults({ projects: [], blogPosts: [] });
      return;
    }

    setLoading(true);
    try {
      const params = new URLSearchParams({
        q: searchQuery,
        ...(technologyFilter && { technology: technologyFilter }),
        ...(categoryFilter && { category: categoryFilter }),
      });
      
      const response = await fetch(`/api/search?${params}`);
      if (response.ok) {
        const data = await response.json();
        setResults(data);
      }
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  }, [technologyFilter, categoryFilter]);

  // Update results when query or filters change
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (query) {
        performSearch(query);
      } else {
        setResults({ projects: [], blogPosts: [] });
      }
    }, 300); // 300ms debounce

    return () => clearTimeout(timeoutId);
  }, [query, technologyFilter, categoryFilter, performSearch]);

  // Handle search input
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      performSearch(query);
    }
  };

  // Filter results based on active filter
  const filteredResults = useMemo(() => {
    switch (activeFilter) {
      case 'projects':
        return { projects: results.projects, blogPosts: [] };
      case 'blog':
        return { projects: [], blogPosts: results.blogPosts };
      default:
        return results;
    }
  }, [results, activeFilter]);

  const totalResults = filteredResults.projects.length + filteredResults.blogPosts.length;

  return (
    <div className="space-y-8">
      {/* Search Form */}
      <form onSubmit={handleSearch} className="flex gap-4">
        <div className="flex-1">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects, blog posts, technologies..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </Button>
      </form>

      {/* Advanced Filters */}
      <div className="flex flex-wrap gap-4 p-4 bg-gray-50 rounded-lg">
        <div className="flex-1 min-w-48">
          <label className="block text-sm font-medium mb-2">Technology</label>
          <select
            value={technologyFilter}
            onChange={(e) => setTechnologyFilter(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Technologies</option>
            {technologies.map((tech) => (
              <option key={tech.name} value={tech.name}>
                {tech.name}
              </option>
            ))}
          </select>
        </div>
        
        <div className="flex-1 min-w-48">
          <label className="block text-sm font-medium mb-2">Category</label>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Categories</option>
            <option value="e-commerce">E-commerce</option>
            <option value="web-app">Web Application</option>
            <option value="ai-ml">AI/ML</option>
            <option value="dashboard">Dashboard</option>
            <option value="open-source">Open Source</option>
            <option value="technology">Technology</option>
            <option value="tutorial">Tutorial</option>
            <option value="web-development">Web Development</option>
          </select>
        </div>
        
        <div className="flex items-end">
          <Button
            variant="outline"
            onClick={() => {
              setTechnologyFilter('');
              setCategoryFilter('');
            }}
            size="sm"
          >
            Clear Filters
          </Button>
        </div>
      </div>

      {/* Content Type Filters */}
      {query && (
        <div className="flex gap-2 flex-wrap">
          <Button
            variant={activeFilter === 'all' ? 'primary' : 'outline'}
            onClick={() => setActiveFilter('all')}
            size="sm"
          >
            All ({results.projects.length + results.blogPosts.length})
          </Button>
          <Button
            variant={activeFilter === 'projects' ? 'primary' : 'outline'}
            onClick={() => setActiveFilter('projects')}
            size="sm"
          >
            Projects ({results.projects.length})
          </Button>
          <Button
            variant={activeFilter === 'blog' ? 'primary' : 'outline'}
            onClick={() => setActiveFilter('blog')}
            size="sm"
          >
            Blog ({results.blogPosts.length})
          </Button>
        </div>
      )}

      {/* Results */}
      {query && (
        <div className="space-y-8">
          {totalResults === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground">
                No results found for &quot;{query}&quot;. Try different keywords or check your spelling.
              </p>
            </Card>
          ) : (
            <>
              {/* Projects Results */}
              {filteredResults.projects.length > 0 && (
                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold">
                    Projects ({filteredResults.projects.length})
                  </h2>
                  <div className="grid gap-6 md:grid-cols-2">
                    {filteredResults.projects.map((project) => (
                      <SearchResultCard key={project.id} project={project} query={query} />
                    ))}
                  </div>
                </div>
              )}

              {/* Blog Results */}
              {filteredResults.blogPosts.length > 0 && (
                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold">
                    Blog Posts ({filteredResults.blogPosts.length})
                  </h2>
                  <div className="grid gap-6 md:grid-cols-2">
                    {filteredResults.blogPosts.map((post) => (
                      <BlogSearchResultCard key={post.slug} post={post} query={query} />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* Default state - show some featured content */}
      {!query && (
        <div className="space-y-8">
          <Card className="p-8 text-center">
            <p className="text-muted-foreground text-lg">
              Start typing to search across all projects, blog posts, and skills.
            </p>
          </Card>
          
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Featured Projects</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {projects.filter(p => p.featured).slice(0, 4).map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}