import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const apiKey = request.headers.get('x-api-key')
    if (!apiKey || apiKey !== process.env.ADMIN_API_KEY) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Check if default user already exists
    const existingUser = await db.user.findUnique({
      where: { email: 'admin@portfolio.com' }
    })

    if (existingUser) {
      return NextResponse.json({
        success: true,
        data: existingUser,
        message: 'Default user already exists'
      })
    }

    // Create default user
    const user = await db.user.create({
      data: {
        email: 'admin@portfolio.com',
        name: 'Portfolio Admin',
        bio: 'Portfolio administrator and content manager',
        website: 'https://portfolio-4u8c.vercel.app'
      }
    })

    return NextResponse.json({
      success: true,
      data: user,
      message: 'Default user created successfully'
    })
  } catch (error) {
    console.error('Seed user API error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create default user' },
      { status: 500 }
    )
  }
}