import { createBackup } from './backup-database';
import { migrateProjects } from './migrate-projects';
import { migrateBlogPosts } from './migrate-blog-posts';
import { migrateSkills } from './migrate-skills';

async function runMigration() {
  console.log('🚀 Starting comprehensive data migration...\n');
  
  try {
    // Step 1: Create backup before migration
    console.log('📦 Step 1: Creating pre-migration backup...');
    const backupPath = await createBackup(`pre-migration-${Date.now()}.json`);
    console.log(`✅ Backup created at: ${backupPath}\n`);
    
    // Step 2: Migrate skills data
    console.log('🎯 Step 2: Migrating skills data...');
    await migrateSkills();
    console.log('✅ Skills migration completed\n');
    
    // Step 3: Migrate projects data
    console.log('📂 Step 3: Migrating projects data...');
    await migrateProjects();
    console.log('✅ Projects migration completed\n');
    
    // Step 4: Migrate blog posts
    console.log('📝 Step 4: Migrating blog posts...');
    await migrateBlogPosts();
    console.log('✅ Blog posts migration completed\n');
    
    // Step 5: Create post-migration backup
    console.log('📦 Step 5: Creating post-migration backup...');
    const postBackupPath = await createBackup(`post-migration-${Date.now()}.json`);
    console.log(`✅ Post-migration backup created at: ${postBackupPath}\n`);
    
    console.log('🎉 Migration completed successfully!');
    console.log('\n📊 Migration Summary:');
    console.log('- ✅ Skills migrated from static data');
    console.log('- ✅ Projects migrated from static data');
    console.log('- ✅ Blog posts migrated from MDX files');
    console.log('- ✅ Database backups created');
    console.log('\n🔄 Next steps:');
    console.log('1. Update frontend components to use database data');
    console.log('2. Test dynamic content rendering');
    console.log('3. Verify admin dashboard functionality');
    console.log('4. Test performance with dynamic data');
    
  } catch (error) {
    console.error('❌ Migration failed:', error);
    console.log('\n🔄 Rollback instructions:');
    console.log('1. Check the backup files in the /backups directory');
    console.log('2. Use: npm run backup restore <backup-file>');
    console.log('3. Fix any issues and retry migration');
    
    process.exit(1);
  }
}

// Validation function to check prerequisites
async function validatePrerequisites(): Promise<boolean> {
  console.log('🔍 Validating prerequisites...');
  
  try {
    // Check if required dependencies are installed
    const requiredPackages = ['gray-matter'];
    
    for (const pkg of requiredPackages) {
      try {
        require(pkg);
        console.log(`✅ ${pkg} is installed`);
      } catch (error) {
        console.log(`❌ ${pkg} is not installed`);
        console.log(`Please run: npm install ${pkg}`);
        return false;
      }
    }
    
    // Check if database is accessible
    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();
    
    try {
      await prisma.$connect();
      console.log('✅ Database connection successful');
      await prisma.$disconnect();
    } catch (error) {
      console.log('❌ Database connection failed');
      console.log('Please check your DATABASE_URL environment variable');
      return false;
    }
    
    console.log('✅ All prerequisites validated\n');
    return true;
    
  } catch (error) {
    console.error('❌ Prerequisites validation failed:', error);
    return false;
  }
}

if (require.main === module) {
  validatePrerequisites()
    .then((isValid) => {
      if (isValid) {
        return runMigration();
      } else {
        console.log('❌ Prerequisites not met. Please fix the issues above.');
        process.exit(1);
      }
    })
    .then(() => {
      console.log('\n🎉 All migrations completed successfully!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Migration process failed:', error);
      process.exit(1);
    });
}

export { runMigration, validatePrerequisites };