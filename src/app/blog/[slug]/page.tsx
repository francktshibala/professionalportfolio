import { getBlogPost, getAllBlogPosts, getRelatedPosts } from '@/lib/blog';
import { BlogPostLayout } from '@/components/blog/BlogPostLayout';
import { mdxComponents } from '@/components/mdx/MDXComponents';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import { BlogPostingSchema } from '@/components/seo/StructuredData';
import { createMetadata } from '@/lib/metadata';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const posts = await getAllBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const post = await getBlogPost(params.slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return createMetadata({
    title: post.title,
    description: post.description,
    url: `/blog/${post.slug}`,
    type: 'article',
    publishedTime: post.date,
    modifiedTime: post.date,
    tags: post.tags,
    author: post.author,
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getBlogPost(params.slug);
  
  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedPosts(post.slug, post.tags, post.category, 3);

  const mdxContent = <MDXRemote source={post.content as string} components={mdxComponents} />;

  return (
    <>
      <BlogPostingSchema
        title={post.title}
        description={post.description}
        datePublished={post.date}
        authorName={post.author}
        url={`https://portfolio-4u8c.vercel.app/blog/${post.slug}`}
        tags={post.tags}
        readingTime={post.readingTime}
      />
      <BlogPostLayout
        post={{
          ...post,
          content: mdxContent,
        }}
        relatedPosts={relatedPosts}
      />
    </>
  );
}