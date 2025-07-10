import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const apiKey = request.headers.get('x-api-key')
    if (!apiKey || apiKey !== process.env.ADMIN_API_KEY) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Export all content from database
    const [projects, skills, posts, users] = await Promise.all([
      db.project.findMany({
        include: {
          categories: true,
          author: true
        }
      }),
      db.skill.findMany(),
      db.post.findMany({
        include: {
          categories: true,
          author: true
        }
      }),
      db.user.findMany()
    ])

    const backup = {
      timestamp: new Date().toISOString(),
      version: '1.0',
      data: {
        projects,
        skills,
        posts,
        users
      },
      counts: {
        projects: projects.length,
        skills: skills.length,
        posts: posts.length,
        users: users.length
      }
    }

    return NextResponse.json({
      success: true,
      backup
    })
  } catch (error) {
    console.error('Backup API error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create backup' },
      { status: 500 }
    )
  }
}