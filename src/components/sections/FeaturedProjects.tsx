'use client';

import { Card } from '@/components/ui/Card';
import { Container } from '@/components/ui/Container';
import { Heading, Text } from '@/components/ui/Typography';
import { MotionDiv, MotionA, slideUpVariants, staggerContainer, buttonHoverVariants } from '@/components/ui/MotionComponents';
import { useInView } from '@/hooks/useInView';
import { useEffect, useState } from 'react';

interface Project {
  id: string;
  title: string;
  description: string;
  image?: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  metrics?: Record<string, string>;
  caseStudy?: {
    results?: string[];
  };
  featured: boolean;
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <MotionDiv variants={slideUpVariants}>
      <Card className="overflow-hidden group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white dark:bg-secondary-900 border-secondary-200 dark:border-secondary-700">
        <div className="aspect-video bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-950 dark:to-accent-950 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-100/50 to-accent-100/50 dark:from-primary-900/50 dark:to-accent-900/50 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <Text className="text-sm font-medium text-secondary-600 dark:text-secondary-400">Project Preview</Text>
            </div>
          </div>
        </div>
        <div className="p-6">
          <Heading as="h3" className="text-xl font-bold mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors text-secondary-900 dark:text-secondary-100">
            {project.title}
          </Heading>
          <Text className="text-secondary-700 dark:text-secondary-300 mb-4 leading-relaxed">
            {project.description}
          </Text>
          
          {/* Key Metrics */}
          {project.metrics && (
            <div className="grid grid-cols-2 gap-3 mb-4 p-3 bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-950/50 dark:to-accent-950/50 rounded-lg">
              {Object.entries(project.metrics).map(([key, value]) => (
                <div key={key} className="text-center">
                  <div className="text-lg font-bold text-primary-600 dark:text-primary-400">{value}</div>
                  <div className="text-xs text-secondary-600 dark:text-secondary-400 capitalize">{key}</div>
                </div>
              ))}
            </div>
          )}
          
          {/* Key Results */}
          {project.caseStudy?.results && (
            <div className="mb-4">
              <Text className="text-sm font-semibold text-secondary-900 dark:text-secondary-100 mb-2">Key Results:</Text>
              <div className="space-y-1">
                {project.caseStudy.results.slice(0, 2).map((result, index) => (
                  <div key={index} className="flex items-center text-sm text-secondary-700 dark:text-secondary-300">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2 flex-shrink-0"></div>
                    {result}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 bg-gradient-to-r from-primary-100 to-accent-100 dark:from-primary-900 dark:to-accent-900 text-primary-700 dark:text-primary-300 rounded-full text-xs font-semibold shadow-sm"
              >
                {tech}
              </span>
            ))}
          </div>
          
          <div className="flex gap-3">
            {project.liveUrl && (
              <MotionA 
                href={project.liveUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center justify-center rounded-lg text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gradient-to-r from-primary-600 to-primary-700 text-white hover:from-primary-700 hover:to-primary-800 active:from-primary-800 active:to-primary-900 shadow-lg hover:shadow-xl h-10 px-4 py-2"
                variants={buttonHoverVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Live Demo
              </MotionA>
            )}
            {project.githubUrl && (
              <MotionA 
                href={project.githubUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center justify-center rounded-lg text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-secondary-100 active:bg-secondary-200 dark:hover:bg-secondary-800 dark:active:bg-secondary-700 h-10 px-4 py-2 border border-secondary-300 dark:border-secondary-700 text-secondary-700 dark:text-secondary-300 shadow-sm hover:shadow-md"
                variants={buttonHoverVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
              </MotionA>
            )}
          </div>
        </div>
      </Card>
    </MotionDiv>
  );
}

export function FeaturedProjects() {
  const { ref, inView } = useInView(0.2);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch('/api/projects/featured');
        if (response.ok) {
          const data = await response.json();
          setProjects(data);
        }
      } catch (error) {
        console.error('Failed to fetch featured projects:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchProjects();
  }, []);

  if (loading) {
    return (
      <section id="projects" className="py-24 bg-white dark:bg-secondary-950">
        <Container>
          <div className="text-center mb-16">
            <Heading as="h2" className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
              Featured Projects
            </Heading>
            <Text className="text-xl text-secondary-700 dark:text-secondary-300 max-w-3xl mx-auto leading-relaxed">
              Loading featured projects...
            </Text>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section id="projects" className="py-24 bg-white dark:bg-secondary-950">
      <Container>
        <MotionDiv 
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <MotionDiv variants={slideUpVariants}>
            <Heading as="h2" className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
              Featured Projects
            </Heading>
          </MotionDiv>
          <MotionDiv variants={slideUpVariants}>
            <Text className="text-xl text-secondary-700 dark:text-secondary-300 max-w-3xl mx-auto leading-relaxed">
              Here are some of my recent projects that showcase my skills and passion for creating exceptional digital experiences.
            </Text>
          </MotionDiv>
        </MotionDiv>
        
        <MotionDiv 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 mb-16"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </MotionDiv>
        
        <MotionDiv 
          className="text-center"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={slideUpVariants}
        >
          <MotionA 
            href="/projects" 
            className="inline-flex items-center justify-center rounded-lg text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-secondary-100 active:bg-secondary-200 dark:hover:bg-secondary-800 dark:active:bg-secondary-700 h-12 px-8 py-3 border border-secondary-300 dark:border-secondary-700 text-secondary-700 dark:text-secondary-300 shadow-lg hover:shadow-xl"
            variants={buttonHoverVariants}
            whileHover="hover"
            whileTap="tap"
          >
            View All Projects
            <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </MotionA>
        </MotionDiv>
      </Container>
    </section>
  );
}