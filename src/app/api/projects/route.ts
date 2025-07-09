import { NextRequest, NextResponse } from 'next/server'
import { ProjectService } from '@/lib/services/projects'
import { db } from '@/lib/db'
import { ProjectStatus } from '@prisma/client'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const featured = searchParams.get('featured')
    const status = searchParams.get('status') as ProjectStatus
    const limit = searchParams.get('limit')
    const skip = searchParams.get('skip')
    const category = searchParams.get('category')
    const technology = searchParams.get('technology')

    let projects

    if (category) {
      projects = await ProjectService.getProjectsByCategory(category, limit ? parseInt(limit) : undefined)
    } else if (technology) {
      projects = await ProjectService.getProjectsByTechnology(technology, limit ? parseInt(limit) : undefined)
    } else {
      projects = await ProjectService.getAllProjects({
        featured: featured === 'true',
        status,
        limit: limit ? parseInt(limit) : undefined,
        skip: skip ? parseInt(skip) : undefined
      })
    }

    return NextResponse.json({
      success: true,
      data: projects,
      count: projects.length
    })
  } catch (error) {
    console.error('Projects API GET error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch projects' },
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
      description,
      longDescription,
      image,
      liveUrl,
      githubUrl,
      technologies,
      featured,
      status,
      startDate,
      endDate,
      authorId,
      categoryIds
    } = body

    if (!title || !slug || !description || !authorId) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: title, slug, description, authorId' },
        { status: 400 }
      )
    }

    const project = await db.project.create({
      data: {
        title,
        slug,
        description,
        longDescription,
        image,
        liveUrl,
        githubUrl,
        technologies: technologies || [],
        featured: featured || false,
        status: status || ProjectStatus.ACTIVE,
        startDate: startDate ? new Date(startDate) : null,
        endDate: endDate ? new Date(endDate) : null,
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
      data: project
    }, { status: 201 })
  } catch (error) {
    console.error('Projects API POST error:', error)
    if (error instanceof Error && error.message.includes('Unique constraint')) {
      return NextResponse.json(
        { success: false, error: 'Project with this slug already exists' },
        { status: 409 }
      )
    }
    return NextResponse.json(
      { success: false, error: 'Failed to create project' },
      { status: 500 }
    )
  }
}