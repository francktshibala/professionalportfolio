import { NextRequest, NextResponse } from 'next/server'
import { SkillService } from '@/lib/services/skills'
import { db } from '@/lib/db'
import { SkillCategory, SkillLevel } from '@prisma/client'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category') as SkillCategory
    const level = searchParams.get('level') as SkillLevel
    const featured = searchParams.get('featured')
    const limit = searchParams.get('limit')

    let skills

    if (level) {
      skills = await SkillService.getSkillsByLevel(level)
    } else if (category) {
      skills = await SkillService.getSkillsByCategory(category)
    } else {
      skills = await SkillService.getAllSkills({
        category,
        featured: featured === 'true',
        limit: limit ? parseInt(limit) : undefined
      })
    }

    return NextResponse.json({
      success: true,
      data: skills,
      count: skills.length
    })
  } catch (error) {
    console.error('Skills API GET error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch skills' },
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
      name,
      category,
      level,
      description,
      icon,
      color,
      order,
      featured
    } = body

    if (!name || !category || !level) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: name, category, level' },
        { status: 400 }
      )
    }

    if (!Object.values(SkillCategory).includes(category)) {
      return NextResponse.json(
        { success: false, error: 'Invalid category' },
        { status: 400 }
      )
    }

    if (!Object.values(SkillLevel).includes(level)) {
      return NextResponse.json(
        { success: false, error: 'Invalid level' },
        { status: 400 }
      )
    }

    const skill = await db.skill.create({
      data: {
        name,
        category,
        level,
        description,
        icon,
        color,
        order: order || 0,
        featured: featured || false
      }
    })

    return NextResponse.json({
      success: true,
      data: skill
    }, { status: 201 })
  } catch (error) {
    console.error('Skills API POST error:', error)
    if (error instanceof Error && error.message.includes('Unique constraint')) {
      return NextResponse.json(
        { success: false, error: 'Skill with this name already exists' },
        { status: 409 }
      )
    }
    return NextResponse.json(
      { success: false, error: 'Failed to create skill' },
      { status: 500 }
    )
  }
}