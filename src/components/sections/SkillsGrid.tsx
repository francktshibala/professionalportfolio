'use client';

import { Card } from '@/components/ui/Card';
import { Container } from '@/components/ui/Container';
import { Heading, Text } from '@/components/ui/Typography';
import { MotionDiv, slideUpVariants, staggerContainer } from '@/components/ui/MotionComponents';
import { useInView } from '@/hooks/useInView';
import { useEffect, useState } from 'react';

interface Skill {
  id: string;
  name: string;
  level: string;
  category: string;
  featured: boolean;
}

interface SkillCategory {
  title: string;
  skills: Skill[];
}

function SkillBadge({ skill }: { skill: { name: string; level: string } }) {
  const levelColors = {
    Expert: 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg',
    Advanced: 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg',
    Intermediate: 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg',
  };

  return (
    <MotionDiv 
      className="flex items-center justify-between p-4 rounded-xl border border-secondary-200 dark:border-secondary-700 bg-white dark:bg-secondary-900 hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
      variants={slideUpVariants}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <span className="font-semibold text-secondary-900 dark:text-secondary-100">{skill.name}</span>
      <span className={`px-3 py-1 rounded-full text-xs font-bold ${levelColors[skill.level as keyof typeof levelColors]}`}>
        {skill.level}
      </span>
    </MotionDiv>
  );
}

function getStaticSkills(): SkillCategory[] {
  return [
    {
      title: 'Frontend',
      skills: [
        { id: '1', name: 'React', level: 'Expert', category: 'FRONTEND', featured: true },
        { id: '2', name: 'TypeScript', level: 'Expert', category: 'FRONTEND', featured: true },
        { id: '3', name: 'Next.js', level: 'Expert', category: 'FRONTEND', featured: true },
        { id: '4', name: 'Tailwind CSS', level: 'Advanced', category: 'FRONTEND', featured: true },
        { id: '5', name: 'JavaScript', level: 'Expert', category: 'FRONTEND', featured: true },
        { id: '6', name: 'HTML5', level: 'Expert', category: 'FRONTEND', featured: false },
      ]
    },
    {
      title: 'Backend',
      skills: [
        { id: '7', name: 'Node.js', level: 'Advanced', category: 'BACKEND', featured: true },
        { id: '8', name: 'Python', level: 'Advanced', category: 'BACKEND', featured: true },
        { id: '9', name: 'PostgreSQL', level: 'Advanced', category: 'BACKEND', featured: true },
        { id: '10', name: 'Prisma', level: 'Advanced', category: 'BACKEND', featured: true },
        { id: '11', name: 'REST APIs', level: 'Expert', category: 'BACKEND', featured: true },
      ]
    },
    {
      title: 'Tools & DevOps',
      skills: [
        { id: '12', name: 'Git', level: 'Expert', category: 'DEVOPS', featured: true },
        { id: '13', name: 'Docker', level: 'Intermediate', category: 'DEVOPS', featured: true },
        { id: '14', name: 'AWS', level: 'Intermediate', category: 'DEVOPS', featured: true },
        { id: '15', name: 'Vercel', level: 'Advanced', category: 'DEVOPS', featured: true },
      ]
    }
  ];
}

