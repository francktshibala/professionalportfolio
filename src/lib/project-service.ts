import { DisplayProject } from '@/types';
import { ProjectAdapter } from '@/lib/project-adapter';
import { projects as staticProjects, getProjectById as getStaticProjectById, getFeaturedProjects as getStaticFeaturedProjects, searchProjects as searchStaticProjects } from '@/lib/projects';

/**
 * Project service with data source routing
 * Currently uses static data, can be enhanced to use database
 */
export class ProjectService {
  private static readonly USE_DATABASE = process.env.NEXT_PUBLIC_USE_DATABASE === 'true';

  /**
   * Get all projects
   */
  static async getProjects(): Promise<DisplayProject[]> {
    if (this.USE_DATABASE) {
      return this.getDatabaseProjects();
    }
    return this.getStaticProjects();
  }

  /**
   * Get project by ID
   */
  static async getProjectById(id: string): Promise<DisplayProject | null> {
    if (this.USE_DATABASE) {
      return this.getDatabaseProjectById(id);
    }
    return this.getStaticProjectById(id);
  }

  /**
   * Get featured projects
   */
  static async getFeaturedProjects(): Promise<DisplayProject[]> {
    if (this.USE_DATABASE) {
      return this.getDatabaseFeaturedProjects();
    }
    return this.getStaticFeaturedProjects();
  }

  /**
   * Search projects
   */
  static async searchProjects(query: string): Promise<DisplayProject[]> {
    if (this.USE_DATABASE) {
      return this.searchDatabaseProjects(query);
    }
    return this.searchStaticProjects(query);
  }

  /**
   * Get projects by category
   */
  static async getProjectsByCategory(category: string): Promise<DisplayProject[]> {
    const projects = await this.getProjects();
    return projects.filter(project => project.category === category);
  }

  /**
   * Get projects by technology
   */
  static async getProjectsByTechnology(technology: string): Promise<DisplayProject[]> {
    const projects = await this.getProjects();
    return projects.filter(project => 
      project.technologies.some(tech => 
        tech.name.toLowerCase().includes(technology.toLowerCase())
      )
    );
  }

  /**
   * Get projects by year
   */
  static async getProjectsByYear(year: number): Promise<DisplayProject[]> {
    const projects = await this.getProjects();
    return projects.filter(project => project.year === year);
  }

  // Static data methods
  private static getStaticProjects(): DisplayProject[] {
    return staticProjects.map(ProjectAdapter.staticToDisplay);
  }

  private static getStaticProjectById(id: string): DisplayProject | null {
    const project = getStaticProjectById(id);
    return project ? ProjectAdapter.staticToDisplay(project) : null;
  }

  private static getStaticFeaturedProjects(): DisplayProject[] {
    return getStaticFeaturedProjects().map(ProjectAdapter.staticToDisplay);
  }

  private static searchStaticProjects(query: string): DisplayProject[] {
    return searchStaticProjects(query).map(ProjectAdapter.staticToDisplay);
  }

  // Database methods (placeholder implementations)
  private static async getDatabaseProjects(): Promise<DisplayProject[]> {
    // TODO: Implement database fetching
    // const projects = await prisma.project.findMany({
    //   include: { categories: true, author: true }
    // });
    // return projects.map(ProjectAdapter.databaseToDisplay);
    console.warn('Database projects not implemented yet, falling back to static');
    return this.getStaticProjects();
  }

  private static async getDatabaseProjectById(id: string): Promise<DisplayProject | null> {
    // TODO: Implement database fetching
    // const project = await prisma.project.findUnique({
    //   where: { slug: id },
    //   include: { categories: true, author: true }
    // });
    // return project ? ProjectAdapter.databaseToDisplay(project) : null;
    console.warn('Database project fetch not implemented yet, falling back to static');
    return this.getStaticProjectById(id);
  }

  private static async getDatabaseFeaturedProjects(): Promise<DisplayProject[]> {
    // TODO: Implement database fetching
    // const projects = await prisma.project.findMany({
    //   where: { featured: true },
    //   include: { categories: true, author: true },
    //   orderBy: { createdAt: 'desc' }
    // });
    // return projects.map(ProjectAdapter.databaseToDisplay);
    console.warn('Database featured projects not implemented yet, falling back to static');
    return this.getStaticFeaturedProjects();
  }

  private static async searchDatabaseProjects(query: string): Promise<DisplayProject[]> {
    // TODO: Implement database search
    // const projects = await prisma.project.findMany({
    //   where: {
    //     OR: [
    //       { title: { contains: query, mode: 'insensitive' } },
    //       { description: { contains: query, mode: 'insensitive' } },
    //       { technologies: { hasSome: [query] } }
    //     ]
    //   },
    //   include: { categories: true, author: true }
    // });
    // return projects.map(ProjectAdapter.databaseToDisplay);
    console.warn('Database search not implemented yet, falling back to static');
    return this.searchStaticProjects(query);
  }

  /**
   * Get migration status
   */
  static async getMigrationStatus(): Promise<{
    usesDatabase: boolean;
    projectCount: number;
    isReady: boolean;
  }> {
    return {
      usesDatabase: this.USE_DATABASE,
      projectCount: staticProjects.length,
      isReady: true
    };
  }
}