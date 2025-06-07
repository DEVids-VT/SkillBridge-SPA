import { Project, CategoryFilter } from '../types';
import { ProjectCard } from './ProjectCard';

interface ProjectsListProps {
  projects: Project[];
  categories: CategoryFilter[];
}

export const ProjectsList = ({ projects, categories }: ProjectsListProps) => {
  return (
    <div className="flex flex-col">
      {/* Project count */}
      <div className="text-sm text-gray-500 mb-4">
        Showing <span className="font-medium text-gray-700">{projects.length}</span> projects
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
          <p className="text-gray-500">No projects found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};
