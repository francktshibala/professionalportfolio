import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

interface BackupData {
  timestamp: string;
  version: string;
  data: {
    users: any[];
    posts: any[];
    projects: any[];
    skills: any[];
    postCategories: any[];
    projectCategories: any[];
    contacts: any[];
    analytics: any[];
  };
}

async function createBackup(backupPath?: string): Promise<string> {
  console.log('Creating database backup...');
  
  try {
    // Create backup directory if it doesn't exist
    const backupDir = path.join(process.cwd(), 'backups');
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }

    // Generate backup filename with timestamp
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = backupPath || `backup-${timestamp}.json`;
    const fullPath = path.join(backupDir, filename);

    // Fetch all data from the database
    const [
      users,
      posts,
      projects,
      skills,
      postCategories,
      projectCategories,
      contacts,
      analytics
    ] = await Promise.all([
      prisma.user.findMany({
        include: {
          posts: true,
          projects: true,
        },
      }),
      prisma.post.findMany({
        include: {
          author: true,
          categories: true,
        },
      }),
      prisma.project.findMany({
        include: {
          author: true,
          categories: true,
        },
      }),
      prisma.skill.findMany(),
      prisma.postCategory.findMany({
        include: {
          posts: true,
        },
      }),
      prisma.projectCategory.findMany({
        include: {
          projects: true,
        },
      }),
      prisma.contact.findMany(),
      prisma.analytics.findMany(),
    ]);

    // Create backup data object
    const backupData: BackupData = {
      timestamp: new Date().toISOString(),
      version: '1.0.0',
      data: {
        users,
        posts,
        projects,
        skills,
        postCategories,
        projectCategories,
        contacts,
        analytics,
      },
    };

    // Write backup to file
    fs.writeFileSync(fullPath, JSON.stringify(backupData, null, 2));
    
    const stats = fs.statSync(fullPath);
    const fileSizeInBytes = stats.size;
    const fileSizeInMB = (fileSizeInBytes / (1024 * 1024)).toFixed(2);
    
    console.log(`Backup created successfully:`);
    console.log(`- File: ${fullPath}`);
    console.log(`- Size: ${fileSizeInMB} MB`);
    console.log(`- Records: ${JSON.stringify({
      users: users.length,
      posts: posts.length,
      projects: projects.length,
      skills: skills.length,
      postCategories: postCategories.length,
      projectCategories: projectCategories.length,
      contacts: contacts.length,
      analytics: analytics.length,
    }, null, 2)}`);
    
    return fullPath;
    
  } catch (error) {
    console.error('Error creating backup:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

async function restoreBackup(backupPath: string): Promise<void> {
  console.log(`Restoring database from backup: ${backupPath}`);
  
  try {
    // Check if backup file exists
    if (!fs.existsSync(backupPath)) {
      throw new Error(`Backup file not found: ${backupPath}`);
    }

    // Read backup data
    const backupContent = fs.readFileSync(backupPath, 'utf8');
    const backupData: BackupData = JSON.parse(backupContent);
    
    console.log(`Restoring backup from ${backupData.timestamp}`);
    
    // Clear existing data (in reverse order to handle foreign key constraints)
    await prisma.analytics.deleteMany();
    await prisma.contact.deleteMany();
    await prisma.post.deleteMany();
    await prisma.project.deleteMany();
    await prisma.skill.deleteMany();
    await prisma.postCategory.deleteMany();
    await prisma.projectCategory.deleteMany();
    await prisma.user.deleteMany();
    
    console.log('Cleared existing data');

    // Restore data (in correct order to handle foreign key constraints)
    // Users first
    for (const user of backupData.data.users) {
      const { posts, projects, ...userData } = user;
      await prisma.user.create({
        data: userData,
      });
    }
    console.log(`Restored ${backupData.data.users.length} users`);

    // Categories
    for (const category of backupData.data.postCategories) {
      const { posts, ...categoryData } = category;
      await prisma.postCategory.create({
        data: categoryData,
      });
    }
    console.log(`Restored ${backupData.data.postCategories.length} post categories`);

    for (const category of backupData.data.projectCategories) {
      const { projects, ...categoryData } = category;
      await prisma.projectCategory.create({
        data: categoryData,
      });
    }
    console.log(`Restored ${backupData.data.projectCategories.length} project categories`);

    // Skills
    for (const skill of backupData.data.skills) {
      await prisma.skill.create({
        data: skill,
      });
    }
    console.log(`Restored ${backupData.data.skills.length} skills`);

    // Posts
    for (const post of backupData.data.posts) {
      const { author, categories, ...postData } = post;
      await prisma.post.create({
        data: {
          ...postData,
          categories: {
            connect: categories.map((cat: any) => ({ id: cat.id })),
          },
        },
      });
    }
    console.log(`Restored ${backupData.data.posts.length} posts`);

    // Projects
    for (const project of backupData.data.projects) {
      const { author, categories, ...projectData } = project;
      await prisma.project.create({
        data: {
          ...projectData,
          categories: {
            connect: categories.map((cat: any) => ({ id: cat.id })),
          },
        },
      });
    }
    console.log(`Restored ${backupData.data.projects.length} projects`);

    // Contacts
    for (const contact of backupData.data.contacts) {
      await prisma.contact.create({
        data: contact,
      });
    }
    console.log(`Restored ${backupData.data.contacts.length} contacts`);

    // Analytics
    for (const analytic of backupData.data.analytics) {
      await prisma.analytics.create({
        data: analytic,
      });
    }
    console.log(`Restored ${backupData.data.analytics.length} analytics records`);

    console.log('Database restore completed successfully!');
    
  } catch (error) {
    console.error('Error restoring backup:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

async function listBackups(): Promise<string[]> {
  const backupDir = path.join(process.cwd(), 'backups');
  
  if (!fs.existsSync(backupDir)) {
    return [];
  }

  const files = fs.readdirSync(backupDir)
    .filter(file => file.endsWith('.json'))
    .sort()
    .reverse(); // Most recent first

  return files.map(file => path.join(backupDir, file));
}

async function validateBackup(backupPath: string): Promise<boolean> {
  try {
    const backupContent = fs.readFileSync(backupPath, 'utf8');
    const backupData: BackupData = JSON.parse(backupContent);
    
    // Basic validation
    if (!backupData.timestamp || !backupData.data) {
      return false;
    }

    const requiredTables = ['users', 'posts', 'projects', 'skills', 'postCategories', 'projectCategories'];
    for (const table of requiredTables) {
      if (!Array.isArray(backupData.data[table as keyof typeof backupData.data])) {
        return false;
      }
    }

    return true;
  } catch (error) {
    return false;
  }
}

// CLI handling
if (require.main === module) {
  const command = process.argv[2];
  const argument = process.argv[3];

  switch (command) {
    case 'create':
      createBackup(argument)
        .then((path) => {
          console.log(`Backup created at: ${path}`);
          process.exit(0);
        })
        .catch((error) => {
          console.error('Backup creation failed:', error);
          process.exit(1);
        });
      break;

    case 'restore':
      if (!argument) {
        console.error('Please provide backup file path');
        process.exit(1);
      }
      restoreBackup(argument)
        .then(() => {
          console.log('Backup restored successfully!');
          process.exit(0);
        })
        .catch((error) => {
          console.error('Backup restoration failed:', error);
          process.exit(1);
        });
      break;

    case 'list':
      listBackups()
        .then((backups) => {
          if (backups.length === 0) {
            console.log('No backups found');
          } else {
            console.log('Available backups:');
            backups.forEach((backup, index) => {
              console.log(`${index + 1}. ${backup}`);
            });
          }
          process.exit(0);
        })
        .catch((error) => {
          console.error('Failed to list backups:', error);
          process.exit(1);
        });
      break;

    case 'validate':
      if (!argument) {
        console.error('Please provide backup file path');
        process.exit(1);
      }
      validateBackup(argument)
        .then((isValid) => {
          if (isValid) {
            console.log('Backup file is valid');
            process.exit(0);
          } else {
            console.log('Backup file is invalid');
            process.exit(1);
          }
        })
        .catch((error) => {
          console.error('Backup validation failed:', error);
          process.exit(1);
        });
      break;

    default:
      console.log('Usage:');
      console.log('  npm run backup create [filename]  - Create a new backup');
      console.log('  npm run backup restore <filepath> - Restore from backup');
      console.log('  npm run backup list              - List available backups');
      console.log('  npm run backup validate <filepath> - Validate backup file');
      process.exit(1);
  }
}

export { createBackup, restoreBackup, listBackups, validateBackup };