'use client';

import { Container } from '@/components/ui/Container';
import { Heading, Text } from '@/components/ui/Typography';
import { Card } from '@/components/ui/Card';
import { MotionDiv, MotionSection, slideUpVariants, staggerContainer } from '@/components/ui/MotionComponents';
import { useInView } from '@/hooks/useInView';

interface NeedItem {
  title: string;
  cost: string;
  description: string;
  help: string[];
}

interface NeedSection {
  title: string;
  timeframe: string;
  totalCost: string;
  description: string;
  items: NeedItem[];
}

const supportNeeds: NeedSection[] = [
  {
    title: 'Short-Term Needs',
    timeframe: 'Next 3 Months',
    totalCost: '$42,000 + $5,000/month',
    description: 'These are the essentials we need to launch and help our first users',
    items: [
      {
        title: 'Legal Protection',
        cost: '$16,000',
        description: 'We need lawyers to ensure we can legally use books without getting sued. Without this, we can\'t even start.',
        help: ['Financial donations', 'Pro-bono legal services', 'Connections to copyright attorneys']
      },
      {
        title: 'AI Technology Costs',
        cost: '$5,000/month',
        description: 'The AI is the heart of BookBridge - it\'s what makes personalized tutoring possible for everyone.',
        help: ['Monthly sponsorships', 'Corporate partnerships', 'Technical credits from AI companies']
      },
      {
        title: 'Book Licensing',
        cost: '$10,000',
        description: 'Students want to read Harry Potter and modern books, not just old classics. We need licenses for 50 popular books.',
        help: ['Publishing connections', 'Book donations', 'Author partnerships']
      },
      {
        title: 'Academic Reviewers',
        cost: '$8,000',
        description: 'We\'re hiring accredited teachers and professors to review every simplified book before it\'s available. Each book will be checked for accuracy and educational quality by real educators - some paid, some volunteering their expertise.',
        help: ['University professor volunteers', 'Accredited teacher connections', 'Academic partnerships', 'Educational reviewer recommendations']
      },
      {
        title: 'Student Testing',
        cost: '$3,000',
        description: 'We need 50 real ESL students to test BookBridge before launch to ensure it truly helps learners.',
        help: ['ESL teacher connections', 'Student volunteer testers', 'Language school partnerships']
      }
    ]
  },
  {
    title: 'Mid-Term Needs',
    timeframe: '6-12 Months',
    totalCost: '$75,000',
    description: 'Once we\'ve launched, these will help us grow and serve more people',
    items: [
      {
        title: 'Accessibility Features',
        cost: '$20,000',
        description: '285 million people have visual impairments. We want BookBridge to work for everyone with advanced voice features, screen reader support, and dyslexia-friendly fonts.',
        help: ['Voice technology experts', 'Accessibility testers', 'Screen reader specialists', 'Funding for specialized tools']
      },
      {
        title: 'Content Expansion',
        cost: '$35,000',
        description: 'Different cultures need different books. We need to license 200 more books from around the world and create simplified versions in multiple languages.',
        help: ['Book licensing funds', 'Translation volunteers', 'International publisher connections', 'Cultural content advisors']
      },
      {
        title: 'Community Building',
        cost: '$20,000',
        description: 'Learning is better together. We need to build a supportive community of learners with forums, study groups, and peer support.',
        help: ['Community platform development', 'Community managers', 'Social media helpers', 'Student ambassadors']
      }
    ]
  },
  {
    title: 'Long-Term Vision',
    timeframe: '1-2 Years',
    totalCost: '$150,000',
    description: 'Our dream to serve every type of learner',
    items: [
      {
        title: 'Learning Disability Support',
        cost: '$50,000',
        description: 'Millions of people with dyslexia, ADHD, and other learning differences struggle with traditional reading. We\'ll develop specialized features and tools for each learning difference.',
        help: ['Special education experts', 'Research partnerships', 'Adaptive technology development', 'Clinical testing funds']
      },
      {
        title: 'Global Language Expansion',
        cost: '$60,000',
        description: 'Not everyone learns in English. We want to support reading in 50+ languages with culturally appropriate content and native speaker support.',
        help: ['Translation costs for 50 languages', 'Native speaker reviewers', 'Cultural content advisors', 'International educator partnerships']
      },
      {
        title: 'School Partnerships',
        cost: '$40,000',
        description: 'To truly democratize reading, we need to be in classrooms worldwide, especially in underserved communities where students need us most.',
        help: ['School pilot program funding', 'Teacher training materials', 'Education policy advisors', 'Classroom technology support']
      }
    ]
  }
];

const howToHelp = [
  {
    title: 'Financial Support',
    items: [
      'Every $100 helps one student access BookBridge for a full year',
      '$1,000 sponsors AI tutoring for 50 students per month',
      '$5,000 funds an entire classroom for a year'
    ]
  },
  {
    title: 'Your Network',
    items: [
      'Know a teacher? Connect us!',
      'Have publisher friends? We need book partnerships',
      'Work in tech? We need AI credits and technical advice'
    ]
  },
  {
    title: 'Your Time',
    items: [
      'Test our platform and give feedback',
      'Share our mission on social media',
      'Volunteer your professional skills'
    ]
  },
  {
    title: 'Your Expertise',
    items: [
      'Educators: Help shape our curriculum',
      'Developers: Contribute to our open-source components',
      'Writers: Help create reading guides'
    ]
  }
];

