import { NextRequest, NextResponse } from 'next/server';
import { getAllBlogPosts } from '@/lib/blog';
import { Project } from '@/types';
import { BlogPost } from '@/types/blog';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    const type = searchParams.get('type') || 'all';
    const technology = searchParams.get('technology');
    const category = searchParams.get('category');

    if (!query) {
      return NextResponse.json({ projects: [], blogPosts: [] });
    }

    const searchTerm = query.toLowerCase();
    const searchResults: { projects: Project[], blogPosts: BlogPost[] } = { projects: [], blogPosts: [] };

    // Search projects
    if (type === 'all' || type === 'projects') {
      const whereClause: {
        OR?: Array<{
          title?: { contains: string; mode: 'insensitive' };
          description?: { contains: string; mode: 'insensitive' };
          longDescription?: { contains: string; mode: 'insensitive' };
          technologies?: { hasSome: string[] };
        }>;
        technologies?: { hasSome: string[] };
        categories?: {
          some: {
            name: { contains: string; mode: 'insensitive' };
          };
        };
      } = {
        OR: [
          { title: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
          { longDescription: { contains: query, mode: 'insensitive' } },
          { technologies: { hasSome: [query] } }
        ]
      };
      
      // Filter by technology
      if (technology) {
        whereClause.technologies = { hasSome: [technology] };
      }
      
      // Filter by category
      if (category) {
        whereClause.categories = {
          some: {
            name: { contains: category, mode: 'insensitive' }
          }
        };
      }
      
      const projects = await db.project.findMany({
        where: whereClause,
        include: {
          categories: true,
          author: {
            select: {
              id: true,
              name: true,
              email: true
            }
          }
        },
        orderBy: { updatedAt: 'desc' }
      });
      
      searchResults.projects = projects;
    }

    // Search blog posts
    if (type === 'all' || type === 'blog') {
      const allBlogPosts = await getAllBlogPosts();
      let blogPosts = allBlogPosts.filter(post =>
        post.title.toLowerCase().includes(searchTerm) ||
        post.description.toLowerCase().includes(searchTerm) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
        post.category.toLowerCase().includes(searchTerm)
      );
      
      // Filter by category
      if (category) {
        blogPosts = blogPosts.filter(post =>
          post.category.toLowerCase().includes(category.toLowerCase())
        );
      }
      
      searchResults.blogPosts = blogPosts;
    }

    return NextResponse.json(searchResults);
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}