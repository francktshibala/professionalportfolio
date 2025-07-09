import { NextRequest, NextResponse } from 'next/server';
import { searchProjects } from '@/lib/projects';
import { getAllBlogPosts } from '@/lib/blog';
import { StaticProject } from '@/types';
import { BlogPost } from '@/types/blog';

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
    const searchResults: { projects: StaticProject[], blogPosts: BlogPost[] } = { projects: [], blogPosts: [] };

    // Search projects
    if (type === 'all' || type === 'projects') {
      let projects = searchProjects(query);
      
      // Filter by technology
      if (technology) {
        projects = projects.filter(project =>
          project.technologies.some(tech => 
            tech.name.toLowerCase().includes(technology.toLowerCase())
          )
        );
      }
      
      // Filter by category
      if (category) {
        projects = projects.filter(project =>
          project.category.toLowerCase().includes(category.toLowerCase())
        );
      }
      
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