import { NextRequest, NextResponse } from 'next/server'
import { BlogService } from '@/lib/services/blog'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const published = searchParams.get('published')
    const featured = searchParams.get('featured')
    const limit = searchParams.get('limit')
    const skip = searchParams.get('skip')
    const category = searchParams.get('category')
    const search = searchParams.get('search')

    let posts

    if (search) {
      posts = await BlogService.searchPosts(search, limit ? parseInt(limit) : 10)
    } else if (category) {
      posts = await BlogService.getPostsByCategory(category, limit ? parseInt(limit) : undefined)
    } else {
      posts = await BlogService.getAllPosts({
        published: published !== 'false',
        featured: featured === 'true',
        limit: limit ? parseInt(limit) : undefined,
        skip: skip ? parseInt(skip) : undefined
      })
    }

    return NextResponse.json({
      success: true,
      data: posts,
      count: posts.length
    })
  } catch (error) {
    console.error('Posts API GET error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch posts' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const apiKey = request.headers.get('x-api-key')
    if (!apiKey || apiKey !== process.env.ADMIN_API_KEY) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const {
      title,
      slug,
      excerpt,
      content,
      published,
      publishedAt,
      readTime,
      tags,
      featured,
      authorId,
      categoryIds
    } = body

    if (!title || !slug || !content || !authorId) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: title, slug, content, authorId' },
        { status: 400 }
      )
    }

    const post = await db.post.create({
      data: {
        title,
        slug,
        excerpt,
        content,
        published: published || false,
        publishedAt: publishedAt ? new Date(publishedAt) : (published ? new Date() : null),
        readTime,
        tags: tags || [],
        featured: featured || false,
        authorId,
        categories: categoryIds ? {
          connect: categoryIds.map((id: string) => ({ id }))
        } : undefined
      },
      include: {
        categories: true,
        author: true
      }
    })

    return NextResponse.json({
      success: true,
      data: post
    }, { status: 201 })
  } catch (error) {
    console.error('Posts API POST error:', error)
    if (error instanceof Error && error.message.includes('Unique constraint')) {
      return NextResponse.json(
        { success: false, error: 'Post with this slug already exists' },
        { status: 409 }
      )
    }
    return NextResponse.json(
      { success: false, error: 'Failed to create post' },
      { status: 500 }
    )
  }
}