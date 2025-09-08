import { Calendar, Building2 } from 'lucide-react';
import { colors } from '@/lib/design-system';

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
    3: { label: 'Archived', color: colors.blue },
  };

  const { label, color } = statusMap[status as keyof typeof statusMap] || statusMap[1];

  return (
    <span
      className="px-2 py-1 rounded text-xs font-medium"
      style={{ backgroundColor: `${color}30`, color }}
    >
      {label}
    </span>
  );
};

interface ProjectHeaderProps {
  project: {
    title: string;
    companyName: string;
    deadline: string;
    status: number;
    description: string;
  };
}

export default function ProjectHeader({ project }: ProjectHeaderProps) {
  const daysRemaining = getDaysRemaining(project.deadline);

  return (
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
              <h1 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-3">
                {project.title}
              </h1>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mb-3 text-sm">
                <span className="text-blue-400">{project.companyName}</span>
                <div className="flex items-center">
                  <Calendar size={16} className="text-gray-400 mr-1.5" />
                  <span className="text-gray-400">
                    {formatDate(project.deadline)}
                    <span
                      className={`ml-1 ${daysRemaining < 7 ? 'text-red-400' : 'text-yellow-400'}`}
                    >
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
    </div>
  );
}
