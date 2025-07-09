'use client';

import { useState, useMemo, useEffect } from 'react';
import { Container } from '@/components/ui/Container';
import { Heading, Text } from '@/components/ui/Typography';
import { MotionDiv, slideUpVariants, staggerContainer } from '@/components/ui/MotionComponents';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { ProjectFilters } from '@/components/projects/ProjectFilters';
import { Project, ProjectFilters as ProjectFiltersType } from '@/types';
import { useInView } from '@/hooks/useInView';

export default function ProjectsPage() {
  const { ref, inView } = useInView(0.1);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [filters, setFilters] = useState<ProjectFiltersType>({
    categories: [],
    technologies: [],
    years: [],
    status: [],
    search: '',
  });

  const [sortBy, setSortBy] = useState<'recent' | 'featured' | 'title'>('recent');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/projects');
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        const result = await response.json();
        setProjects(result.data || result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load projects');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const filteredProjects = useMemo(() => {
    const filtered = projects.filter((project) => {
      // Category filter - now uses categories array
      if (filters.categories.length > 0) {
        const hasMatchingCategory = filters.categories.some(filterCategory =>
          project.categories?.some(projectCategory => 
            projectCategory.name === filterCategory
          )
        );
        if (!hasMatchingCategory) return false;
      }

      // Technology filter - now uses string array
      if (filters.technologies.length > 0) {
        const hasMatchingTech = filters.technologies.some(tech =>
          project.technologies.includes(tech)
        );
        if (!hasMatchingTech) return false;
      }

      // Year filter - extract year from dates
      if (filters.years.length > 0) {
        const projectYear = new Date(project.createdAt).getFullYear();
        if (!filters.years.includes(projectYear)) return false;
      }

      // Status filter - convert database status to static status for filtering
      if (filters.status.length > 0) {
        const statusMap = {
          'ACTIVE': 'completed',
          'ARCHIVED': 'archived',
          'DRAFT': 'in-progress',
          'MAINTENANCE': 'maintenance'
        };
        const mappedStatus = statusMap[project.status] || project.status;
        if (!filters.status.includes(mappedStatus as any)) return false;
      }

      // Search filter - updated for database structure
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchesSearch = 
          project.title.toLowerCase().includes(searchLower) ||
          project.description.toLowerCase().includes(searchLower) ||
          (project.longDescription && project.longDescription.toLowerCase().includes(searchLower)) ||
          project.technologies.some(tech => tech.toLowerCase().includes(searchLower));
        
        if (!matchesSearch) return false;
      }

      return true;
    });

    // Sort projects
    switch (sortBy) {
      case 'featured':
        return filtered.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return 0;
        });
      case 'title':
        return filtered.sort((a, b) => a.title.localeCompare(b.title));
      case 'recent':
      default:
        return filtered.sort((a, b) => {
          const dateA = new Date(a.updatedAt);
          const dateB = new Date(b.updatedAt);
          return dateB.getTime() - dateA.getTime();
        });
    }
  }, [projects, filters, sortBy]);

  return (
    <Container className="py-12">
      <MotionDiv
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="mb-12"
      >
        <MotionDiv variants={slideUpVariants} className="text-center mb-8">
          <Heading size="h1" className="mb-4 bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
            All Projects
          </Heading>
          <Text className="text-xl text-secondary-700 dark:text-secondary-300 max-w-3xl mx-auto">
            Explore my complete portfolio of projects, from enterprise applications to open-source contributions.
            Each project showcases different skills and technologies.
          </Text>
        </MotionDiv>

        <MotionDiv variants={slideUpVariants}>
          <ProjectFilters
            filters={filters}
            onFiltersChange={setFilters}
            totalProjects={projects.length}
            filteredCount={filteredProjects.length}
          />
        </MotionDiv>
      </MotionDiv>

      {/* Sort Options */}
      <MotionDiv
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={slideUpVariants}
        className="flex items-center justify-between mb-8"
      >
        <div className="flex items-center gap-4">
          <Text className="text-sm font-medium text-secondary-900 dark:text-secondary-100">
            Sort by:
          </Text>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'recent' | 'featured' | 'title')}
            className="px-3 py-2 border border-secondary-300 dark:border-secondary-600 rounded-lg bg-white dark:bg-secondary-800 text-secondary-900 dark:text-secondary-100 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="recent">Most Recent</option>
            <option value="featured">Featured First</option>
            <option value="title">Alphabetical</option>
          </select>
        </div>
        
        <Text className="text-sm text-secondary-600 dark:text-secondary-400">
          {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}
        </Text>
      </MotionDiv>

      {/* Loading State */}
      {loading && (
        <MotionDiv
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={slideUpVariants}
          className="text-center py-12"
        >
          <Text className="text-secondary-500 dark:text-secondary-400">
            Loading projects...
          </Text>
        </MotionDiv>
      )}

      {/* Error State */}
      {error && (
        <MotionDiv
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={slideUpVariants}
          className="text-center py-12"
        >
          <Text className="text-red-600 dark:text-red-400">
            Error: {error}
          </Text>
        </MotionDiv>
      )}

      {/* Projects Grid */}
      {!loading && !error && filteredProjects.length > 0 ? (
        <MotionDiv
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          {filteredProjects.map((project) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              showFullDescription={false}
            />
          ))}
        </MotionDiv>
      ) : !loading && !error && (
        <MotionDiv
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={slideUpVariants}
          className="text-center py-16"
        >
          <svg className="w-16 h-16 text-secondary-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47.881-6.08 2.33A7.963 7.963 0 016 12c0-4.418 3.582-8 8-8s8 3.582 8 8c0 1.306-.316 2.533-.87 3.622L19 21l-2.5-2.5L14 21l-2-3-2 3z" />
          </svg>
          <Heading as="h3" className="text-xl font-semibold text-secondary-900 dark:text-secondary-100 mb-2">
            No projects found
          </Heading>
          <Text className="text-secondary-600 dark:text-secondary-400 mb-4">
            Try adjusting your filters or search terms to find projects.
          </Text>
          <button
            onClick={() => setFilters({ categories: [], technologies: [], years: [], status: [], search: '' })}
            className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium"
          >
            Clear all filters
          </button>
        </MotionDiv>
      )}
    </Container>
  );
}