import { NextRequest, NextResponse } from 'next/server'
import { AnalyticsService } from '@/lib/services/analytics'

export async function GET(request: NextRequest) {
  try {
    const apiKey = request.headers.get('x-api-key')
    if (!apiKey || apiKey !== process.env.ADMIN_API_KEY) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const path = searchParams.get('path')
    const days = searchParams.get('days')
    const type = searchParams.get('type') // 'views', 'top-pages', 'total'

    const daysNumber = days ? parseInt(days) : 30

    if (type === 'total') {
      const totalViews = await AnalyticsService.getTotalViews(daysNumber)
      return NextResponse.json({
        success: true,
        data: { totalViews, days: daysNumber }
      })
    }

    if (type === 'top-pages') {
      const limit = searchParams.get('limit')
      const topPages = await AnalyticsService.getTopPages(
        limit ? parseInt(limit) : 10,
        daysNumber
      )
      return NextResponse.json({
        success: true,
        data: topPages,
        count: topPages.length
      })
    }

    const pageViews = await AnalyticsService.getPageViews(path || undefined, daysNumber)

    return NextResponse.json({
      success: true,
      data: pageViews,
      count: pageViews.length
    })
  } catch (error) {
    console.error('Analytics API GET error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch analytics' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { path, userAgent, referrer, country, city } = body

    if (!path) {
      return NextResponse.json(
        { success: false, error: 'Path is required' },
        { status: 400 }
      )
    }

    const clientIP = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     'unknown'

    await AnalyticsService.trackPageView({
      path,
      userAgent: userAgent || request.headers.get('user-agent') || undefined,
      referrer: referrer || request.headers.get('referer') || undefined,
      country,
      city
    })

    return NextResponse.json({
      success: true,
      message: 'Page view tracked successfully'
    })
  } catch (error) {
    console.error('Analytics API POST error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to track page view' },
      { status: 500 }
    )
  }
}