import { NextRequest, NextResponse } from 'next/server'
import { ProjectService } from '@/lib/services/projects'
import { getRateLimitKey, isRateLimited, createErrorResponse, createSuccessResponse } from '@/lib/api-utils'

export async function GET(request: NextRequest) {
  try {
    // Rate limiting for public endpoint
    const rateLimitKey = getRateLimitKey(request)
    if (isRateLimited(rateLimitKey)) {
      return NextResponse.json(
        { success: false, error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    const { searchParams } = new URL(request.url)
    const limit = searchParams.get('limit')

    const projects = await ProjectService.getFeaturedProjects(
      limit ? parseInt(limit) : 6
    )

    return NextResponse.json({
      success: true,
      data: projects,
      count: projects.length
    })
  } catch (error) {
    console.error('Featured projects API error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch featured projects' },
      { status: 500 }
    )
  }
}