import { cn } from '@/lib/utils';
import { spacing, colors } from '@/lib/design-system';

export default function ScenarioLoadingState() {
  return (
    <div className={cn(spacing.container, spacing.section, 'relative min-h-screen')} style={{ backgroundColor: colors.dark }}>
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div 
            className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4"
            style={{ borderColor: colors.blue }}
          ></div>
          <p style={{ color: colors.white }}>Loading scenario...</p>
        </div>
      </div>
    </div>
  );
}
