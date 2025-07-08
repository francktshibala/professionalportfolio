'use client';

import { BlogPost } from '@/types/blog';
import { Card } from '@/components/ui/Card';
import { Typography } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { MotionDiv } from '@/components/ui/MotionComponents';
import Link from 'next/link';
import { Calendar, Clock, Tag, User } from 'lucide-react';

interface BlogCardProps {
  post: BlogPost;
  index?: number;
}

export function BlogCard({ post, index = 0 }: BlogCardProps) {
  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
        <div className="p-6 flex-1">
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-3">
            <Calendar size={14} />
            {new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })}
            <span className="mx-2">•</span>
            <Clock size={14} />
            {post.readingTime}
          </div>

          <Typography variant="h3" className="mb-3 line-clamp-2">
            {post.title}
          </Typography>

          <Typography variant="body" className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
            {post.description}
          </Typography>

          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs"
              >
                <Tag size={10} />
                {tag}
              </span>
            ))}
            {post.tags.length > 3 && (
              <span className="text-xs text-gray-500">
                +{post.tags.length - 3} more
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
            <User size={14} />
            {post.author}
            <span className="mx-2">•</span>
            <span className="text-blue-600 dark:text-blue-400">{post.category}</span>
          </div>
        </div>

        <div className="p-6 pt-0">
          <Link href={`/blog/${post.slug}`}>
            <Button variant="primary" size="sm" className="w-full">
              Read More
            </Button>
          </Link>
        </div>
      </Card>
    </MotionDiv>
  );
}