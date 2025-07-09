import { PrismaClient } from '@prisma/client';
import { projects, technologies } from '../src/lib/projects';

const prisma = new PrismaClient();

async function migrateProjects() {
  console.log('Starting project migration...');
  
  try {
    // First, ensure we have a user to associate projects with
    let user = await prisma.user.findFirst();
    if (!user) {
      user = await prisma.user.create({
        data: {
          email: 'admin@portfolio.com',
          name: 'Portfolio Admin',
          bio: 'Professional full-stack developer and technical architect',
        },
      });
      console.log('Created admin user');
    }

    // Create project categories if they don't exist
    const categories = Array.from(new Set(projects.map(p => p.category)));
    for (const categoryName of categories) {
      const slug = categoryName.toLowerCase().replace(/\s+/g, '-');
      await prisma.projectCategory.upsert({
        where: { slug },
        update: {},
        create: {
          name: categoryName,
          slug,
          color: getCategoryColor(categoryName),
        },
      });
    }
    console.log(`Created/updated ${categories.length} project categories`);

    // Migrate projects
    let migratedCount = 0;
    for (const project of projects) {
      const categorySlug = project.category.toLowerCase().replace(/\s+/g, '-');
      const category = await prisma.projectCategory.findUnique({
        where: { slug: categorySlug },
      });

      if (!category) {
        console.warn(`Category not found for project ${project.id}`);
        continue;
      }

      const projectData = {
        title: project.title,
        slug: project.id,
        description: project.description,
        longDescription: project.shortDescription,
        image: project.images[0]?.url || null,
        liveUrl: project.demoUrl || null,
        githubUrl: project.githubUrl || null,
        technologies: project.technologies.map(tech => tech.name),
        featured: project.featured,
        status: mapProjectStatus(project.status),
        startDate: project.createdAt ? new Date(project.createdAt) : null,
        endDate: project.status === 'completed' ? new Date(project.updatedAt) : null,
        views: Math.floor(Math.random() * 1000), // Random views for demo
        likes: Math.floor(Math.random() * 100), // Random likes for demo
        authorId: user.id,
        
        // Store rich content as JSON
        caseStudy: project.caseStudy || null,
        metrics: project.metrics || null,
        testimonial: project.testimonial || null,
        images: project.images || null,
        seo: project.seo || null,
        
        categories: {
          connect: { id: category.id },
        },
      };

      await prisma.project.upsert({
        where: { slug: project.id },
        update: projectData,
        create: projectData,
      });
      
      migratedCount++;
      console.log(`Migrated project: ${project.title}`);
    }

    console.log(`Successfully migrated ${migratedCount} projects`);
    
    // Verify migration
    const totalProjects = await prisma.project.count();
    console.log(`Total projects in database: ${totalProjects}`);
    
  } catch (error) {
    console.error('Error during migration:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    'e-commerce': '#10B981',
    'web-app': '#3B82F6',
    'ai-ml': '#8B5CF6',
    'dashboard': '#F59E0B',
    'open-source': '#EF4444',
    'mobile': '#06B6D4',
    'desktop': '#84CC16',
  };
  return colors[category] || '#6B7280';
}

function mapProjectStatus(status: string) {
  const statusMap: Record<string, 'ACTIVE' | 'ARCHIVED' | 'DRAFT' | 'MAINTENANCE'> = {
    'completed': 'ACTIVE',
    'in-progress': 'ACTIVE',
    'maintenance': 'MAINTENANCE',
    'draft': 'DRAFT',
    'archived': 'ARCHIVED',
  };
  return statusMap[status] || 'ACTIVE';
}

if (require.main === module) {
  migrateProjects()
    .then(() => {
      console.log('Migration completed successfully!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Migration failed:', error);
      process.exit(1);
    });
}

export { migrateProjects };