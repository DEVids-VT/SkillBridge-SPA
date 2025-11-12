import { cn } from '@/lib/utils';
import { cards, colors, typography } from '@/lib/design-system';
import { Badge } from '@/components/ui/badge';
import { LevelBadge } from '@/components/LevelBadge';

export interface DashboardProjectCompanyDescriptionProps {
  project: {
    companyName: string;
    level: number;
    skills: Array<{ id: string; name: string }>;
  };
}

export const DashboardProjectCompanyDescription = ({
  project,
}: DashboardProjectCompanyDescriptionProps) => {
  return (
    <div className={cn(cards.base, 'bg-transparent mb-6')}>
      <div className={cards.header}>
        <h3 className={typography.heading[4]}>About {project.companyName}</h3>
      </div>
      <div className={cards.body}>
        <div className="flex flex-col sm:flex-row items-start gap-4">
          <div className="flex-1">
            <p className="text-gray-300">
              This project is provided by {project.companyName}. Work on real-world challenges and
              gain practical experience that companies are looking for.
            </p>
          </div>
          <div className="shrink-0 mt-4 sm:mt-0">
            <div className="flex flex-wrap gap-2 justify-start sm:justify-end max-w-xs">
              {/* Project Level Badge */}
              <LevelBadge level={project.level} />

              {/* Skills */}
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
      </div>
    </div>
  );
};
