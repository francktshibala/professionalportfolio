import { PrismaClient } from '@prisma/client';
import { SkillCategory, SkillLevel } from '@prisma/client';

const prisma = new PrismaClient();

// Skills data from SkillsGrid.tsx - most comprehensive
const skillCategories = [
  {
    title: 'Frontend',
    skills: [
      { name: 'React', level: 'Expert' },
      { name: 'TypeScript', level: 'Expert' },
      { name: 'Next.js', level: 'Advanced' },
      { name: 'Tailwind CSS', level: 'Advanced' },
      { name: 'JavaScript', level: 'Expert' },
      { name: 'HTML/CSS', level: 'Expert' },
    ],
  },
  {
    title: 'Backend',
    skills: [
      { name: 'Node.js', level: 'Advanced' },
      { name: 'Python', level: 'Intermediate' },
      { name: 'PostgreSQL', level: 'Advanced' },
      { name: 'MongoDB', level: 'Intermediate' },
      { name: 'REST APIs', level: 'Advanced' },
      { name: 'GraphQL', level: 'Intermediate' },
    ],
  },
  {
    title: 'Tools & DevOps',
    skills: [
      { name: 'Git', level: 'Expert' },
      { name: 'Docker', level: 'Intermediate' },
      { name: 'AWS', level: 'Intermediate' },
      { name: 'Vercel', level: 'Advanced' },
      { name: 'Jest', level: 'Advanced' },
      { name: 'Cypress', level: 'Intermediate' },
    ],
  },
];

// Additional skills from AboutContent.tsx
const additionalSkills = [
  { name: 'Framer Motion', category: 'Frontend', level: 'Advanced' },
  { name: 'Redis', category: 'Backend', level: 'Intermediate' },
  { name: 'Kubernetes', category: 'DevOps', level: 'Intermediate' },
  { name: 'CI/CD', category: 'DevOps', level: 'Advanced' },
  { name: 'Terraform', category: 'DevOps', level: 'Intermediate' },
  { name: 'Figma', category: 'Design', level: 'Advanced' },
  { name: 'Linux', category: 'DevOps', level: 'Advanced' },
];

