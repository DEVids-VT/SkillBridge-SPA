import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { colors } from '@/lib/design-system';
import { Loader2, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { RoutePage } from '@/types/enums/RoutePage';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { ActiveSidebar } from '@/pages/dashboard/components/ActiveSidebar';

import { ProjectsList } from './components/ProjectsList';
import { CategoryFilter } from './types';
import { useFetchProjects } from './hooks/useFetchProjects';

const ProjectsPage = () => {
  const { t } = useTranslation('project');
  const [selectedCategory, setSelectedCategory] = useState('all');
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

  // Filter projects based on selected category
  const filteredProjects = projects.filter((project) => {
    // Category filter
    if (selectedCategory !== 'all' && project.category !== selectedCategory) {
      return false;
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
  };

  // Render filters for the sidebar
  const renderFilters = () => {
    return (
      <div className="space-y-6">
        {/* Category filters */}
        <div>
          <h4 className="text-sm font-medium mb-3 text-white">
            {t('projectsPage.filters.categories')}
          </h4>
          <div className="space-y-2">
            {categories.map((category) => (
              <div
                key={category.id}
                className={`flex items-center justify-between p-2 rounded-md cursor-pointer transition-colors ${
                  selectedCategory === category.id ? 'bg-primary/20' : 'hover:bg-primary/10'
                }`}
                onClick={() => handleCategoryChange(category.id)}
              >
                <div className="flex items-center">
                  {category.id !== 'all' && (
                    <div className={`w-2 h-2 rounded-full mr-2 ${category.color || 'bg-gray-200'}`} />
                  )}
                  <span className="text-sm text-white">
                    {category.name}
                  </span>
                </div>

                {selectedCategory === category.id && (
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke={colors.yellow} 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Other filter options */}
        <div>
          <h4 className="text-sm font-medium mb-3 text-white">
            {t('projectsPage.filters.otherOptions')}
          </h4>
          <div className="space-y-1">
            <div className="flex items-center p-2 rounded-md cursor-pointer hover:bg-primary/10">
              <span className="text-sm text-white">
                {t('projectsPage.filters.mostRecent')}
              </span>
            </div>
            <div className="flex items-center p-2 rounded-md cursor-pointer hover:bg-primary/10">
              <span className="text-sm text-white">
                {t('projectsPage.filters.upcoming')}
              </span>
            </div>
          </div>
        </div>

        {/* Clear filters button */}
        {selectedCategory !== 'all' && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleClearFilters}
            className="w-full mt-4 border-white/20 text-white hover:bg-white/10 hover:text-white"
          >
            {t('projectsPage.filters.clear')}
          </Button>
        )}

        {/* Post New Project button - only visible for companies */}
        {isCompany && (
          <Button
            className="w-full mt-4"
            style={{ backgroundColor: colors.blue, color: colors.white }}
            onClick={() => navigate(RoutePage.CREATE_PROJECT)}
          >
            <Plus className="h-4 w-4 mr-2" />
            {t('projectsPage.actions.postNewProject')}
          </Button>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: colors.dark }}>
      {/* Left Sidebar - Responsive */}
      <ActiveSidebar title={t('projectsPage.filters.title')}>
        {renderFilters()}
      </ActiveSidebar>
      
      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto">
        <main className="p-6">
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="flex flex-col items-center space-y-4">
                <Loader2 className="h-10 w-10 animate-spin" style={{ color: colors.yellow }} />
                <p className="text-lg font-medium" style={{ color: colors.white }}>
                  {t('projectsPage.states.loading')}
                </p>
              </div>
            </div>
          ) : error ? (
            <div className="p-8 text-center">
              <p className="font-medium" style={{ color: colors.orange }}>
                {t('projectsPage.states.errorLoadingProjects')}
              </p>
            </div>
          ) : (
            <ProjectsList projects={filteredProjects} categories={categories} />
          )}
        </main>
      </div>
    </div>
  );
};

export default ProjectsPage;
