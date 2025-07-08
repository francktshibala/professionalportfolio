import { getBlogPost, getAllBlogPosts, getRelatedPosts } from '@/lib/blog';
import { BlogPostLayout } from '@/components/blog/BlogPostLayout';
import { mdxComponents } from '@/components/mdx/MDXComponents';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';

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

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getBlogPost(params.slug);
  
  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedPosts(post.slug, post.tags, 3);

  const mdxContent = <MDXRemote source={post.content as string} components={mdxComponents} />;

  return (
    <BlogPostLayout
      post={{
        ...post,
        content: mdxContent,
      }}
      relatedPosts={relatedPosts}
    />
  );
}