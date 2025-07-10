import { PrismaClient } from '@prisma/client';
import { projects } from './projects';

const prisma = new PrismaClient();

export class CoreMigrationService {
  private static readonly MIGRATION_ENABLED = process.env.ENABLE_MIGRATION !== 'false';
  
  static async migrate(): Promise<void> {
    if (!this.MIGRATION_ENABLED) {
      console.log('📋 Migration disabled by environment variable');
      return;
    }
    
    console.log('🚀 Starting core migration process...');
    
    try {
      await this.ensureAdminUser();
      await this.migrateEssentialProjects();
      console.log('✅ Core migration completed successfully');
    } catch (error) {
      console.error('❌ Core migration failed:', error);
      throw error;
    } finally {
      await prisma.$disconnect();
    }
  }
  
  private static async ensureAdminUser(): Promise<string> {
    let user = await prisma.user.findFirst();
    if (!user) {
      user = await prisma.user.create({
        data: {
          email: 'admin@portfolio.com',
          name: 'Portfolio Admin',
          bio: 'Professional full-stack developer and technical architect',
        },
      });
      console.log('📝 Created admin user');
    }
    return user.id;
  }
  
  private static async migrateEssentialProjects(): Promise<void> {
    const authorId = await this.ensureAdminUser();
    let migratedCount = 0;
    
    for (const staticProject of projects) {
      const coreData = {
        title: staticProject.title,
        slug: staticProject.id,
        description: staticProject.description,
        longDescription: staticProject.shortDescription || staticProject.description,
        image: staticProject.images?.[0]?.url || null,
        liveUrl: staticProject.demoUrl || null,
        githubUrl: staticProject.githubUrl || null,
        technologies: staticProject.technologies?.map(t => t.name) || [],
        featured: staticProject.featured || false,
        status: this.mapProjectStatus(staticProject.status),
        startDate: staticProject.createdAt ? new Date(staticProject.createdAt) : null,
        endDate: staticProject.status === 'completed' ? new Date(staticProject.updatedAt || staticProject.createdAt || Date.now()) : null,
        views: 0,
        likes: 0,
        authorId,
        caseStudy: staticProject.caseStudy || null,
        metrics: staticProject.metrics || null,
        testimonial: staticProject.testimonial || null,
        images: staticProject.images || null,
        seo: staticProject.seo || null,
      };

      await prisma.project.upsert({
        where: { slug: coreData.slug },
        update: coreData,
        create: coreData,
      });
      
      migratedCount++;
      console.log(`✅ Migrated project: ${staticProject.title}`);
    }
    
    console.log(`📊 Successfully migrated ${migratedCount} projects`);
  }
  
  private static mapProjectStatus(status: string): 'ACTIVE' | 'ARCHIVED' | 'DRAFT' | 'MAINTENANCE' {
    const statusMap: Record<string, 'ACTIVE' | 'ARCHIVED' | 'DRAFT' | 'MAINTENANCE'> = {
      'completed': 'ACTIVE',
      'in-progress': 'ACTIVE',
      'maintenance': 'MAINTENANCE',
      'draft': 'DRAFT',
      'archived': 'ARCHIVED',
    };
    return statusMap[status] || 'ACTIVE';
  }
}

export const runCoreMigration = async () => {
  await CoreMigrationService.migrate();
};