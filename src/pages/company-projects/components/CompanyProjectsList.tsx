import { Link, useParams } from 'react-router-dom';
import { Calendar, Loader2, CheckCircle2 } from 'lucide-react';
import { useCompanyProjects } from '@/pages/company/hooks/useCompanyProjects';
import { useCompanyProfile } from '@/pages/company/hooks/useCompanyProfile';
import { useTranslation } from 'react-i18next';

export const CompanyProjectsList = () => {
  const { t } = useTranslation('project');
  const { projectId } = useParams();
  const { data: companyProfile, isLoading: loadingProfile, error: profileError } = useCompanyProfile();
  const companyId = companyProfile?.id;
  const { data: projects, isLoading, error } = useCompanyProjects(companyId);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  if (loadingProfile || isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-sm text-muted-foreground">{t('companyProjects.loading', 'Loading your company projects...')}</p>
        </div>
      </div>
    );
  }

  if (profileError) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-center">
          <p className="text-sm text-destructive">{t('companyProjects.profileError', 'Failed to load company profile')}</p>
          <p className="text-xs text-muted-foreground">{profileError.message}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-center">
          <p className="text-sm text-destructive">{t('companyProjects.error', 'Failed to load projects')}</p>
          <p className="text-xs text-muted-foreground">{error.message}</p>
        </div>
      </div>
    );
  }

  if (!projects || projects.length === 0) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-center">
          <p className="text-sm mb-2 text-muted-foreground">{t('companyProjects.empty', 'No projects yet')}</p>
          <p className="text-xs text-muted-foreground">{t('companyProjects.emptyCta', 'Create your first assessment to see it here')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {projects.map((project) => {
        const completedTasks = (project.tasks || []).filter((t) => t.isCompleted).length;
        const totalTasks = project.tasks?.length || 0;

        return (
          <Link
            key={project.id}
            to={`/dashboard/company/project/${project.id}`}
            className={`block rounded-lg transition-all duration-200 border-2 ${
              projectId === project.id ? 'border-accent' : 'border-transparent hover:border-primary'
            } bg-card`}
          >
            <div className="p-3">
              {/* Company */}
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 border-2 border-border">
                  <div
                    className="w-full h-full flex items-center justify-center text-primary-foreground text-xs font-bold bg-primary"
                  >
                    {project.companyName.charAt(0).toUpperCase()}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-foreground font-medium text-sm leading-tight truncate">
                    {project.title}
                  </h3>
                </div>
              </div>

              {/* Due date and completion */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Calendar size={12} />
                  <span>{formatDate(project.deadline)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle2 size={12} className="text-green-400" />
                  <span className="text-xs text-muted-foreground">
                    {completedTasks}/{totalTasks}
                  </span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="mt-2">
                <div className="w-full rounded-full h-1.5 bg-border">
                  <div
                    className="h-1.5 rounded-full transition-all duration-300 bg-accent"
                    style={{
                      width: totalTasks > 0 ? `${(completedTasks / totalTasks) * 100}%` : '0%',
                    }}
                  />
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};


