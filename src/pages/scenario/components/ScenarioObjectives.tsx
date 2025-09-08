import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { colors } from '@/lib/design-system';
import { Target, CheckCircle } from 'lucide-react';
import type { ScenarioData } from './types';

interface ScenarioObjectivesProps {
  scenario: ScenarioData;
}

export default function ScenarioObjectives({ scenario }: ScenarioObjectivesProps) {
  return (
    <Card 
      className="border-2"
      style={{ 
        backgroundColor: colors.blueDark, 
        borderColor: colors.blue 
      }}
    >
      <CardHeader>
        <CardTitle className="flex items-center" style={{ color: colors.white }}>
          <Target className="h-5 w-5 mr-2" />
          Learning Objectives
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {scenario.objectives.map((objective, index) => (
            <li key={index} className="flex items-start" style={{ color: colors.white, opacity: 0.8 }}>
              <CheckCircle 
                className="h-4 w-4 mt-1 mr-2 flex-shrink-0" 
                style={{ color: colors.yellow }} 
              />
              {objective}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
