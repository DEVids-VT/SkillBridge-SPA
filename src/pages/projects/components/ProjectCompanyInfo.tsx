import { cn } from '@/lib/utils';
import { colors, cards, typography } from '@/lib/design-system';
import { Badge } from '@/components/ui/badge';

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
        <p className="text-gray-300 mb-4">
          This project is provided by {project.companyName}. Work on real-world challenges and
          gain practical experience that companies are looking for.
        </p>
        <div className="flex flex-wrap gap-2">
          <StatusBadge status={project.status} />
          {project.skills.map((skill) => (
            <Badge
              key={skill.id}
              style={{
                backgroundColor: `${colors.blue}30`,
                color: colors.yellow,
                borderColor: colors.blue,
              }}
              className="border"
            >
              {skill.name}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
