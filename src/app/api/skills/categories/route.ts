import { NextResponse } from 'next/server'
import { SkillService } from '@/lib/services/skills'
import { SkillCategory } from '@prisma/client'

export async function GET() {
  try {
    const categories = await SkillService.getSkillCategories()
    
    const categoriesWithCounts = await Promise.all(
      categories.map(async (category) => {
        const skills = await SkillService.getSkillsByCategory(category)
        return {
          category,
          count: skills.length,
          skills: skills.map(skill => ({
            id: skill.id,
            name: skill.name,
            level: skill.level,
            featured: skill.featured
          }))
        }
      })
    )

    return NextResponse.json({
      success: true,
      data: {
        categories: categoriesWithCounts,
        availableCategories: Object.values(SkillCategory)
      }
    })
  } catch (error) {
    console.error('Skill categories API error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch skill categories' },
      { status: 500 }
    )
  }
}