import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { colors } from '@/lib/design-system';
import type { ScenarioData } from './types';

interface ScenarioOverviewProps {
  scenario: ScenarioData;
}

export default function ScenarioOverview({ scenario }: ScenarioOverviewProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-primary text-primary-foreground';
      case 'Intermediate': return 'bg-yellow-500 text-dark';
      case 'Advanced': return 'bg-accent text-accent-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Card 
      className="border-2 bg-card border-border"
    >
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-xl mb-2 text-card-foreground">{scenario.title}</CardTitle>
            <p className="text-card-foreground opacity-80">{scenario.description}</p>
          </div>
          <Badge 
            className={`border-0 ${getDifficultyColor(scenario.difficulty)}`}
          >
            {scenario.difficulty}
          </Badge>
        </div>
      </CardHeader>
    </Card>
  );
}
