import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { ScenarioData } from './types';

interface ScenarioRequirementsProps {
  scenario: ScenarioData;
}

export default function ScenarioRequirements({ scenario }: ScenarioRequirementsProps) {
  return (
    <Card className="border-2 bg-card border-border">
      <CardHeader>
        <CardTitle className="text-card-foreground">Requirements</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {scenario.requirements.map((requirement, index) => (
            <li 
              key={index} 
              className="text-sm text-card-foreground opacity-80"
            >
              • {requirement}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
