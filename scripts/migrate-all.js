// Simplified migration script for immediate execution
const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function runMigration() {
  console.log('🚀 Starting data migration...\n');
  
  try {
    // Check database connection
    await prisma.$connect();
    console.log('✅ Database connected successfully');
    
    // Get current counts
    const currentCounts = {
      users: await prisma.user.count(),
      posts: await prisma.post.count(),
      projects: await prisma.project.count(),
      skills: await prisma.skill.count(),
    };
    
    console.log('📊 Current database state:');
    console.log(JSON.stringify(currentCounts, null, 2));
    
    // If database already has data, create backup
    if (currentCounts.users > 0 || currentCounts.posts > 0 || currentCounts.projects > 0 || currentCounts.skills > 0) {
      console.log('\n📦 Creating backup of existing data...');
      const backupData = {
        timestamp: new Date().toISOString(),
        data: {
          users: await prisma.user.findMany(),
          posts: await prisma.post.findMany(),
          projects: await prisma.project.findMany(),
          skills: await prisma.skill.findMany(),
        }
      };
      
      const backupDir = path.join(process.cwd(), 'backups');
      if (!fs.existsSync(backupDir)) {
        fs.mkdirSync(backupDir, { recursive: true });
      }
      
      const backupPath = path.join(backupDir, `backup-${Date.now()}.json`);
      fs.writeFileSync(backupPath, JSON.stringify(backupData, null, 2));
      console.log(`✅ Backup created at: ${backupPath}`);
    }
    
    // Run seed script to ensure basic data
    console.log('\n🌱 Running database seed...');
    const seedScript = require('../prisma/seed.js');
    if (typeof seedScript === 'function') {
      await seedScript();
    }
    
    // Get final counts
    const finalCounts = {
      users: await prisma.user.count(),
      posts: await prisma.post.count(),
      projects: await prisma.project.count(),
      skills: await prisma.skill.count(),
    };
    
    console.log('\n📊 Final database state:');
    console.log(JSON.stringify(finalCounts, null, 2));
    
    console.log('\n🎉 Migration completed successfully!');
    console.log('\n🔄 Next steps:');
    console.log('1. Update frontend components to use database data');
    console.log('2. Test dynamic content rendering');
    console.log('3. Verify admin dashboard functionality');
    
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

if (require.main === module) {
  runMigration()
    .then(() => {
      console.log('\n✅ Migration process completed!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Migration process failed:', error);
      process.exit(1);
    });
}