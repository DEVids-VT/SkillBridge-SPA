import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Loader2,
  Calendar,
  ExternalLink,
  Trophy,
  BrainCircuit,
  CheckCircle,
  Clock,
  Building2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { spacing, colors, cards, typography } from '@/lib/design-system';
import { Badge } from '@/components/ui/badge';
import { useProjectDetail } from './hooks/useProjectDetail';

// Helper function to format date
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
};

// Helper to calculate days remaining
const getDaysRemaining = (deadlineString: string) => {
  const deadline = new Date(deadlineString);
  const now = new Date();
  const diffTime = deadline.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

// Status badge component
const StatusBadge = ({ status }: { status: number }) => {
  const statusMap = {
    0: { label: 'Draft', color: colors.blue },
    1: { label: 'Active', color: colors.yellow },
    2: { label: 'Completed', color: colors.orange },
    3: { label: 'Archived', color: colors.blue }
  };
  
  const { label, color } = statusMap[status as keyof typeof statusMap] || statusMap[1];
  
  return (
    <span
      className="px-2 py-1 rounded text-xs font-medium"
      style={{ backgroundColor: color, color: colors.dark }}
    >
      {label}
    </span>
  );
};

export default function ProjectPage() {
  const { t } = useTranslation('project');
  const { id } = useParams<{ id: string }>();
  const { data: project, isLoading } = useProjectDetail(id);

  // Claim project handler
  const handleClaimProject = () => {
    console.log('Claim project:', id);
    // TODO: Implement project claiming logic
  };

  // If loading, show loading indicator
  if (isLoading) {
    return (
      <div
        className={cn(
          spacing.container,
          spacing.headerOffset,
          'py-4 md:py-8',
          'flex justify-center items-center min-h-[60vh]'
        )}
      >
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-lg font-medium text-gray-600">{t('projectPage.loading.message')}</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div
        className={cn(
          spacing.container,
          spacing.headerOffset,
          'py-4 md:py-8',
          'flex justify-center items-center min-h-[60vh]'
        )}
      >
        <div className="text-center">
          <h2 className="text-xl text-white mb-2">Project not found</h2>
          <p className="text-gray-400">The requested project could not be found.</p>
        </div>
      </div>
    );
  }

  const daysRemaining = getDaysRemaining(project.deadline);

  return (
    <div className={cn(spacing.container, spacing.headerOffset, 'py-4 md:py-8')}>
      <div className="max-w-4xl mx-auto px-4">
        {/* Project Header Section */}
        <div className="mb-8">
          {/* Project Header */}
          <div className="rounded-lg overflow-hidden mb-6">
            <div className="px-4 py-6">
              <div className="flex items-start gap-6">
                {/* Company Logo Placeholder */}
                <div className="shrink-0">
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-800 flex items-center justify-center">
                    <Building2 size={32} className="text-gray-400" />
                  </div>
                </div>
                
                {/* Project Info */}
                <div className="flex-1">
                  <h1 
                    className="font-playfair text-4xl md:text-5xl font-bold text-white mb-3"
                  >
                    {project.title}
                  </h1>
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mb-3 text-sm">
                    <span className="text-blue-400">
                      {project.companyName}
                    </span>
                    <div className="flex items-center">
                      <Calendar size={16} className="text-gray-400 mr-1.5" />
                      <span className="text-gray-400">
                        {formatDate(project.deadline)}
                        <span className={`ml-1 ${daysRemaining < 7 ? 'text-red-400' : 'text-yellow-400'}`}>
                          ({daysRemaining} days left)
                        </span>
                      </span>
                    </div>
                    <StatusBadge status={project.status} />
                  </div>
                  <p className="text-gray-300">
                    {project.description.length > 200 
                      ? `${project.description.substring(0, 200)}...` 
                      : project.description}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Company Info Card */}
          <div className={cn(cards.base, 'bg-transparent mb-6')}>
            <div className={cards.header}>
              <h3 className={typography.heading[4]}>About {project.companyName}</h3>
            </div>
            <div className={cards.body}>
              <p className="text-gray-300 mb-4">
                This project is provided by {project.companyName}. Work on real-world challenges 
                and gain practical experience that companies are looking for.
              </p>
              <div className="flex flex-wrap gap-2">
                <StatusBadge status={project.status} />
                {project.skills.map(skill => (
                  <Badge 
                    key={skill.id} 
                    style={{ backgroundColor: `${colors.blue}30`, color: colors.yellow, borderColor: colors.blue }}
                    className="border"
                  >
                    {skill.name}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Project Details */}
        <div className={cn(cards.base, "mb-6")}>
          <div className={cards.header}>
            <h3 className={typography.heading[4]}>Project Details</h3>
          </div>
          <div className={cards.body}>
            <div className="space-y-6">
              {/* Description */}
              <div>
                <h4 className={typography.heading[5] + " mb-2"}>Description</h4>
                <p className="text-gray-300 whitespace-pre-line">{project.description}</p>
              </div>
              
              {/* Learning Benefits */}
              <div>
                <h4 className={typography.heading[5] + " mb-2"}>What You'll Learn</h4>
                <div 
                  className="p-4 rounded-lg"
                  style={{ backgroundColor: `${colors.blue}20`, borderLeft: `4px solid ${colors.blue}` }}
                >
                  <p className="text-gray-300">
                    By working on this project, you'll gain hands-on experience with {project.skills.map(s => s.name).join(', ')} 
                    and develop practical skills that are highly valued in the industry. You'll learn how to tackle 
                    real-world problems and deliver production-quality solutions.
                  </p>
                </div>
              </div>

              {/* Skills Required */}
              <div>
                <h4 className={typography.heading[5] + " mb-2"}>Skills Required</h4>
                <div className="space-y-3">
                  {project.skills.map(skill => (
                    <div key={skill.id} className="flex items-start gap-3">
                      <Badge 
                        style={{ backgroundColor: `${colors.yellow}20`, color: colors.yellow, borderColor: colors.yellow }}
                        className="border shrink-0"
                      >
                        {skill.name}
                      </Badge>
                      {skill.description && (
                        <p className="text-sm text-gray-400">{skill.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Deadline */}
              <div>
                <h4 className={typography.heading[5] + " mb-2"}>Deadline</h4>
                <div className="flex items-center gap-2 text-gray-300">
                  <Clock size={18} className="text-gray-400" />
                  <span>{formatDate(project.deadline)}</span>
                  <span className={`ml-2 px-2 py-1 rounded text-sm ${daysRemaining < 7 ? 'bg-red-900 text-red-300' : 'bg-yellow-900 text-yellow-300'}`}>
                    {daysRemaining} days remaining
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Claim Project Section */}
        <div className={cn(cards.base, "mb-6")}>
          <div className={cards.header}>
            <h3 className={typography.heading[4]}>Claim This Project</h3>
          </div>
          <div className={cards.body}>
            <div className="flex flex-col items-center text-center p-6 border-2 border-dashed rounded-lg" style={{ borderColor: colors.blue }}>
              <Trophy size={40} className="mb-4 text-yellow-400" />
              <h4 className={typography.heading[5] + " mb-2"}>Ready to Start This Challenge?</h4>
              <p className="text-gray-300 mb-6 max-w-md">
                Claim this project to add it to your dashboard and start working on it. You'll have {daysRemaining} days to complete the challenge.
              </p>
              <button
                className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200"
                style={{ backgroundColor: colors.blue, color: colors.dark }}
                onClick={handleClaimProject}
              >
                <Trophy size={18} />
                Claim Project
              </button>
            </div>
          </div>
        </div>

        {/* How SkillBridge Projects Work */}
        <div className={cn(cards.base, "mb-6")}>
          <div className={cards.header}>
            <h3 className={typography.heading[4]}>How SkillBridge Projects Work</h3>
          </div>
          <div className={cards.body}>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full shrink-0" style={{ backgroundColor: `${colors.blue}30` }}>
                  <span className="text-sm font-medium" style={{ color: colors.blue }}>1</span>
                </div>
                <div>
                  <h5 className="font-medium mb-1">Claim the Project</h5>
                  <p className="text-sm text-gray-400">
                    Click "Claim Project" to add it to your dashboard and start working on it.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full shrink-0" style={{ backgroundColor: `${colors.blue}30` }}>
                  <span className="text-sm font-medium" style={{ color: colors.blue }}>2</span>
                </div>
                <div>
                  <h5 className="font-medium mb-1">Work on Tasks</h5>
                  <p className="text-sm text-gray-400">
                    Follow the project requirements and implement the solution at your own pace.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full shrink-0" style={{ backgroundColor: `${colors.blue}30` }}>
                  <span className="text-sm font-medium" style={{ color: colors.blue }}>3</span>
                </div>
                <div>
                  <h5 className="font-medium mb-1">Connect GitHub</h5>
                  <p className="text-sm text-gray-400">
                    Link your repository for automatic assessment and progress tracking.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full shrink-0" style={{ backgroundColor: `${colors.yellow}30` }}>
                  <CheckCircle size={16} style={{ color: colors.yellow }} />
                </div>
                <div>
                  <h5 className="font-medium mb-1">Get Assessed</h5>
                  <p className="text-sm text-gray-400">
                    Receive AI-powered feedback on your implementation when the deadline is reached.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 rounded-lg bg-opacity-50" style={{ backgroundColor: `${colors.blueDark}60` }}>
              <div className="flex items-start gap-3">
                <BrainCircuit size={20} className="text-yellow-400 mt-1" />
                <div>
                  <h5 className="font-medium mb-1">AI-Powered Learning</h5>
                  <p className="text-sm text-gray-400">
                    SkillBridge uses advanced AI to analyze your code, provide personalized feedback, 
                    and help you improve your skills through real-world projects from actual companies.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
