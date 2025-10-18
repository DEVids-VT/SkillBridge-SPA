import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, CheckCircle } from 'lucide-react';
import type { ScenarioData } from './types';

interface ScenarioObjectivesProps {
  scenario: ScenarioData;
}

export default function ScenarioObjectives({ scenario }: ScenarioObjectivesProps) {
  return (
    <Card className="border-2 bg-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center text-card-foreground">
          <Target className="h-5 w-5 mr-2" />
          Learning Objectives
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {scenario.objectives.map((objective, index) => (
            <li key={index} className="flex items-start text-card-foreground opacity-80">
              <CheckCircle 
                className="h-4 w-4 mt-1 mr-2 flex-shrink-0 text-accent" 
              />
              {objective}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
