import { db } from '../db'
import { Project, ProjectCategory, ProjectStatus } from '@prisma/client'

export type ProjectWithCategory = Project & {
  categories: ProjectCategory[]
}

export class ProjectService {
  static async getAllProjects(options?: {
    featured?: boolean
    status?: ProjectStatus
    limit?: number
    skip?: number
  }): Promise<ProjectWithCategory[]> {
    const { featured, status, limit, skip } = options || {}
    
    return await db.project.findMany({
      where: {
        ...(featured !== undefined && { featured }),
        ...(status && { status })
      },
      include: {
        categories: true,
        author: true
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: limit,
      skip
    })
  }

  static async getProjectBySlug(slug: string): Promise<ProjectWithCategory | null> {
    const project = await db.project.findUnique({
      where: { slug },
      include: {
        categories: true,
        author: true
      }
    })

    if (project) {
      await db.project.update({
        where: { id: project.id },
        data: { views: { increment: 1 } }
      })
    }

    return project
  }

  static async getFeaturedProjects(limit = 6): Promise<ProjectWithCategory[]> {
    return await db.project.findMany({
      where: { 
        featured: true,
        status: ProjectStatus.ACTIVE
      },
      include: {
        categories: true,
        author: true
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: limit
    })
  }

  static async getProjectsByCategory(categorySlug: string, limit?: number): Promise<ProjectWithCategory[]> {
    return await db.project.findMany({
      where: {
        categories: {
          some: {
            slug: categorySlug
          }
        }
      },
      include: {
        categories: true,
        author: true
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: limit
    })
  }

  static async getProjectsByTechnology(technology: string, limit?: number): Promise<ProjectWithCategory[]> {
    return await db.project.findMany({
      where: {
        technologies: {
          has: technology
        }
      },
      include: {
        categories: true,
        author: true
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: limit
    })
  }

  static async getAllCategories(): Promise<ProjectCategory[]> {
    return await db.projectCategory.findMany({
      orderBy: {
        name: 'asc'
      }
    })
  }

  static async incrementLikes(projectId: string): Promise<void> {
    await db.project.update({
      where: { id: projectId },
      data: { likes: { increment: 1 } }
    })
  }
}