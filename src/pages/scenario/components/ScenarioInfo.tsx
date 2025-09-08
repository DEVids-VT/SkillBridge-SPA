import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { colors } from '@/lib/design-system';
import { User, Clock } from 'lucide-react';
import type { ScenarioData } from './types';

interface ScenarioInfoProps {
  scenario: ScenarioData;
}

export default function ScenarioInfo({ scenario }: ScenarioInfoProps) {
  return (
    <Card 
      className="border-2"
      style={{ 
        backgroundColor: colors.blueDark, 
        borderColor: colors.blue 
      }}
    >
      <CardHeader>
        <CardTitle style={{ color: colors.white }}>Scenario Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center" style={{ color: colors.white, opacity: 0.8 }}>
          <User className="h-4 w-4 mr-2" />
          <span className="text-sm">{scenario.roleTitle}</span>
        </div>
        <div className="flex items-center">
          <Badge 
            variant="outline" 
            style={{ 
              color: colors.white, 
              borderColor: colors.blue,
              backgroundColor: 'transparent',
              opacity: 0.8
            }}
          >
            {scenario.seniorityLevel}
          </Badge>
        </div>
        <div className="flex items-center" style={{ color: colors.white, opacity: 0.8 }}>
          <Clock className="h-4 w-4 mr-2" />
          <span className="text-sm">{scenario.estimatedDuration}</span>
        </div>
        <div 
          className="pt-2 border-t"
          style={{ borderColor: colors.blue }}
        >
          <p 
            className="text-xs"
            style={{ color: colors.white, opacity: 0.6 }}
          >
            Created: {new Date(scenario.createdAt).toLocaleDateString()}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
