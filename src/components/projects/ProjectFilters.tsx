'use client';

import { useState, useEffect } from 'react';
import { ProjectFilters as ProjectFiltersType, ProjectCategory, ProjectStatus } from '@/types';
import { technologies } from '@/lib/projects';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Text } from '@/components/ui/Typography';

interface ProjectFiltersProps {
  filters: ProjectFiltersType;
  onFiltersChange: (filters: ProjectFiltersType) => void;
  totalProjects: number;
  filteredCount: number;
}

const categories: { value: ProjectCategory; label: string }[] = [
  { value: 'web-app', label: 'Web Apps' },
  { value: 'mobile-app', label: 'Mobile Apps' },
  { value: 'e-commerce', label: 'E-commerce' },
  { value: 'dashboard', label: 'Dashboards' },
  { value: 'api', label: 'APIs' },
  { value: 'ai-ml', label: 'AI/ML' },
  { value: 'tool', label: 'Tools' },
  { value: 'open-source', label: 'Open Source' },
];

const statuses: { value: ProjectStatus; label: string }[] = [
  { value: 'completed', label: 'Completed' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'maintenance', label: 'Maintenance' },
  { value: 'archived', label: 'Archived' },
];

const years = [2024, 2023, 2022, 2021, 2020];

export function ProjectFilters({ filters, onFiltersChange, totalProjects, filteredCount }: ProjectFiltersProps) {
  const [searchInput, setSearchInput] = useState(filters.search);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      onFiltersChange({ ...filters, search: searchInput });
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchInput, filters, onFiltersChange]);

  const toggleCategory = (category: ProjectCategory) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category];
    onFiltersChange({ ...filters, categories: newCategories });
  };

  const toggleTechnology = (technology: string) => {
    const newTechnologies = filters.technologies.includes(technology)
      ? filters.technologies.filter(t => t !== technology)
      : [...filters.technologies, technology];
    onFiltersChange({ ...filters, technologies: newTechnologies });
  };

  const toggleYear = (year: number) => {
    const newYears = filters.years.includes(year)
      ? filters.years.filter(y => y !== year)
      : [...filters.years, year];
    onFiltersChange({ ...filters, years: newYears });
  };

  const toggleStatus = (status: ProjectStatus) => {
    const newStatus = filters.status.includes(status)
      ? filters.status.filter(s => s !== status)
      : [...filters.status, status];
    onFiltersChange({ ...filters, status: newStatus });
  };

  const clearAllFilters = () => {
    setSearchInput('');
    onFiltersChange({
      categories: [],
      technologies: [],
      years: [],
      status: [],
      search: '',
    });
  };

  const hasActiveFilters = filters.categories.length > 0 || 
                          filters.technologies.length > 0 || 
                          filters.years.length > 0 || 
                          filters.status.length > 0 || 
                          filters.search.length > 0;

  return (
    <Card className="p-6 mb-8 bg-white dark:bg-secondary-900 border-secondary-200 dark:border-secondary-700">
      {/* Search and Results Summary */}
      <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-6">
        <div className="flex-1">
          <div className="relative">
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-secondary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search projects by title, description, or technology..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-secondary-300 dark:border-secondary-600 rounded-lg bg-white dark:bg-secondary-800 text-secondary-900 dark:text-secondary-100 placeholder-secondary-500 dark:placeholder-secondary-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <Text className="text-sm text-secondary-600 dark:text-secondary-400 whitespace-nowrap">
            {filteredCount} of {totalProjects} projects
          </Text>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2"
          >
            <svg className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
            {isExpanded ? 'Less Filters' : 'More Filters'}
          </Button>
          
          {hasActiveFilters && (
            <Button
              variant="outline"
              size="sm"
              onClick={clearAllFilters}
              className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
            >
              Clear All
            </Button>
          )}
        </div>
      </div>

      {/* Expanded Filters */}
      {isExpanded && (
        <div className="space-y-6 border-t border-secondary-200 dark:border-secondary-700 pt-6">
          {/* Categories */}
          <div>
            <Text className="font-semibold text-secondary-900 dark:text-secondary-100 mb-3">Categories</Text>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.value}
                  onClick={() => toggleCategory(category.value)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    filters.categories.includes(category.value)
                      ? 'bg-primary-600 text-white shadow-md'
                      : 'bg-secondary-100 dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300 hover:bg-secondary-200 dark:hover:bg-secondary-700'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          {/* Technologies */}
          <div>
            <Text className="font-semibold text-secondary-900 dark:text-secondary-100 mb-3">Technologies</Text>
            <div className="flex flex-wrap gap-2">
              {technologies.slice(0, 12).map((tech) => (
                <button
                  key={tech.name}
                  onClick={() => toggleTechnology(tech.name)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                    filters.technologies.includes(tech.name)
                      ? 'bg-primary-600 text-white shadow-md'
                      : 'bg-secondary-100 dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300 hover:bg-secondary-200 dark:hover:bg-secondary-700'
                  }`}
                >
                  <div
                    className="w-3 h-3 rounded-sm"
                    style={{ backgroundColor: tech.color }}
                  />
                  {tech.name}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Years */}
            <div>
              <Text className="font-semibold text-secondary-900 dark:text-secondary-100 mb-3">Year</Text>
              <div className="flex flex-wrap gap-2">
                {years.map((year) => (
                  <button
                    key={year}
                    onClick={() => toggleYear(year)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      filters.years.includes(year)
                        ? 'bg-primary-600 text-white shadow-md'
                        : 'bg-secondary-100 dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300 hover:bg-secondary-200 dark:hover:bg-secondary-700'
                    }`}
                  >
                    {year}
                  </button>
                ))}
              </div>
            </div>

            {/* Status */}
            <div>
              <Text className="font-semibold text-secondary-900 dark:text-secondary-100 mb-3">Status</Text>
              <div className="flex flex-wrap gap-2">
                {statuses.map((status) => (
                  <button
                    key={status.value}
                    onClick={() => toggleStatus(status.value)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      filters.status.includes(status.value)
                        ? 'bg-primary-600 text-white shadow-md'
                        : 'bg-secondary-100 dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300 hover:bg-secondary-200 dark:hover:bg-secondary-700'
                    }`}
                  >
                    {status.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-secondary-200 dark:border-secondary-700">
          <Text className="text-sm font-medium text-secondary-900 dark:text-secondary-100 mb-2">Active Filters:</Text>
          <div className="flex flex-wrap gap-2">
            {filters.search && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 rounded text-xs">
                Search: &ldquo;{filters.search}&rdquo;
                <button onClick={() => { setSearchInput(''); onFiltersChange({ ...filters, search: '' }); }}>
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </span>
            )}
            {filters.categories.map((category) => (
              <span key={category} className="inline-flex items-center gap-1 px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 rounded text-xs">
                {categories.find(c => c.value === category)?.label}
                <button onClick={() => toggleCategory(category)}>
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </span>
            ))}
            {filters.technologies.map((tech) => (
              <span key={tech} className="inline-flex items-center gap-1 px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 rounded text-xs">
                {tech}
                <button onClick={() => toggleTechnology(tech)}>
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </span>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
}