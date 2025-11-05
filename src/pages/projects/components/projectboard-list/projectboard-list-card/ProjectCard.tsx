import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Badge } from '@/components/ui/badge';
import { cards, colors, components } from '@/lib/design-system';
import {
  Briefcase,
  Calendar,
  Clock,
  ChevronDown,
  ChevronUp,
  Cpu,
  Code,
  Layers,
  Database,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { IProjectAssignment } from '@/types/interfaces/projectassignment/IProjectAssignment';

interface ProjectCardProps {
  project: IProjectAssignment;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  const { t } = useTranslation('project');

  // Derive banner image (use project ID as seed for consistent unique images)
  const bannerUrl = useMemo(() => {
    // Using Picsum with seed parameter to ensure each project gets a unique but consistent image
    const seed =
      project.id || Math.abs(project.title.split('').reduce((a, b) => a + b.charCodeAt(0), 0));
    return `https://picsum.photos/seed/${seed}/800/300`;
  }, [project.id, project.title]);

  // Map some common tech keywords to icons
  const techIconFor = (skill: string) => {
    const s = skill.toLowerCase();
    if (s.includes('react') || s.includes('ui')) return <Code className="w-3.5 h-3.5 mr-1" />;
    if (s.includes('api') || s.includes('backend') || s.includes('server'))
      return <Layers className="w-3.5 h-3.5 mr-1" />;
    if (s.includes('data') || s.includes('sql') || s.includes('database'))
      return <Database className="w-3.5 h-3.5 mr-1" />;
    if (s.includes('node') || s.includes('python') || s.includes('java'))
      return <Cpu className="w-3.5 h-3.5 mr-1" />;
    return null;
  };

  return (
    <Link
      to={`/projects/${project.id}`}
      className={cn(
        cards.base,
        'group block transition-all duration-300 hover:shadow-xl hover:scale-[1.01] cursor-pointer'
      )}
    >
      {/* Banner */}
      <div className="relative h-36 w-full overflow-hidden">
        <img
          src={bannerUrl}
          alt={`${project.title} banner`}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.style.opacity = '0.5';
          }}
        />
        {/* Company badge over banner */}
        <div
          className="absolute top-2 left-2 flex items-center gap-2 rounded-full px-2 py-1 text-xs"
          style={{ backgroundColor: colors.blue, color: colors.yellow }}
        >
          <div className="w-6 h-6 rounded bg-black/30 backdrop-blur flex items-center justify-center overflow-hidden">
            <Briefcase className="w-4 h-4 text-gray-300" />
          </div>
          <span className="max-w-[160px] truncate">{project.companyName}</span>
        </div>
      </div>

      {/* Body */}
      <div
        className={cn(cards.body, 'space-y-3')}
        onClick={(e) => {
          /* keep card navigable, but allow toggles below to stop propagation */
        }}
      >
        {/* Title & meta */}
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3
              className="font-semibold text-base leading-snug mb-1 truncate"
              style={{ color: colors.white }}
            >
              {project.title}
            </h3>
            <div
              className="flex items-center gap-2 text-xs"
              style={{ color: colors.textSecondary }}
            >
              <span className="inline-flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                {project.duration}
              </span>
              <span className="mx-1">•</span>
            </div>
          </div>
        </div>
        {/* Skills with icons */}
        <div className="flex flex-wrap gap-1.5">
          {project.skills.slice(0, 4).map((skill, index) => (
            <Badge
              key={index}
              className={cn(
                components.tag,
                components.tagColors.blue,
                'text-[11px] px-2 py-1 inline-flex items-center'
              )}
            >
              {techIconFor(skill.name)}
              {skill.name}
            </Badge>
          ))}
          {project.skills.length > 4 && (
            <Badge
              className={cn(components.tag, components.tagColors.blue, 'text-[11px] px-2 py-1')}
            >
              +{project.skills.length - 4} {t('projectsPage.projectCard.more')}
            </Badge>
          )}
        </div>
      </div>
    </Link>
  );
};
