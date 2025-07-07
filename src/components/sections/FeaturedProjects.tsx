import { Card } from '@/components/ui/Card';
import { Container } from '@/components/ui/Container';
import { Heading, Text } from '@/components/ui/Typography';

const featuredProjects = [
  {
    id: 1,
    title: 'E-commerce Platform',
    description: 'A full-stack e-commerce solution built with Next.js, TypeScript, and PostgreSQL. Features include user authentication, payment processing, and admin dashboard.',
    image: '/api/placeholder/400/250',
    technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'Stripe'],
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    id: 2,
    title: 'Task Management App',
    description: 'A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.',
    image: '/api/placeholder/400/250',
    technologies: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    id: 3,
    title: 'Weather Dashboard',
    description: 'A responsive weather dashboard with location-based forecasts, interactive charts, and customizable widgets for weather data visualization.',
    image: '/api/placeholder/400/250',
    technologies: ['React', 'TypeScript', 'Chart.js', 'OpenWeather API'],
    liveUrl: '#',
    githubUrl: '#',
  },
];

function ProjectCard({ project }: { project: typeof featuredProjects[0] }) {
  return (
    <Card className="overflow-hidden group hover:shadow-lg transition-shadow duration-300">
      <div className="aspect-video bg-muted relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-2xl">🚀</span>
            </div>
            <Text className="text-sm text-muted-foreground">Project Screenshot</Text>
          </div>
        </div>
      </div>
      <div className="p-6">
        <Heading as="h3" className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
          {project.title}
        </Heading>
        <Text className="text-muted-foreground mb-4">
          {project.description}
        </Text>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="flex gap-3">
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800 h-9 px-3 py-2">
            Live Demo
          </a>
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-secondary-100 active:bg-secondary-200 h-9 px-3 py-2 border border-input">
            GitHub
          </a>
        </div>
      </div>
    </Card>
  );
}

export function FeaturedProjects() {
  return (
    <section id="projects" className="py-20">
      <Container>
        <div className="text-center mb-12">
          <Heading as="h2" className="text-3xl lg:text-4xl font-bold mb-4">
            Featured Projects
          </Heading>
          <Text className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Here are some of my recent projects that showcase my skills and passion for web development.
          </Text>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
        
        <div className="text-center">
          <a href="/projects" className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-secondary-100 active:bg-secondary-200 h-11 px-8 py-2 border border-input">
            View All Projects
          </a>
        </div>
      </Container>
    </section>
  );
}