async function migrateSkills() {
  console.log('Starting skills migration...');
  
  try {
    let skillOrder = 1;
    let migratedCount = 0;

    // Process main skill categories
    for (const category of skillCategories) {
      for (const skill of category.skills) {
        const skillData = {
          name: skill.name,
          category: mapSkillCategory(category.title),
          level: mapSkillLevel(skill.level),
          order: skillOrder++,
          featured: isFeaturedSkill(skill.name),
          icon: getSkillIcon(skill.name),
          color: getSkillColor(skill.name),
          description: getSkillDescription(skill.name),
        };

        await prisma.skill.upsert({
          where: { name: skill.name },
          update: skillData,
          create: skillData,
        });

        migratedCount++;
        console.log(`Migrated skill: ${skill.name} (${category.title})`);
      }
    }

    // Process additional skills
    for (const skill of additionalSkills) {
      const skillData = {
        name: skill.name,
        category: mapSkillCategory(skill.category),
        level: mapSkillLevel(skill.level),
        order: skillOrder++,
        featured: isFeaturedSkill(skill.name),
        icon: getSkillIcon(skill.name),
        color: getSkillColor(skill.name),
        description: getSkillDescription(skill.name),
      };

      await prisma.skill.upsert({
        where: { name: skill.name },
        update: skillData,
        create: skillData,
      });

      migratedCount++;
      console.log(`Migrated additional skill: ${skill.name} (${skill.category})`);
    }

    console.log(`Successfully migrated ${migratedCount} skills`);
    
    // Verify migration
    const totalSkills = await prisma.skill.count();
    const featuredSkills = await prisma.skill.count({ where: { featured: true } });
    console.log(`Total skills in database: ${totalSkills}`);
    console.log(`Featured skills: ${featuredSkills}`);
    
  } catch (error) {
    console.error('Error during skills migration:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

function mapSkillCategory(categoryName: string): SkillCategory {
  const categoryMap: Record<string, SkillCategory> = {
    'Frontend': SkillCategory.FRONTEND,
    'Backend': SkillCategory.BACKEND,
    'Tools & DevOps': SkillCategory.DEVOPS,
    'DevOps': SkillCategory.DEVOPS,
    'Design': SkillCategory.DESIGN,
    'Database': SkillCategory.DATABASE,
    'Testing': SkillCategory.TESTING,
    'Tools': SkillCategory.OTHER,
  };
  return categoryMap[categoryName] || SkillCategory.OTHER;
}

function mapSkillLevel(levelName: string): SkillLevel {
  const levelMap: Record<string, SkillLevel> = {
    'Expert': SkillLevel.EXPERT,
    'Advanced': SkillLevel.ADVANCED,
    'Intermediate': SkillLevel.INTERMEDIATE,
    'Beginner': SkillLevel.BEGINNER,
  };
  return levelMap[levelName] || SkillLevel.INTERMEDIATE;
}

function isFeaturedSkill(skillName: string): boolean {
  const featuredSkills = [
    'React', 'TypeScript', 'Next.js', 'JavaScript', 'Node.js', 
    'PostgreSQL', 'Tailwind CSS', 'Git', 'Docker', 'AWS'
  ];
  return featuredSkills.includes(skillName);
}

function getSkillIcon(skillName: string): string | null {
  const skillIcons: Record<string, string> = {
    'React': 'react',
    'TypeScript': 'typescript',
    'Next.js': 'nextjs',
    'JavaScript': 'javascript',
    'Node.js': 'nodejs',
    'PostgreSQL': 'postgresql',
    'MongoDB': 'mongodb',
    'Tailwind CSS': 'tailwindcss',
    'Git': 'git',
    'Docker': 'docker',
    'AWS': 'aws',
    'Python': 'python',
    'HTML/CSS': 'html5',
    'Redis': 'redis',
    'GraphQL': 'graphql',
    'Jest': 'jest',
    'Cypress': 'cypress',
    'Kubernetes': 'kubernetes',
    'Figma': 'figma',
    'Linux': 'linux',
  };
  return skillIcons[skillName] || null;
}

function getSkillColor(skillName: string): string | null {
  const skillColors: Record<string, string> = {
    'React': '#61DAFB',
    'TypeScript': '#3178C6',
    'Next.js': '#000000',
    'JavaScript': '#F7DF1E',
    'Node.js': '#339933',
    'PostgreSQL': '#336791',
    'MongoDB': '#47A248',
    'Tailwind CSS': '#06B6D4',
    'Git': '#F05032',
    'Docker': '#2496ED',
    'AWS': '#232F3E',
    'Python': '#3776AB',
    'HTML/CSS': '#E34F26',
    'Redis': '#DC382D',
    'GraphQL': '#E10098',
    'Jest': '#C21325',
    'Cypress': '#17202C',
    'Kubernetes': '#326CE5',
    'Figma': '#F24E1E',
    'Linux': '#FCC624',
  };
  return skillColors[skillName] || null;
}

function getSkillDescription(skillName: string): string | null {
  const skillDescriptions: Record<string, string> = {
    'React': 'Component-based UI library for building interactive user interfaces',
    'TypeScript': 'Strongly typed programming language that builds on JavaScript',
    'Next.js': 'React framework with server-side rendering and static generation',
    'JavaScript': 'Dynamic programming language for web development',
    'Node.js': 'JavaScript runtime for server-side development',
    'PostgreSQL': 'Advanced open-source relational database',
    'MongoDB': 'NoSQL document database for flexible data storage',
    'Tailwind CSS': 'Utility-first CSS framework for rapid UI development',
    'Git': 'Distributed version control system',
    'Docker': 'Containerization platform for application deployment',
    'AWS': 'Cloud computing platform and services',
    'Python': 'High-level programming language for various applications',
    'HTML/CSS': 'Markup and styling languages for web development',
    'Redis': 'In-memory data structure store for caching',
    'GraphQL': 'Query language and runtime for APIs',
    'Jest': 'JavaScript testing framework',
    'Cypress': 'End-to-end testing framework',
    'Kubernetes': 'Container orchestration platform',
    'Figma': 'Design tool for UI/UX design and prototyping',
    'Linux': 'Open-source operating system',
  };
  return skillDescriptions[skillName] || null;
}

if (require.main === module) {
  migrateSkills()
    .then(() => {
      console.log('Skills migration completed successfully!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Skills migration failed:', error);
      process.exit(1);
    });
}

export { migrateSkills };