import { db } from '../db'
import { Skill, SkillCategory, SkillLevel } from '@prisma/client'

export class SkillService {
  static async getAllSkills(options?: {
    category?: SkillCategory
    featured?: boolean
    limit?: number
  }): Promise<Skill[]> {
    const { category, featured, limit } = options || {}
    
    return await db.skill.findMany({
      where: {
        ...(category && { category }),
        ...(featured !== undefined && { featured })
      },
      orderBy: [
        { order: 'asc' },
        { name: 'asc' }
      ],
      take: limit
    })
  }

  static async getSkillsByCategory(category: SkillCategory): Promise<Skill[]> {
    return await db.skill.findMany({
      where: { category },
      orderBy: [
        { order: 'asc' },
        { name: 'asc' }
      ]
    })
  }

  static async getFeaturedSkills(limit = 8): Promise<Skill[]> {
    return await db.skill.findMany({
      where: { featured: true },
      orderBy: [
        { order: 'asc' },
        { name: 'asc' }
      ],
      take: limit
    })
  }

  static async getSkillsByLevel(level: SkillLevel): Promise<Skill[]> {
    return await db.skill.findMany({
      where: { level },
      orderBy: [
        { order: 'asc' },
        { name: 'asc' }
      ]
    })
  }

  static async getSkillCategories(): Promise<SkillCategory[]> {
    const skills = await db.skill.findMany({
      select: { category: true },
      distinct: ['category']
    })
    
    return skills.map(skill => skill.category)
  }
}