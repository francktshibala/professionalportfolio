import { db } from '../db'
import { Analytics } from '@prisma/client'

export class AnalyticsService {
  static async trackPageView(data: {
    path: string
    userAgent?: string
    referrer?: string
    country?: string
    city?: string
  }): Promise<void> {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    await db.analytics.upsert({
      where: {
        path_date: {
          path: data.path,
          date: today
        }
      },
      update: {
        visits: { increment: 1 }
      },
      create: {
        path: data.path,
        visits: 1,
        date: today,
        userAgent: data.userAgent,
        referrer: data.referrer,
        country: data.country,
        city: data.city
      }
    })
  }

  static async getPageViews(path?: string, days = 30): Promise<Analytics[]> {
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)

    return await db.analytics.findMany({
      where: {
        ...(path && { path }),
        date: {
          gte: startDate
        }
      },
      orderBy: {
        date: 'desc'
      }
    })
  }

  static async getTopPages(limit = 10, days = 30): Promise<Analytics[]> {
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)

    return await db.analytics.findMany({
      where: {
        date: {
          gte: startDate
        }
      },
      orderBy: {
        visits: 'desc'
      },
      take: limit
    })
  }

  static async getTotalViews(days = 30): Promise<number> {
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)

    const result = await db.analytics.aggregate({
      _sum: {
        visits: true
      },
      where: {
        date: {
          gte: startDate
        }
      }
    })

    return result._sum.visits || 0
  }
}