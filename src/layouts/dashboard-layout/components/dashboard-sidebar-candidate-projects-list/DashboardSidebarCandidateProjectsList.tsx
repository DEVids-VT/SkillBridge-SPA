import { Link, useParams } from 'react-router-dom';
import { Calendar, CheckCircle2, Loader2 } from 'lucide-react';
import { colors } from '@/lib/design-system';
import { useUserProjects } from '../../hooks/useUserProjects';

export const DashboardSidebarProjectsList = () => {
  const { projectId } = useParams();
  const { data: userProjects, isLoading, error } = useUserProjects();

  // Helper function to format date

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-sm text-gray-400">Loading your projects...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-center">
          <p className="text-sm text-red-400 mb-2">Failed to load projects</p>
          <p className="text-xs text-gray-500">{error.message}</p>
        </div>
      </div>
    );
  }

  // Show empty state
  if (!userProjects || userProjects.length === 0) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-center">
          <p className="text-sm text-gray-400 mb-2">No projects claimed yet</p>
          <p className="text-xs text-gray-500">Browse available projects to get started</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {userProjects.map((userProject) => {
        const { projectAssignment } = userProject;
        const completedTasks = projectAssignment.tasks.filter((task) => task.isCompleted).length;
        const totalTasks = projectAssignment.tasks.length;

        return (
          <Link
            key={projectAssignment.id}
            to={`/dashboard/project/${projectAssignment.id}`}
            className={`block rounded-lg transition-all duration-200 border-2 ${
              projectId === projectAssignment.id ? '' : 'hover:border-[#003566]'
            }`}
            style={{
              backgroundColor: colors.blueDark,
              borderColor: projectId === projectAssignment.id ? colors.orange : 'transparent',
            }}
          >
            <div className="p-3">
              {/* Company Section */}
              <div className="flex items-center gap-3 mb-3">
                {/* Company Logo Placeholder */}
                <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 border-2 border-slate-600">
                  <div
                    className="w-full h-full flex items-center justify-center text-white text-xs font-bold"
                    style={{ backgroundColor: colors.blue }}
                  >
                    {projectAssignment.companyName.charAt(0).toUpperCase()}
                  </div>
                </div>

                {/* Company Name */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-medium text-sm leading-tight truncate">
                    {projectAssignment.companyName}
                  </h3>
                </div>
              </div>

              {/* Task Title */}
              <div className="mb-3">
                <h4
                  className="text-white font-semibold text-sm leading-tight"
                  style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {projectAssignment.title}
                </h4>
              </div>

              {/* Due Date and Completion Rate */}
              <div className="flex items-center justify-between">
                {/* Due Date */}
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <Calendar size={12} />
                  <span>{projectAssignment.duration}</span>
                </div>

                {/* Completion Rate */}
                <div className="flex items-center gap-1">
                  <CheckCircle2 size={12} className="text-green-400" />
                  <span className="text-xs text-gray-300">
                    {completedTasks}/{totalTasks}
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-2">
                <div className="w-full bg-slate-700 rounded-full h-1.5">
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
