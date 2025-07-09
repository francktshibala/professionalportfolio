import { NextRequest, NextResponse } from 'next/server'
import { BlogService } from '@/lib/services/blog'
import { db } from '@/lib/db'

export async function POST(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const post = await db.post.findUnique({
      where: { slug: params.slug }
    })

    if (!post) {
      return NextResponse.json(
        { success: false, error: 'Post not found' },
        { status: 404 }
      )
    }

    await BlogService.incrementLikes(post.id)

    const updatedPost = await db.post.findUnique({
      where: { slug: params.slug },
      select: { likes: true }
    })

    return NextResponse.json({
      success: true,
      data: { likes: updatedPost?.likes }
    })
  } catch (error) {
    console.error('Post like API error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update likes' },
      { status: 500 }
    )
  }
}