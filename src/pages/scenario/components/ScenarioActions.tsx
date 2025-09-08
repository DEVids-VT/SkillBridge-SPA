import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { colors } from '@/lib/design-system';

interface ScenarioActionsProps {
  onCreateAnother: () => void;
  onBackToCreate: () => void;
}

export default function ScenarioActions({ onCreateAnother, onBackToCreate }: ScenarioActionsProps) {
  return (
    <Card 
      className="border-2"
      style={{ 
        backgroundColor: colors.blueDark, 
        borderColor: colors.blue 
      }}
    >
      <CardHeader>
        <CardTitle style={{ color: colors.white }}>Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button 
          onClick={onCreateAnother}
          className="w-full"
          style={{
            backgroundColor: colors.blue,
            color: colors.white,
            border: 'none'
          }}
        >
          Create Another Scenario
        </Button>
        <Button 
          onClick={onBackToCreate}
          variant="outline"
          className="w-full hover:opacity-80"
          style={{ 
            color: colors.white, 
            borderColor: colors.blue, 
            backgroundColor: 'transparent' 
          }}
        >
          Back to Create
        </Button>
      </CardContent>
    </Card>
  );
}
