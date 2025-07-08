'use client';

import { BlogPost } from '@/types/blog';
import { Typography } from '@/components/ui/Typography';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { MotionDiv } from '@/components/ui/MotionComponents';
import { SocialShare } from './SocialShare';
import { RelatedPosts } from './RelatedPosts';
import { TableOfContents } from './TableOfContents';
import { useBlogAnalytics } from '@/hooks/useBlogAnalytics';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, Tag, User } from 'lucide-react';

interface BlogPostLayoutProps {
  post: BlogPost;
  relatedPosts?: BlogPost[];
  toc?: Array<{level: number, text: string, id: string}>;
}

export function BlogPostLayout({ post, relatedPosts, toc = [] }: BlogPostLayoutProps) {
  useBlogAnalytics({
    slug: post.slug,
    title: post.title,
    category: post.category,
    tags: post.tags,
    readingTime: post.readingTime,
  });

  return (
    <Container>
      <div className="max-w-6xl mx-auto">
        <div className="lg:flex lg:gap-8">
          <div className="lg:w-3/4">
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link href="/blog" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-8">
                <ArrowLeft size={16} />
                Back to Blog
              </Link>

              <article className="prose prose-lg max-w-none">
            <header className="mb-8">
              <Typography variant="h1" className="mb-4">
                {post.title}
              </Typography>
              
              <Typography variant="body" className="text-gray-600 dark:text-gray-400 mb-6">
                {post.description}
              </Typography>

              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <User size={16} />
                  {post.author}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar size={16} />
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={16} />
                  {post.readingTime}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/blog?tag=${encodeURIComponent(tag)}`}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm hover:bg-blue-200 transition-colors"
                  >
                    <Tag size={12} />
                    {tag}
                  </Link>
                ))}
              </div>
            </header>

            <div className="mb-8">
              <SocialShare
                title={post.title}
                description={post.description}
                url={`/blog/${post.slug}`}
              />
            </div>

            <Card className="p-8 mb-8">
              <div className="prose prose-lg max-w-none dark:prose-invert">
                {typeof post.content === 'string' ? (
                  <div dangerouslySetInnerHTML={{ __html: post.content }} />
                ) : (
                  post.content
                )}
              </div>
            </Card>

            <footer className="mt-12">
              <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
                <SocialShare
                  title={post.title}
                  description={post.description}
                  url={`/blog/${post.slug}`}
                />
              </div>
            </footer>
          </article>
            </MotionDiv>

            {relatedPosts && relatedPosts.length > 0 && (
              <div className="mt-16">
                <RelatedPosts posts={relatedPosts} />
              </div>
            )}
          </div>

          <div className="lg:w-1/4 mt-8 lg:mt-0">
            <div className="sticky top-8 space-y-6">
              <TableOfContents toc={toc} />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}