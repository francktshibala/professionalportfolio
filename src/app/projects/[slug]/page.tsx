import { notFound } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { Heading, Text } from '@/components/ui/Typography';
import { Card } from '@/components/ui/Card';
import { ProjectService } from '@/lib/project-service';
import { projects } from '@/lib/projects';
import Link from 'next/link';

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.id,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const project = await ProjectService.getProjectById(params.slug);
  
  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: project.seo.metaTitle,
    description: project.seo.metaDescription,
    keywords: project.seo.keywords.join(', '),
    openGraph: {
      title: project.seo.metaTitle,
      description: project.seo.metaDescription,
      images: project.images.filter(img => img.type === 'hero').map(img => ({
        url: img.url,
        alt: img.alt,
      })),
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const project = await ProjectService.getProjectById(params.slug);

  if (!project) {
    notFound();
  }

  return (
    <Container className="py-12">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-start justify-between gap-8">
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-4">
              <Link
                href="/projects"
                className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 transition-colors"
              >
                ← Back to Projects
              </Link>
              {project.featured && (
                <span className="px-3 py-1 bg-accent-100 dark:bg-accent-900 text-accent-800 dark:text-accent-200 rounded-full text-sm font-medium">
                  Featured
                </span>
              )}
            </div>
            <Heading size="h1" className="mb-4 bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
              {project.title}
            </Heading>
            <Text className="text-xl text-secondary-700 dark:text-secondary-300 max-w-4xl">
              {project.description}
            </Text>
          </div>
          
          <div className="flex gap-3 flex-shrink-0">
            {project.demoUrl && (
              <a 
                href={project.demoUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:scale-105 active:scale-95 bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800 shadow-md hover:shadow-lg h-10 px-4 py-2"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Live Demo
              </a>
            )}
            {project.githubUrl && (
              <a 
                href={project.githubUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:scale-105 active:scale-95 border border-secondary-300 dark:border-secondary-700 text-secondary-700 dark:text-secondary-300 hover:bg-secondary-100 dark:hover:bg-secondary-800 active:bg-secondary-200 dark:active:bg-secondary-700 shadow-sm hover:shadow-md h-10 px-4 py-2"
              >
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-12">
          {/* Project Overview */}
          <div className="space-y-6">
            <div>
              <Heading as="h2" className="text-2xl font-bold mb-4">
                Project Overview
              </Heading>
              <Text className="text-lg leading-relaxed">
                {project.shortDescription}
              </Text>
            </div>

            {/* Technologies */}
            <div>
              <Heading as="h3" className="text-xl font-semibold mb-3">
                Technologies Used
              </Heading>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech.name}
                    className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 rounded-full text-sm font-medium"
                  >
                    {tech.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div>
              <Heading as="h3" className="text-xl font-semibold mb-3">
                Tags
              </Heading>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-secondary-100 dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300 rounded-full text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Project Details */}
          <Card>
            <div className="space-y-4">
              <Heading as="h3" className="text-lg font-semibold">
                Project Details
              </Heading>
              <div className="space-y-3">
                <div>
                  <Text className="text-sm text-secondary-600 dark:text-secondary-400">
                    Category
                  </Text>
                  <Text className="text-sm font-medium capitalize">
                    {project.category.replace('-', ' ')}
                  </Text>
                </div>
                <div>
                  <Text className="text-sm text-secondary-600 dark:text-secondary-400">
                    Year
                  </Text>
                  <Text className="text-sm font-medium">
                    {project.year}
                  </Text>
                </div>
                <div>
                  <Text className="text-sm text-secondary-600 dark:text-secondary-400">
                    Status
                  </Text>
                  <Text className="text-sm font-medium capitalize">
                    {project.status.replace('-', ' ')}
                  </Text>
                </div>
                <div>
                  <Text className="text-sm text-secondary-600 dark:text-secondary-400">
                    Featured
                  </Text>
                  <Text className="text-sm font-medium">
                    {project.featured ? 'Yes' : 'No'}
                  </Text>
                </div>
              </div>
            </div>
          </Card>

          {/* Key Metrics */}
          {project.metrics && (
            <Card>
              <div className="space-y-4">
                <Heading as="h3" className="text-lg font-semibold">
                  Key Metrics
                </Heading>
                <div className="grid grid-cols-1 gap-3">
                  {Object.entries(project.metrics).map(([key, value]) => (
                    <div key={key}>
                      <Text className="text-sm text-secondary-600 dark:text-secondary-400 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </Text>
                      <Text className="text-lg font-bold">
                        {value}
                      </Text>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </Container>
  );
}