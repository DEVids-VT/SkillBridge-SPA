import { useTranslation } from 'react-i18next';
import { colors } from '@/lib/design-system';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { ActiveSidebar } from '@/components/layout/ActiveSidebar';
import { ProjectsList } from './components/projectboard-list/ProjectsList';
import { useSearchProjects, PAGE_SEARCH_PARAM_KEY } from './hooks/useSearchProjects';
import { useSearchParams } from 'react-router-dom';
import { validatePage } from '@/utils/page';
import ProjectsBoardFilterSidebar from './components/projectboard-filter-sidebar/ProjectsBoardFilterSidebar';
import ProjectsBoardPagination from './components/projectboard-pagination/ProjectsBoardPagination';

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

  const { data: searchResponse, isLoading, error } = useSearchProjects(currentPage, searchParams);
  console.log(JSON.stringify(searchResponse));

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
        <ProjectsBoardFilterSidebar isCompany={isCompany} />
      </ActiveSidebar>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto rounded-xl" style={{ backgroundColor: colors.dark }}>
        <main className="p-4 lg:p-6">
          <ProjectsList projects={searchResponse?.projects} isLoading={isLoading} />

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
