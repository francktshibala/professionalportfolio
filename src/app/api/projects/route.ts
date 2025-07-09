import { NextRequest, NextResponse } from 'next/server'
import { ProjectService } from '@/lib/project-service'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const featured = searchParams.get('featured')
    const limit = searchParams.get('limit')
    const category = searchParams.get('category')
    const technology = searchParams.get('technology')
    const search = searchParams.get('search')

    let projects

    if (search) {
      projects = await ProjectService.searchProjects(search)
    } else if (category) {
      projects = await ProjectService.getProjectsByCategory(category)
    } else if (technology) {
      projects = await ProjectService.getProjectsByTechnology(technology)
    } else if (featured === 'true') {
      projects = await ProjectService.getFeaturedProjects()
    } else {
      projects = await ProjectService.getProjects()
    }

    // Apply limit if specified
    if (limit) {
      const limitNum = parseInt(limit)
      projects = projects.slice(0, limitNum)
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

export async function POST(_request: NextRequest) {
  try {
    return NextResponse.json(
      { success: false, error: 'Project creation not implemented yet' },
      { status: 501 }
    )
  } catch (error) {
    console.error('Projects API POST error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create project' },
      { status: 500 }
    )
  }
}