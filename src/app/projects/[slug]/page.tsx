import { notFound } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { Heading, Text } from '@/components/ui/Typography';
import { Card } from '@/components/ui/Card';
import { ProjectGallery } from '@/components/projects/ProjectGallery';
import { getProjectById, projects } from '@/lib/projects';
import { Project } from '@/types';
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
  const project = getProjectById(params.slug);
  
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

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = getProjectById(params.slug);

  if (!project) {
    notFound();
  }

  return (
    <Container className="py-12">
      {/* Header */}
      <div className="mb-12">
        <Link 
          href="/projects"
          className="inline-flex items-center text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 mb-6 group"
        >
          <svg className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Projects
        </Link>
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <Heading size="h1" className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                {project.title}
              </Heading>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyles(project.status)}`}>
                {project.status.replace('-', ' ')}
              </span>
              {project.featured && (
                <span className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full text-xs font-semibold">
                  Featured
                </span>
              )}
            </div>
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
          {/* Project Gallery */}
          <ProjectGallery images={project.images} />

          {/* Case Study */}
          <CaseStudySection project={project} />

          {/* Technologies */}
          <TechnologiesSection project={project} />

          {/* Testimonial */}
          {project.testimonial && (
            <TestimonialSection testimonial={project.testimonial} />
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Key Metrics */}
          <MetricsCard project={project} />

          {/* Project Details */}
          <ProjectDetailsCard project={project} />

          {/* Related Projects */}
          <RelatedProjects currentProject={project} />
        </div>
      </div>
    </Container>
  );
}

function CaseStudySection({ project }: { project: Project }) {
  return (
    <div className="space-y-8">
      <Heading as="h2" className="text-3xl font-bold text-secondary-900 dark:text-secondary-100">
        Case Study
      </Heading>

      {/* Problem */}
      <div>
        <Heading as="h3" className="text-xl font-semibold text-red-600 dark:text-red-400 mb-4 flex items-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.664-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          The Problem
        </Heading>
        <Text className="text-secondary-700 dark:text-secondary-300 leading-relaxed">
          {project.caseStudy.problem}
        </Text>
      </div>

      {/* Solution */}
      <div>
        <Heading as="h3" className="text-xl font-semibold text-green-600 dark:text-green-400 mb-4 flex items-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          The Solution
        </Heading>
        <Text className="text-secondary-700 dark:text-secondary-300 leading-relaxed">
          {project.caseStudy.solution}
        </Text>
      </div>

      {/* Approach */}
      <div>
        <Heading as="h3" className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-4 flex items-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Our Approach
        </Heading>
        <ul className="space-y-3">
          {project.caseStudy.approach.map((step, index) => (
            <li key={index} className="flex items-start">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">
                {index + 1}
              </span>
              <Text className="text-secondary-700 dark:text-secondary-300 leading-relaxed">
                {step}
              </Text>
            </li>
          ))}
        </ul>
      </div>

      {/* Challenges */}
      {project.caseStudy.challenges.length > 0 && (
        <div>
          <Heading as="h3" className="text-xl font-semibold text-orange-600 dark:text-orange-400 mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            Key Challenges
          </Heading>
          <div className="space-y-4">
            {project.caseStudy.challenges.map((challenge, index) => (
              <Card key={index} className="p-4 border-l-4 border-orange-500">
                <Heading as="h4" className="font-semibold text-secondary-900 dark:text-secondary-100 mb-2">
                  {challenge.title}
                </Heading>
                <Text className="text-secondary-700 dark:text-secondary-300 mb-3">
                  {challenge.description}
                </Text>
                <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                  <Text className="text-green-800 dark:text-green-300 font-medium">
                    Solution: {challenge.solution}
                  </Text>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Results */}
      <div>
        <Heading as="h3" className="text-xl font-semibold text-purple-600 dark:text-purple-400 mb-4 flex items-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          Results & Impact
        </Heading>
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          {project.caseStudy.results.map((result, index) => (
            <div key={index} className="flex items-start bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 p-4 rounded-lg">
              <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <Text className="text-secondary-700 dark:text-secondary-300 leading-relaxed">
                {result}
              </Text>
            </div>
          ))}
        </div>
        <div className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 p-6 rounded-lg">
          <Text className="text-purple-800 dark:text-purple-300 font-medium text-lg">
            {project.caseStudy.impact}
          </Text>
        </div>
      </div>
    </div>
  );
}

function TechnologiesSection({ project }: { project: Project }) {
  const techByCategory = project.technologies.reduce((acc, tech) => {
    if (!acc[tech.category]) {
      acc[tech.category] = [];
    }
    acc[tech.category].push(tech);
    return acc;
  }, {} as Record<string, typeof project.technologies>);

  return (
    <div>
      <Heading as="h2" className="text-3xl font-bold text-secondary-900 dark:text-secondary-100 mb-8">
        Technologies Used
      </Heading>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(techByCategory).map(([category, techs]) => (
          <Card key={category} className="p-6">
            <Heading as="h3" className="font-semibold text-secondary-900 dark:text-secondary-100 mb-4 capitalize">
              {category.replace('-', ' ')}
            </Heading>
            <div className="space-y-3">
              {techs.map((tech) => (
                <div key={tech.name} className="flex items-center">
                  <div
                    className="w-4 h-4 rounded-sm mr-3"
                    style={{ backgroundColor: tech.color }}
                  />
                  <Text className="text-secondary-700 dark:text-secondary-300">
                    {tech.name}
                  </Text>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function TestimonialSection({ testimonial }: { testimonial: Project['testimonial'] }) {
  if (!testimonial) return null;

  return (
    <Card className="p-8 bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-950 dark:to-accent-950 border-primary-200 dark:border-primary-800">
      <svg className="w-10 h-10 text-primary-600 dark:text-primary-400 mb-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
      </svg>
      <Text className="text-lg text-secondary-800 dark:text-secondary-200 mb-6 italic leading-relaxed">
        &ldquo;{testimonial.quote}&rdquo;
      </Text>
      <div className="flex items-center">
        <div>
          <Text className="font-semibold text-secondary-900 dark:text-secondary-100">
            {testimonial.author}
          </Text>
          <Text className="text-sm text-secondary-600 dark:text-secondary-400">
            {testimonial.position} at {testimonial.company}
          </Text>
        </div>
      </div>
    </Card>
  );
}

function MetricsCard({ project }: { project: Project }) {
  return (
    <Card className="p-6">
      <Heading as="h3" className="font-semibold text-secondary-900 dark:text-secondary-100 mb-4">
        Key Metrics
      </Heading>
      <div className="space-y-4">
        {Object.entries(project.metrics).map(([key, value]) => (
          <div key={key} className="flex justify-between items-center">
            <Text className="text-sm text-secondary-600 dark:text-secondary-400 capitalize">
              {key.replace(/([A-Z])/g, ' $1').trim()}
            </Text>
            <Text className="font-semibold text-primary-600 dark:text-primary-400">
              {value}
            </Text>
          </div>
        ))}
      </div>
    </Card>
  );
}

function ProjectDetailsCard({ project }: { project: Project }) {
  return (
    <Card className="p-6">
      <Heading as="h3" className="font-semibold text-secondary-900 dark:text-secondary-100 mb-4">
        Project Details
      </Heading>
      <div className="space-y-4">
        <div>
          <Text className="text-sm text-secondary-600 dark:text-secondary-400">Category</Text>
          <Text className="font-medium text-secondary-900 dark:text-secondary-100 capitalize">
            {project.category.replace('-', ' ')}
          </Text>
        </div>
        <div>
          <Text className="text-sm text-secondary-600 dark:text-secondary-400">Year</Text>
          <Text className="font-medium text-secondary-900 dark:text-secondary-100">
            {project.year}
          </Text>
        </div>
        <div>
          <Text className="text-sm text-secondary-600 dark:text-secondary-400">Timeline</Text>
          <Text className="font-medium text-secondary-900 dark:text-secondary-100">
            {project.caseStudy.timeline}
          </Text>
        </div>
        {project.caseStudy.teamSize && (
          <div>
            <Text className="text-sm text-secondary-600 dark:text-secondary-400">Team Size</Text>
            <Text className="font-medium text-secondary-900 dark:text-secondary-100">
              {project.caseStudy.teamSize} {project.caseStudy.teamSize === 1 ? 'person' : 'people'}
            </Text>
          </div>
        )}
        <div>
          <Text className="text-sm text-secondary-600 dark:text-secondary-400">My Role</Text>
          <Text className="font-medium text-secondary-900 dark:text-secondary-100">
            {project.caseStudy.role}
          </Text>
        </div>
      </div>
    </Card>
  );
}

function RelatedProjects({ currentProject }: { currentProject: Project }) {
  const relatedProjects = projects
    .filter(p => p.id !== currentProject.id && p.category === currentProject.category)
    .slice(0, 3);

  if (relatedProjects.length === 0) return null;

  return (
    <Card className="p-6">
      <Heading as="h3" className="font-semibold text-secondary-900 dark:text-secondary-100 mb-4">
        Related Projects
      </Heading>
      <div className="space-y-4">
        {relatedProjects.map((project) => (
          <Link key={project.id} href={`/projects/${project.id}`} className="block group">
            <div className="p-3 rounded-lg hover:bg-secondary-50 dark:hover:bg-secondary-800 transition-colors">
              <Text className="font-medium text-secondary-900 dark:text-secondary-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                {project.title}
              </Text>
              <Text className="text-sm text-secondary-600 dark:text-secondary-400 mt-1">
                {project.shortDescription}
              </Text>
            </div>
          </Link>
        ))}
      </div>
    </Card>
  );
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