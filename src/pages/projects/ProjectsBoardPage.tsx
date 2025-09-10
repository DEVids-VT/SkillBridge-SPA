import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { colors } from '@/lib/design-system';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { ActiveSidebar } from '@/pages/dashboard/components/ActiveSidebar';
import { ProjectsList, ProjectsFilterSidebar } from './components';
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
      description: project.learningBenefits,
      category: project.category || 'development', // Default category if not provided
      skills: project.skills.map((skill) => skill.name),
      // Use ISO strings to ensure reliable date math across locales
      postedDate: new Date(project.createdAt).toISOString(),
      deadline: new Date(project.deadline).toISOString(),
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

  // Handler functions for the filter sidebar
  const handleClearFilters = () => {
    setSelectedCategory('all');
    setSelectedCompanies([]);
    setDeadlineFilter('all');
    setSearchQuery('');
  };

  return (
    <div className="flex h-full min-h-0" style={{ backgroundColor: colors.bgSlate900 }}>
      {/* Left Sidebar - Responsive */}
      <ActiveSidebar title={t('projectsPage.filters.title')}>
        <ProjectsFilterSidebar
          categories={categories}
          companies={companies}
          selectedCategory={selectedCategory}
          selectedCompanies={selectedCompanies}
          deadlineFilter={deadlineFilter}
          searchQuery={searchQuery}
          isCompany={isCompany}
          onCategoryChange={handleCategoryChange}
          onCompanyToggle={handleCompanyToggle}
          onDeadlineChange={handleDeadlineChange}
          onSearchChange={setSearchQuery}
          onClearFilters={handleClearFilters}
        />
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
