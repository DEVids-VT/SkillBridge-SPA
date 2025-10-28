import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { colors } from '@/lib/design-system';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { ActiveSidebar } from '@/components/layout/ActiveSidebar';
import { ProjectsList, ProjectsFilterSidebar, Pagination } from './components';
import { useSearchProjects, PAGE_SEARCH_PARAM_KEY } from './hooks/useSearchProjects';
import { useSearchParams } from 'react-router-dom';
import { validatePage } from '@/utils/page';
import ProjectsBoardFilterSidebar from './components/projectboard-filter-sidebar/ProjectsBoardFilterSidebar';
import ProjectsBoardPagination from './components/projectboard-pagination/ProjectsBoardPagination';
import { log } from 'console';
import { useQueryClient } from '@tanstack/react-query';

const ProjectsBoardPage = () => {
  const { t } = useTranslation('project');
  const { onboardingData } = useOnboarding();
  const isCompany = onboardingData.role === 'company';

  const [searchParams, setSearchParams] = useSearchParams();

  // Get current page from URL params
  const currentPage = (() => {
    const pageParam = searchParams.get(PAGE_SEARCH_PARAM_KEY);
    if (!pageParam) return 1;
    return validatePage(Number.MAX_VALUE, Number(pageParam));
  })();

  // Fetch projects from API with search and pagination
  const queryClient = useQueryClient();
  const { data: searchResponse, isLoading, error } = useSearchProjects(currentPage, searchParams);
  console.log(JSON.stringify(searchResponse));

  // Extract all unique skills from the current results for the skills filter
  const availableSkills = useMemo(() => {
    if (!searchResponse?.projects) return [];
    const skillsSet = new Set<string>();
    searchResponse.projects.forEach((project) => {
      project.skills?.forEach((skill) => {
        skillsSet.add(skill.name);
      });
    });
    return Array.from(skillsSet).sort();
  }, [searchResponse?.projects]);

  // Transform API projects to match the format expected by our components
  const projects = useMemo(() => {
    if (!searchResponse?.projects) return [];

    return searchResponse.projects.map((project) => ({
      id: project.id,
      company: project.companyName,
      logo: `/images/companies/${project.companyName.toLowerCase().replace(/\s/g, '_')}_logo.png`,
      title: project.title,
      description: project.learningBenefits || project.summary,
      category: 'development', // Backend doesn't provide category yet, default to development
      skills: project.skills.map((skill) => skill.name),
      postedDate: new Date(project.createdAt).toISOString(),
      duration: project.duration, // Use duration directly as it's now a timespan string
      learningBenefits: project.learningBenefits,
    }));
  }, [searchResponse?.projects]);

  const handlePageChange = (page: number) => {
    setSearchParams(
      (prev) => {
        const newParams = new URLSearchParams(prev);
        newParams.set(PAGE_SEARCH_PARAM_KEY, String(page));
        return newParams;
      },
      { replace: true }
    );
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <div className="flex h-full min-h-0" style={{ backgroundColor: colors.bgSlate900 }}>
      {/* Left Sidebar - Responsive */}
      <ActiveSidebar title={t('projectsPage.filters.title')}>
        <ProjectsBoardFilterSidebar isCompany={isCompany} availableSkills={availableSkills} />
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
            <ProjectsBoardPagination
              pagination={searchResponse.pagination}
              onPageChange={handlePageChange}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default ProjectsBoardPage;
