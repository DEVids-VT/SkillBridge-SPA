import { useParams, useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { spacing, colors } from '@/lib/design-system';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { useProjectDetail } from './hooks/useProjectDetail';
import { useClaimProject } from './hooks/useClaimProject';
import {
  ProjectHeader,
  ProjectCompanyInfo,
  ProjectDetails,
  ProjectClaimSection,
  ProjectHowItWorks,
} from './components';

export default function ProjectPage() {
  const { t } = useTranslation('project');
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { onboardingData } = useOnboarding();
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

  // If loading, show loading indicator within the same background as board
  if (isLoading) {
    return (
      <div className="flex h-full min-h-0" style={{ backgroundColor: colors.bgSlate900 }}>
        <div className="flex-1 overflow-y-auto rounded-xl" style={{ backgroundColor: colors.dark }}>
          <main className="p-4 lg:p-6">
            <div
              className={cn(
                'py-4 md:py-8',
                'flex justify-center items-center min-h-[60vh]'
              )}
            >
              <div className="text-center">
                <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
                <p className="text-lg font-medium text-gray-300">{t('projectPage.loading.message')}</p>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex h-full min-h-0" style={{ backgroundColor: colors.bgSlate900 }}>
        <div className="flex-1 overflow-y-auto rounded-xl" style={{ backgroundColor: colors.dark }}>
          <main className="p-4 lg:p-6">
            <div
              className={cn(
                'py-4 md:py-8',
                'flex justify-center items-center min-h-[60vh]'
              )}
            >
              <div className="text-center">
                <h2 className="text-xl text-white mb-2">Project not found</h2>
                <p className="text-gray-400">The requested project could not be found.</p>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  // Match ProjectsBoardPage surfaces but without the filters sidebar
  return (
    <div className="flex h-full min-h-0" style={{ backgroundColor: colors.bgSlate900 }}>
      <div className="flex-1 overflow-y-auto rounded-xl" style={{ backgroundColor: colors.dark }}>
        <main className="p-4 lg:p-6">
          <div className="max-w-4xl mx-auto">
            <div className="mb-4">
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 text-sm px-3 py-2 rounded-md"
                style={{ backgroundColor: colors.blueDark, color: colors.white }}
              >
                <ArrowLeft className="h-4 w-4" /> {t('projectPage.actions.backToProjects') || 'Back to projects'}
              </Link>
            </div>

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
        </main>
      </div>
    </div>
  );
}
