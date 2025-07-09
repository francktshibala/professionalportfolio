import { StaticProject, Technology } from '@/types';

export const technologies: Technology[] = [
  { name: 'Next.js 14', category: 'frontend', color: '#000000' },
  { name: 'React 18', category: 'frontend', color: '#61DAFB' },
  { name: 'TypeScript', category: 'frontend', color: '#3178C6' },
  { name: 'Node.js', category: 'backend', color: '#339933' },
  { name: 'PostgreSQL', category: 'database', color: '#336791' },
  { name: 'MongoDB', category: 'database', color: '#47A248' },
  { name: 'Redis', category: 'database', color: '#DC382D' },
  { name: 'AWS', category: 'cloud', color: '#232F3E' },
  { name: 'Docker', category: 'devops', color: '#2496ED' },
  { name: 'Kubernetes', category: 'devops', color: '#326CE5' },
  { name: 'Python', category: 'backend', color: '#3776AB' },
  { name: 'TensorFlow', category: 'ai-ml', color: '#FF6F00' },
  { name: 'Stripe', category: 'backend', color: '#008CDD' },
  { name: 'Socket.io', category: 'backend', color: '#010101' },
  { name: 'Chart.js', category: 'frontend', color: '#FF6384' },
  { name: 'Tailwind CSS', category: 'frontend', color: '#06B6D4' },
  { name: 'Framer Motion', category: 'frontend', color: '#0055FF' },
];

