import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { colors } from '@/lib/design-system';
import type { ScenarioData } from './types';

interface ScenarioRequirementsProps {
  scenario: ScenarioData;
}

export default function ScenarioRequirements({ scenario }: ScenarioRequirementsProps) {
  return (
    <Card 
      className="border-2"
      style={{ 
        backgroundColor: colors.blueDark, 
        borderColor: colors.blue 
      }}
    >
      <CardHeader>
        <CardTitle style={{ color: colors.white }}>Requirements</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {scenario.requirements.map((requirement, index) => (
            <li 
              key={index} 
              className="text-sm"
              style={{ color: colors.white, opacity: 0.8 }}
            >
              • {requirement}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
