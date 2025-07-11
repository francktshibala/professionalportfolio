import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// Rate limiting
const requestCounts = new Map<string, { count: number; resetTime: number }>();

function isRateLimited(ip: string, limit: number = 300): boolean {
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute
  
  const requestData = requestCounts.get(ip) || { count: 0, resetTime: now + windowMs };
  
  if (now > requestData.resetTime) {
    requestData.count = 0;
    requestData.resetTime = now + windowMs;
  }
  
  requestData.count++;
  requestCounts.set(ip, requestData);
  
  return requestData.count > limit;
}

function authenticateAdmin(request: NextRequest): boolean {
  const apiKey = request.headers.get('x-api-key');
  return apiKey === process.env.ADMIN_API_KEY;
}

export async function GET(request: NextRequest) {
  try {
    const ip = request.ip || 'unknown';
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { success: false, error: 'Rate limit exceeded' },
        { status: 429 }
      );
    }

    if (!authenticateAdmin(request)) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    const [testimonials, totalCount] = await Promise.all([
      db.testimonial.findMany({
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      db.testimonial.count()
    ]);

    return NextResponse.json({
      success: true,
      data: testimonials,
      pagination: {
        page,
        limit,
        total: totalCount,
        totalPages: Math.ceil(totalCount / limit)
      }
    });
  } catch (error) {
    console.error('Admin testimonials GET error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch testimonials' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.ip || 'unknown';
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { success: false, error: 'Rate limit exceeded' },
        { status: 429 }
      );
    }

    if (!authenticateAdmin(request)) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { name, role, company, content, rating, image, featured, approved } = body;

    // Validation
    if (!name || !role || !content) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: name, role, content' },
        { status: 400 }
      );
    }

    if (rating && (rating < 1 || rating > 5)) {
      return NextResponse.json(
        { success: false, error: 'Rating must be between 1 and 5' },
        { status: 400 }
      );
    }

    const testimonial = await db.testimonial.create({
      data: {
        name,
        role,
        company,
        content,
        rating: rating || 5,
        image,
        featured: featured || false,
        approved: approved !== false // Default to true unless explicitly false
      }
    });

    return NextResponse.json({
      success: true,
      data: testimonial,
      message: 'Testimonial created successfully'
    });
  } catch (error) {
    console.error('Admin testimonials POST error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create testimonial' },
      { status: 500 }
    );
  }
}