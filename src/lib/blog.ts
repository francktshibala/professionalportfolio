import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { BlogPost, BlogMetadata, PaginatedBlogPosts, BlogFilterOptions } from '@/types/blog';

const BLOG_DIRECTORY = path.join(process.cwd(), 'src/content/blog');
const POSTS_PER_PAGE = 6;

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  if (!fs.existsSync(BLOG_DIRECTORY)) {
    return [];
  }

  const files = fs.readdirSync(BLOG_DIRECTORY);
  const posts: BlogPost[] = [];

  for (const file of files) {
    if (file.endsWith('.mdx')) {
      const post = await getBlogPost(file.replace('.mdx', ''));
      if (post && post.published) {
        posts.push(post);
      }
    }
  }

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const filePath = path.join(BLOG_DIRECTORY, `${slug}.mdx`);
  
  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContent);
  const readingTimeResult = readingTime(content);

  const metadata = data as BlogMetadata;

  return {
    slug,
    title: metadata.title,
    description: metadata.description,
    date: metadata.date,
    author: metadata.author,
    tags: metadata.tags || [],
    category: metadata.category,
    readingTime: readingTimeResult.text,
    published: metadata.published ?? true,
    content,
    image: metadata.image,
    featured: metadata.featured,
  };
}

export async function getPaginatedBlogPosts(
  page: number = 1,
  filters: BlogFilterOptions = {}
): Promise<PaginatedBlogPosts> {
  let posts = await getAllBlogPosts();

  if (filters.tag) {
    posts = posts.filter(post => post.tags.includes(filters.tag!));
  }

  if (filters.category) {
    posts = posts.filter(post => post.category === filters.category);
  }

  if (filters.search) {
    const searchTerm = filters.search.toLowerCase();
    posts = posts.filter(post => 
      post.title.toLowerCase().includes(searchTerm) ||
      post.description.toLowerCase().includes(searchTerm) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
  }

  const totalPosts = posts.length;
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);
  const startIndex = (page - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const paginatedPosts = posts.slice(startIndex, endIndex);

  return {
    posts: paginatedPosts,
    totalPages,
    currentPage: page,
    totalPosts,
  };
}

export async function getFeaturedBlogPosts(): Promise<BlogPost[]> {
  const posts = await getAllBlogPosts();
  return posts.filter(post => post.featured).slice(0, 3);
}

export async function getRelatedPosts(currentSlug: string, tags: string[], limit: number = 3): Promise<BlogPost[]> {
  const posts = await getAllBlogPosts();
  
  const relatedPosts = posts
    .filter(post => post.slug !== currentSlug)
    .filter(post => post.tags.some(tag => tags.includes(tag)))
    .slice(0, limit);

  if (relatedPosts.length < limit) {
    const additionalPosts = posts
      .filter(post => post.slug !== currentSlug)
      .filter(post => !relatedPosts.some(related => related.slug === post.slug))
      .slice(0, limit - relatedPosts.length);
    
    relatedPosts.push(...additionalPosts);
  }

  return relatedPosts;
}

export function getAllTags(): Promise<string[]> {
  return getAllBlogPosts().then(posts => {
    const tags = new Set<string>();
    posts.forEach(post => {
      post.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
  });
}

export function getAllCategories(): Promise<string[]> {
  return getAllBlogPosts().then(posts => {
    const categories = new Set<string>();
    posts.forEach(post => {
      categories.add(post.category);
    });
    return Array.from(categories).sort();
  });
}