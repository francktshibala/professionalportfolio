import { NextRequest, NextResponse } from 'next/server';
import { getPopularPosts } from '@/lib/blog';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const limit = parseInt(searchParams.get('limit') || '5');
  
  try {
    const posts = await getPopularPosts(limit);
    
    return NextResponse.json({
      posts: posts.map(post => ({
        slug: post.slug,
        title: post.title,
        description: post.description,
        category: post.category,
        tags: post.tags,
        date: post.date,
        author: post.author,
        readingTime: post.readingTime,
      })),
      total: posts.length,
    });
  } catch (error) {
    console.error('Popular posts error:', error);
    return NextResponse.json({ error: 'Failed to fetch popular posts' }, { status: 500 });
  }
}