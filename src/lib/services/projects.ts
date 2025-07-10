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

  static async createProject(data: {
    title: string
    slug: string
    description: string
    longDescription?: string
    image?: string
    liveUrl?: string
    githubUrl?: string
    technologies: string[]
    featured?: boolean
    status: ProjectStatus
    startDate?: string
    endDate?: string
    authorId: string
  }): Promise<Project> {
    return await db.project.create({
      data: {
        title: data.title,
        slug: data.slug,
        description: data.description,
        longDescription: data.longDescription,
        image: data.image,
        liveUrl: data.liveUrl,
        githubUrl: data.githubUrl,
        technologies: data.technologies,
        featured: data.featured || false,
        status: data.status,
        startDate: data.startDate ? new Date(data.startDate) : null,
        endDate: data.endDate ? new Date(data.endDate) : null,
        authorId: data.authorId
      }
    })
  }

  static async updateProject(slug: string, data: {
    title?: string
    slug?: string
    description?: string
    longDescription?: string
    image?: string
    liveUrl?: string
    githubUrl?: string
    technologies?: string[]
    featured?: boolean
    status?: ProjectStatus
    startDate?: string
    endDate?: string
  }): Promise<Project> {
    return await db.project.update({
      where: { slug },
      data: {
        ...data,
        startDate: data.startDate ? new Date(data.startDate) : undefined,
        endDate: data.endDate ? new Date(data.endDate) : undefined
      }
    })
  }

  static async deleteProject(slug: string): Promise<void> {
    await db.project.delete({
      where: { slug }
    })
  }
}