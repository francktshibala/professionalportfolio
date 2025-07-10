'use client';

import { Card } from '@/components/ui/Card';
import { Container } from '@/components/ui/Container';
import { Heading, Text } from '@/components/ui/Typography';
import { MotionDiv, slideUpVariants, staggerContainer } from '@/components/ui/MotionComponents';
import { useInView } from '@/hooks/useInView';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'CTO at TechStartup Inc',
    company: 'TechStartup Inc',
    image: '/api/placeholder/80/80',
    quote: 'Franck delivered exceptional results on our e-commerce platform. His attention to detail and technical expertise helped us achieve a 340% increase in sales. Highly recommended!',
    rating: 5,
    project: 'E-commerce Platform'
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Product Manager at InnovateCorp',
    company: 'InnovateCorp',
    image: '/api/placeholder/80/80',
    quote: 'Working with Franck was a game-changer for our team productivity platform. His real-time collaboration features reduced our meeting time by 80% and improved overall workflow efficiency.',
    rating: 5,
    project: 'Team Collaboration Suite'
  },
  {
    id: 3,
    name: 'Emma Rodriguez',
    role: 'Founder at AgriTech Solutions',
    company: 'AgriTech Solutions',
    image: '/api/placeholder/80/80',
    quote: 'Franck&apos;s AI-powered weather platform has been instrumental in helping our agricultural clients reduce crop losses by 40%. His technical skills and understanding of our industry needs were outstanding.',
    rating: 5,
    project: 'Weather Intelligence Platform'
  },
  {
    id: 4,
    name: 'David Thompson',
    role: 'Engineering Director at ScaleUp',
    company: 'ScaleUp',
    image: '/api/placeholder/80/80',
    quote: 'Franck&apos;s code quality is exceptional. He delivered a complex microservices architecture that handles our 10,000+ concurrent users flawlessly. Professional, reliable, and highly skilled.',
    rating: 5,
    project: 'Microservices Architecture'
  }
];

const stats = [
  { value: '98%', label: 'Client Satisfaction' },
  { value: '50+', label: 'Projects Completed' },
  { value: '5+', label: 'Years Experience' },
  { value: '30+', label: 'Happy Clients' }
];

function TestimonialCard({ testimonial }: { testimonial: typeof testimonials[0] }) {
  return (
    <MotionDiv variants={slideUpVariants}>
      <Card className="p-6 bg-white dark:bg-secondary-900 border-secondary-200 dark:border-secondary-700 hover:shadow-xl transition-all duration-300 h-full">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-lg">{testimonial.name[0]}</span>
          </div>
          <div>
            <Heading as="h3" className="text-lg font-bold text-secondary-900 dark:text-secondary-100">
              {testimonial.name}
            </Heading>
            <Text className="text-sm text-secondary-600 dark:text-secondary-400">
              {testimonial.role}
            </Text>
            <Text className="text-sm text-primary-600 dark:text-primary-400 font-medium">
              {testimonial.company}
            </Text>
          </div>
        </div>
        
        <div className="flex mb-4">
          {[...Array(testimonial.rating)].map((_, i) => (
            <svg
              key={i}
              className="w-5 h-5 text-yellow-400 fill-current"
              viewBox="0 0 24 24"
            >
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
          ))}
        </div>
        
        <blockquote className="text-secondary-700 dark:text-secondary-300 leading-relaxed mb-4">
          &ldquo;{testimonial.quote}&rdquo;
        </blockquote>
        
        <div className="text-sm text-accent-600 dark:text-accent-400 font-medium">
          Project: {testimonial.project}
        </div>
      </Card>
    </MotionDiv>
  );
}

export function TestimonialsSection() {
  const { ref, inView } = useInView(0.2);

  return (
    <section className="py-24 bg-gradient-to-br from-secondary-50 to-primary-50 dark:from-secondary-900 dark:to-primary-950">
      <Container>
        <MotionDiv 
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <MotionDiv variants={slideUpVariants}>
            <Heading as="h2" className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
              Client Testimonials
            </Heading>
          </MotionDiv>
          <MotionDiv variants={slideUpVariants}>
            <Text className="text-xl text-secondary-700 dark:text-secondary-300 max-w-3xl mx-auto leading-relaxed">
              Don&apos;t just take my word for it. Here&apos;s what clients and colleagues say about working with me.
            </Text>
          </MotionDiv>
        </MotionDiv>

        {/* Stats Grid */}
        <MotionDiv 
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          {stats.map((stat, index) => (
            <MotionDiv key={index} variants={slideUpVariants}>
              <Card className="p-6 text-center bg-white/80 dark:bg-secondary-900/80 backdrop-blur-sm border-secondary-200 dark:border-secondary-700">
                <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                  {stat.value}
                </div>
                <Text className="text-sm text-secondary-600 dark:text-secondary-400">
                  {stat.label}
                </Text>
              </Card>
            </MotionDiv>
          ))}
        </MotionDiv>

        {/* Testimonials Grid */}
        <MotionDiv 
          className="grid md:grid-cols-2 gap-8"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </MotionDiv>
      </Container>
    </section>
  );
}