import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { spacing } from '@/lib/design-system';
import { useProjectDetail } from './hooks/useProjectDetail';
import { useClaimProject } from './hooks/useClaimProject';
import {
  ProjectHeader,
  ProjectCompanyInfo,
  ProjectDetails,
  ProjectClaimSection,
  ProjectHowItWorks
} from './components';


export default function ProjectPage() {
  const { t } = useTranslation('project');
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: project, isLoading } = useProjectDetail(id);
  const {
    mutate: claimProject,
    isPending: isClaimingProject,
    error: claimError,
  } = useClaimProject();

  // Claim project handler
  const handleClaimProject = () => {
    if (!id) return;

    claimProject(
      { projectAssignmentId: id },
      {
        onSuccess: () => {
          // Navigate to dashboard after successful claim
          navigate('/dashboard');
        },
        onError: (error) => {
          console.error('Failed to claim project:', error);
          // Handle error (could show toast notification)
        },
      }
    );
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
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-lg font-medium text-muted-foreground">{t('projectPage.loading.message')}</p>
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
          <h2 className="text-xl text-foreground mb-2">Project not found</h2>
          <p className="text-muted-foreground">The requested project could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn(spacing.container, spacing.headerOffset, 'py-4 md:py-8')}>
      <div className="max-w-4xl mx-auto px-4">
        <ProjectHeader project={project} />
        
        <ProjectCompanyInfo project={project} />

        <ProjectDetails project={project} />
        
        <ProjectClaimSection
          project={project}
          isClaimingProject={isClaimingProject}
          claimError={claimError}
          onClaimProject={handleClaimProject}
        />

        <ProjectHowItWorks />
      </div>
    </div>
  );
}