export const projects: StaticProject[] = [
  {
    id: 'enterprise-ecommerce',
    title: 'Enterprise E-commerce Platform',
    description: 'Transformed a struggling retail business with a modern e-commerce solution that increased online sales by 340% in 6 months. Built with enterprise-grade architecture handling 10,000+ concurrent users and processing $2M+ monthly transactions.',
    shortDescription: 'Enterprise e-commerce platform with 340% sales increase and $2M+ monthly transactions.',
    category: 'e-commerce',
    technologies: [
      technologies.find(t => t.name === 'Next.js 14')!,
      technologies.find(t => t.name === 'TypeScript')!,
      technologies.find(t => t.name === 'PostgreSQL')!,
      technologies.find(t => t.name === 'Redis')!,
      technologies.find(t => t.name === 'Stripe')!,
      technologies.find(t => t.name === 'AWS')!,
    ],
    tags: ['e-commerce', 'scalability', 'performance', 'enterprise'],
    year: 2024,
    status: 'completed',
    featured: true,
    priority: 1,
    
    images: [
      {
        id: 'hero-1',
        url: '/api/placeholder/800/600',
        alt: 'E-commerce platform dashboard',
        caption: 'Modern admin dashboard with real-time analytics',
        type: 'hero',
        order: 1
      },
      {
        id: 'gallery-1',
        url: '/api/placeholder/600/400',
        alt: 'Product catalog page',
        caption: 'Optimized product browsing experience',
        type: 'gallery',
        order: 2
      },
      {
        id: 'gallery-2',
        url: '/api/placeholder/600/400',
        alt: 'Checkout process',
        caption: 'Streamlined one-page checkout',
        type: 'gallery',
        order: 3
      }
    ],
    
    demoUrl: 'https://demo-ecommerce.example.com',
    githubUrl: 'https://github.com/username/enterprise-ecommerce',
    
    caseStudy: {
      problem: 'Legacy PHP platform with 8-second load times, 65% cart abandonment rate, and frequent crashes during peak traffic. The client was losing customers to competitors and struggling with outdated infrastructure.',
      solution: 'Complete platform rebuild using modern microservices architecture with Next.js frontend, Node.js APIs, and PostgreSQL database. Implemented advanced caching with Redis, optimized database queries, and progressive web app features.',
      approach: [
        'Conducted comprehensive performance audit and user journey analysis',
        'Designed scalable microservices architecture with API-first approach',
        'Implemented progressive migration strategy to minimize downtime',
        'Built robust testing suite with 95% code coverage',
        'Deployed using blue-green deployment strategy on AWS'
      ],
      challenges: [
        {
          title: 'Data Migration',
          description: 'Migrating 10+ years of legacy data without data loss',
          solution: 'Built custom ETL pipelines with data validation and rollback capabilities'
        },
        {
          title: 'Performance Optimization',
          description: 'Achieving sub-2s load times under heavy traffic',
          solution: 'Implemented multi-layer caching, CDN optimization, and database indexing'
        },
        {
          title: 'Payment Integration',
          description: 'Seamless integration with multiple payment providers',
          solution: 'Created unified payment abstraction layer supporting 15+ payment methods'
        }
      ],
      results: [
        '340% increase in online sales within 6 months',
        '85% reduction in page load times (8s → 1.2s)',
        '45% decrease in cart abandonment rate',
        '99.9% uptime during Black Friday peak traffic',
        '60% improvement in mobile conversion rates'
      ],
      impact: 'The new platform enabled the client to scale from $500K to $2M+ in monthly revenue, expand to 3 new markets, and reduce operational costs by 40%.',
      timeline: '6 months',
      teamSize: 5,
      role: 'Lead Full-Stack Developer & Technical Architect',
      learnings: [
        'Importance of progressive migration strategies for large-scale rebuilds',
        'Advanced caching strategies for high-traffic e-commerce applications',
        'Building fault-tolerant payment processing systems'
      ]
    },
    
    metrics: {
      users: '10,000+',
      performance: '1.2s load time',
      revenue: '$2M+/month',
      uptime: '99.9%',
      efficiency: '+60%',
      growth: '+340%'
    },
    
    testimonial: {
      quote: "This platform transformation exceeded all our expectations. The new system is not only faster and more reliable, but has enabled us to scale our business to new heights.",
      author: "Sarah Johnson",
      position: "CEO",
      company: "RetailCorp Inc."
    },
    
    seo: {
      metaTitle: 'Enterprise E-commerce Platform Case Study - 340% Sales Increase',
      metaDescription: 'Learn how we transformed a struggling retail business with a modern e-commerce platform, achieving 340% sales growth and $2M+ monthly transactions.',
      keywords: ['e-commerce development', 'platform migration', 'performance optimization', 'Next.js', 'scalability']
    },
    
    createdAt: '2024-01-15',
    updatedAt: '2024-06-30'
  },
  
  {
    id: 'collaboration-suite',
    title: 'Real-time Collaboration Suite',
    description: 'Developed a comprehensive project management platform that revolutionized team productivity for 50+ companies. Features real-time collaboration, advanced analytics, and seamless integrations with 20+ popular tools.',
    shortDescription: 'Project management platform serving 50+ companies with 60% productivity improvement.',
    category: 'web-app',
    technologies: [
      technologies.find(t => t.name === 'React 18')!,
      technologies.find(t => t.name === 'Node.js')!,
      technologies.find(t => t.name === 'MongoDB')!,
      technologies.find(t => t.name === 'Socket.io')!,
      technologies.find(t => t.name === 'Docker')!,
      technologies.find(t => t.name === 'Kubernetes')!,
    ],
    tags: ['collaboration', 'real-time', 'productivity', 'SaaS'],
    year: 2024,
    status: 'completed',
    featured: true,
    priority: 2,
    
    images: [
      {
        id: 'hero-2',
        url: '/api/placeholder/800/600',
        alt: 'Collaboration suite dashboard',
        caption: 'Real-time project management dashboard',
        type: 'hero',
        order: 1
      },
      {
        id: 'gallery-3',
        url: '/api/placeholder/600/400',
        alt: 'Team collaboration interface',
        caption: 'Interactive team workspace with real-time updates',
        type: 'gallery',
        order: 2
      }
    ],
    
    demoUrl: 'https://demo-collab.example.com',
    githubUrl: 'https://github.com/username/collaboration-suite',
    
    caseStudy: {
      problem: 'Teams using 5+ disconnected tools, losing 2.5 hours daily to context switching and manual updates. Lack of real-time visibility into project progress was causing delays and miscommunication.',
      solution: 'Unified platform with real-time synchronization, drag-and-drop workflows, automated notifications, and comprehensive integrations with existing tools.',
      approach: [
        'Conducted user research with 100+ team leads across different industries',
        'Designed intuitive interface focusing on reducing cognitive load',
        'Built real-time architecture using WebSockets and event sourcing',
        'Created comprehensive API for third-party integrations',
        'Implemented progressive rollout with feature flags'
      ],
      challenges: [
        {
          title: 'Real-time Synchronization',
          description: 'Ensuring data consistency across multiple concurrent users',
          solution: 'Implemented operational transformation algorithms with conflict resolution'
        },
        {
          title: 'Integration Complexity',
          description: 'Supporting 20+ different third-party APIs with varying standards',
          solution: 'Built unified integration framework with adapter pattern'
        }
      ],
      results: [
        '60% improvement in team productivity metrics',
        '80% reduction in meeting time',
        '50+ companies onboarded within first year',
        '95% user satisfaction rating',
        '40% decrease in project delivery time'
      ],
      impact: 'Helped teams save over 100,000 hours collectively and improve project success rates by 45%.',
      timeline: '8 months',
      teamSize: 6,
      role: 'Technical Lead & Product Architect',
      learnings: [
        'User-centric design is crucial for productivity tools adoption',
        'Real-time systems require careful consideration of edge cases',
        'Integration flexibility can be a major competitive advantage'
      ]
    },
    
    metrics: {
      users: '2,500+',
      companies: '50+',
      productivity: '+60%',
      satisfaction: '95%',
      efficiency: '+40%',
      growth: '+150%'
    },
    
    testimonial: {
      quote: "This platform has transformed how our team works. We've eliminated countless hours of inefficiency and our project delivery has never been smoother.",
      author: "Michael Chen",
      position: "Engineering Manager",
      company: "TechFlow Solutions"
    },
    
    seo: {
      metaTitle: 'Real-time Collaboration Platform Case Study - 60% Productivity Boost',
      metaDescription: 'Discover how our collaboration suite helped 50+ companies achieve 60% productivity improvements through real-time synchronization and seamless integrations.',
      keywords: ['project management', 'team collaboration', 'real-time sync', 'productivity tools', 'React']
    },
    
    createdAt: '2023-08-01',
    updatedAt: '2024-04-15'
  },
  
  {
    id: 'ai-weather-platform',
    title: 'AI-Powered Weather Intelligence',
    description: 'Created an advanced weather analytics platform serving 100,000+ users with ML-powered forecasting that is 25% more accurate than traditional models. Used by agricultural businesses to optimize crop yields and reduce losses.',
    shortDescription: 'AI weather platform with 25% accuracy improvement serving 100K+ users.',
    category: 'ai-ml',
    technologies: [
      technologies.find(t => t.name === 'React 18')!,
      technologies.find(t => t.name === 'TypeScript')!,
      technologies.find(t => t.name === 'Python')!,
      technologies.find(t => t.name === 'TensorFlow')!,
      technologies.find(t => t.name === 'Chart.js')!,
      technologies.find(t => t.name === 'PostgreSQL')!,
    ],
    tags: ['AI', 'machine learning', 'weather', 'agriculture', 'analytics'],
    year: 2023,
    status: 'completed',
    featured: true,
    priority: 3,
    
    images: [
      {
        id: 'hero-3',
        url: '/api/placeholder/800/600',
        alt: 'Weather analytics dashboard',
        caption: 'AI-powered weather forecasting interface',
        type: 'hero',
        order: 1
      },
      {
        id: 'gallery-4',
        url: '/api/placeholder/600/400',
        alt: 'ML model visualization',
        caption: 'Interactive weather prediction models',
        type: 'gallery',
        order: 2
      }
    ],
    
    demoUrl: 'https://demo-weather.example.com',
    githubUrl: 'https://github.com/username/ai-weather-platform',
    
    caseStudy: {
      problem: 'Agricultural businesses losing $50,000+ annually due to inaccurate weather predictions and manual crop management decisions based on outdated forecasting models.',
      solution: 'ML-powered forecasting system combining multiple data sources with hyperlocal predictions, automated alerts, and data-driven agricultural recommendations.',
      approach: [
        'Collected and preprocessed weather data from 1000+ weather stations',
        'Developed ensemble ML models combining CNN and LSTM architectures',
        'Built real-time data pipeline for continuous model updates',
        'Created intuitive dashboard for agricultural decision-making',
        'Implemented A/B testing framework for model improvements'
      ],
      challenges: [
        {
          title: 'Data Quality',
          description: 'Inconsistent data from multiple weather sources',
          solution: 'Built data validation and cleansing pipeline with outlier detection'
        },
        {
          title: 'Model Accuracy',
          description: 'Achieving better accuracy than established weather services',
          solution: 'Ensemble approach combining multiple ML models with local calibration'
        }
      ],
      results: [
        '25% more accurate predictions than traditional models',
        '40% reduction in crop losses for agricultural clients',
        '100,000+ active users across 50 countries',
        '$2M+ in prevented agricultural losses',
        '92% user retention rate'
      ],
      impact: 'Revolutionized agricultural decision-making for thousands of farmers, contributing to more sustainable and profitable farming practices.',
      timeline: '10 months',
      teamSize: 4,
      role: 'ML Engineer & Full-Stack Developer',
      learnings: [
        'Domain expertise is crucial for effective ML model design',
        'Data quality often matters more than model complexity',
        'User trust is essential for AI adoption in traditional industries'
      ]
    },
    
    metrics: {
      users: '100,000+',
      accuracy: '+25%',
      savings: '$2M+',
      coverage: '50 countries',
      retention: '92%',
      efficiency: '+40%'
    },
    
    testimonial: {
      quote: "The accuracy of these predictions has been game-changing for our farming operations. We've significantly reduced losses and optimized our planting schedules.",
      author: "Robert Martinez",
      position: "Farm Operations Manager",
      company: "GreenFields Agriculture"
    },
    
    seo: {
      metaTitle: 'AI Weather Prediction Platform - 25% Better Accuracy for Agriculture',
      metaDescription: 'Explore our ML-powered weather platform that helps agricultural businesses reduce losses by 40% with 25% more accurate predictions.',
      keywords: ['AI weather prediction', 'machine learning', 'agriculture technology', 'crop management', 'TensorFlow']
    },
    
    createdAt: '2023-02-01',
    updatedAt: '2023-12-15'
  },
  
  {
    id: 'fintech-dashboard',
    title: 'FinTech Analytics Dashboard',
    description: 'Built a comprehensive financial analytics platform for investment firms managing $500M+ in assets. Features real-time market data, risk assessment, and regulatory compliance tools.',
    shortDescription: 'Financial analytics platform managing $500M+ assets with real-time insights.',
    category: 'dashboard',
    technologies: [
      technologies.find(t => t.name === 'Next.js 14')!,
      technologies.find(t => t.name === 'TypeScript')!,
      technologies.find(t => t.name === 'PostgreSQL')!,
      technologies.find(t => t.name === 'Redis')!,
      technologies.find(t => t.name === 'Chart.js')!,
      technologies.find(t => t.name === 'AWS')!,
    ],
    tags: ['fintech', 'analytics', 'compliance', 'real-time'],
    year: 2023,
    status: 'maintenance',
    featured: false,
    priority: 4,
    
    images: [
      {
        id: 'hero-4',
        url: '/api/placeholder/800/600',
        alt: 'FinTech dashboard',
        caption: 'Real-time financial analytics interface',
        type: 'hero',
        order: 1
      }
    ],
    
    demoUrl: 'https://demo-fintech.example.com',
    githubUrl: 'https://github.com/username/fintech-dashboard',
    
    caseStudy: {
      problem: 'Investment firms struggling with fragmented data sources, manual reporting processes, and compliance challenges requiring 40+ hours of weekly manual work.',
      solution: 'Unified dashboard aggregating real-time market data, automated compliance reporting, and advanced risk analytics with customizable alerts.',
      approach: [
        'Integrated with 15+ financial data providers',
        'Built real-time data processing pipeline',
        'Implemented advanced charting and visualization',
        'Created automated compliance reporting system',
        'Designed role-based access control'
      ],
      challenges: [
        {
          title: 'Data Latency',
          description: 'Processing high-frequency financial data in real-time',
          solution: 'Optimized data pipeline with Redis caching and WebSocket streaming'
        }
      ],
      results: [
        '90% reduction in manual reporting time',
        '$500M+ in assets under management',
        '99.9% uptime for critical trading hours',
        '100% compliance audit success rate'
      ],
      impact: 'Enabled investment firms to make faster, data-driven decisions while ensuring regulatory compliance.',
      timeline: '7 months',
      teamSize: 3,
      role: 'Senior Full-Stack Developer',
      learnings: [
        'Financial data requires extreme attention to accuracy and security',
        'Real-time systems in finance have zero tolerance for errors'
      ]
    },
    
    metrics: {
      assets: '$500M+',
      efficiency: '+90%',
      uptime: '99.9%',
      compliance: '100%'
    },
    
    seo: {
      metaTitle: 'FinTech Analytics Dashboard - Real-time Financial Data Platform',
      metaDescription: 'Professional financial analytics dashboard for investment firms managing $500M+ assets with real-time market data and compliance tools.',
      keywords: ['fintech dashboard', 'financial analytics', 'investment platform', 'compliance tools', 'real-time data']
    },
    
    createdAt: '2023-01-15',
    updatedAt: '2024-01-10'
  },
  
  {
    id: 'open-source-ui-library',
    title: 'Open Source UI Component Library',
    description: 'Created and maintain a popular React component library with 5,000+ GitHub stars, used by 200+ companies. Features accessible components, comprehensive documentation, and extensive customization options.',
    shortDescription: 'React UI library with 5K+ stars used by 200+ companies.',
    category: 'open-source',
    technologies: [
      technologies.find(t => t.name === 'React 18')!,
      technologies.find(t => t.name === 'TypeScript')!,
      technologies.find(t => t.name === 'Tailwind CSS')!,
      technologies.find(t => t.name === 'Framer Motion')!,
    ],
    tags: ['open-source', 'React', 'components', 'accessibility'],
    year: 2024,
    status: 'in-progress',
    featured: false,
    priority: 5,
    
    images: [
      {
        id: 'hero-5',
        url: '/api/placeholder/800/600',
        alt: 'UI component library showcase',
        caption: 'Comprehensive React component documentation',
        type: 'hero',
        order: 1
      }
    ],
    
    githubUrl: 'https://github.com/username/ui-component-library',
    demoUrl: 'https://ui-library-docs.example.com',
    
    caseStudy: {
      problem: 'Developers spending countless hours rebuilding common UI components, leading to inconsistent user experiences and slower development cycles.',
      solution: 'Comprehensive, accessible, and customizable React component library with excellent documentation and TypeScript support.',
      approach: [
        'Researched existing solutions and identified gaps',
        'Designed components with accessibility-first approach',
        'Built comprehensive Storybook documentation',
        'Implemented automated testing and CI/CD pipeline',
        'Created community contribution guidelines'
      ],
      challenges: [
        {
          title: 'Accessibility Compliance',
          description: 'Ensuring all components meet WCAG 2.1 AA standards',
          solution: 'Automated accessibility testing and manual audits with screen readers'
        }
      ],
      results: [
        '5,000+ GitHub stars and growing',
        '200+ companies using in production',
        '95% accessibility compliance score',
        '1M+ weekly npm downloads'
      ],
      impact: 'Accelerated development for hundreds of teams while promoting accessible web development practices.',
      timeline: 'Ongoing (1 year+)',
      role: 'Creator & Maintainer',
      learnings: [
        'Open source success requires consistent community engagement',
        'Documentation quality is as important as code quality'
      ]
    },
    
    metrics: {
      stars: '5,000+',
      companies: '200+',
      downloads: '1M+/week',
      accessibility: '95%'
    },
    
    seo: {
      metaTitle: 'Open Source React UI Library - 5K+ Stars, 200+ Companies',
      metaDescription: 'Accessible React component library with TypeScript support, used by 200+ companies. Features comprehensive documentation and customization options.',
      keywords: ['React components', 'UI library', 'open source', 'accessibility', 'TypeScript']
    },
    
    createdAt: '2023-06-01',
    updatedAt: '2024-07-01'
  }
];

export function getProjectById(id: string): StaticProject | undefined {
  return projects.find(project => project.id === id);
}

export function getFeaturedProjects(): StaticProject[] {
  return projects.filter(project => project.featured).sort((a, b) => a.priority - b.priority);
}

export function getProjectsByCategory(category: string): StaticProject[] {
  return projects.filter(project => project.category === category);
}

export function getProjectsByTechnology(technology: string): StaticProject[] {
  return projects.filter(project => 
    project.technologies.some(tech => tech.name.toLowerCase().includes(technology.toLowerCase()))
  );
}

export function getProjectsByYear(year: number): StaticProject[] {
  return projects.filter(project => project.year === year);
}

export function searchProjects(query: string): StaticProject[] {
  const lowercaseQuery = query.toLowerCase();
  return projects.filter(project =>
    project.title.toLowerCase().includes(lowercaseQuery) ||
    project.description.toLowerCase().includes(lowercaseQuery) ||
    project.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
    project.technologies.some(tech => tech.name.toLowerCase().includes(lowercaseQuery))
  );
}