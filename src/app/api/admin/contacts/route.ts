import { NextRequest, NextResponse } from 'next/server'
import { ContactService } from '@/lib/services/contact'

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
    const replied = searchParams.get('replied')
    const limit = searchParams.get('limit')
    const skip = searchParams.get('skip')

    const contacts = await ContactService.getAllContacts({
      replied: replied === 'true',
      limit: limit ? parseInt(limit) : undefined,
      skip: skip ? parseInt(skip) : undefined
    })

    return NextResponse.json({
      success: true,
      data: contacts,
      count: contacts.length
    })
  } catch (error) {
    console.error('Admin contacts API error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch contacts' },
      { status: 500 }
    )
  }
}