const skillsData = [
  { name: 'React', category: 'FRONTEND', level: 'EXPERT', featured: true, order: 1 },
  { name: 'TypeScript', category: 'FRONTEND', level: 'EXPERT', featured: true, order: 2 },
  { name: 'Next.js', category: 'FRONTEND', level: 'EXPERT', featured: true, order: 3 },
  { name: 'Tailwind CSS', category: 'FRONTEND', level: 'ADVANCED', featured: true, order: 4 },
  { name: 'JavaScript', category: 'FRONTEND', level: 'EXPERT', featured: true, order: 5 },
  { name: 'HTML5', category: 'FRONTEND', level: 'EXPERT', featured: false, order: 6 },
  { name: 'Node.js', category: 'BACKEND', level: 'ADVANCED', featured: true, order: 7 },
  { name: 'Python', category: 'BACKEND', level: 'ADVANCED', featured: true, order: 8 },
  { name: 'PostgreSQL', category: 'BACKEND', level: 'ADVANCED', featured: true, order: 9 },
  { name: 'Prisma', category: 'BACKEND', level: 'ADVANCED', featured: true, order: 10 },
  { name: 'GraphQL', category: 'BACKEND', level: 'INTERMEDIATE', featured: false, order: 11 },
  { name: 'REST APIs', category: 'BACKEND', level: 'EXPERT', featured: true, order: 12 },
  { name: 'Git', category: 'DEVOPS', level: 'EXPERT', featured: true, order: 13 },
  { name: 'Docker', category: 'DEVOPS', level: 'INTERMEDIATE', featured: true, order: 14 },
  { name: 'AWS', category: 'DEVOPS', level: 'INTERMEDIATE', featured: true, order: 15 },
  { name: 'Vercel', category: 'DEVOPS', level: 'ADVANCED', featured: true, order: 16 },
  { name: 'GitHub Actions', category: 'DEVOPS', level: 'INTERMEDIATE', featured: false, order: 17 },
  { name: 'VS Code', category: 'DEVOPS', level: 'EXPERT', featured: false, order: 18 },
];

async function seedSkills() {
  console.log('🌱 Seeding skills via API...');
  
  // You'll need to replace with your actual API key
  const API_KEY = process.env.ADMIN_API_KEY || 'your-admin-api-key';
  const BASE_URL = 'https://portfolio-4u8c.vercel.app';
  
  try {
    for (const skill of skillsData) {
      const response = await fetch(`${BASE_URL}/api/skills`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY
        },
        body: JSON.stringify(skill)
      });
      
      if (response.ok) {
        console.log(`✅ Created skill: ${skill.name}`);
      } else {
        console.log(`❌ Failed to create skill: ${skill.name}`);
      }
    }
    
    console.log('🎉 Skills seeding completed!');
  } catch (error) {
    console.error('❌ Error seeding skills:', error);
  }
}

// Run if called directly
if (require.main === module) {
  seedSkills();
}

module.exports = { seedSkills, skillsData };