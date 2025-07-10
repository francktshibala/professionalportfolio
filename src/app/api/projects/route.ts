import { NextRequest, NextResponse } from 'next/server'
import { ProjectService } from '@/lib/services/projects'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const featured = searchParams.get('featured')
    const limit = searchParams.get('limit')
    const category = searchParams.get('category')
    const technology = searchParams.get('technology')

    let projects

    if (featured === 'true') {
      projects = await ProjectService.getFeaturedProjects(limit ? parseInt(limit) : undefined)
    } else if (category) {
      projects = await ProjectService.getProjectsByCategory(category, limit ? parseInt(limit) : undefined)
    } else if (technology) {
      projects = await ProjectService.getProjectsByTechnology(technology, limit ? parseInt(limit) : undefined)
    } else {
      projects = await ProjectService.getAllProjects({
        limit: limit ? parseInt(limit) : undefined
      })
    }

    // Note: limit is already applied in service methods above

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
      authorId
    } = body

    if (!title || !slug || !description || !authorId) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: title, slug, description, authorId' },
        { status: 400 }
      )
    }

    if (!technologies || !Array.isArray(technologies)) {
      return NextResponse.json(
        { success: false, error: 'Technologies must be an array' },
        { status: 400 }
      )
    }

    const project = await ProjectService.createProject({
      title,
      slug,
      description,
      longDescription,
      image,
      liveUrl,
      githubUrl,
      technologies,
      featured: featured || false,
      status: status || 'DRAFT',
      startDate,
      endDate,
      authorId
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