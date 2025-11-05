import { useTranslation } from 'react-i18next';
import { useState, useCallback, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { colors } from '@/lib/design-system';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RoutePage } from '@/types/enums/RoutePage';
import ProjectsBoardFilterSidebarSearchInput from './projectsboard-filter-sidebar-searchinput/ProjectsBoardFilterSidebarSearchInput';
import ProjectsBoardFilterSidebarLevelFilter from './projectsboard-filter-sidebar-levelfilter/ProjectsBoardFilterSidebarLevelFilter';
import ProjectsBoardFilterSidebarCompanyNameFilter from './projectsboard-filter-sidebar-companynamefilter/ProjectsBoardFilterSidebarCompanyNameFilter';
import ProjectsBoardFilterSidebarCompanySectorFilter from './projectsboard-filter-sidebar-companysectorfilter/ProjectsBoardFilterSidebarCompanySectorFilter';
import { ProjectAssignmentLevel } from '@/types/enums/ProjectAssignmentLevel';

interface ProjectsFilterSidebarProps {
  isCompany: boolean;
  availableSkills?: string[];
}

export default function ProjectsBoardFilterSidebar({
  isCompany,
  availableSkills = [],
}: ProjectsFilterSidebarProps) {
  const { t } = useTranslation('project');
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // Read current values from URL params
  const searchQuery = searchParams.get('title') || '';
  const selectedLevel = searchParams.get('level')
    ? parseInt(searchParams.get('level')!)
    : undefined;
  const companyName = searchParams.get('companyName') || '';
  const companySector = searchParams.get('companySector') || '';
  const durationAfter = searchParams.get('deadlineAfter')
    ? new Date(searchParams.get('deadlineAfter')!)
    : undefined;

  // Helper function to update search params
  const updateSearchParam = useCallback(
    (key: string, value: string | undefined) => {
      setSearchParams(
        (prev) => {
          const newParams = new URLSearchParams(prev);
          if (value) {
            newParams.set(key, value);
          } else {
            newParams.delete(key);
          }
          return newParams;
        },
        { replace: true }
      );
    },
    [] // Remove setSearchParams dependency since it should be stable from React Router
  );

  const handleSearchChange = useCallback(
    (searchValue: string) => {
      updateSearchParam('title', searchValue || undefined);
    },
    [updateSearchParam]
  );

  const handleLevelChange = useCallback(
    (level?: ProjectAssignmentLevel) => {
      updateSearchParam('level', level !== undefined ? String(level) : undefined);
    },
    [updateSearchParam]
  );

  const handleCompanyNameChange = useCallback(
    (companyName: string) => {
      updateSearchParam('companyName', companyName || undefined);
    },
    [updateSearchParam]
  );

  const handleCompanySectorChange = useCallback(
    (companySector: string) => {
      updateSearchParam('companySector', companySector || undefined);
    },
    [updateSearchParam]
  );
  const handleClearFilters = () => {
    setSearchParams(new URLSearchParams(), { replace: true });
  };

  const hasActiveFilters =
    searchQuery || selectedLevel !== undefined || companyName || companySector || durationAfter;

  return (
    <div className="space-y-6">
      {/* Search input */}
      <ProjectsBoardFilterSidebarSearchInput
        initialValue={searchQuery}
        onSearch={handleSearchChange}
      />

      {/* Level filter */}
      <ProjectsBoardFilterSidebarLevelFilter
        selectedLevel={selectedLevel}
        onLevelChange={handleLevelChange}
      />

      {/* Company Name filter */}
      <ProjectsBoardFilterSidebarCompanyNameFilter
        initialValue={companyName}
        onChange={handleCompanyNameChange}
      />

      {/* Company Sector filter */}
      <ProjectsBoardFilterSidebarCompanySectorFilter
        initialValue={companySector}
        onChange={handleCompanySectorChange}
      />
      {/* Clear filters button */}
      {hasActiveFilters && (
        <Button
          variant="outline"
          size="sm"
          onClick={handleClearFilters}
          className="w-full mt-4 border-white/20 text-white hover:bg-white/10 hover:text-white"
        >
          {t('projectsPage.filters.clear') || 'Clear Filters'}
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
          {t('projectsPage.actions.postNewProject') || 'Post New Project'}
        </Button>
      )}
    </div>
  );
}
