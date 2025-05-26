import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Briefcase, Calendar, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Project, CategoryFilter } from '../types';

interface ProjectCardProps {
  project: Project;
  categories: CategoryFilter[];
}

export const ProjectCard = ({ project, categories }: ProjectCardProps) => {
  // Format date to a more readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(date.getTime() - now.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays <= 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  // Get category color for badges
  const category = categories.find(c => c.id === project.category);
  const categoryColor = category?.color || 'bg-gray-100 text-gray-700';

  return (
    <div className="bg-white border border-gray-100 rounded-lg p-5 shadow-sm hover:shadow transition-all hover:border-blue-200">
      <div className="flex items-center gap-4">
        {/* Company logo */}
        <div className="w-10 h-10 rounded-md bg-gray-100 flex-shrink-0 flex items-center justify-center">
          <Briefcase className="w-5 h-5 text-gray-400" />
        </div>
        
        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-medium text-gray-900 truncate group-hover:text-blue-600">
              {project.title}
            </h3>
            <Badge 
              variant="outline" 
              className={cn("ml-2 flex-shrink-0", categoryColor)}
            >
              {project.category}
            </Badge>
          </div>
          
          <div className="flex items-center text-sm text-gray-500 mb-2">
            <span className="truncate">{project.company}</span>
            <span className="mx-2">•</span>
            <span className="flex items-center">
              <Clock className="w-3 h-3 mr-1" />
              {formatDate(project.postedDate)}
            </span>
          </div>
          
          <p className="text-sm text-gray-600 line-clamp-2 mb-3">{project.description}</p>
          
          {/* Skills */}
          <div className="flex flex-wrap gap-1.5 mt-2">
            {project.skills.slice(0, 3).map((skill, index) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className="bg-gray-50 text-xs font-normal text-gray-700"
              >
                {skill}
              </Badge>
            ))}
            {project.skills.length > 3 && (
              <Badge 
                variant="secondary" 
                className="bg-gray-50 text-xs font-normal text-gray-700"
              >
                +{project.skills.length - 3} more
              </Badge>
            )}
          </div>
        </div>
        
        {/* Apply button */}
        <Button 
          size="sm" 
          className="flex-shrink-0 self-start mt-1"
        >
          Apply
        </Button>
      </div>
      
      {/* Deadline */}
      <div className="flex items-center justify-end mt-3 pt-3 border-t border-gray-50">
        <span className="flex items-center text-xs text-gray-500">
          <Calendar className="w-3 h-3 mr-1" />
          Deadline: {new Date(project.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
        </span>
      </div>
    </div>
  );
};
