import { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { colors } from '@/lib/design-system';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { ActiveSidebar } from '@/pages/dashboard/components/ActiveSidebar';
import { ProjectsList, ProjectsFilterSidebar, Pagination } from './components';
import { ProjectAssignmentLevel, SearchProjectsRequest } from './types';
import { useSearchProjects } from './hooks/useSearchProjects';

const ProjectsBoardPage = () => {
  const { t } = useTranslation('project');
  const { onboardingData } = useOnboarding();

  // Check if the user is a company
  const isCompany = onboardingData.role === 'company';

  // Filter state matching backend SearchProjectAssignmentRequest
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<ProjectAssignmentLevel | undefined>(undefined);
  const [companyName, setCompanyName] = useState('');
  const [companySector, setCompanySector] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [deadlineAfter, setDeadlineAfter] = useState<Date | undefined>(undefined);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(12); // Fixed page size

  // Build search request
  const searchRequest: SearchProjectsRequest = useMemo(
    () => ({
      title: searchQuery || undefined,
      level: selectedLevel,
      companyName: companyName || undefined,
      companySector: companySector || undefined,
      projectSkills: selectedSkills.length > 0 ? selectedSkills : undefined,
      deadlineAfter: deadlineAfter?.toISOString(),
      pageNumber: currentPage,
      pageSize,
    }),
    [
      searchQuery,
      selectedLevel,
      companyName,
      companySector,
      selectedSkills,
      deadlineAfter,
      currentPage,
      pageSize,
    ]
  );

  // Fetch projects from API with search and pagination
  const { data: searchResponse, isLoading, error } = useSearchProjects(searchRequest);

  // Extract all unique skills from the current results for the skills filter
  const availableSkills = useMemo(() => {
    if (!searchResponse?.data) return [];
    const skillsSet = new Set<string>();
    searchResponse.data.forEach((project) => {
      project.skills?.forEach((skill) => {
        if (skill.name) skillsSet.add(skill.name);
      });
    });
    return Array.from(skillsSet).sort();
  }, [searchResponse?.data]);

  // Transform API projects to match the format expected by our components
  const projects = useMemo(() => {
    if (!searchResponse?.data) return [];

    return searchResponse.data.map((project) => ({
      id: project.id,
      company: project.companyName,
      logo: `/images/companies/${project.companyName.toLowerCase().replace(/\s/g, '_')}_logo.png`,
      title: project.title,
      description: project.learningBenefits || project.summary,
      category: 'development', // Backend doesn't provide category yet, default to development
      skills: project.skills.map((skill) => skill.name),
      postedDate: new Date(project.createdAt).toISOString(),
      deadline: new Date(project.deadline).toISOString(),
      learningBenefits: project.learningBenefits,
    }));
  }, [searchResponse?.data]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedLevel, companyName, companySector, selectedSkills, deadlineAfter]);

  // Handler functions for the filter sidebar
  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedLevel(undefined);
    setCompanyName('');
    setCompanySector('');
    setSelectedSkills([]);
    setDeadlineAfter(undefined);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex h-full min-h-0" style={{ backgroundColor: colors.bgSlate900 }}>
      {/* Left Sidebar - Responsive */}
      <ActiveSidebar title={t('projectsPage.filters.title')}>
        <ProjectsFilterSidebar
          searchQuery={searchQuery}
          selectedLevel={selectedLevel}
          companyName={companyName}
          companySector={companySector}
          selectedSkills={selectedSkills}
          deadlineAfter={deadlineAfter}
          isCompany={isCompany}
          onSearchChange={setSearchQuery}
          onLevelChange={setSelectedLevel}
          onCompanyNameChange={setCompanyName}
          onCompanySectorChange={setCompanySector}
          onSkillsChange={setSelectedSkills}
          onDeadlineAfterChange={setDeadlineAfter}
          onClearFilters={handleClearFilters}
          availableSkills={availableSkills}
        />
      </ActiveSidebar>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto rounded-xl" style={{ backgroundColor: colors.dark }}>
        <main className="p-4 lg:p-6">
          <ProjectsList
            projects={projects}
            categories={[]} // Categories not used with new backend
            isLoading={isLoading}
          />

          {/* Error state */}
          {error && (
            <div className="p-8 text-center">
              <p className="font-medium" style={{ color: colors.orange }}>
                {t('projectsPage.states.errorLoadingProjects')}
              </p>
              <p className="text-sm mt-2" style={{ color: colors.textSecondary }}>
                {error.message}
              </p>
            </div>
          )}

          {/* Pagination */}
          {searchResponse?.pagination && !isLoading && !error && (
            <Pagination pagination={searchResponse.pagination} onPageChange={handlePageChange} />
          )}
        </main>
      </div>
    </div>
  );
};

export default ProjectsBoardPage;
