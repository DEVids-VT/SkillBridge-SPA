import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User, Clock } from 'lucide-react';
import type { ScenarioData } from './types';

interface ScenarioInfoProps {
  scenario: ScenarioData;
}

export default function ScenarioInfo({ scenario }: ScenarioInfoProps) {
  return (
    <Card className="border-2 bg-card border-border">
      <CardHeader>
        <CardTitle className="text-card-foreground">Scenario Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center text-card-foreground opacity-80">
          <User className="h-4 w-4 mr-2" />
          <span className="text-sm">{scenario.roleTitle}</span>
        </div>
        <div className="flex items-center">
          <Badge 
            variant="outline" 
            className="text-card-foreground border-border bg-transparent opacity-80"
          >
            {scenario.seniorityLevel}
          </Badge>
        </div>
        <div className="flex items-center text-card-foreground opacity-80">
          <Clock className="h-4 w-4 mr-2" />
          <span className="text-sm">{scenario.estimatedDuration}</span>
        </div>
        <div className="pt-2 border-t border-border">
          <p className="text-xs text-card-foreground opacity-60">
            Created: {new Date(scenario.createdAt).toLocaleDateString()}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
