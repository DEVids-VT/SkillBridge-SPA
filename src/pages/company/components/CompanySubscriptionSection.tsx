import { colors, typography } from "@/lib/design-system";

interface CompanySubscriptionSectionProps {
  subscription: {
    current: string;
    description: string;
    upcoming: string;
    upcomingDescription: string;
  };
}

export default function CompanySubscriptionSection({ subscription }: CompanySubscriptionSectionProps) {
  return (
    <div className={`space-y-6 border-b pb-8 border-[${colors.blue}]`}>
      <h2 className={typography.heading[4]}>Subscription</h2>

      <div>
        <p className={typography.body.lg}>{subscription.current}</p>
        <p className={typography.body.sm}>{subscription.description}</p>
      </div>
    </div>
  );
}
