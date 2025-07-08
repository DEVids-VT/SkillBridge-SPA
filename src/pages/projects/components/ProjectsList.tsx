import { useTranslation } from 'react-i18next';
import { Project, CategoryFilter } from '../types';
import { colors } from '@/lib/design-system';
import { ProjectCard } from './ProjectCard';

interface ProjectsListProps {
  projects: Project[];
  categories: CategoryFilter[];
}

export const ProjectsList = ({ projects, categories }: ProjectsListProps) => {
  const { t } = useTranslation('project');

  return (
    <div className="flex flex-col">
      {/* Project count */}
      <div className="text-sm mb-4" style={{ color: colors.white }}>
        {t('projectsPage.projectsList.showing')}{' '}
        <span className="font-medium" style={{ color: colors.yellow }}>
          {projects.length}
        </span>{' '}
        {t('projectsPage.projectsList.projects')}
      </div>
      {/* Project cards list */}
      <div className="flex flex-col gap-4 mb-8">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} categories={categories} />
        ))}
      </div>{' '}
      {/* We've removed the load more button since all projects are loaded at once */}
      {/* Empty state */}
      {projects.length === 0 && (
        <div className="py-12 text-center">
          <p style={{ color: colors.white }}>{t('projectsPage.projectsList.noProjectsFound')}</p>
        </div>
      )}
    </div>
  );
};
