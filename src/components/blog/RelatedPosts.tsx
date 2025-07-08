'use client';

import { BlogPost } from '@/types/blog';
import { Typography } from '@/components/ui/Typography';
import { BlogCard } from './BlogCard';

interface RelatedPostsProps {
  posts: BlogPost[];
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) {
    return null;
  }

  return (
    <section>
      <Typography variant="h2" className="mb-8 text-center">
        Related Posts
      </Typography>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post, index) => (
          <BlogCard key={post.slug} post={post} index={index} />
        ))}
      </div>
    </section>
  );
}