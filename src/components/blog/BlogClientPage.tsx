'use client';

import { useRouter } from 'next/navigation';
import { Typography } from '@/components/ui/Typography';
import { BlogCard } from '@/components/blog/BlogCard';
import { BlogFilters } from '@/components/blog/BlogFilters';
import { Pagination } from '@/components/blog/Pagination';
import { PaginatedBlogPosts } from '@/types/blog';

interface BlogClientPageProps {
  initialPosts: PaginatedBlogPosts;
  tags: Array<{tag: string, count: number}>;
  categories: Array<{category: string, count: number}>;
  currentPage: number;
  currentTag?: string;
  currentCategory?: string;
  currentSearch?: string;
}

export function BlogClientPage({
  initialPosts,
  tags,
  categories,
  currentTag,
  currentCategory,
  currentSearch,
}: BlogClientPageProps) {
  const router = useRouter();

  const updateURL = (params: Record<string, string | undefined>) => {
    const newParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        newParams.set(key, value);
      }
    });

    const newURL = newParams.toString() ? `?${newParams.toString()}` : '/blog';
    router.push(newURL);
  };

  const handleTagChange = (tag: string | undefined) => {
    updateURL({
      tag,
      category: currentCategory,
      search: currentSearch,
      page: '1',
    });
  };

  const handleCategoryChange = (category: string | undefined) => {
    updateURL({
      tag: currentTag,
      category,
      search: currentSearch,
      page: '1',
    });
  };

  const handleSearchChange = (search: string) => {
    updateURL({
      tag: currentTag,
      category: currentCategory,
      search: search || undefined,
      page: '1',
    });
  };

  const handlePageChange = (page: number) => {
    updateURL({
      tag: currentTag,
      category: currentCategory,
      search: currentSearch,
      page: page.toString(),
    });
  };

  return (
    <>
      <BlogFilters
        tags={tags}
        categories={categories}
        currentTag={currentTag}
        currentCategory={currentCategory}
        currentSearch={currentSearch}
        onTagChange={handleTagChange}
        onCategoryChange={handleCategoryChange}
        onSearchChange={handleSearchChange}
      />

      {initialPosts.posts.length === 0 ? (
        <div className="text-center py-12">
          <Typography variant="h3" className="mb-4">
            No posts found
          </Typography>
          <Typography variant="body" className="text-gray-600 dark:text-gray-400">
            Try adjusting your filters or search terms.
          </Typography>
        </div>
      ) : (
        <>
          <div className="mb-8">
            <Typography variant="small" className="text-gray-600 dark:text-gray-400">
              Showing {initialPosts.posts.length} of {initialPosts.totalPosts} posts
            </Typography>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {initialPosts.posts.map((post, index) => (
              <BlogCard key={post.slug} post={post} index={index} />
            ))}
          </div>

          <Pagination
            currentPage={initialPosts.currentPage}
            totalPages={initialPosts.totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </>
  );
}