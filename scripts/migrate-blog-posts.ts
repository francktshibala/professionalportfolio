import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const prisma = new PrismaClient();

interface BlogPostMeta {
  title: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
  category: string;
  published: boolean;
  featured?: boolean;
  image?: string;
}

async function migrateBlogPosts() {
  console.log('Starting blog posts migration...');
  
  try {
    // Ensure we have a user to associate posts with
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

    // Get all MDX files from the blog directory
    const blogDir = path.join(process.cwd(), 'src', 'content', 'blog');
    const files = fs.readdirSync(blogDir).filter(file => file.endsWith('.mdx'));
    
    console.log(`Found ${files.length} blog post files`);

    // Create/update post categories
    const categories = new Set<string>();
    const postsData: Array<{
      meta: BlogPostMeta;
      content: string;
      slug: string;
    }> = [];

    // Parse all MDX files
    for (const file of files) {
      const filePath = path.join(blogDir, file);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data: frontmatter, content } = matter(fileContent);
      
      const slug = file.replace('.mdx', '');
      const meta = frontmatter as BlogPostMeta;
      
      categories.add(meta.category);
      postsData.push({ meta, content, slug });
    }

    // Create post categories
    for (const categoryName of categories) {
      const slug = categoryName.toLowerCase().replace(/\s+/g, '-');
      await prisma.postCategory.upsert({
        where: { slug },
        update: {},
        create: {
          name: categoryName,
          slug,
          color: getCategoryColor(categoryName),
        },
      });
    }
    console.log(`Created/updated ${categories.size} post categories`);

    // Migrate posts
    let migratedCount = 0;
    for (const { meta, content, slug } of postsData) {
      const categorySlug = meta.category.toLowerCase().replace(/\s+/g, '-');
      const category = await prisma.postCategory.findUnique({
        where: { slug: categorySlug },
      });

      if (!category) {
        console.warn(`Category not found for post ${slug}`);
        continue;
      }

      const publishedAt = meta.published ? new Date(meta.date) : null;
      const readTime = calculateReadTime(content);

      const postData = {
        title: meta.title,
        slug,
        excerpt: meta.description,
        content,
        published: meta.published,
        publishedAt,
        readTime,
        tags: meta.tags,
        featured: meta.featured || false,
        views: Math.floor(Math.random() * 500), // Random views for demo
        likes: Math.floor(Math.random() * 50), // Random likes for demo
        authorId: user.id,
        categories: {
          connect: { id: category.id },
        },
      };

      await prisma.post.upsert({
        where: { slug },
        update: postData,
        create: postData,
      });
      
      migratedCount++;
      console.log(`Migrated post: ${meta.title}`);
    }

    console.log(`Successfully migrated ${migratedCount} blog posts`);
    
    // Verify migration
    const totalPosts = await prisma.post.count();
    console.log(`Total posts in database: ${totalPosts}`);
    
  } catch (error) {
    console.error('Error during blog posts migration:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    'General': '#6B7280',
    'Development': '#3B82F6',
    'Design': '#8B5CF6',
    'Technology': '#10B981',
    'Tutorial': '#F59E0B',
    'News': '#EF4444',
  };
  return colors[category] || '#6B7280';
}

function calculateReadTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

if (require.main === module) {
  migrateBlogPosts()
    .then(() => {
      console.log('Blog posts migration completed successfully!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Blog posts migration failed:', error);
      process.exit(1);
    });
}

export { migrateBlogPosts };