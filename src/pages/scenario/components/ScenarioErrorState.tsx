import { cn } from '@/lib/utils';
import { spacing, colors } from '@/lib/design-system';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';

interface ScenarioErrorStateProps {
  error: string;
  onBack: () => void;
}

export default function ScenarioErrorState({ error, onBack }: ScenarioErrorStateProps) {
  return (
    <div className={cn(spacing.container, spacing.section, 'relative min-h-screen')} style={{ backgroundColor: colors.dark }}>
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="mb-4" style={{ color: colors.orange }}>
            <FileText className="h-12 w-12 mx-auto mb-2" />
          </div>
          <h2 className="text-xl mb-2" style={{ color: colors.white }}>Error Loading Scenario</h2>
          <p className="mb-4" style={{ color: colors.white, opacity: 0.7 }}>{error}</p>
          <Button onClick={onBack} variant="outline">
            Return to Create
          </Button>
        </div>
      </div>
    </div>
  );
}
