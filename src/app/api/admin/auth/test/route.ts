import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const apiKey = request.headers.get('x-api-key')
  const envKey = process.env.ADMIN_API_KEY
  
  return NextResponse.json({
    success: true,
    data: {
      receivedKey: apiKey ? apiKey.substring(0, 5) + '...' : 'none',
      envKeyExists: !!envKey,
      envKeyLength: envKey?.length || 0,
      envKeyPrefix: envKey ? envKey.substring(0, 5) + '...' : 'none',
      keysMatch: apiKey === envKey
    }
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const testKey = body.testKey
    const envKey = process.env.ADMIN_API_KEY
    
    return NextResponse.json({
      success: true,
      data: {
        testKey: testKey ? testKey.substring(0, 5) + '...' : 'none',
        envKeyExists: !!envKey,
        envKeyLength: envKey?.length || 0,
        keysMatch: testKey === envKey,
        suggestion: envKey ? 'Environment variable is set' : 'Environment variable is missing'
      }
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Failed to test auth'
    })
  }
}