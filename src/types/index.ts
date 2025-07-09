// Static project interface (for lib/projects.ts)
export interface StaticProject {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  category: ProjectCategory;
  technologies: Technology[];
  tags: string[];
  year: number;
  status: StaticProjectStatus;
  featured: boolean;
  priority: number;
  
  images: ProjectImage[];
  demoUrl?: string;
  githubUrl?: string;
  caseStudyUrl?: string;
  
  caseStudy: CaseStudy;
  metrics: ProjectMetrics;
  testimonial?: Testimonial;
  
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
  
  createdAt: string;
  updatedAt: string;
}

// Database project interface (matches Prisma schema exactly)
export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  longDescription: string | null;
  image: string | null;
  liveUrl: string | null;
  githubUrl: string | null;
  technologies: string[];
  featured: boolean;
  status: ProjectStatus;
  startDate: Date | null;
  endDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
  views: number;
  likes: number;
  authorId: string;
  categories?: ProjectCategory[];
  author?: {
    id: string;
    name: string | null;
    email: string;
  };
}

export interface ProjectImage {
  id: string;
  url: string;
  alt: string;
  caption?: string;
  type: 'hero' | 'gallery' | 'demo' | 'before' | 'after';
  order: number;
}

export interface CaseStudy {
  problem: string;
  solution: string;
  approach: string[];
  challenges: Challenge[];
  results: string[];
  impact: string;
  timeline: string;
  teamSize?: number;
  role: string;
  learnings: string[];
}

export interface Challenge {
  title: string;
  description: string;
  solution: string;
}

export interface ProjectMetrics {
  users?: string;
  performance?: string;
  efficiency?: string;
  revenue?: string;
  growth?: string;
  satisfaction?: string;
  [key: string]: string | undefined;
}

export interface Technology {
  name: string;
  category: TechCategory;
  icon?: string;
  color?: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  position: string;
  company: string;
  avatar?: string;
}

export type ProjectCategory = 
  | 'web-app' 
  | 'mobile-app' 
  | 'e-commerce' 
  | 'dashboard' 
  | 'api' 
  | 'tool' 
  | 'ai-ml' 
  | 'open-source';

export type TechCategory = 
  | 'frontend' 
  | 'backend' 
  | 'database' 
  | 'cloud' 
  | 'mobile' 
  | 'ai-ml' 
  | 'devops' 
  | 'design';

// Static project status (for lib/projects.ts)
export type StaticProjectStatus = 
  | 'completed' 
  | 'in-progress' 
  | 'maintenance' 
  | 'archived';

// Database project status (matches Prisma schema)
export type ProjectStatus = 
  | 'ACTIVE' 
  | 'ARCHIVED' 
  | 'DRAFT' 
  | 'MAINTENANCE';

export interface ProjectFilters {
  categories: ProjectCategory[];
  technologies: string[];
  years: number[];
  status: StaticProjectStatus[];
  search: string;
}

export interface GitHubStats {
  stars: number;
  forks: number;
  watchers: number;
  language: string;
  lastUpdate: string;
  openIssues: number;
}