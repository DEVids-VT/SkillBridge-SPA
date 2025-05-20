import { Button } from '@/components/ui/button';
import { Briefcase } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Project, CategoryFilter } from '../types';

interface ProjectCardProps {
  project: Project;
  categories: CategoryFilter[];
}

export const ProjectCard = ({ project, categories }: ProjectCardProps) => {
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all hover:border-blue-300 group">
      {/* Company info */}
      <div className="p-6 border-b border-gray-100 flex items-center gap-4">
        <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden flex items-center justify-center">
          {/* Replace with actual company logo */}
          <Briefcase className="h-6 w-6 text-gray-500" />
        </div>
        <div>
          <h3 className="font-medium text-gray-900">{project.company}</h3>
          <p className="text-sm text-gray-500">
            Posted: {new Date(project.postedDate).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Project details */}
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
          {project.title}
        </h2>
        <p className="text-gray-600 mb-4 line-clamp-3">{project.description}</p>

        {/* Skills tags */}
        <div className="flex flex-wrap gap-2 mb-5">
          {project.skills.map((skill, index) => (
            <span
              key={index}
              className={cn(
                'px-3 py-1 rounded-full text-xs font-medium',
                categories.find((c) => c.id === project.category)?.color ||
                  'bg-gray-100 text-gray-700'
              )}
            >
              {skill}
            </span>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <span className="text-sm text-gray-500">
            Deadline: {new Date(project.deadline).toLocaleDateString()}
          </span>
          <Button
            variant="outline"
            size="sm"
            className="text-blue-600 border-blue-600 hover:bg-blue-50"
          >
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
};
