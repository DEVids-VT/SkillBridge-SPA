import { cn } from '@/lib/utils';
import { spacing } from '@/lib/design-system';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';

interface ScenarioErrorStateProps {
  error: string;
  onBack: () => void;
}

export default function ScenarioErrorState({ error, onBack }: ScenarioErrorStateProps) {
  return (
    <div className={cn(spacing.container, spacing.section, 'relative min-h-screen bg-background')}>
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="mb-4 text-accent">
            <FileText className="h-12 w-12 mx-auto mb-2" />
          </div>
          <h2 className="text-xl mb-2 text-foreground">Error Loading Scenario</h2>
          <p className="mb-4 text-foreground opacity-70">{error}</p>
          <Button onClick={onBack} variant="outline" className="text-foreground border-border bg-transparent hover:opacity-80">
            Return to Create
          </Button>
        </div>
      </div>
    </div>
  );
}
