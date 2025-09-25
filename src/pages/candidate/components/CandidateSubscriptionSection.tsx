import { colors, typography } from "@/lib/design-system";

interface CandidateSubscriptionSectionProps {
  subscription: {
    current: string;
    description: string;
    upcoming: string;
    upcomingDescription: string;
  };
}

export default function CandidateSubscriptionSection({ subscription }: CandidateSubscriptionSectionProps) {
  return (
    <div className="space-y-6 border-b pb-8 border-border">
      <h2 className={typography.heading[4]}>Subscription</h2>

      <div>
        <p className={typography.body.lg}>{subscription.current}</p>
        <p className={typography.body.sm}>{subscription.description}</p>
      </div>

      <div>
        <p className={typography.body.lg}>{subscription.upcoming}</p>
        <p className={typography.body.sm}>{subscription.upcomingDescription}</p>
      </div>
    </div>
  );
}
