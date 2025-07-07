'use client';

import { Container } from '@/components/ui/Container';
import { Heading, Text } from '@/components/ui/Typography';
import { Card } from '@/components/ui/Card';
import { MotionDiv, MotionSection, slideUpVariants, staggerContainer } from '@/components/ui/MotionComponents';
import { useInView } from '@/hooks/useInView';

const achievements = [
  {
    year: '2024',
    title: 'Senior Full-Stack Developer',
    company: 'Tech Innovation Labs',
    description: 'Leading development of enterprise-scale applications serving 100,000+ users. Architected microservices infrastructure reducing system downtime by 99.5%.'
  },
  {
    year: '2023',
    title: 'Technical Lead',
    company: 'Digital Solutions Corp',
    description: 'Spearheaded team of 8 developers delivering $2M+ revenue projects. Implemented CI/CD pipelines reducing deployment time by 85%.'
  },
  {
    year: '2022',
    title: 'Full-Stack Developer',
    company: 'StartupTech Inc',
    description: 'Built scalable web applications from MVP to enterprise. Optimized performance achieving 95+ Lighthouse scores across all applications.'
  },
  {
    year: '2021',
    title: 'Frontend Developer',
    company: 'Creative Digital Agency',
    description: 'Developed responsive web solutions for Fortune 500 clients. Improved user engagement by 60% through innovative UI/UX implementations.'
  }
];

