import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { cards, colors, typography } from '@/lib/design-system';
import { Badge } from '@/components/ui/badge';
import { LevelBadge } from '@/components/LevelBadge';

export interface DashboardProjectDetailsProps {
  project: {
    level: number;
    skills: Array<{ id: string; name: string }>;
    description: string;
    learningBenefits: string;
    suggestedApproach: string;
  };
  isExpanded: boolean;
  onToggle: () => void;
}

export const DashboardProjectDetails = ({
  project,
  isExpanded,
  onToggle,
}: DashboardProjectDetailsProps) => {
  return (
    <div className={cn(cards.base, 'mb-6')}>
      <div className={cn(cards.header, 'cursor-pointer')} onClick={onToggle}>
        <div className="flex items-center justify-between w-full">
          <h3 className={typography.heading[4]}>Project Details</h3>
          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </div>

      {isExpanded && (
        <div className={cards.body}>
          <div className="space-y-6">
            {/* Project Info */}
            <div>
              <h4 className={typography.heading[5] + ' mb-2'}>Level & Skills</h4>
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <LevelBadge level={project.level} />
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

            {/* Description */}
            <div>
              <h4 className={typography.heading[5] + ' mb-2'}>Description</h4>
              <p className="text-gray-300 whitespace-pre-line">{project.description}</p>
            </div>

            {/* Learning Benefits */}
            <div>
              <h4 className={typography.heading[5] + ' mb-2'}>Learning Benefits</h4>
              <p className="text-gray-300">{project.learningBenefits}</p>
            </div>

            {/* Suggested Approach */}
            <div>
              <h4 className={typography.heading[5] + ' mb-2'}>Suggested Approach</h4>
              <div
                className="p-4 rounded-lg"
                style={{
                  backgroundColor: `${colors.blue}20`,
                  borderLeft: `4px solid ${colors.blue}`,
                }}
              >
                <p className="text-gray-300 whitespace-pre-line">{project.suggestedApproach}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
