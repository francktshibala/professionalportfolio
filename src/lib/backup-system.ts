import { PrismaClient } from '@prisma/client';
import { writeFileSync, readFileSync, existsSync } from 'fs';
import { join } from 'path';

const prisma = new PrismaClient();

interface BackupData {
  projects: unknown[];
  users: unknown[];
  categories: unknown[];
  timestamp: string;
  version: string;
}

export class BackupSystem {
  private static readonly BACKUP_DIR = process.cwd();
  private static readonly BACKUP_FILE = 'database-backup.json';
  
  static async createBackup(): Promise<string> {
    console.log('🔄 Creating database backup...');
    
    try {
      const backupData: BackupData = {
        projects: await prisma.project.findMany({
          include: {
            author: true,
            categories: true,
          },
        }),
        users: await prisma.user.findMany(),
        categories: await prisma.projectCategory.findMany(),
        timestamp: new Date().toISOString(),
        version: '1.0.0',
      };
      
      const backupPath = join(this.BACKUP_DIR, this.BACKUP_FILE);
      writeFileSync(backupPath, JSON.stringify(backupData, null, 2));
      
      console.log(`✅ Backup created successfully at: ${backupPath}`);
      return backupPath;
    } catch (error) {
      console.error('❌ Backup creation failed:', error);
      throw error;
    } finally {
      await prisma.$disconnect();
    }
  }
  
  static async restoreBackup(backupPath?: string): Promise<void> {
    console.log('🔄 Restoring database from backup...');
    
    try {
      const filePath = backupPath || join(this.BACKUP_DIR, this.BACKUP_FILE);
      
      if (!existsSync(filePath)) {
        throw new Error(`Backup file not found: ${filePath}`);
      }
      
      const backupData: BackupData = JSON.parse(readFileSync(filePath, 'utf-8'));
      
      // Clear existing data
      await prisma.project.deleteMany();
      await prisma.projectCategory.deleteMany();
      await prisma.user.deleteMany();
      
      // Restore users first
      for (const user of backupData.users) {
        await prisma.user.create({
          data: {
            id: user.id,
            email: user.email,
            name: user.name,
            bio: user.bio,
          },
        });
      }
      
      // Restore categories
      for (const category of backupData.categories) {
        await prisma.projectCategory.create({
          data: {
            id: category.id,
            name: category.name,
            slug: category.slug,
            color: category.color,
            description: category.description,
          },
        });
      }
      
      // Restore projects
      for (const project of backupData.projects) {
        await prisma.project.create({
          data: {
            id: project.id,
            title: project.title,
            slug: project.slug,
            description: project.description,
            longDescription: project.longDescription,
            image: project.image,
            liveUrl: project.liveUrl,
            githubUrl: project.githubUrl,
            technologies: project.technologies,
            featured: project.featured,
            status: project.status,
            startDate: project.startDate ? new Date(project.startDate) : null,
            endDate: project.endDate ? new Date(project.endDate) : null,
            views: project.views,
            likes: project.likes,
            authorId: project.authorId,
            caseStudy: project.caseStudy,
            metrics: project.metrics,
            testimonial: project.testimonial,
            images: project.images,
            seo: project.seo,
            createdAt: new Date(project.createdAt),
            updatedAt: new Date(project.updatedAt),
          },
        });
      }
      
      console.log(`✅ Backup restored successfully from: ${filePath}`);
      console.log(`📊 Restored ${backupData.projects.length} projects, ${backupData.users.length} users, ${backupData.categories.length} categories`);
      
    } catch (error) {
      console.error('❌ Backup restoration failed:', error);
      throw error;
    } finally {
      await prisma.$disconnect();
    }
  }
  
  static async validateBackup(backupPath?: string): Promise<boolean> {
    try {
      const filePath = backupPath || join(this.BACKUP_DIR, this.BACKUP_FILE);
      
      if (!existsSync(filePath)) {
        console.log('⚠️  No backup file found');
        return false;
      }
      
      const backupData: BackupData = JSON.parse(readFileSync(filePath, 'utf-8'));
      
      const isValid = (
        Array.isArray(backupData.projects) &&
        Array.isArray(backupData.users) &&
        Array.isArray(backupData.categories) &&
        backupData.timestamp &&
        backupData.version
      );
      
      if (isValid) {
        console.log(`✅ Backup validation successful`);
        console.log(`📊 Backup contains: ${backupData.projects.length} projects, ${backupData.users.length} users, ${backupData.categories.length} categories`);
        console.log(`📅 Backup timestamp: ${backupData.timestamp}`);
      } else {
        console.log('❌ Backup validation failed: Invalid backup format');
      }
      
      return isValid;
    } catch (error) {
      console.error('❌ Backup validation error:', error);
      return false;
    }
  }
}

export const createBackup = async () => {
  await BackupSystem.createBackup();
};

export const restoreBackup = async (backupPath?: string) => {
  await BackupSystem.restoreBackup(backupPath);
};

export const validateBackup = async (backupPath?: string) => {
  return await BackupSystem.validateBackup(backupPath);
};