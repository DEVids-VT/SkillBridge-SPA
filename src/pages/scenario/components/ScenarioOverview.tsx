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
      case 'Beginner': return { backgroundColor: colors.blue };
      case 'Intermediate': return { backgroundColor: colors.yellow, color: colors.dark };
      case 'Advanced': return { backgroundColor: colors.orange, color: colors.dark };
      default: return { backgroundColor: colors.blueDark };
    }
  };

  return (
    <Card 
      className="border-2"
      style={{ 
        backgroundColor: colors.blueDark, 
        borderColor: colors.blue 
      }}
    >
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-xl mb-2" style={{ color: colors.white }}>{scenario.title}</CardTitle>
            <p style={{ color: colors.white, opacity: 0.8 }}>{scenario.description}</p>
          </div>
          <Badge 
            className="border-0"
            style={{
              ...getDifficultyColor(scenario.difficulty),
              color: getDifficultyColor(scenario.difficulty).color || colors.white
            }}
          >
            {scenario.difficulty}
          </Badge>
        </div>
      </CardHeader>
    </Card>
  );
}
