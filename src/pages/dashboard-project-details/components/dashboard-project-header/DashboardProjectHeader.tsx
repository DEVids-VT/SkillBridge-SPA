import { Calendar } from 'lucide-react';
import { colors } from '@/lib/design-system';

export interface DashboardProjectHeaderProps {
  project: {
    title: string;
    companyName: string;
    duration: string;
    summary: string;
  };
}

export const DashboardProjectHeader = ({ project }: DashboardProjectHeaderProps) => {
  return (
    <div className="mb-8">
      {/* Project Header with dark navy blue background */}
      <div className="rounded-lg overflow-hidden mb-6">
        <div className="px-4 py-6">
          <div className="flex items-start gap-6">
            {/* Company Logo */}
            <div className="shrink-0">
              <div className="w-20 h-20 rounded-lg overflow-hidden bg-white flex items-center justify-center">
                <div
                  className="w-full h-full flex items-center justify-center text-2xl font-bold"
                  style={{ backgroundColor: colors.blue, color: colors.white }}
                >
                  {project.companyName.charAt(0).toUpperCase()}
                </div>
              </div>
            </div>

            {/* Project Info */}
            <div className="flex-1">
              <h1 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-3">
                {project.title}
              </h1>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mb-3 text-sm">
                <span className="text-blue-400">{project.companyName}</span>
                <div className="flex items-center">
                  <Calendar size={16} className="text-gray-400 mr-1.5" />
                  <span className="text-gray-400">
                    {project.duration}
                    <span className="ml-1 text-red-400">(TODO days left)</span>
                  </span>
                </div>
              </div>
              <p className="text-gray-300">{project.summary}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
