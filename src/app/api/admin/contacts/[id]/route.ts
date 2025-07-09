import { NextRequest, NextResponse } from 'next/server'
import { ContactService } from '@/lib/services/contact'

export async function GET(
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

    const contact = await ContactService.getContactById(params.id)
    
    if (!contact) {
      return NextResponse.json(
        { success: false, error: 'Contact not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: contact
    })
  } catch (error) {
    console.error('Admin contact API error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch contact' },
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
    const { replied } = body

    const existingContact = await ContactService.getContactById(params.id)
    if (!existingContact) {
      return NextResponse.json(
        { success: false, error: 'Contact not found' },
        { status: 404 }
      )
    }

    if (replied === true) {
      await ContactService.markAsReplied(params.id)
    }

    const updatedContact = await ContactService.getContactById(params.id)

    return NextResponse.json({
      success: true,
      data: updatedContact
    })
  } catch (error) {
    console.error('Admin contact update API error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update contact' },
      { status: 500 }
    )
  }
}