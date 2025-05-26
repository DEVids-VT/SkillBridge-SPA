import { Button } from '@/components/ui/button';
import { Project, CategoryFilter } from '../types';
import { ProjectCard } from './ProjectCard';

interface ProjectsListProps {
  projects: Project[];
  categories: CategoryFilter[];
  onLoadMore: () => void;
}

export const ProjectsList = ({ projects, categories, onLoadMore }: ProjectsListProps) => {
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
      </div>

      {/* Load more button */}
      {projects.length > 0 && (
        <div className="flex justify-center mt-2 mb-8">
          <Button
            variant="outline"
            className="px-6 py-1.5 rounded-md border-gray-300 text-gray-700 hover:bg-gray-50"
            onClick={onLoadMore}
          >
            Load More
          </Button>
        </div>
      )}
      
      {/* Empty state */}
      {projects.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-gray-500">No projects found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};
