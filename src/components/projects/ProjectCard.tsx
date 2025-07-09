'use client';

import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Heading, Text } from '@/components/ui/Typography';
import { MotionDiv, MotionA, slideUpVariants, buttonHoverVariants } from '@/components/ui/MotionComponents';
import { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
  showFullDescription?: boolean;
  priority?: 'low' | 'medium' | 'high';
}

export function ProjectCard({ project, showFullDescription = false }: ProjectCardProps) {
  const description = showFullDescription ? project.description : project.description;
  const category = project.category || 'web-app';
  const displayStatus = project.status;
  
  return (
    <MotionDiv variants={slideUpVariants}>
      <Card className="overflow-hidden group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 bg-white dark:bg-secondary-900 border-secondary-200 dark:border-secondary-700 h-full flex flex-col">
        {/* Project Image/Preview */}
        <div className="aspect-video bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-950 dark:to-accent-950 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-100/50 to-accent-100/50 dark:from-primary-900/50 dark:to-accent-900/50 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg group-hover:shadow-2xl group-hover:rotate-6 transition-all duration-300">
                {getCategoryIcon(category)}
              </div>
              <Text className="text-sm font-medium text-secondary-600 dark:text-secondary-400 capitalize">
                {category.replace('-', ' ')}
              </Text>
            </div>
          </div>
          
          {/* Status Badge */}
          <div className="absolute top-4 right-4">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyles(displayStatus)}`}>
              {displayStatus.replace('-', ' ')}
            </span>
          </div>
          
          {/* Featured Badge */}
          {project.featured && (
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full text-xs font-semibold shadow-lg">
                Featured
              </span>
            </div>
          )}
        </div>

        <div className="p-6 flex-1 flex flex-col">
          {/* Title and Description */}
          <div className="mb-4">
            <Heading as="h3" className="text-xl font-bold mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors text-secondary-900 dark:text-secondary-100">
              {project.title}
            </Heading>
            <Text className="text-secondary-700 dark:text-secondary-300 leading-relaxed">
              {description}
            </Text>
          </div>

          {/* Project Stats */}
          <div className="grid grid-cols-2 gap-3 mb-4 p-4 bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-950/50 dark:to-accent-950/50 rounded-lg">
            <div className="text-center">
              <div className="text-lg font-bold text-primary-600 dark:text-primary-400">{project.year}</div>
              <div className="text-xs text-secondary-600 dark:text-secondary-400">Year</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-primary-600 dark:text-primary-400">{project.priority}</div>
              <div className="text-xs text-secondary-600 dark:text-secondary-400">Priority</div>
            </div>
          </div>

          {/* Technologies */}
          <div className="mb-6 flex-1">
            <div className="flex flex-wrap gap-2">
              {project.technologies.slice(0, 6).map((tech) => (
                <span
                  key={tech.name}
                  className="px-3 py-1.5 bg-gradient-to-r from-primary-100 to-accent-100 dark:from-primary-900 dark:to-accent-900 text-primary-700 dark:text-primary-300 rounded-full text-xs font-semibold shadow-sm hover:shadow-md transition-shadow cursor-default"
                  style={{ 
                    borderLeft: `3px solid ${tech.color || '#6366f1'}` 
                  }}
                >
                  {tech.name}
                </span>
              ))}
              {project.technologies.length > 6 && (
                <span className="px-3 py-1.5 bg-secondary-100 dark:bg-secondary-800 text-secondary-600 dark:text-secondary-400 rounded-full text-xs font-semibold">
                  +{project.technologies.length - 6} more
                </span>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-auto">
            <Link href={`/projects/${project.id}`} className="flex-1">
              <MotionA
                className="inline-flex items-center justify-center rounded-lg text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gradient-to-r from-primary-600 to-primary-700 text-white hover:from-primary-700 hover:to-primary-800 active:from-primary-800 active:to-primary-900 shadow-lg hover:shadow-xl h-10 px-4 py-2 w-full"
                variants={buttonHoverVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                View Details
              </MotionA>
            </Link>

            {project.demoUrl && (
              <MotionA
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-lg text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-secondary-100 active:bg-secondary-200 dark:hover:bg-secondary-800 dark:active:bg-secondary-700 h-10 px-4 py-2 border border-secondary-300 dark:border-secondary-700 text-secondary-700 dark:text-secondary-300 shadow-sm hover:shadow-md"
                variants={buttonHoverVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Demo
              </MotionA>
            )}

            {project.githubUrl && (
              <MotionA
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-lg text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-secondary-100 active:bg-secondary-200 dark:hover:bg-secondary-800 dark:active:bg-secondary-700 h-10 px-3 py-2 border border-secondary-300 dark:border-secondary-700 text-secondary-700 dark:text-secondary-300 shadow-sm hover:shadow-md"
                variants={buttonHoverVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </MotionA>
            )}
          </div>
        </div>
      </Card>
    </MotionDiv>
  );
}

function getCategoryIcon(category: string) {
  const iconClass = "w-10 h-10 text-white";
  
  switch (category) {
    case 'e-commerce':
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      );
    case 'web-app':
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      );
    case 'mobile-app':
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a1 1 0 001-1V4a1 1 0 00-1-1H8a1 1 0 00-1 1v16a1 1 0 001 1z" />
        </svg>
      );
    case 'dashboard':
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      );
    case 'ai-ml':
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      );
    case 'api':
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      );
    case 'open-source':
      return (
        <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      );
    default:
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      );
  }
}

function getStatusStyles(status: string): string {
  switch (status) {
    case 'completed':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
    case 'in-progress':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
    case 'maintenance':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
    case 'archived':
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
  }
}