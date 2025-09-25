import { Calendar, Building2 } from 'lucide-react';
// Removed colors import - now using theme-aware classes

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
    0: { label: 'Draft', className: 'bg-muted text-muted-foreground' },
    1: { label: 'Active', className: 'bg-accent text-accent-foreground' },
    2: { label: 'Completed', className: 'bg-green-500 text-white' },
    3: { label: 'Archived', className: 'bg-muted text-muted-foreground' },
  };

  const { label, className } = statusMap[status as keyof typeof statusMap] || statusMap[1];

  return (
    <span className={`px-2 py-1 rounded text-xs font-medium ${className}`}>
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
              <div className="w-20 h-20 rounded-lg overflow-hidden bg-muted flex items-center justify-center">
                <Building2 size={32} className="text-muted-foreground" />
              </div>
            </div>

            {/* Project Info */}
            <div className="flex-1">
              <h1 className="font-playfair text-4xl md:text-5xl font-bold text-foreground mb-3">
                {project.title}
              </h1>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mb-3 text-sm">
                <span className="text-primary">{project.companyName}</span>
                <div className="flex items-center">
                  <Calendar size={16} className="text-muted-foreground mr-1.5" />
                  <span className="text-muted-foreground">
                    {formatDate(project.deadline)}
                    <span
                      className={`ml-1 ${daysRemaining < 7 ? 'text-destructive' : 'text-accent'}`}
                    >
                      ({daysRemaining} days left)
                    </span>
                  </span>
                </div>
                <StatusBadge status={project.status} />
              </div>
              <p className="text-muted-foreground">
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
