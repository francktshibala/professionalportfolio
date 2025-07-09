import { NextResponse } from 'next/server'
import { testDatabaseConnection, testCRUDOperations } from '@/lib/db-test'

export async function GET() {
  try {
    const connectionTest = await testDatabaseConnection()
    if (!connectionTest) {
      return NextResponse.json(
        { error: 'Database connection failed' },
        { status: 500 }
      )
    }

    const crudTest = await testCRUDOperations()
    if (!crudTest) {
      return NextResponse.json(
        { error: 'CRUD operations failed' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      message: 'Database tests passed successfully',
      timestamp: new Date().toISOString(),
      tests: {
        connection: true,
        crud: true
      }
    })
  } catch (error) {
    console.error('Database test error:', error)
    return NextResponse.json(
      { error: 'Database test failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}