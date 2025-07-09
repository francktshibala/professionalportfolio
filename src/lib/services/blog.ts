import { db } from '../db'
import { Post, PostCategory } from '@prisma/client'

export type PostWithCategory = Post & {
  categories: PostCategory[]
}

export class BlogService {
  static async getAllPosts(options?: {
    published?: boolean
    featured?: boolean
    limit?: number
    skip?: number
  }): Promise<PostWithCategory[]> {
    const { published = true, featured, limit, skip } = options || {}
    
    return await db.post.findMany({
      where: {
        published,
        ...(featured !== undefined && { featured })
      },
      include: {
        categories: true,
        author: true
      },
      orderBy: {
        publishedAt: 'desc'
      },
      take: limit,
      skip
    })
  }

  static async getPostBySlug(slug: string): Promise<PostWithCategory | null> {
    const post = await db.post.findUnique({
      where: { slug },
      include: {
        categories: true,
        author: true
      }
    })

    if (post) {
      await db.post.update({
        where: { id: post.id },
        data: { views: { increment: 1 } }
      })
    }

    return post
  }

  static async getRelatedPosts(postId: string, categoryIds: string[], limit = 3): Promise<PostWithCategory[]> {
    return await db.post.findMany({
      where: {
        published: true,
        id: { not: postId },
        categories: {
          some: {
            id: { in: categoryIds }
          }
        }
      },
      include: {
        categories: true,
        author: true
      },
      take: limit,
      orderBy: {
        publishedAt: 'desc'
      }
    })
  }

  static async searchPosts(query: string, limit = 10): Promise<PostWithCategory[]> {
    return await db.post.findMany({
      where: {
        published: true,
        OR: [
          { title: { contains: query, mode: 'insensitive' } },
          { excerpt: { contains: query, mode: 'insensitive' } },
          { content: { contains: query, mode: 'insensitive' } }
        ]
      },
      include: {
        categories: true,
        author: true
      },
      take: limit,
      orderBy: {
        publishedAt: 'desc'
      }
    })
  }

  static async getPopularPosts(limit = 5): Promise<PostWithCategory[]> {
    return await db.post.findMany({
      where: { published: true },
      include: {
        categories: true,
        author: true
      },
      orderBy: {
        views: 'desc'
      },
      take: limit
    })
  }

  static async getPostsByCategory(categorySlug: string, limit?: number): Promise<PostWithCategory[]> {
    return await db.post.findMany({
      where: {
        published: true,
        categories: {
          some: {
            slug: categorySlug
          }
        }
      },
      include: {
        categories: true,
        author: true
      },
      orderBy: {
        publishedAt: 'desc'
      },
      take: limit
    })
  }

  static async getAllCategories(): Promise<PostCategory[]> {
    return await db.postCategory.findMany({
      orderBy: {
        name: 'asc'
      }
    })
  }

  static async incrementLikes(postId: string): Promise<void> {
    await db.post.update({
      where: { id: postId },
      data: { likes: { increment: 1 } }
    })
  }
}