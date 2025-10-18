import { cn } from '@/lib/utils';
import { spacing } from '@/lib/design-system';

export default function ScenarioLoadingState() {
  return (
    <div className={cn(spacing.container, spacing.section, 'relative min-h-screen bg-background')}>
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4 border-primary"></div>
          <p className="text-foreground">Loading scenario...</p>
        </div>
      </div>
    </div>
  );
}
