import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { colors } from '@/lib/design-system';
import { FileText } from 'lucide-react';
import type { ScenarioData } from './types';

interface ScenarioContentProps {
  scenario: ScenarioData;
}

export default function ScenarioContent({ scenario }: ScenarioContentProps) {
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
          <FileText className="h-5 w-5 mr-2" />
          Scenario Details
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="prose prose-invert max-w-none">
          <div 
            className="whitespace-pre-wrap leading-relaxed"
            style={{ color: colors.white, opacity: 0.8 }}
          >
            {scenario.scenario}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
