import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const skillsData = [
  // Frontend Skills
  { name: 'React', category: 'FRONTEND', level: 'EXPERT', featured: true, order: 1 },
  { name: 'TypeScript', category: 'FRONTEND', level: 'EXPERT', featured: true, order: 2 },
  { name: 'Next.js', category: 'FRONTEND', level: 'EXPERT', featured: true, order: 3 },
  { name: 'Tailwind CSS', category: 'FRONTEND', level: 'ADVANCED', featured: true, order: 4 },
  { name: 'JavaScript', category: 'FRONTEND', level: 'EXPERT', featured: true, order: 5 },
  { name: 'HTML5', category: 'FRONTEND', level: 'EXPERT', featured: false, order: 6 },
  
  // Backend Skills
  { name: 'Node.js', category: 'BACKEND', level: 'ADVANCED', featured: true, order: 7 },
  { name: 'Python', category: 'BACKEND', level: 'ADVANCED', featured: true, order: 8 },
  { name: 'PostgreSQL', category: 'BACKEND', level: 'ADVANCED', featured: true, order: 9 },
  { name: 'Prisma', category: 'BACKEND', level: 'ADVANCED', featured: true, order: 10 },
  { name: 'GraphQL', category: 'BACKEND', level: 'INTERMEDIATE', featured: false, order: 11 },
  { name: 'REST APIs', category: 'BACKEND', level: 'EXPERT', featured: true, order: 12 },
  
  // DevOps Skills
  { name: 'Git', category: 'DEVOPS', level: 'EXPERT', featured: true, order: 13 },
  { name: 'Docker', category: 'DEVOPS', level: 'INTERMEDIATE', featured: true, order: 14 },
  { name: 'AWS', category: 'DEVOPS', level: 'INTERMEDIATE', featured: true, order: 15 },
  { name: 'Vercel', category: 'DEVOPS', level: 'ADVANCED', featured: true, order: 16 },
  { name: 'GitHub Actions', category: 'DEVOPS', level: 'INTERMEDIATE', featured: false, order: 17 },
  { name: 'VS Code', category: 'DEVOPS', level: 'EXPERT', featured: false, order: 18 },
];

async function seedSkills() {
  console.log('🌱 Seeding skills...');
  
  try {
    // Clear existing skills
    await prisma.skill.deleteMany();
    console.log('🗑️  Cleared existing skills');
    
    // Create new skills
    for (const skill of skillsData) {
      await prisma.skill.create({
        data: skill
      });
    }
    
    console.log(`✅ Created ${skillsData.length} skills`);
    
    // Verify seeding
    const count = await prisma.skill.count();
    console.log(`📊 Total skills in database: ${count}`);
    
  } catch (error) {
    console.error('❌ Error seeding skills:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedSkills();