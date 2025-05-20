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
    <>
      {/* Project cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} categories={categories} />
        ))}
      </div>

      {/* Load more button */}
      <div className="flex justify-center">
        <Button
          variant="outline"
          className="px-8 py-2 rounded-full border-blue-600 text-blue-600 hover:bg-blue-50"
          onClick={onLoadMore}
        >
          Load More Projects
        </Button>
      </div>
    </>
  );
};
