import { PrismaClient } from '@prisma/client';
import { projects } from '@/lib/projects';
import { ProjectAdapter } from '@/lib/project-adapter';
import { StaticProject } from '@/types';

const prisma = new PrismaClient();

export class ProjectMigrationService {
  private static readonly DEFAULT_AUTHOR_EMAIL = 'admin@portfolio.com';

  /**
   * Migrate all static projects to database
   */
  static async migrateAllProjects(): Promise<void> {
    console.log('🚀 Starting project migration...');
    
    try {
      // Ensure default user exists
      const author = await this.ensureDefaultAuthor();
      console.log(`✅ Default author ready: ${author.email}`);

      // Create project categories
      await this.createProjectCategories();
      console.log('✅ Project categories created');

      // Migrate each project
      for (const staticProject of projects) {
        await this.migrateProject(staticProject, author.id);
        console.log(`✅ Migrated project: ${staticProject.title}`);
      }

      console.log(`🎉 Migration completed! ${projects.length} projects migrated.`);
    } catch (error) {
      console.error('❌ Migration failed:', error);
      throw error;
    }
  }

  /**
   * Migrate a single project with validation and error handling
   */
  private static async migrateProject(staticProject: StaticProject, authorId: string): Promise<void> {
    console.log(`⏭️  Skipping migration for project ${staticProject.id} - migration temporarily disabled for deployment`);
    return;
    /* TEMPORARILY DISABLED FOR DEPLOYMENT - WILL RE-ENABLE AFTER SITE IS LIVE
    try {
      // Transform static project to database format
      const projectData = ProjectAdapter.staticToDatabase(staticProject, authorId);

      // Check if project already exists
      const existingProject = await prisma.project.findUnique({
        where: { slug: projectData.slug }
      });

      if (existingProject) {
        console.log(`📝 Updating existing project: ${projectData.slug}`);
        await prisma.project.update({
          where: { slug: projectData.slug },
          data: {
            title: projectData.title,
            description: projectData.description,
            longDescription: projectData.longDescription,
            image: projectData.image,
            liveUrl: projectData.liveUrl,
            githubUrl: projectData.githubUrl,
            technologies: projectData.technologies,
            featured: projectData.featured,
            status: projectData.status,
            startDate: projectData.startDate,
            endDate: projectData.endDate,
            authorId: projectData.authorId,
            caseStudy: projectData.caseStudy as any,
            metrics: projectData.metrics as any,
            testimonial: projectData.testimonial as any,
            images: projectData.images as any,
            seo: projectData.seo as any,
            // Connect to category
            categories: {
              connectOrCreate: [{
                where: { slug: staticProject.category },
                create: {
                  name: this.getCategoryDisplayName(staticProject.category),
                  slug: staticProject.category,
                  color: this.getCategoryColor(staticProject.category)
                }
              }]
            }
          }
        });
      } else {
        console.log(`🆕 Creating new project: ${projectData.slug}`);
        await prisma.project.create({
          data: {
            title: projectData.title,
            description: projectData.description,
            longDescription: projectData.longDescription,
            image: projectData.image,
            liveUrl: projectData.liveUrl,
            githubUrl: projectData.githubUrl,
            technologies: projectData.technologies,
            featured: projectData.featured,
            status: projectData.status,
            startDate: projectData.startDate,
            endDate: projectData.endDate,
            authorId: projectData.authorId,
            caseStudy: projectData.caseStudy as any,
            metrics: projectData.metrics as any,
            testimonial: projectData.testimonial as any,
            images: projectData.images as any,
            seo: projectData.seo as any,
            // Connect to category
            categories: {
              connectOrCreate: [{
                where: { slug: staticProject.category },
                create: {
                  name: this.getCategoryDisplayName(staticProject.category),
                  slug: staticProject.category,
                  color: this.getCategoryColor(staticProject.category)
                }
              }]
            }
          }
        });
      }

      // Validate the migrated data
      await this.validateMigratedProject(projectData.slug);

    } catch (error) {
      console.error(`❌ Failed to migrate project ${staticProject.title}:`, error);
      throw error;
    }
    */
  }

  /**
   * Ensure default author exists
   */
  private static async ensureDefaultAuthor() {
    const existingUser = await prisma.user.findUnique({
      where: { email: this.DEFAULT_AUTHOR_EMAIL }
    });

    if (existingUser) {
      return existingUser;
    }

    return await prisma.user.create({
      data: {
        email: this.DEFAULT_AUTHOR_EMAIL,
        name: 'Portfolio Admin',
        bio: 'Portfolio administrator and content creator',
      }
    });
  }

