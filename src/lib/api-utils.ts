import { NextRequest } from 'next/server'

// Rate limiting implementation
const RATE_LIMIT_MAP = new Map<string, number[]>()
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 60 // 60 requests per minute for public endpoints
const ADMIN_RATE_LIMIT_MAX_REQUESTS = 300 // 300 requests per minute for admin endpoints

export function getRateLimitKey(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const realIP = request.headers.get('x-real-ip')
  const ip = forwarded ? forwarded.split(',')[0] : realIP || 'unknown'
  return ip.trim()
}

export function isRateLimited(key: string, isAdmin = false): boolean {
  const now = Date.now()
  const requests = RATE_LIMIT_MAP.get(key) || []
  
  // Remove old requests outside the window
  const validRequests = requests.filter(
    timestamp => now - timestamp < RATE_LIMIT_WINDOW
  )
  
  const maxRequests = isAdmin ? ADMIN_RATE_LIMIT_MAX_REQUESTS : RATE_LIMIT_MAX_REQUESTS
  
  if (validRequests.length >= maxRequests) {
    return true
  }
  
  validRequests.push(now)
  RATE_LIMIT_MAP.set(key, validRequests)
  return false
}

// Authentication utilities
export function isValidAdminKey(apiKey: string | null): boolean {
  return apiKey !== null && apiKey === process.env.ADMIN_API_KEY
}

export function isAuthenticated(request: NextRequest): boolean {
  const apiKey = request.headers.get('x-api-key')
  return isValidAdminKey(apiKey)
}

// Input validation utilities
export function validateRequired(fields: Record<string, unknown>, requiredFields: string[]): string[] {
  const errors: string[] = []
  
  for (const field of requiredFields) {
    if (!fields[field] || (typeof fields[field] === 'string' && fields[field].trim() === '')) {
      errors.push(`${field} is required`)
    }
  }
  
  return errors
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function validateSlug(slug: string): boolean {
  const slugRegex = /^[a-z0-9-]+$/
  return slugRegex.test(slug) && slug.length >= 3 && slug.length <= 100
}

export function sanitizeString(str: string, maxLength = 1000): string {
  return str.trim().slice(0, maxLength)
}

// Error response utilities
export function createErrorResponse(message: string, status = 400) {
  return Response.json(
    { success: false, error: message },
    { status }
  )
}

export function createSuccessResponse(data: unknown, status = 200) {
  return Response.json(
    { success: true, data },
    { status }
  )
}

// Common API response wrapper
export async function withApiHandler(
  handler: () => Promise<Response>,
  requireAuth = false,
  enableRateLimit = true
) {
  return async (request: NextRequest) => {
    try {
      // Rate limiting
      if (enableRateLimit) {
        const rateLimitKey = getRateLimitKey(request)
        const isAdmin = requireAuth && isAuthenticated(request)
        
        if (isRateLimited(rateLimitKey, isAdmin)) {
          return createErrorResponse('Too many requests. Please try again later.', 429)
        }
      }

      // Authentication
      if (requireAuth && !isAuthenticated(request)) {
        return createErrorResponse('Unauthorized', 401)
      }

      return await handler()
    } catch (error) {
      console.error('API Handler Error:', error)
      return createErrorResponse('Internal server error', 500)
    }
  }
}