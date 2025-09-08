import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { colors } from '@/lib/design-system';
import type { ScenarioData } from './types';

interface ScenarioEvaluationCriteriaProps {
  scenario: ScenarioData;
}

export default function ScenarioEvaluationCriteria({ scenario }: ScenarioEvaluationCriteriaProps) {
  return (
    <Card 
      className="border-2"
      style={{ 
        backgroundColor: colors.blueDark, 
        borderColor: colors.blue 
      }}
    >
      <CardHeader>
        <CardTitle style={{ color: colors.white }}>Evaluation Criteria</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {scenario.evaluationCriteria.map((criteria, index) => (
            <li key={index} className="flex items-start" style={{ color: colors.white, opacity: 0.8 }}>
              <div 
                className="w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"
                style={{ backgroundColor: colors.blue }}
              ></div>
              {criteria}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