  /**
   * Create project categories if they don't exist
   */
  private static async createProjectCategories(): Promise<void> {
    const categories = [
      { slug: 'web-app', name: 'Web Application', color: '#3B82F6' },
      { slug: 'mobile-app', name: 'Mobile Application', color: '#10B981' },
      { slug: 'e-commerce', name: 'E-commerce', color: '#F59E0B' },
      { slug: 'dashboard', name: 'Dashboard', color: '#8B5CF6' },
      { slug: 'api', name: 'API', color: '#EF4444' },
      { slug: 'tool', name: 'Tool', color: '#6B7280' },
      { slug: 'ai-ml', name: 'AI/ML', color: '#EC4899' },
      { slug: 'open-source', name: 'Open Source', color: '#14B8A6' },
    ];

    for (const category of categories) {
      await prisma.projectCategory.upsert({
        where: { slug: category.slug },
        update: { name: category.name, color: category.color },
        create: category
      });
    }
  }

  /**
   * Validate migrated project data
   */
  private static async validateMigratedProject(slug: string): Promise<void> {
    const project = await prisma.project.findUnique({
      where: { slug },
      include: { categories: true, author: true }
    });

    if (!project) {
      throw new Error(`Project ${slug} not found after migration`);
    }

    // Validate required fields
    if (!project.title || !project.description) {
      throw new Error(`Project ${slug} is missing required fields`);
    }

    // Validate JSON fields
    if (project.caseStudy) {
      try {
        const caseStudy = typeof project.caseStudy === 'string' 
          ? JSON.parse(project.caseStudy) 
          : project.caseStudy;
        
        if (!caseStudy.problem || !caseStudy.solution) {
          console.warn(`⚠️  Project ${slug} has incomplete case study data`);
        }
      } catch (error) {
        throw new Error(`Project ${slug} has invalid case study JSON`);
      }
    }

    console.log(`✅ Validation passed for project: ${slug}`);
  }

  /**
   * Get display name for category
   */
  private static getCategoryDisplayName(category: string): string {
    const names: Record<string, string> = {
      'web-app': 'Web Application',
      'mobile-app': 'Mobile Application',
      'e-commerce': 'E-commerce',
      'dashboard': 'Dashboard',
      'api': 'API',
      'tool': 'Tool',
      'ai-ml': 'AI/ML',
      'open-source': 'Open Source',
    };
    return names[category] || category;
  }

  /**
   * Get color for category
   */
  private static getCategoryColor(category: string): string {
    const colors: Record<string, string> = {
      'web-app': '#3B82F6',
      'mobile-app': '#10B981',
      'e-commerce': '#F59E0B',
      'dashboard': '#8B5CF6',
      'api': '#EF4444',
      'tool': '#6B7280',
      'ai-ml': '#EC4899',
      'open-source': '#14B8A6',
    };
    return colors[category] || '#6B7280';
  }

  /**
   * Rollback migration (delete all migrated projects)
   */
  static async rollbackMigration(): Promise<void> {
    console.log('🔄 Rolling back migration...');
    
    try {
      // Delete all projects created by migration
      const author = await prisma.user.findUnique({
        where: { email: this.DEFAULT_AUTHOR_EMAIL }
      });

      if (author) {
        await prisma.project.deleteMany({
          where: { authorId: author.id }
        });
        console.log('✅ All migrated projects deleted');
      }

      console.log('🎉 Rollback completed!');
    } catch (error) {
      console.error('❌ Rollback failed:', error);
      throw error;
    }
  }

  /**
   * Get migration status
   */
  static async getMigrationStatus(): Promise<{
    projectCount: number;
    staticProjectCount: number;
    isComplete: boolean;
  }> {
    const projectCount = await prisma.project.count();
    const staticProjectCount = projects.length;
    
    return {
      projectCount,
      staticProjectCount,
      isComplete: projectCount >= staticProjectCount
    };
  }
}

// Run migration if called directly
if (require.main === module) {
  ProjectMigrationService.migrateAllProjects()
    .then(() => {
      console.log('Migration completed successfully');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Migration failed:', error);
      process.exit(1);
    });
}