import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ScenarioActionsProps {
  onCreateAnother: () => void;
  onBackToCreate: () => void;
}

export default function ScenarioActions({ onCreateAnother, onBackToCreate }: ScenarioActionsProps) {
  return (
    <Card className="border-2 bg-card border-border">
      <CardHeader>
        <CardTitle className="text-card-foreground">Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button 
          onClick={onCreateAnother}
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
        >
          Create Another Scenario
        </Button>
        <Button 
          onClick={onBackToCreate}
          variant="outline"
          className="w-full text-foreground border-border bg-transparent hover:opacity-80"
        >
          Back to Create
        </Button>
      </CardContent>
    </Card>
  );
}
