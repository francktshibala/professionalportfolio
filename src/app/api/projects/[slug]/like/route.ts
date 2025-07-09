import { NextRequest, NextResponse } from 'next/server'
import { ProjectService } from '@/lib/services/projects'
import { db } from '@/lib/db'

export async function POST(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const project = await db.project.findUnique({
      where: { slug: params.slug }
    })

    if (!project) {
      return NextResponse.json(
        { success: false, error: 'Project not found' },
        { status: 404 }
      )
    }

    await ProjectService.incrementLikes(project.id)

    const updatedProject = await db.project.findUnique({
      where: { slug: params.slug },
      select: { likes: true }
    })

    return NextResponse.json({
      success: true,
      data: { likes: updatedProject?.likes }
    })
  } catch (error) {
    console.error('Project like API error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update likes' },
      { status: 500 }
    )
  }
}