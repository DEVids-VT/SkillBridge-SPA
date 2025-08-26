import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { colors } from '@/lib/design-system';
import { Plus, X, Search, Calendar, CheckSquare, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { RoutePage } from '@/types/enums/RoutePage';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { ActiveSidebar } from '@/pages/dashboard/components/ActiveSidebar';
import { Input } from '@/components/ui/input';

import { ProjectsList } from './components/ProjectsList';
import { CategoryFilter } from './types';
import { useFetchProjects } from './hooks/useFetchProjects';

const ProjectsBoardPage = () => {
  const { t } = useTranslation('project');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [deadlineFilter, setDeadlineFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCompanyDropdown, setShowCompanyDropdown] = useState(false);
  const [showDeadlineDropdown, setShowDeadlineDropdown] = useState(false);
  const navigate = useNavigate();
  const { onboardingData } = useOnboarding();

  // Check if the user is a company
  const isCompany = onboardingData.role === 'company';

  // Fetch projects from API
  const { data: apiProjects, isLoading, error } = useFetchProjects();

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setShowCompanyDropdown(false);
      setShowDeadlineDropdown(false);
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

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
    {
      id: 'business',
      name: t('projectsPage.filters.business'),
      color: 'bg-red-100 text-red-700',
    },
    {
      id: 'data',
      name: t('projectsPage.filters.data'),
      color: 'bg-indigo-100 text-indigo-700',
    },
    {
      id: 'qa',
      name: t('projectsPage.filters.qa'),
      color: 'bg-teal-100 text-teal-700',
    }
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

  // Get all unique companies
  const companies = [...new Set(projects.map(p => p.company))].sort();

  // Filter projects based on selected filters
  const filteredProjects = projects.filter((project) => {
    // Category filter
    if (selectedCategory !== 'all' && project.category !== selectedCategory) {
      return false;
    }
    
    // Company filter
    if (selectedCompanies.length > 0 && !selectedCompanies.includes(project.company)) {
      return false;
    }
    
    // Deadline filter
    if (deadlineFilter !== 'all') {
      const deadlineDate = new Date(project.deadline);
      const today = new Date();
      const oneWeek = new Date();
      oneWeek.setDate(today.getDate() + 7);
      const oneMonth = new Date();
      oneMonth.setDate(today.getDate() + 30);
      
      if (deadlineFilter === 'today' && deadlineDate > today) {
        return false;
      } else if (deadlineFilter === 'week' && (deadlineDate > oneWeek || deadlineDate < today)) {
        return false;
      } else if (deadlineFilter === 'month' && (deadlineDate > oneMonth || deadlineDate < today)) {
        return false;
      }
    }
    
    // Search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        project.title.toLowerCase().includes(query) ||
        project.company.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.skills.some(skill => skill.toLowerCase().includes(query))
      );
    }
    
    return true;
  });

  // Handle category change
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };
  
  // Handle company selection
  const handleCompanyToggle = (company: string) => {
    setSelectedCompanies(prev => 
      prev.includes(company) 
        ? prev.filter(c => c !== company)
        : [...prev, company]
    );
  };
  
  // Handle deadline filter change
  const handleDeadlineChange = (deadline: string) => {
    setDeadlineFilter(deadline);
    setShowDeadlineDropdown(false);
  };
  
  // Clear all filters
  const handleClearFilters = () => {
    setSelectedCategory('all');
    setSelectedCompanies([]);
    setDeadlineFilter('all');
    setSearchQuery('');
  };
  
  // Toggle company dropdown
  const toggleCompanyDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowCompanyDropdown(prev => !prev);
    setShowDeadlineDropdown(false);
  };
  
  // Toggle deadline dropdown
  const toggleDeadlineDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDeadlineDropdown(prev => !prev);
    setShowCompanyDropdown(false);
  };

  // Render filters for the sidebar
  const renderFilters = () => {
    return (
      <div className="space-y-6">
        {/* Search input */}
        <div>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder={t('projectsPage.filters.searchPlaceholder')}
              className="pl-8 bg-transparent border-white/20 text-white placeholder:text-gray-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                className="absolute right-2 top-2.5 text-gray-400 hover:text-white"
                onClick={() => setSearchQuery('')}
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

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

        {/* Company filter */}
        <div>
          <h4 className="text-sm font-medium mb-3 text-white">
            {t('projectsPage.filters.companies')}
          </h4>
          <div className="relative">
            <button
              className="flex items-center justify-between w-full p-2.5 rounded-md bg-transparent border border-white/20 text-white text-sm"
              onClick={toggleCompanyDropdown}
            >
              <span>
                {selectedCompanies.length === 0
                  ? t('projectsPage.filters.allCompanies')
                  : selectedCompanies.length === 1
                  ? selectedCompanies[0]
                  : `${selectedCompanies.length} ${t('projectsPage.filters.companiesSelected')}`}
              </span>
              <ChevronDown className="h-4 w-4" />
            </button>
            
            {showCompanyDropdown && (
              <div
                className="absolute z-10 mt-1 w-full bg-slate-800 border border-white/20 rounded-md shadow-lg max-h-60 overflow-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-2 flex flex-col gap-1">
                  {companies.map((company) => (
                    <div
                      key={company}
                      className="flex items-center p-2 hover:bg-slate-700 rounded-md cursor-pointer"
                      onClick={() => handleCompanyToggle(company)}
                    >
                      <CheckSquare
                        className={`h-4 w-4 mr-2 ${
                          selectedCompanies.includes(company)
                            ? 'text-yellow-400'
                            : 'text-gray-400'
                        }`}
                      />
                      <span className="text-sm text-white">{company}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Deadline filter */}
        <div>
          <h4 className="text-sm font-medium mb-3 text-white">
            {t('projectsPage.filters.deadline')}
          </h4>
          <div className="relative">
            <button
              className="flex items-center justify-between w-full p-2.5 rounded-md bg-transparent border border-white/20 text-white text-sm"
              onClick={toggleDeadlineDropdown}
            >
              <span>
                {deadlineFilter === 'all' && t('projectsPage.filters.anyTime')}
                {deadlineFilter === 'today' && t('projectsPage.filters.today')}
                {deadlineFilter === 'week' && t('projectsPage.filters.thisWeek')}
                {deadlineFilter === 'month' && t('projectsPage.filters.thisMonth')}
              </span>
              <ChevronDown className="h-4 w-4" />
            </button>
            
            {showDeadlineDropdown && (
              <div
                className="absolute z-10 mt-1 w-full bg-slate-800 border border-white/20 rounded-md shadow-lg"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-1 flex flex-col">
                  <div
                    className={`flex items-center p-2 hover:bg-slate-700 rounded-md cursor-pointer ${
                      deadlineFilter === 'all' ? 'bg-slate-700' : ''
                    }`}
                    onClick={() => handleDeadlineChange('all')}
                  >
                    <span className="text-sm text-white">{t('projectsPage.filters.anyTime')}</span>
                  </div>
                  <div
                    className={`flex items-center p-2 hover:bg-slate-700 rounded-md cursor-pointer ${
                      deadlineFilter === 'today' ? 'bg-slate-700' : ''
                    }`}
                    onClick={() => handleDeadlineChange('today')}
                  >
                    <span className="text-sm text-white">{t('projectsPage.filters.today')}</span>
                  </div>
                  <div
                    className={`flex items-center p-2 hover:bg-slate-700 rounded-md cursor-pointer ${
                      deadlineFilter === 'week' ? 'bg-slate-700' : ''
                    }`}
                    onClick={() => handleDeadlineChange('week')}
                  >
                    <span className="text-sm text-white">{t('projectsPage.filters.thisWeek')}</span>
                  </div>
                  <div
                    className={`flex items-center p-2 hover:bg-slate-700 rounded-md cursor-pointer ${
                      deadlineFilter === 'month' ? 'bg-slate-700' : ''
                    }`}
                    onClick={() => handleDeadlineChange('month')}
                  >
                    <span className="text-sm text-white">{t('projectsPage.filters.thisMonth')}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Other filter options */}
        <div>
          <h4 className="text-sm font-medium mb-3 text-white">
            {t('projectsPage.filters.otherOptions')}
          </h4>
          <div className="space-y-1">
            <div className="flex items-center p-2 rounded-md cursor-pointer hover:bg-primary/10">
              <Calendar className="h-4 w-4 mr-2 text-gray-400" />
              <span className="text-sm text-white">
                {t('projectsPage.filters.mostRecent')}
              </span>
            </div>
            <div className="flex items-center p-2 rounded-md cursor-pointer hover:bg-primary/10">
              <Calendar className="h-4 w-4 mr-2 text-gray-400" />
              <span className="text-sm text-white">
                {t('projectsPage.filters.upcoming')}
              </span>
            </div>
          </div>
        </div>

        {/* Clear filters button */}
        {(selectedCategory !== 'all' || 
          selectedCompanies.length > 0 || 
          deadlineFilter !== 'all' ||
          searchQuery) && (
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
    <div className="flex h-full min-h-0" style={{ backgroundColor: colors.bgSlate900 }}>
      {/* Left Sidebar - Responsive */}
      <ActiveSidebar title={t('projectsPage.filters.title')}>
        {renderFilters()}
      </ActiveSidebar>
      
      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto rounded-xl" style={{ backgroundColor: colors.dark }}>
        <main className="p-4 lg:p-6">
          <ProjectsList 
            projects={filteredProjects} 
            categories={categories} 
            isLoading={isLoading} 
          />

          {error && (
            <div className="p-8 text-center">
              <p className="font-medium" style={{ color: colors.orange }}>
                {t('projectsPage.states.errorLoadingProjects')}
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ProjectsBoardPage;
