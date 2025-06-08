import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { spacing } from '@/lib/design-system';
import { cn } from '@/lib/utils';
import { Filter, Loader2, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { RoutePage } from '@/types/enums/RoutePage';
import { useOnboarding } from '@/contexts/OnboardingContext';

import { ProjectsHeader } from './components/ProjectsHeader';
import { ProjectsList } from './components/ProjectsList';
import { FilterSidebar } from './components/FilterSidebar';
import { CategoryFilter } from './types';
import { useFetchProjects } from './hooks/useFetchProjects';

const ProjectsPage = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const navigate = useNavigate();
  const { onboardingData } = useOnboarding();

  // Check if the user is a company
  const isCompany = onboardingData.role === 'company';

  // Fetch projects from API
  const { data: apiProjects, isLoading, error } = useFetchProjects();

  const categories: CategoryFilter[] = [
    { id: 'all', name: t('projectsPage.filters.allCategories') },
    {
      id: 'development',
      name: t('projectsPage.filters.development'),
      color: 'bg-blue-100 text-blue-700',
    },
    {
      id: 'design',
      name: t('projectsPage.filters.design'),
      color: 'bg-purple-100 text-purple-700',
    },
    {
      id: 'marketing',
      name: t('projectsPage.filters.marketing'),
      color: 'bg-green-100 text-green-700',
    },
    {
      id: 'content',
      name: t('projectsPage.filters.content'),
      color: 'bg-yellow-100 text-yellow-700',
    },
    {
      id: 'architecture',
      name: t('projectsPage.filters.architecture'),
      color: 'bg-gray-100 text-gray-700',
    },
  ];
  // Note: Search is handled client-side through the filteredProjects variable
  // Transform API projects to match the format expected by our components
  const projects =
    apiProjects?.map((project) => ({
      id: project.id,
      company: project.companyName,
      logo: `/images/companies/${project.companyName.toLowerCase().replace(/\s/g, '_')}_logo.png`, // Fallback logo path
      title: project.title,
      description: project.description,
      category: project.category || 'development', // Default category if not provided
      skills: project.skills.map((skill) => skill.name),
      postedDate: new Date(project.createdAt).toLocaleDateString(),
      deadline: new Date(project.deadline).toLocaleDateString(),
    })) || [];

  // Filter projects based on selected category and search query
  const filteredProjects = projects.filter((project) => {
    // Category filter
    if (selectedCategory !== 'all' && project.category !== selectedCategory) {
      return false;
    }

    // Search filter
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      return (
        project.title.toLowerCase().includes(query) ||
        project.company.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.skills.some((skill: string) => skill.toLowerCase().includes(query))
      );
    }

    return true;
  });

  // Handle category change
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };
  // Clear all filters
  const handleClearFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
  };  return (
    <div className={cn(spacing.container, spacing.headerOffset, 'py-8')}>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex-grow w-full md:w-auto">
          <ProjectsHeader searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        </div>
      </div>
      
      <div className="mt-6">
        {/* Post New Project button - only visible for companies */}
        {isCompany && (
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white mb-4"
            onClick={() => navigate(RoutePage.DESCRIBE_CANDIDATE)}
          >
            <Plus className="h-4 w-4 mr-2" />
            {t('postNewProject', 'Post New Project')}
          </Button>
        )}
      
        {/* Mobile filter toggle and mobile post button */}
        <div className="lg:hidden mb-4 flex gap-2 flex-col sm:flex-row">
          <Button
            variant="outline"
            className="flex-1 flex items-center justify-center gap-2 text-gray-700"
            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
          >
            <Filter className="h-4 w-4" />
            <span>Filters</span>
          </Button>

          {/* Mobile Post New Project button - only visible for companies */}
          {isCompany && (
            <Button
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center"
              onClick={() => navigate(RoutePage.DESCRIBE_CANDIDATE)}
            >
              <Plus className="h-4 w-4 mr-2" />
              <span>Post Project</span>
            </Button>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters sidebar - desktop view */}
          <div
            className={cn(
              'lg:w-64 flex-shrink-0',
              !mobileFiltersOpen && 'hidden lg:block',
              mobileFiltersOpen && 'block lg:block'
            )}
          >
            <FilterSidebar
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
              onClearFilters={handleClearFilters}
            />
          </div>

          {/* Main content */}
          <div className="flex-1">
            {isLoading ? (
              <div className="flex items-center justify-center h-64">
                <div className="flex flex-col items-center space-y-4">
                  <Loader2 className="h-10 w-10 animate-spin text-blue-500" />
                  <p className="text-lg font-medium text-gray-600">
                    {t('loading', 'Loading projects...')}
                  </p>
                </div>
              </div>
            ) : error ? (
              <div className="p-8 text-center">
                <p className="text-red-500 font-medium">
                  {t('errorLoadingProjects', 'Error loading projects. Please try again later.')}
                </p>
              </div>
            ) : (
              <ProjectsList projects={filteredProjects} categories={categories} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