export function SupportNeedsContent() {
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
          <MotionDiv className="text-center mb-16" variants={slideUpVariants}>
            <Heading as="h1" className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
              Help Us Make Books Accessible to Everyone
            </Heading>
            <div className="max-w-4xl mx-auto">
              <Text className="text-xl text-secondary-700 dark:text-secondary-300 leading-relaxed mb-6">
                <strong>BookBridge believes that everyone deserves to understand and enjoy any book, regardless of their reading level, income, or where they live.</strong>
              </Text>
              <Text className="text-lg text-secondary-700 dark:text-secondary-300 leading-relaxed mb-6">
                We&apos;re building an AI-powered reading companion that helps people truly understand what they read - starting with the 1.5 billion people learning English worldwide. Whether you&apos;re 8 or 80, whether English is your first or fifth language, BookBridge adapts to help you learn.
              </Text>
              <Text className="text-lg text-secondary-700 dark:text-secondary-300 leading-relaxed font-semibold">
                Every contribution, no matter how small, brings us closer to a world where no one is left behind in their reading journey.
              </Text>
            </div>
          </MotionDiv>

          {/* Support Needs Sections */}
          {supportNeeds.map((section, sectionIndex) => (
            <MotionDiv 
              key={sectionIndex} 
              ref={sectionIndex === 0 ? ref : undefined}
              className="mb-16"
              variants={slideUpVariants}
            >
              <Card className="p-8 bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-950/20 dark:to-accent-950/20 border-primary-200 dark:border-primary-700">
                <div className="mb-8">
                  <Heading as="h2" className="text-3xl font-bold mb-2 text-secondary-900 dark:text-secondary-100">
                    {section.title} ({section.timeframe}) - {section.totalCost}
                  </Heading>
                  <Text className="text-lg text-secondary-600 dark:text-secondary-400 italic">
                    {section.description}
                  </Text>
                </div>

                <div className="space-y-6">
                  {section.items.map((item, itemIndex) => (
                    <MotionDiv
                      key={itemIndex}
                      initial={{ opacity: 0, y: 20 }}
                      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ delay: sectionIndex * 0.1 + itemIndex * 0.05 }}
                    >
                      <Card className="p-6 bg-white dark:bg-secondary-900 border-secondary-200 dark:border-secondary-700">
                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                          <Heading as="h3" className="text-xl font-bold text-primary-600 dark:text-primary-400 mb-2 lg:mb-0">
                            {itemIndex + 1}. {item.title}
                          </Heading>
                          <span className="text-lg font-semibold text-accent-600 dark:text-accent-400 bg-accent-100 dark:bg-accent-900/50 px-4 py-2 rounded-full self-start">
                            {item.cost}
                          </span>
                        </div>
                        
                        <Text className="text-secondary-700 dark:text-secondary-300 leading-relaxed mb-4">
                          <strong>Why it matters:</strong> {item.description}
                        </Text>
                        
                        <div>
                          <Text className="font-semibold text-secondary-900 dark:text-secondary-100 mb-2">
                            How you can help:
                          </Text>
                          <ul className="space-y-1">
                            {item.help.map((helpItem, helpIndex) => (
                              <li key={helpIndex} className="flex items-start">
                                <span className="text-accent-500 mr-2">•</span>
                                <Text className="text-secondary-700 dark:text-secondary-300">{helpItem}</Text>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </Card>
                    </MotionDiv>
                  ))}
                </div>
              </Card>
            </MotionDiv>
          ))}

          {/* How You Can Help Section */}
          <MotionDiv className="mb-16" variants={slideUpVariants}>
            <Heading as="h2" className="text-3xl font-bold mb-8 text-center text-secondary-900 dark:text-secondary-100">
              How You Can Help Right Now
            </Heading>
            
            <div className="grid md:grid-cols-2 gap-6">
              {howToHelp.map((category, index) => (
                <Card key={index} className="p-6 bg-white dark:bg-secondary-900 border-secondary-200 dark:border-secondary-700">
                  <Heading as="h3" className="text-xl font-bold mb-4 text-primary-600 dark:text-primary-400">
                    {category.title}
                  </Heading>
                  <ul className="space-y-2">
                    {category.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start">
                        <span className="text-accent-500 mr-2 mt-1">•</span>
                        <Text className="text-secondary-700 dark:text-secondary-300">{item}</Text>
                      </li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>
          </MotionDiv>

          {/* Call to Action */}
          <MotionDiv className="text-center" variants={slideUpVariants}>
            <Card className="p-8 bg-gradient-to-br from-secondary-50 to-primary-50 dark:from-secondary-900/50 dark:to-primary-950/20 border-secondary-200 dark:border-secondary-700">
              <Text className="text-lg text-secondary-700 dark:text-secondary-300 leading-relaxed mb-8 max-w-3xl mx-auto italic">
                Remember: No contribution is too small. A single book recommendation, a social media share, or an hour of testing makes a difference. Together, we&apos;re building a world where everyone can enjoy the magic of reading.
              </Text>
              
              <Text className="text-lg font-semibold text-secondary-900 dark:text-secondary-100 mb-8">
                Thank you for believing in our mission. Any help is welcome, and every contribution matters.
              </Text>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="https://donorbox.org/bookbridge-make-books-accessible-to-everyone-regardless-of-their-their-situation" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-colors duration-200"
                >
                  Make Your Donation
                </a>
                <a 
                  href="https://www.linkedin.com/in/francois-tshibala-556486233/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-3 border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white font-semibold rounded-lg transition-colors duration-200"
                >
                  Contact Us
                </a>
                <a 
                  href="/about" 
                  className="inline-flex items-center justify-center px-8 py-3 border-2 border-accent-600 text-accent-600 hover:bg-accent-600 hover:text-white font-semibold rounded-lg transition-colors duration-200"
                >
                  Learn More
                </a>
              </div>
            </Card>
          </MotionDiv>
        </MotionSection>
      </Container>
    </div>
  );
}