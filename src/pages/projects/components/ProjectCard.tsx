import { useTranslation } from 'react-i18next';
import { Badge } from '@/components/ui/badge';
import { cards, components } from '@/lib/design-system';
import { Briefcase, Calendar, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { Project, CategoryFilter } from '../types';

interface ProjectCardProps {
  project: Project;
  categories: CategoryFilter[];
}

export const ProjectCard = ({ project, categories }: ProjectCardProps) => {
  const { t } = useTranslation('project');

  // Format date to a more readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(date.getTime() - now.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 7) {
      return `${diffDays} ${t('projectsPage.projectCard.daysAgo')}`;
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  return (
    <Link 
      to={`/projects/${project.id}`} 
      className={cn(
        cards.base,
        "block transition-all duration-200 hover:scale-[1.02] hover:shadow-lg cursor-pointer" // Fixed height for uniform cards
      )}
    >
      <div className={cn(cards.body, "h-full flex flex-col justify-between")}>
        {/* Header Section */}
        <div className="flex items-start gap-3 mb-3">
          {/* Company logo */}
          <div className="w-10 h-10 rounded-md flex-shrink-0 flex items-center justify-center overflow-hidden bg-muted">
            {project.logo ? (
              <img
                src={project.logo}
                alt={`${project.company} ${t('projectsPage.projectCard.companyLogoAlt')}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Replace broken image with Briefcase icon
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement?.classList.add('flex');
                  const icon = document.createElement('div');
                  icon.innerHTML =
                    '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5 text-gray-400"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>';
                  e.currentTarget.parentElement?.appendChild(icon);
                }}
              />
            ) : (
              <Briefcase className="w-5 h-5 text-muted-foreground" />
            )}
          </div>

          {/* Title and company info */}
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-sm leading-tight mb-1 overflow-hidden text-foreground" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
              {project.title}
            </h3>
            <div className="flex items-center text-xs text-muted-foreground">
              <span className="truncate">{project.company}</span>
              <span className="mx-1">•</span>
              <span className="flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                {formatDate(project.postedDate)}
              </span>
            </div>
          </div>
        </div>

        {/* Skills Section - Fixed height container */}
        <div className="flex-1 mb-3">
          <div className="flex flex-wrap gap-1.5 overflow-hidden">
            {project.skills.slice(0, 4).map((skill, index) => (
              <Badge 
                key={index} 
                className="text-xs px-2 py-1 bg-primary/20 text-primary border border-primary/30"
              >
                {skill}
              </Badge>
            ))}
            {project.skills.length > 4 && (
              <Badge className="text-xs px-2 py-1 bg-primary/20 text-primary border border-primary/30">
                +{project.skills.length - 4} {t('projectsPage.projectCard.more')}
              </Badge>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};
