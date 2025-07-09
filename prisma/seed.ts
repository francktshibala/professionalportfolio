import { PrismaClient } from '@prisma/client'
import { SkillCategory, SkillLevel, ProjectStatus } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create default user
  const user = await prisma.user.upsert({
    where: { email: 'contact@example.com' },
    update: {},
    create: {
      email: 'contact@example.com',
      name: 'Portfolio Owner',
      bio: 'Full-stack developer passionate about creating amazing web experiences',
      github: 'https://github.com/username',
      linkedin: 'https://linkedin.com/in/username',
      twitter: 'https://twitter.com/username',
      website: 'https://example.com'
    }
  })

  // Create post categories
  const frontendCategory = await prisma.postCategory.upsert({
    where: { slug: 'frontend' },
    update: {},
    create: {
      name: 'Frontend',
      slug: 'frontend',
      color: '#3B82F6'
    }
  })

  const backendCategory = await prisma.postCategory.upsert({
    where: { slug: 'backend' },
    update: {},
    create: {
      name: 'Backend',
      slug: 'backend',
      color: '#10B981'
    }
  })

  const tutorialCategory = await prisma.postCategory.upsert({
    where: { slug: 'tutorial' },
    update: {},
    create: {
      name: 'Tutorial',
      slug: 'tutorial',
      color: '#F59E0B'
    }
  })

  // Create project categories
  const webAppCategory = await prisma.projectCategory.upsert({
    where: { slug: 'web-app' },
    update: {},
    create: {
      name: 'Web Application',
      slug: 'web-app',
      color: '#8B5CF6'
    }
  })

  const mobileAppCategory = await prisma.projectCategory.upsert({
    where: { slug: 'mobile-app' },
    update: {},
    create: {
      name: 'Mobile Application',
      slug: 'mobile-app',
      color: '#EF4444'
    }
  })

  // Create skills
  const skills = [
    { name: 'React', category: SkillCategory.FRONTEND, level: SkillLevel.EXPERT, featured: true, order: 1 },
    { name: 'Next.js', category: SkillCategory.FRONTEND, level: SkillLevel.ADVANCED, featured: true, order: 2 },
    { name: 'TypeScript', category: SkillCategory.FRONTEND, level: SkillLevel.ADVANCED, featured: true, order: 3 },
    { name: 'JavaScript', category: SkillCategory.FRONTEND, level: SkillLevel.EXPERT, featured: true, order: 4 },
    { name: 'Tailwind CSS', category: SkillCategory.FRONTEND, level: SkillLevel.ADVANCED, featured: true, order: 5 },
    { name: 'Node.js', category: SkillCategory.BACKEND, level: SkillLevel.ADVANCED, featured: true, order: 6 },
    { name: 'PostgreSQL', category: SkillCategory.DATABASE, level: SkillLevel.INTERMEDIATE, featured: true, order: 7 },
    { name: 'Prisma', category: SkillCategory.DATABASE, level: SkillLevel.INTERMEDIATE, featured: true, order: 8 },
    { name: 'HTML5', category: SkillCategory.FRONTEND, level: SkillLevel.EXPERT, featured: false, order: 9 },
    { name: 'CSS3', category: SkillCategory.FRONTEND, level: SkillLevel.EXPERT, featured: false, order: 10 },
    { name: 'Express.js', category: SkillCategory.BACKEND, level: SkillLevel.ADVANCED, featured: false, order: 11 },
    { name: 'Docker', category: SkillCategory.DEVOPS, level: SkillLevel.INTERMEDIATE, featured: false, order: 12 },
    { name: 'Git', category: SkillCategory.OTHER, level: SkillLevel.ADVANCED, featured: false, order: 13 },
    { name: 'Figma', category: SkillCategory.DESIGN, level: SkillLevel.INTERMEDIATE, featured: false, order: 14 },
    { name: 'Jest', category: SkillCategory.TESTING, level: SkillLevel.INTERMEDIATE, featured: false, order: 15 }
  ]

  for (const skill of skills) {
    await prisma.skill.upsert({
      where: { name: skill.name },
      update: {},
      create: skill
    })
  }

  // Create sample blog posts
  const posts = [
    {
      title: 'Getting Started with Next.js 14',
      slug: 'getting-started-nextjs-14',
      excerpt: 'Learn how to build modern web applications with Next.js 14 and its latest features.',
      content: `# Getting Started with Next.js 14

Next.js 14 brings exciting new features and improvements that make building React applications even better. In this post, we'll explore the key features and how to get started.

## Key Features

- **App Router**: The new app directory structure
- **Server Components**: Better performance with server-side rendering
- **Turbopack**: Faster builds and hot reloading
- **Improved TypeScript support**

## Getting Started

\`\`\`bash
npx create-next-app@latest my-app
cd my-app
npm run dev
\`\`\`

This will create a new Next.js application with all the latest features enabled by default.

## Conclusion

Next.js 14 continues to push the boundaries of what's possible with React applications. The new features make it easier than ever to build fast, scalable web applications.`,
      published: true,
      publishedAt: new Date('2024-01-15'),
      readTime: 5,
      tags: ['nextjs', 'react', 'javascript', 'tutorial'],
      featured: true,
      authorId: user.id,
      categories: {
        connect: [{ id: frontendCategory.id }, { id: tutorialCategory.id }]
      }
    },
    {
      title: 'Building REST APIs with Node.js and Express',
      slug: 'building-rest-apis-nodejs-express',
      excerpt: 'A comprehensive guide to building scalable REST APIs using Node.js and Express framework.',
      content: `# Building REST APIs with Node.js and Express

Building robust REST APIs is crucial for modern web applications. In this guide, we'll explore how to create scalable APIs using Node.js and Express.

## Setting Up the Project

First, let's initialize a new Node.js project:

\`\`\`bash
npm init -y
npm install express cors helmet morgan
npm install -D nodemon @types/node typescript
\`\`\`

## Creating the Server

Here's a basic Express server setup:

\`\`\`javascript
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});
\`\`\`

## Best Practices

1. **Use middleware for common functionality**
2. **Implement proper error handling**
3. **Add request validation**
4. **Use environment variables for configuration**
5. **Implement proper logging**

## Conclusion

Building REST APIs with Node.js and Express is straightforward once you understand the fundamentals. Following best practices ensures your APIs are secure, scalable, and maintainable.`,
      published: true,
      publishedAt: new Date('2024-01-10'),
      readTime: 8,
      tags: ['nodejs', 'express', 'api', 'backend'],
      featured: true,
      authorId: user.id,
      categories: {
        connect: [{ id: backendCategory.id }, { id: tutorialCategory.id }]
      }
    }
  ]

  for (const post of posts) {
    await prisma.post.upsert({
      where: { slug: post.slug },
      update: {},
      create: post
    })
  }

  // Create sample projects
  const projects = [
    {
      title: 'E-commerce Platform',
      slug: 'ecommerce-platform',
      description: 'A full-featured e-commerce platform built with Next.js, TypeScript, and PostgreSQL.',
      longDescription: `A comprehensive e-commerce solution featuring:
      
- User authentication and authorization
- Product catalog with search and filtering
- Shopping cart and checkout process
- Order management and tracking
- Admin dashboard for inventory management
- Payment integration with Stripe
- Responsive design for all devices`,
      technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'Stripe', 'Tailwind CSS'],
      featured: true,
      status: ProjectStatus.ACTIVE,
      startDate: new Date('2023-06-01'),
      endDate: new Date('2023-12-01'),
      authorId: user.id,
      categories: {
        connect: [{ id: webAppCategory.id }]
      }
    },
    {
      title: 'Task Management App',
      slug: 'task-management-app',
      description: 'A collaborative task management application with real-time updates.',
      longDescription: `A modern task management solution with:
      
- Real-time collaboration features
- Project and task organization
- Team management and permissions
- Calendar integration
- Progress tracking and analytics
- Mobile-responsive design`,
      technologies: ['React', 'Node.js', 'Socket.io', 'MongoDB', 'Express'],
      featured: true,
      status: ProjectStatus.ACTIVE,
      startDate: new Date('2023-09-01'),
      endDate: new Date('2024-02-01'),
      authorId: user.id,
      categories: {
        connect: [{ id: webAppCategory.id }]
      }
    },
    {
      title: 'Weather Mobile App',
      slug: 'weather-mobile-app',
      description: 'A React Native weather application with location-based forecasts.',
      longDescription: `A comprehensive weather app featuring:
      
- Current weather conditions
- 7-day weather forecast
- Location-based weather data
- Interactive weather maps
- Weather alerts and notifications
- Offline data caching`,
      technologies: ['React Native', 'TypeScript', 'REST API', 'AsyncStorage'],
      featured: false,
      status: ProjectStatus.ARCHIVED,
      startDate: new Date('2023-03-01'),
      endDate: new Date('2023-05-01'),
      authorId: user.id,
      categories: {
        connect: [{ id: mobileAppCategory.id }]
      }
    }
  ]

  for (const project of projects) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: {},
      create: project
    })
  }

  console.log('Database seeded successfully!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })