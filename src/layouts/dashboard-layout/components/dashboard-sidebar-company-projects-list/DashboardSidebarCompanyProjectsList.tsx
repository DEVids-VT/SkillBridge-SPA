import { Link, useParams } from 'react-router-dom';
import { Calendar, Loader2, CheckCircle2 } from 'lucide-react';
import { colors } from '@/lib/design-system';
import { useCompanyProfile } from '@/pages/company/hooks/useCompanyProfile';
import { useTranslation } from 'react-i18next';
import { useCompanyProjects } from '../../hooks/useCompanyProjects';

export const DashboardSidebarCompanyProjectsList = () => {
  const { t } = useTranslation('project');
  const { projectId } = useParams();
  const {
    data: companyProfile,
    isLoading: loadingProfile,
    error: profileError,
  } = useCompanyProfile();
  const companyId = companyProfile?.id;
  const { data: projects, isLoading, error } = useCompanyProjects(companyId); //FIX IDS IN BACKEND (COMPANY ID SHOULD MATCH USER ID)

  if (loadingProfile || isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-sm" style={{ color: colors.textSecondary }}>
            {t('companyProjects.loading', 'Loading your company projects...')}
          </p>
        </div>
      </div>
    );
  }

  if (profileError) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-center">
          <p className="text-sm" style={{ color: colors.error }}>
            {t('companyProjects.profileError', 'Failed to load company profile')}
          </p>
          <p className="text-xs" style={{ color: colors.textMuted }}>
            {profileError.message}
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-center">
          <p className="text-sm" style={{ color: colors.error }}>
            {t('companyProjects.error', 'Failed to load projects')}
          </p>
          <p className="text-xs" style={{ color: colors.textMuted }}>
            {error.message}
          </p>
        </div>
      </div>
    );
  }

  if (!projects || projects.length === 0) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-center">
          <p className="text-sm mb-2" style={{ color: colors.textSecondary }}>
            {t('companyProjects.empty', 'No projects yet')}
          </p>
          <p className="text-xs" style={{ color: colors.textMuted }}>
            {t('companyProjects.emptyCta', 'Create your first assessment to see it here')}
          </p>
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
              projectId === project.id ? '' : 'hover:border-[#003566]'
            }`}
            style={{
              backgroundColor: colors.blueDark,
              borderColor: projectId === project.id ? colors.orange : 'transparent',
            }}
          >
            <div className="p-3">
              {/* Company */}
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 border-2"
                  style={{ borderColor: colors.borderLight }}
                >
                  <div
                    className="w-full h-full flex items-center justify-center text-white text-xs font-bold"
                    style={{ backgroundColor: colors.blue }}
                  >
                    {project.companyName.charAt(0).toUpperCase()}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-medium text-sm leading-tight truncate">
                    {project.title}
                  </h3>
                </div>
              </div>

              {/* Due date and completion */}
              <div className="flex items-center justify-between">
                <div
                  className="flex items-center gap-1 text-xs"
                  style={{ color: colors.textSecondary }}
                >
                  <Calendar size={12} />
                  <span>Duration: {project.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle2 size={12} className="text-green-400" />
                  <span className="text-xs" style={{ color: colors.textSecondary }}>
                    {completedTasks}/{totalTasks}
                  </span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="mt-2">
                <div
                  className="w-full rounded-full h-1.5"
                  style={{ backgroundColor: colors.borderLight }}
                >
                  <div
                    className="h-1.5 rounded-full transition-all duration-300"
                    style={{
                      backgroundColor: colors.orange,
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
