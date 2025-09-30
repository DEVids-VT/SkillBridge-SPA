import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
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
import { Project, CategoryFilter } from '../types';

interface ProjectCardProps {
  project: Project;
  categories: CategoryFilter[];
}

export const ProjectCard = ({ project, categories }: ProjectCardProps) => {
  const { t } = useTranslation('project');
  const [expanded, setExpanded] = useState(false);

  // Derive banner image (use project ID as seed for consistent unique images)
  const bannerUrl = useMemo(() => {
    // Using Picsum with seed parameter to ensure each project gets a unique but consistent image
    const seed =
      project.id || Math.abs(project.title.split('').reduce((a, b) => a + b.charCodeAt(0), 0));
    return `https://picsum.photos/seed/${seed}/800/300`;
  }, [project.id, project.title]);

  const postedLabel = useMemo(() => {
    const date = new Date(project.postedDate);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays <= 0) return t('projectsPage.projectCard.today');
    if (diffDays === 1) return t('projectsPage.projectCard.oneDayAgo');
    return `${diffDays} ${t('projectsPage.projectCard.daysAgo')}`;
  }, [project.postedDate, t]);

  // Compute remaining time progress (time left until deadline)
  const { percentLeft, daysLeft, deadlineLabel } = useMemo(() => {
    const now = new Date();
    const deadline = new Date(project.deadline);
    const posted = new Date(project.postedDate);
    const total = Math.max(1, deadline.getTime() - posted.getTime());
    const remaining = Math.max(0, deadline.getTime() - now.getTime());
    const pct = Math.min(100, Math.max(0, (remaining / total) * 100));
    const days = Math.ceil(remaining / (1000 * 60 * 60 * 24));
    const label =
      days <= 0
        ? t('projectsPage.projectCard.deadlinePassed')
        : `${days} ${t('projectsPage.projectCard.daysLeft')}`;
    return { percentLeft: pct, daysLeft: days, deadlineLabel: label };
  }, [project.deadline, project.postedDate, t]);

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
            {project.logo ? (
              <img
                src={project.logo}
                alt={`${project.company} ${t('projectsPage.projectCard.companyLogoAlt')}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            ) : (
              <Briefcase className="w-4 h-4 text-gray-300" />
            )}
          </div>
          <span className="max-w-[160px] truncate">{project.company}</span>
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
                {postedLabel}
              </span>
              <span className="mx-1">•</span>
              <span className="inline-flex items-center">
                <Calendar className="w-3 h-3 mr-1" />
                {deadlineLabel}
              </span>
            </div>
          </div>
        </div>

        {/* Progress bar (time remaining) */}
        <div className="space-y-1">
          <Progress value={percentLeft} trackColor={colors.blue} indicatorColor={colors.orange} />
          <div className="flex justify-between text-[11px]" style={{ color: colors.textSecondary }}>
            <span>{t('projectsPage.projectCard.timeRemaining')}</span>
            <span>{Math.max(0, Math.min(100, Math.round(percentLeft)))}%</span>
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
              {techIconFor(skill)}
              {skill}
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

        {/* Expandable description preview */}
        <div className="text-xs" style={{ color: colors.text }}>
          <p
            className={cn(
              'overflow-hidden transition-all duration-300',
              expanded ? 'line-clamp-none' : 'line-clamp-2'
            )}
          >
            {project.description}
          </p>
          <button
            type="button"
            className="mt-2 inline-flex items-center gap-1 text-[11px] underline underline-offset-2"
            style={{ color: colors.yellow }}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setExpanded((v) => !v);
            }}
          >
            {expanded ? (
              <>
                {t('projectsPage.projectCard.showLess')}
                <ChevronUp className="w-3 h-3" />
              </>
            ) : (
              <>
                {t('projectsPage.projectCard.showMore')}
                <ChevronDown className="w-3 h-3" />
              </>
            )}
          </button>
        </div>
      </div>
    </Link>
  );
};
