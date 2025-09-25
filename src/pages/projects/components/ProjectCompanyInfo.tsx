import { cn } from '@/lib/utils';
import { cards, typography } from '@/lib/design-system';
import { Badge } from '@/components/ui/badge';

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

interface ProjectCompanyInfoProps {
  project: {
    companyName: string;
    status: number;
    skills: Array<{ id: string; name: string }>;
  };
}

export default function ProjectCompanyInfo({ project }: ProjectCompanyInfoProps) {
  return (
    <div className={cn(cards.base, 'bg-transparent mb-6')}>
      <div className={cards.header}>
        <h3 className={typography.heading[4]}>About {project.companyName}</h3>
      </div>
      <div className={cards.body}>
        <p className="text-muted-foreground mb-4">
          This project is provided by {project.companyName}. Work on real-world challenges and
          gain practical experience that companies are looking for.
        </p>
        <div className="flex flex-wrap gap-2">
          <StatusBadge status={project.status} />
          {project.skills.map((skill) => (
            <Badge
              key={skill.id}
              className="border bg-primary/20 text-primary border-primary"
            >
              {skill.name}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
