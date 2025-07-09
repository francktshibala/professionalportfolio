import { NextRequest, NextResponse } from 'next/server'
import { ProjectService } from '@/lib/services/projects'
import { db } from '@/lib/db'
import { ProjectStatus } from '@prisma/client'

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const project = await ProjectService.getProjectBySlug(params.slug)
    
    if (!project) {
      return NextResponse.json(
        { success: false, error: 'Project not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: project
    })
  } catch (error) {
    console.error('Project API GET error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch project' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
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
      categoryIds
    } = body

    const existingProject = await db.project.findUnique({
      where: { slug: params.slug }
    })

    if (!existingProject) {
      return NextResponse.json(
        { success: false, error: 'Project not found' },
        { status: 404 }
      )
    }

    const updateData: any = {}
    if (title !== undefined) updateData.title = title
    if (slug !== undefined) updateData.slug = slug
    if (description !== undefined) updateData.description = description
    if (longDescription !== undefined) updateData.longDescription = longDescription
    if (image !== undefined) updateData.image = image
    if (liveUrl !== undefined) updateData.liveUrl = liveUrl
    if (githubUrl !== undefined) updateData.githubUrl = githubUrl
    if (technologies !== undefined) updateData.technologies = technologies
    if (featured !== undefined) updateData.featured = featured
    if (status !== undefined) updateData.status = status
    if (startDate !== undefined) updateData.startDate = startDate ? new Date(startDate) : null
    if (endDate !== undefined) updateData.endDate = endDate ? new Date(endDate) : null

    if (categoryIds) {
      updateData.categories = {
        set: [],
        connect: categoryIds.map((id: string) => ({ id }))
      }
    }

    const project = await db.project.update({
      where: { slug: params.slug },
      data: updateData,
      include: {
        categories: true,
        author: true
      }
    })

    return NextResponse.json({
      success: true,
      data: project
    })
  } catch (error) {
    console.error('Project API PUT error:', error)
    if (error instanceof Error && error.message.includes('Unique constraint')) {
      return NextResponse.json(
        { success: false, error: 'Project with this slug already exists' },
        { status: 409 }
      )
    }
    return NextResponse.json(
      { success: false, error: 'Failed to update project' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const apiKey = request.headers.get('x-api-key')
    if (!apiKey || apiKey !== process.env.ADMIN_API_KEY) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const existingProject = await db.project.findUnique({
      where: { slug: params.slug }
    })

    if (!existingProject) {
      return NextResponse.json(
        { success: false, error: 'Project not found' },
        { status: 404 }
      )
    }

    await db.project.delete({
      where: { slug: params.slug }
    })

    return NextResponse.json({
      success: true,
      message: 'Project deleted successfully'
    })
  } catch (error) {
    console.error('Project API DELETE error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete project' },
      { status: 500 }
    )
  }
}