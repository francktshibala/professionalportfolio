'use client';

import { Container } from '@/components/ui/Container';
import { Heading, Text } from '@/components/ui/Typography';
import { Card } from '@/components/ui/Card';
import { MotionDiv, MotionSection, slideUpVariants, staggerContainer } from '@/components/ui/MotionComponents';
import { useInView } from '@/hooks/useInView';
import Image from 'next/image';

const achievements = [
  {
    year: '2024',
    title: 'BookBridge MVP Launch',
    company: 'BookBridge AI',
    description: 'Built working MVP in 2 months serving ESL students globally. AI-powered reading platform simplifying complex books to any level (A1-C2). Created "Netflix for books" with accessibility for all income levels.'
  },
  {
    year: '2023',
    title: 'Software Development Student',
    company: 'Applied Learning',
    description: 'Intensive software development program focusing on modern web technologies. Applied everything learned to build BookBridge - turning classroom knowledge into real-world impact.'
  },
  {
    year: '2019',
    title: 'Arrived in America',
    company: 'New Beginning',
    description: 'First experience with public libraries - free books, free WiFi, open to everyone. This moment changed everything and sparked the vision for democratizing reading access globally.'
  },
  {
    year: 'Childhood',
    title: 'Growing Up in Congo',
    company: 'Life Experience',
    description: 'Witnessed how access to books determined who escaped poverty and who remained trapped. No public libraries existed - this inequality became the foundation for BookBridge mission.'
  }
];

const skills = [
  { category: 'Frontend', items: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Framer Motion'] },
  { category: 'Backend', items: ['Node.js', 'Python', 'PostgreSQL', 'MongoDB', 'Redis'] },
  { category: 'DevOps', items: ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Terraform'] },
  { category: 'Tools', items: ['Git', 'Jest', 'Cypress', 'Figma', 'Linux'] }
];

const stats = [
  { label: 'ESL Students Worldwide', value: '1.5B' },
  { label: 'Months to MVP', value: '2' },
  { label: 'Reading Levels Supported', value: 'A1-C2' },
  { label: 'Countries Reachable', value: 'All' }
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
            <div className="mb-8">
              <Image 
                src="/franck.jpg" 
                alt="François - BookBridge Founder" 
                width={128}
                height={128}
                className="w-32 h-32 rounded-full mx-auto mb-6 object-cover border-4 border-primary-200 dark:border-primary-700"
              />
            </div>
            <Heading as="h1" className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
              Meet François
            </Heading>
            <Text className="text-xl text-secondary-700 dark:text-secondary-300 max-w-4xl mx-auto leading-relaxed">
              Founder of BookBridge - democratizing reading for 1.5 billion ESL students worldwide through AI. 
              From growing up without books in Congo to building &ldquo;Netflix for books&rdquo; accessible to everyone, 
              regardless of income, location, or education level.
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
                  I grew up in the Democratic Republic of Congo, where public libraries simply don&apos;t exist. As a child, 
                  I had no books to read and didn&apos;t even know how to approach reading one. It wasn&apos;t until I arrived 
                  in America in 2019 that I experienced my first public library - free books, free WiFi, open to everyone. 
                  That moment changed everything.
                </Text>
                <Text className="text-lg text-secondary-700 dark:text-secondary-300 leading-relaxed mb-6">
                  Back in Congo, I witnessed something powerful: people who could read and had access to books consistently 
                  escaped poverty while others remained trapped. That&apos;s when I knew I had to build public libraries back home 
                  to give people the same opportunity. But physical libraries are expensive and reach limited people.
                </Text>
                <Text className="text-lg text-secondary-700 dark:text-secondary-300 leading-relaxed">
                  When AI emerged, I realized I&apos;d found the key to scaling my mission globally. As a software development student, 
                  I&apos;ve spent the last two months applying everything I&apos;m learning to build BookBridge - a digital solution 
                  that can reach anyone, anywhere. We&apos;ve created what could become &ldquo;Netflix for books&rdquo; - but unlike Netflix, 
                  everyone gets access regardless of income, location, or education level.
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

          {/* The Vision */}
          <MotionDiv className="text-center mb-20" variants={slideUpVariants}>
            <Card className="p-8 bg-gradient-to-br from-secondary-50 to-primary-50 dark:from-secondary-900/50 dark:to-primary-950/20 border-secondary-200 dark:border-secondary-700">
              <Heading as="h2" className="text-2xl font-bold mb-6 text-secondary-900 dark:text-secondary-100">
                The Vision
              </Heading>
              <Text className="text-lg text-secondary-700 dark:text-secondary-300 leading-relaxed max-w-3xl mx-auto mb-6">
                My vision for the next 2-3 years: partner with ESL schools globally, expand our book catalog with modern titles, 
                and reach individuals in every country who want to improve their reading skills at prices they can afford.
              </Text>
              <Text className="text-lg text-secondary-700 dark:text-secondary-300 leading-relaxed max-w-3xl mx-auto">
                I&apos;m seeking investors who share this vision and can provide not just funding, but mentorship, connections, 
                and expertise to help us democratize reading for the 1.5 billion people worldwide who need it most.
              </Text>
            </Card>
          </MotionDiv>

          {/* Call to Action */}
          <MotionDiv className="text-center" variants={slideUpVariants}>
            <Card className="p-8 bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-950/20 dark:to-accent-950/20 border-primary-200 dark:border-primary-700">
              <Heading as="h2" className="text-2xl font-bold mb-6 text-secondary-900 dark:text-secondary-100">
                Ready to Change the World Together?
              </Heading>
              <Text className="text-lg text-secondary-700 dark:text-secondary-300 leading-relaxed mb-8 max-w-2xl mx-auto">
                Join me in democratizing reading for 1.5 billion ESL students worldwide. Whether you&apos;re an investor, 
                partner, or just want to learn more about BookBridge, I&apos;d love to connect.
              </Text>
              <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
                <a 
                  href="mailto:francois@bookbridge.app" 
                  className="inline-flex items-center justify-center px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-colors duration-200"
                >
                  Contact for Investment
                </a>
                <a 
                  href="/contact" 
                  className="inline-flex items-center justify-center px-8 py-3 border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white font-semibold rounded-lg transition-colors duration-200"
                >
                  Get in Touch
                </a>
                <a 
                  href="https://donorbox.org/bookbridge-make-books-accessible-to-everyone-regardless-of-their-their-situation" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-3 bg-accent-600 hover:bg-accent-700 text-white font-semibold rounded-lg transition-colors duration-200"
                >
                  Make Your Donation
                </a>
                <a 
                  href="/support-needs" 
                  className="inline-flex items-center justify-center px-8 py-3 border-2 border-accent-600 text-accent-600 hover:bg-accent-600 hover:text-white font-semibold rounded-lg transition-colors duration-200"
                >
                  Support Needs
                </a>
              </div>
            </Card>
          </MotionDiv>
        </MotionSection>
      </Container>
    </div>
  );
}