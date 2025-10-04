import { useTranslation } from 'react-i18next';
import { Project, CategoryFilter } from '../types';
// Removed colors import - now using theme-aware classes
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
      <div className="flex flex-col gap-4">
        {[1, 2, 3].map((n) => (
          <div key={n} className="animate-pulse">
            <div className="rounded-lg border p-4 h-48 bg-card border-border">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-md bg-muted"></div>
                <div className="flex-1">
                  <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-muted rounded w-1/2"></div>
                </div>
              </div>
              <div className="flex gap-2 mb-3">
                <div className="h-5 bg-muted rounded w-16"></div>
                <div className="h-5 bg-muted rounded w-20"></div>
                <div className="h-5 bg-muted rounded w-14"></div>
              </div>
              <div className="flex justify-end pt-2 border-t border-border">
                <div className="h-3 bg-muted rounded w-24"></div>
              </div>
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
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 bg-muted">
          <Briefcase className="h-8 w-8 text-muted-foreground" />
        </div>
        <p className="text-xl font-medium text-foreground">{t('projectsPage.projectsList.noProjectsFound')}</p>
        <p className="text-sm mt-2 text-muted-foreground">{t('projectsPage.projectsList.tryAdjustingFilters')}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {/* Project count */}
      <div className="text-sm mb-6 text-muted-foreground">
        {t('projectsPage.projectsList.showing')}{' '}
        <span className="font-medium text-accent">
          {projects.length}
        </span>{' '}
        {t('projectsPage.projectsList.projects')}
      </div>
      
      {/* Flex column layout - each card on its own row */}
      <div className="flex flex-col gap-4">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} categories={categories} />
        ))}
      </div>
    </div>
  );
};
