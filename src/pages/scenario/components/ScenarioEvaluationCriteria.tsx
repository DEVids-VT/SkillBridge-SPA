import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { ScenarioData } from './types';

interface ScenarioEvaluationCriteriaProps {
  scenario: ScenarioData;
}

export default function ScenarioEvaluationCriteria({ scenario }: ScenarioEvaluationCriteriaProps) {
  return (
    <Card className="border-2 bg-card border-border">
      <CardHeader>
        <CardTitle className="text-card-foreground">Evaluation Criteria</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {scenario.evaluationCriteria.map((criteria, index) => (
            <li key={index} className="flex items-start text-card-foreground opacity-80">
              <div className="w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0 bg-primary"></div>
              {criteria}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
