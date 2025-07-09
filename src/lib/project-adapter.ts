import { StaticProject, DatabaseProject, DisplayProject, CaseStudy } from '@/types';
import { technologies } from '@/lib/projects';

export class ProjectAdapter {
  /**
   * Convert static project to display format
   */
  static staticToDisplay(staticProject: StaticProject): DisplayProject {
    return {
      id: staticProject.id,
      title: staticProject.title,
      description: staticProject.description,
      shortDescription: staticProject.shortDescription,
      category: staticProject.category,
      technologies: staticProject.technologies,
      tags: staticProject.tags,
      year: staticProject.year,
      status: staticProject.status,
      featured: staticProject.featured,
      priority: staticProject.priority,
      images: staticProject.images,
      demoUrl: staticProject.demoUrl,
      githubUrl: staticProject.githubUrl,
      caseStudyUrl: staticProject.caseStudyUrl,
      caseStudy: staticProject.caseStudy,
      metrics: staticProject.metrics,
      testimonial: staticProject.testimonial,
      seo: staticProject.seo,
      createdAt: staticProject.createdAt,
      updatedAt: staticProject.updatedAt,
    };
  }

  /**
   * Convert database project to display format
   */
  static databaseToDisplay(dbProject: DatabaseProject): DisplayProject {
    const category = dbProject.categories?.[0]?.name || 'web-app';
    const techObjects = dbProject.technologies.map(name => 
      technologies.find(t => t.name === name) || { name, category: 'frontend' as const }
    );

    return {
      id: dbProject.id,
      title: dbProject.title,
      description: dbProject.description,
      shortDescription: dbProject.longDescription || dbProject.description.substring(0, 150),
      category,
      technologies: techObjects,
      tags: this.extractTagsFromDescription(dbProject.description),
      year: dbProject.startDate ? new Date(dbProject.startDate).getFullYear() : new Date(dbProject.createdAt).getFullYear(),
      status: this.mapDatabaseStatus(dbProject.status),
      featured: dbProject.featured,
      priority: dbProject.featured ? 1 : 5,
      images: this.parseJsonField(dbProject.images, []),
      demoUrl: dbProject.liveUrl || undefined,
      githubUrl: dbProject.githubUrl || undefined,
      caseStudy: this.parseJsonField(dbProject.caseStudy, this.getDefaultCaseStudy()),
      metrics: this.parseJsonField(dbProject.metrics, {}),
      testimonial: this.parseJsonField(dbProject.testimonial, undefined),
      seo: this.parseJsonField(dbProject.seo, this.getDefaultSeo(dbProject.title, dbProject.description)),
      createdAt: dbProject.createdAt.toISOString().split('T')[0],
      updatedAt: dbProject.updatedAt.toISOString().split('T')[0],
    };
  }

  /**
   * Convert static project to database format for migration
   */
  static staticToDatabase(staticProject: StaticProject, authorId: string): Omit<DatabaseProject, 'id' | 'createdAt' | 'updatedAt' | 'views' | 'likes' | 'author' | 'categories'> {
    return {
      title: staticProject.title,
      slug: staticProject.id,
      description: staticProject.description,
      longDescription: staticProject.shortDescription,
      image: staticProject.images[0]?.url || null,
      liveUrl: staticProject.demoUrl || null,
      githubUrl: staticProject.githubUrl || null,
      technologies: staticProject.technologies.map(t => t.name),
      featured: staticProject.featured,
      status: this.mapStaticStatus(staticProject.status) as any,
      startDate: new Date(`${staticProject.year}-01-01`),
      endDate: staticProject.status === 'completed' ? new Date(`${staticProject.year}-12-31`) : null,
      authorId,
      
      // Store rich content as JSON
      caseStudy: JSON.stringify(staticProject.caseStudy),
      metrics: JSON.stringify(staticProject.metrics),
      testimonial: staticProject.testimonial ? JSON.stringify(staticProject.testimonial) : null,
      images: JSON.stringify(staticProject.images),
      seo: JSON.stringify(staticProject.seo),
    };
  }

  /**
   * Convert display project to database format for updates
   */
  static displayToDatabase(displayProject: DisplayProject, authorId: string): Partial<DatabaseProject> {
    return {
      title: displayProject.title,
      slug: displayProject.id,
      description: displayProject.description,
      longDescription: displayProject.shortDescription,
      image: displayProject.images[0]?.url || null,
      liveUrl: displayProject.demoUrl || null,
      githubUrl: displayProject.githubUrl || null,
      technologies: displayProject.technologies.map(t => t.name),
      featured: displayProject.featured,
      status: this.mapStaticStatus(displayProject.status),
      startDate: new Date(`${displayProject.year}-01-01`),
      endDate: displayProject.status === 'completed' ? new Date(`${displayProject.year}-12-31`) : null,
      authorId,
      
      // Store rich content as JSON
      caseStudy: displayProject.caseStudy,
      metrics: displayProject.metrics,
      testimonial: displayProject.testimonial || null,
      images: displayProject.images,
      seo: displayProject.seo,
    };
  }

  private static parseJsonField<T>(field: unknown, defaultValue: T): T {
    if (field === null || field === undefined) return defaultValue;
    if (typeof field === 'string') {
      try {
        return JSON.parse(field);
      } catch {
        return defaultValue;
      }
    }
    return field as T;
  }

  private static mapDatabaseStatus(status: string): 'completed' | 'in-progress' | 'maintenance' | 'archived' {
    switch (status) {
      case 'ACTIVE': return 'in-progress';
      case 'ARCHIVED': return 'archived';
      case 'DRAFT': return 'in-progress';
      case 'MAINTENANCE': return 'maintenance';
      default: return 'completed';
    }
  }

  private static mapStaticStatus(status: 'completed' | 'in-progress' | 'maintenance' | 'archived'): string {
    switch (status) {
      case 'completed': return 'ACTIVE';
      case 'in-progress': return 'ACTIVE';
      case 'maintenance': return 'MAINTENANCE';
      case 'archived': return 'ARCHIVED';
      default: return 'ACTIVE';
    }
  }

  private static extractTagsFromDescription(description: string): string[] {
    // Simple tag extraction - can be enhanced
    const words = description.toLowerCase().split(/\s+/);
    const commonTech = ['react', 'nextjs', 'typescript', 'node', 'api', 'database', 'ai', 'ml'];
    return words.filter(word => commonTech.includes(word)).slice(0, 5);
  }

  private static getDefaultCaseStudy(): CaseStudy {
    return {
      problem: '',
      solution: '',
      approach: [],
      challenges: [],
      results: [],
      impact: '',
      timeline: '',
      role: '',
      learnings: []
    };
  }

  private static getDefaultSeo(title: string, description: string) {
    return {
      metaTitle: title,
      metaDescription: description.substring(0, 160),
      keywords: []
    };
  }
}