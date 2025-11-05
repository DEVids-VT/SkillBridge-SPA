import { cn } from '@/lib/utils';
import { colors, cards, typography } from '@/lib/design-system';
import { Badge } from '@/components/ui/badge';
import { Clock } from 'lucide-react';
import { IProjectAssignment } from '@/types/interfaces/projectassignment/IProjectAssignment';

interface ProjectDetailsProps {
  project: Pick<IProjectAssignment, 'description' | 'skills' | 'duration'>;
}

export default function ProjectDetails({ project }: ProjectDetailsProps) {
  return (
    <div className={cn(cards.base, 'mb-6')}>
      <div className={cards.header}>
        <h3 className={typography.heading[4]}>Project Details</h3>
      </div>
      <div className={cards.body}>
        <div className="space-y-6">
          {/* Description */}
          <div>
            <h4 className={typography.heading[5] + ' mb-2'}>Description</h4>
            <p className="text-gray-300 whitespace-pre-line">{project.description}</p>
          </div>

          {/* Learning Benefits */}
          <div>
            <h4 className={typography.heading[5] + ' mb-2'}>What You'll Learn</h4>
            <div
              className="p-4 rounded-lg"
              style={{
                backgroundColor: `${colors.blue}20`,
                borderLeft: `4px solid ${colors.blue}`,
              }}
            >
              <p className="text-gray-300">
                By working on this project, you'll gain hands-on experience with{' '}
                {project.skills.map((s) => s.name).join(', ')}
                and develop practical skills that are highly valued in the industry. You'll learn
                how to tackle real-world problems and deliver production-quality solutions.
              </p>
            </div>
          </div>

          {/* Skills Required */}
          <div>
            <h4 className={typography.heading[5] + ' mb-2'}>Skills Required</h4>
            <div className="space-y-3">
              {project.skills.map((skill) => (
                <div key={skill.id} className="flex items-start gap-3">
                  <Badge
                    style={{
                      backgroundColor: `${colors.yellow}20`,
                      color: colors.yellow,
                      borderColor: colors.yellow,
                    }}
                    className="border shrink-0"
                  >
                    {skill.name}
                  </Badge>
                  {skill.description && (
                    <p className="text-sm text-gray-400">{skill.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Deadline */}
          <div>
            <h4 className={typography.heading[5] + ' mb-2'}>Deadline</h4>
            <div className="flex items-center gap-2 text-gray-300">
              <Clock size={18} className="text-gray-400" />
              <span>{project.duration}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