export function SkillsGrid() {
  const { ref, inView } = useInView(0.2);
  const [skillCategories, setSkillCategories] = useState<SkillCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSkills() {
      try {
        const response = await fetch('/api/skills');
        if (response.ok) {
          const result = await response.json();
          const skills: Skill[] = result.data || result || [];
          
          // If no skills, use static fallback
          if (!skills || !Array.isArray(skills) || skills.length === 0) {
            setSkillCategories(getStaticSkills());
            return;
          }
          
          // Group skills by category
          const categoryMap = new Map<string, Skill[]>();
          skills.forEach(skill => {
            const categoryTitle = getCategoryTitle(skill.category);
            if (!categoryMap.has(categoryTitle)) {
              categoryMap.set(categoryTitle, []);
            }
            categoryMap.get(categoryTitle)!.push(skill);
          });
          
          // Convert to array and sort skills by name
          const categories: SkillCategory[] = Array.from(categoryMap.entries()).map(([title, skills]) => ({
            title,
            skills: skills.sort((a, b) => a.name.localeCompare(b.name))
          }));
          
          // Sort categories by predefined order
          const categoryOrder = ['Frontend', 'Backend', 'Tools & DevOps', 'Database', 'Design', 'Testing'];
          categories.sort((a, b) => {
            const aIndex = categoryOrder.indexOf(a.title);
            const bIndex = categoryOrder.indexOf(b.title);
            return (aIndex === -1 ? 999 : aIndex) - (bIndex === -1 ? 999 : bIndex);
          });
          
          setSkillCategories(categories);
        }
      } catch (error) {
        console.error('Failed to fetch skills:', error);
        // Fallback to static skills
        setSkillCategories(getStaticSkills());
      } finally {
        setLoading(false);
      }
    }
    
    fetchSkills();
  }, []);

  function getCategoryTitle(category: string): string {
    const categoryTitles: Record<string, string> = {
      'FRONTEND': 'Frontend',
      'BACKEND': 'Backend', 
      'DEVOPS': 'Tools & DevOps',
      'DATABASE': 'Database',
      'DESIGN': 'Design',
      'TESTING': 'Testing',
      'MOBILE': 'Mobile',
      'OTHER': 'Other'
    };
    return categoryTitles[category] || category;
  }

  if (loading) {
    return (
      <section id="skills" className="py-24 bg-gradient-to-br from-secondary-50 to-primary-50 dark:from-secondary-900 dark:to-primary-950">
        <Container>
          <div className="text-center mb-16">
            <Heading as="h2" className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
              Skills & Technologies
            </Heading>
            <Text className="text-xl text-secondary-700 dark:text-secondary-300 max-w-3xl mx-auto leading-relaxed">
              Loading skills...
            </Text>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section id="skills" className="py-24 bg-gradient-to-br from-secondary-50 to-primary-50 dark:from-secondary-900 dark:to-primary-950">
      <Container>
        <MotionDiv 
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <MotionDiv variants={slideUpVariants}>
            <Heading as="h2" className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
              Skills & Technologies
            </Heading>
          </MotionDiv>
          <MotionDiv variants={slideUpVariants}>
            <Text className="text-xl text-secondary-700 dark:text-secondary-300 max-w-3xl mx-auto leading-relaxed">
              Here are the technologies and tools I work with to bring ideas to life and create exceptional digital experiences.
            </Text>
          </MotionDiv>
        </MotionDiv>
        
        <MotionDiv 
          className="grid md:grid-cols-3 gap-10"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          {skillCategories.map((category, index) => (
            <MotionDiv key={category.title} variants={slideUpVariants}>
              <Card className="p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white/80 dark:bg-secondary-900/80 backdrop-blur-sm border-secondary-200 dark:border-secondary-700">
                <div className="flex items-center mb-6">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${index === 0 ? 'from-primary-500 to-primary-600' : index === 1 ? 'from-accent-500 to-accent-600' : 'from-secondary-500 to-secondary-600'} flex items-center justify-center shadow-lg`}>
                    {index === 0 && (
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    )}
                    {index === 1 && (
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                      </svg>
                    )}
                    {index === 2 && (
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    )}
                  </div>
                  <Heading as="h3" className="text-2xl font-bold ml-4 text-secondary-900 dark:text-secondary-100">
                    {category.title}
                  </Heading>
                </div>
                <MotionDiv 
                  className="space-y-4"
                  variants={staggerContainer}
                >
                  {category.skills.map((skill) => (
                    <SkillBadge key={skill.name} skill={skill} />
                  ))}
                </MotionDiv>
              </Card>
            </MotionDiv>
          ))}
        </MotionDiv>
      </Container>
    </section>
  );
}