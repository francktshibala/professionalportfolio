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

export async function getRelatedPosts(currentSlug: string, tags: string[], category: string, limit: number = 3): Promise<BlogPost[]> {
  const posts = await getAllBlogPosts();
  
  const scoredPosts = posts
    .filter(post => post.slug !== currentSlug)
    .map(post => {
      let score = 0;
      
      const sharedTags = post.tags.filter(tag => tags.includes(tag));
      score += sharedTags.length * 3;
      
      if (post.category === category) {
        score += 2;
      }
      
      const daysDiff = Math.abs(new Date(post.date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24);
      if (daysDiff < 30) score += 1;
      
      return { ...post, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  if (scoredPosts.length < limit) {
    const additionalPosts = posts
      .filter(post => post.slug !== currentSlug)
      .filter(post => !scoredPosts.some(related => related.slug === post.slug))
      .slice(0, limit - scoredPosts.length);
    
    scoredPosts.push(...additionalPosts.map(post => ({ ...post, score: 0 })));
  }

  return scoredPosts.map(({ score, ...post }) => post);
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

export async function getTagsWithCounts(): Promise<Array<{tag: string, count: number}>> {
  const posts = await getAllBlogPosts();
  const tagCounts = new Map<string, number>();
  
  posts.forEach(post => {
    post.tags.forEach(tag => {
      tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
    });
  });
  
  return Array.from(tagCounts.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}

export async function getCategoriesWithCounts(): Promise<Array<{category: string, count: number}>> {
  const posts = await getAllBlogPosts();
  const categoryCounts = new Map<string, number>();
  
  posts.forEach(post => {
    categoryCounts.set(post.category, (categoryCounts.get(post.category) || 0) + 1);
  });
  
  return Array.from(categoryCounts.entries())
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => b.count - a.count);
}

export async function getArchiveByDate(): Promise<Array<{year: number, month: number, count: number, posts: BlogPost[]}>> {
  const posts = await getAllBlogPosts();
  const archive = new Map<string, {year: number, month: number, count: number, posts: BlogPost[]}>();
  
  posts.forEach(post => {
    const date = new Date(post.date);
    const year = date.getFullYear();
    const month = date.getMonth();
    const key = `${year}-${month}`;
    
    if (!archive.has(key)) {
      archive.set(key, { year, month, count: 0, posts: [] });
    }
    
    const entry = archive.get(key)!;
    entry.count++;
    entry.posts.push(post);
  });
  
  return Array.from(archive.values())
    .sort((a, b) => b.year - a.year || b.month - a.month);
}

export async function getPopularPosts(limit: number = 5): Promise<BlogPost[]> {
  const posts = await getAllBlogPosts();
  return posts
    .filter(post => post.tags.length > 0)
    .sort((a, b) => b.tags.length - a.tags.length)
    .slice(0, limit);
}

export async function searchBlogContent(query: string): Promise<BlogPost[]> {
  const posts = await getAllBlogPosts();
  const searchTerm = query.toLowerCase();
  
  return posts.filter(post => {
    const contentMatch = post.content.toLowerCase().includes(searchTerm);
    const titleMatch = post.title.toLowerCase().includes(searchTerm);
    const descriptionMatch = post.description.toLowerCase().includes(searchTerm);
    const tagMatch = post.tags.some(tag => tag.toLowerCase().includes(searchTerm));
    const categoryMatch = post.category.toLowerCase().includes(searchTerm);
    
    return contentMatch || titleMatch || descriptionMatch || tagMatch || categoryMatch;
  });
}

export function generateTableOfContents(content: string): Array<{level: number, text: string, id: string}> {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const toc: Array<{level: number, text: string, id: string}> = [];
  let match;
  
  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    
    toc.push({ level, text, id });
  }
  
  return toc;
}