const skills = [
  { category: 'Frontend', items: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Framer Motion'] },
  { category: 'Backend', items: ['Node.js', 'Python', 'PostgreSQL', 'MongoDB', 'Redis'] },
  { category: 'DevOps', items: ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Terraform'] },
  { category: 'Tools', items: ['Git', 'Jest', 'Cypress', 'Figma', 'Linux'] }
];

const stats = [
  { label: 'Years Experience', value: '5+' },
  { label: 'Projects Delivered', value: '50+' },
  { label: 'Happy Clients', value: '30+' },
  { label: 'Code Commits', value: '2,000+' }
];

export function AboutContent() {
  const { ref, inView } = useInView(0.2);

  return (
    <div className="min-h-screen bg-white dark:bg-secondary-950">
      <Container>
        <MotionSection 
          className="py-20"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          {/* Hero Section */}
          <MotionDiv className="text-center mb-20" variants={slideUpVariants}>
            <Heading as="h1" className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
              About Francisco
            </Heading>
            <Text className="text-xl text-secondary-700 dark:text-secondary-300 max-w-4xl mx-auto leading-relaxed">
              Passionate full-stack developer with 5+ years of experience building scalable web applications 
              that solve real-world problems. I specialize in modern React ecosystems, TypeScript, and 
              cloud-native architectures that deliver exceptional user experiences.
            </Text>
          </MotionDiv>

          {/* Stats Grid */}
          <MotionDiv className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20" variants={slideUpVariants}>
            {stats.map((stat, index) => (
              <Card key={index} className="p-6 text-center bg-white dark:bg-secondary-900 border-secondary-200 dark:border-secondary-700">
                <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">{stat.value}</div>
                <Text className="text-sm text-secondary-600 dark:text-secondary-400">{stat.label}</Text>
              </Card>
            ))}
          </MotionDiv>

          {/* Professional Story */}
          <MotionDiv className="mb-20" variants={slideUpVariants}>
            <Heading as="h2" className="text-3xl font-bold mb-8 text-center text-secondary-900 dark:text-secondary-100">
              My Journey
            </Heading>
            <div className="max-w-4xl mx-auto">
              <Card className="p-8 bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-950/20 dark:to-accent-950/20 border-primary-200 dark:border-primary-700">
                <Text className="text-lg text-secondary-700 dark:text-secondary-300 leading-relaxed mb-6">
                  My passion for technology started in university where I discovered the power of code to solve complex problems. 
                  What began as curiosity about how websites work evolved into a deep expertise in modern web development.
                </Text>
                <Text className="text-lg text-secondary-700 dark:text-secondary-300 leading-relaxed mb-6">
                  Over the past 5 years, I&apos;ve had the privilege of working with startups, agencies, and enterprise companies, 
                  building everything from MVP prototypes to large-scale applications serving hundreds of thousands of users. 
                  Each project taught me something new about scalability, user experience, and the importance of clean, maintainable code.
                </Text>
                <Text className="text-lg text-secondary-700 dark:text-secondary-300 leading-relaxed">
                  Today, I focus on helping businesses leverage modern web technologies to create exceptional digital experiences. 
                  Whether it&apos;s optimizing performance, implementing complex features, or architecting scalable systems, 
                  I&apos;m passionate about delivering solutions that make a real impact.
                </Text>
              </Card>
            </div>
          </MotionDiv>

          {/* Career Timeline */}
          <MotionDiv ref={ref} className="mb-20" variants={slideUpVariants}>
            <Heading as="h2" className="text-3xl font-bold mb-12 text-center text-secondary-900 dark:text-secondary-100">
              Career Timeline
            </Heading>
            <div className="max-w-4xl mx-auto">
              <div className="space-y-8">
                {achievements.map((achievement, index) => (
                  <MotionDiv 
                    key={index}
                    className="relative pl-8 border-l-2 border-primary-200 dark:border-primary-700"
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="absolute -left-3 top-0 w-6 h-6 bg-primary-600 rounded-full border-4 border-white dark:border-secondary-950"></div>
                    <Card className="p-6 bg-white dark:bg-secondary-900 border-secondary-200 dark:border-secondary-700">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                        <Heading as="h3" className="text-xl font-bold text-secondary-900 dark:text-secondary-100">
                          {achievement.title}
                        </Heading>
                        <span className="text-sm font-semibold text-primary-600 dark:text-primary-400 bg-primary-100 dark:bg-primary-900/50 px-3 py-1 rounded-full">
                          {achievement.year}
                        </span>
                      </div>
                      <Text className="text-accent-600 dark:text-accent-400 font-medium mb-3">
                        {achievement.company}
                      </Text>
                      <Text className="text-secondary-700 dark:text-secondary-300 leading-relaxed">
                        {achievement.description}
                      </Text>
                    </Card>
                  </MotionDiv>
                ))}
              </div>
            </div>
          </MotionDiv>

          {/* Skills Grid */}
          <MotionDiv className="mb-20" variants={slideUpVariants}>
            <Heading as="h2" className="text-3xl font-bold mb-12 text-center text-secondary-900 dark:text-secondary-100">
              Technical Expertise
            </Heading>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {skills.map((skillGroup, index) => (
                <Card key={index} className="p-6 bg-white dark:bg-secondary-900 border-secondary-200 dark:border-secondary-700">
                  <Heading as="h3" className="text-lg font-bold mb-4 text-primary-600 dark:text-primary-400">
                    {skillGroup.category}
                  </Heading>
                  <div className="space-y-2">
                    {skillGroup.items.map((skill, skillIndex) => (
                      <div key={skillIndex} className="flex items-center">
                        <div className="w-2 h-2 bg-accent-500 rounded-full mr-3 flex-shrink-0"></div>
                        <Text className="text-secondary-700 dark:text-secondary-300">{skill}</Text>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </MotionDiv>

          {/* Personal Touch */}
          <MotionDiv className="text-center" variants={slideUpVariants}>
            <Card className="p-8 bg-gradient-to-br from-secondary-50 to-primary-50 dark:from-secondary-900/50 dark:to-primary-950/20 border-secondary-200 dark:border-secondary-700">
              <Heading as="h2" className="text-2xl font-bold mb-6 text-secondary-900 dark:text-secondary-100">
                Beyond Code
              </Heading>
              <Text className="text-lg text-secondary-700 dark:text-secondary-300 leading-relaxed max-w-3xl mx-auto">
                When I&apos;m not coding, you&apos;ll find me exploring new technologies, contributing to open-source projects, 
                or sharing knowledge through technical writing. I believe in continuous learning and staying at the 
                forefront of web development trends. I&apos;m also passionate about mentoring junior developers and 
                helping them grow in their careers.
              </Text>
            </Card>
          </MotionDiv>
        </MotionSection>
      </Container>
    </div>
  );
}