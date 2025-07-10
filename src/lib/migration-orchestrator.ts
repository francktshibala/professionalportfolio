import { CoreMigrationService } from './core-migration';
import { BackupSystem } from './backup-system';

export class MigrationOrchestrator {
  static async performSafeMigration(): Promise<void> {
    console.log('🚀 Starting safe migration process...');
    
    try {
      // Step 1: Create backup before migration
      console.log('📋 Step 1: Creating backup...');
      await BackupSystem.createBackup();
      
      // Step 2: Validate backup
      console.log('📋 Step 2: Validating backup...');
      const isValidBackup = await BackupSystem.validateBackup();
      if (!isValidBackup) {
        throw new Error('Backup validation failed. Migration aborted.');
      }
      
      // Step 3: Perform core migration
      console.log('📋 Step 3: Performing core migration...');
      await CoreMigrationService.migrate();
      
      // Step 4: Verify migration success
      console.log('📋 Step 4: Verifying migration...');
      await this.verifyMigration();
      
      console.log('✅ Safe migration completed successfully!');
      
    } catch (error) {
      console.error('❌ Migration failed:', error);
      
      // Attempt to restore backup
      console.log('🔄 Attempting to restore from backup...');
      try {
        await BackupSystem.restoreBackup();
        console.log('✅ Backup restored successfully');
      } catch (restoreError) {
        console.error('❌ Backup restoration failed:', restoreError);
        throw new Error(`Migration failed and backup restoration failed: ${restoreError}`);
      }
      
      throw error;
    }
  }
  
  private static async verifyMigration(): Promise<void> {
    const { PrismaClient } = await import('@prisma/client');
    const prisma = new PrismaClient();
    
    try {
      const projectCount = await prisma.project.count();
      const userCount = await prisma.user.count();
      
      console.log(`📊 Migration verification:`);
      console.log(`   - Projects: ${projectCount}`);
      console.log(`   - Users: ${userCount}`);
      
      if (projectCount === 0) {
        throw new Error('No projects found after migration');
      }
      
      if (userCount === 0) {
        throw new Error('No users found after migration');
      }
      
      console.log('✅ Migration verification passed');
      
    } catch (error) {
      console.error('❌ Migration verification failed:', error);
      throw error;
    } finally {
      await prisma.$disconnect();
    }
  }
}

export const runSafeMigration = async () => {
  await MigrationOrchestrator.performSafeMigration();
};