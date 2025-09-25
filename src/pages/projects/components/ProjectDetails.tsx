import { cn } from '@/lib/utils';
import { cards, typography } from '@/lib/design-system';
import { Badge } from '@/components/ui/badge';
import { Clock } from 'lucide-react';

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

interface ProjectDetailsProps {
  project: {
    description: string;
    skills: Array<{ id: string; name: string; description?: string }>;
    deadline: string;
  };
}

export default function ProjectDetails({ project }: ProjectDetailsProps) {
  const daysRemaining = getDaysRemaining(project.deadline);

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
            <p className="text-muted-foreground whitespace-pre-line">{project.description}</p>
          </div>

          {/* Learning Benefits */}
          <div>
            <h4 className={typography.heading[5] + ' mb-2'}>What You'll Learn</h4>
            <div className="p-4 rounded-lg bg-primary/10 border-l-4 border-primary">
              <p className="text-muted-foreground">
                By working on this project, you'll gain hands-on experience with{' '}
                {project.skills.map((s) => s.name).join(', ')}
                and develop practical skills that are highly valued in the industry. You'll
                learn how to tackle real-world problems and deliver production-quality
                solutions.
              </p>
            </div>
          </div>

          {/* Skills Required */}
          <div>
            <h4 className={typography.heading[5] + ' mb-2'}>Skills Required</h4>
            <div className="space-y-3">
              {project.skills.map((skill) => (
                <div key={skill.id} className="flex items-start gap-3">
                  <Badge className="border shrink-0 bg-accent/20 text-accent border-accent">
                    {skill.name}
                  </Badge>
                  {skill.description && (
                    <p className="text-sm text-muted-foreground">{skill.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Deadline */}
          <div>
            <h4 className={typography.heading[5] + ' mb-2'}>Deadline</h4>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock size={18} className="text-muted-foreground" />
              <span>{formatDate(project.deadline)}</span>
              <span
                className={`ml-2 px-2 py-1 rounded text-sm ${daysRemaining < 7 ? 'bg-destructive/20 text-destructive' : 'bg-accent/20 text-accent'}`}
              >
                {daysRemaining} days remaining
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
