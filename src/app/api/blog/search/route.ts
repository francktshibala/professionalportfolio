import { NextRequest, NextResponse } from 'next/server';
import { searchBlogContent } from '@/lib/blog';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q');
  
  if (!query) {
    return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
  }

  try {
    const results = await searchBlogContent(query);
    
    return NextResponse.json({
      results: results.map(post => ({
        slug: post.slug,
        title: post.title,
        description: post.description,
        category: post.category,
        tags: post.tags,
        date: post.date,
        author: post.author,
        readingTime: post.readingTime,
      })),
      total: results.length,
    });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json({ error: 'Search failed' }, { status: 500 });
  }
}