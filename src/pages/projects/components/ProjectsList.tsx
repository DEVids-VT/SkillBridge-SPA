import { useTranslation } from 'react-i18next';
import { Project, CategoryFilter } from '../types';
import { colors } from '@/lib/design-system';
import { ProjectCard } from './ProjectCard';
import { Briefcase } from 'lucide-react';

interface ProjectsListProps {
  projects: Project[];
  categories: CategoryFilter[];
  isLoading?: boolean;
}

export const ProjectsList = ({ projects, categories, isLoading = false }: ProjectsListProps) => {
  const { t } = useTranslation('project');

  // Show skeleton loader if loading
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <div
            key={n}
            className="animate-pulse rounded-xl overflow-hidden"
            style={{ backgroundColor: colors.blueDark }}
          >
            <div className="h-36 w-full bg-slate-700" />
            <div className="p-4">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-md bg-slate-700"></div>
                <div className="flex-1">
                  <div className="h-4 bg-slate-700 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-slate-700 rounded w-1/2"></div>
                </div>
              </div>
              <div className="flex gap-2 mb-3">
                <div className="h-5 bg-slate-700 rounded w-16"></div>
                <div className="h-5 bg-slate-700 rounded w-20"></div>
                <div className="h-5 bg-slate-700 rounded w-14"></div>
              </div>
              <div className="h-2 w-full bg-slate-700 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Empty state
  if (projects.length === 0) {
    return (
      <div className="py-12 text-center">
        <div
          className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
          style={{ backgroundColor: colors.blueDark }}
        >
          <Briefcase className="h-8 w-8" style={{ color: colors.yellow }} />
        </div>
        <p className="text-xl font-medium" style={{ color: colors.white }}>
          {t('projectsPage.projectsList.noProjectsFound')}
        </p>
        <p className="text-sm mt-2" style={{ color: colors.white }}>
          {t('projectsPage.projectsList.tryAdjustingFilters')}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {/* Project count */}
      <div className="text-sm mb-6" style={{ color: colors.white }}>
        {t('projectsPage.projectsList.showing')}{' '}
        <span className="font-medium" style={{ color: colors.yellow }}>
          {projects.length}
        </span>{' '}
        {t('projectsPage.projectsList.projects')}
      </div>

      {/* Responsive grid layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} categories={categories} />
        ))}
      </div>
    </div>
  );
};
