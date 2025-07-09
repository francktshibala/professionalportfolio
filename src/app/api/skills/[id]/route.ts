import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { SkillCategory, SkillLevel } from '@prisma/client'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const skill = await db.skill.findUnique({
      where: { id: params.id }
    })
    
    if (!skill) {
      return NextResponse.json(
        { success: false, error: 'Skill not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: skill
    })
  } catch (error) {
    console.error('Skill API GET error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch skill' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
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
      name,
      category,
      level,
      description,
      icon,
      color,
      order,
      featured
    } = body

    const existingSkill = await db.skill.findUnique({
      where: { id: params.id }
    })

    if (!existingSkill) {
      return NextResponse.json(
        { success: false, error: 'Skill not found' },
        { status: 404 }
      )
    }

    const updateData: Record<string, unknown> = {}
    if (name !== undefined) updateData.name = name
    if (category !== undefined) {
      if (!Object.values(SkillCategory).includes(category)) {
        return NextResponse.json(
          { success: false, error: 'Invalid category' },
          { status: 400 }
        )
      }
      updateData.category = category
    }
    if (level !== undefined) {
      if (!Object.values(SkillLevel).includes(level)) {
        return NextResponse.json(
          { success: false, error: 'Invalid level' },
          { status: 400 }
        )
      }
      updateData.level = level
    }
    if (description !== undefined) updateData.description = description
    if (icon !== undefined) updateData.icon = icon
    if (color !== undefined) updateData.color = color
    if (order !== undefined) updateData.order = order
    if (featured !== undefined) updateData.featured = featured

    const skill = await db.skill.update({
      where: { id: params.id },
      data: updateData
    })

    return NextResponse.json({
      success: true,
      data: skill
    })
  } catch (error) {
    console.error('Skill API PUT error:', error)
    if (error instanceof Error && error.message.includes('Unique constraint')) {
      return NextResponse.json(
        { success: false, error: 'Skill with this name already exists' },
        { status: 409 }
      )
    }
    return NextResponse.json(
      { success: false, error: 'Failed to update skill' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const apiKey = request.headers.get('x-api-key')
    if (!apiKey || apiKey !== process.env.ADMIN_API_KEY) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const existingSkill = await db.skill.findUnique({
      where: { id: params.id }
    })

    if (!existingSkill) {
      return NextResponse.json(
        { success: false, error: 'Skill not found' },
        { status: 404 }
      )
    }

    await db.skill.delete({
      where: { id: params.id }
    })

    return NextResponse.json({
      success: true,
      message: 'Skill deleted successfully'
    })
  } catch (error) {
    console.error('Skill API DELETE error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete skill' },
      { status: 500 }
    )
  }
}