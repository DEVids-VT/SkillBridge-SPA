import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';
import type { ScenarioData } from './types';

interface ScenarioContentProps {
  scenario: ScenarioData;
}

export default function ScenarioContent({ scenario }: ScenarioContentProps) {
  return (
    <Card className="border-2 bg-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center text-card-foreground">
          <FileText className="h-5 w-5 mr-2" />
          Scenario Details
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="prose prose-invert max-w-none">
          <div className="whitespace-pre-wrap leading-relaxed text-card-foreground opacity-80">
            {scenario.scenario}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
