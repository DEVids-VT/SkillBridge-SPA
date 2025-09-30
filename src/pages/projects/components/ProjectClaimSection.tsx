import { cn } from '@/lib/utils';
import { colors, cards, typography } from '@/lib/design-system';
import { Trophy, Loader2 } from 'lucide-react';

// Helper to calculate days remaining
const getDaysRemaining = (deadlineString: string) => {
  const deadline = new Date(deadlineString);
  const now = new Date();
  const diffTime = deadline.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

interface ProjectClaimSectionProps {
  project: {
    deadline: string;
  };
  isClaimingProject: boolean;
  claimError: Error | null;
  onClaimProject: () => void;
}

export default function ProjectClaimSection({
  project,
  isClaimingProject,
  claimError,
  onClaimProject,
}: ProjectClaimSectionProps) {
  const daysRemaining = getDaysRemaining(project.deadline);

  return (
    <div className={cn(cards.base, 'mb-6')}>
      <div className={cards.header}>
        <h3 className={typography.heading[4]}>Claim This Project</h3>
      </div>
      <div className={cards.body}>
        <div
          className="flex flex-col items-center text-center p-6 border-2 border-dashed rounded-lg"
          style={{ borderColor: colors.blue }}
        >
          <Trophy size={40} className="mb-4 text-yellow-400" />
          <h4 className={typography.heading[5] + ' mb-2'}>Ready to Start This Challenge?</h4>
          <p className="text-gray-300 mb-6 max-w-md">
            Claim this project to add it to your dashboard and start working on it. You'll have{' '}
            {daysRemaining} days to complete the challenge.
          </p>
          <button
            className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
            style={{ backgroundColor: colors.blue, color: colors.dark }}
            onClick={onClaimProject}
            disabled={isClaimingProject}
          >
            {isClaimingProject ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Claiming...
              </>
            ) : (
              <>
                <Trophy size={18} />
                Claim Project
              </>
            )}
          </button>

          {/* Show error if claim failed */}
          {claimError && (
            <p className="text-red-400 text-sm mt-3">
              Failed to claim project: {claimError.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
