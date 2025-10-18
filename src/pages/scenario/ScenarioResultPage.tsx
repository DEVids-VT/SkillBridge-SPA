import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { spacing } from '@/lib/design-system';
import { cn } from '@/lib/utils';
import {
  ScenarioLoadingState,
  ScenarioErrorState,
  ScenarioBackground,
  ScenarioHeader,
  ScenarioOverview,
  ScenarioContent,
  ScenarioObjectives,
  ScenarioEvaluationCriteria,
  ScenarioInfo,
  ScenarioRequirements,
  ScenarioActions,
  type ScenarioData
} from './components';

export default function ScenarioResultPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [scenario, setScenario] = useState<ScenarioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Mock data for demonstration - replace with actual API call
  useEffect(() => {
    const fetchScenario = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock scenario data - replace with actual API
        const mockScenario: ScenarioData = {
          id: id || '1',
          title: 'Senior React Developer Technical Scenario',
          description: 'A comprehensive scenario testing React development skills including hooks, state management, and performance optimization.',
          roleTitle: 'Senior React Developer',
          seniorityLevel: 'Senior',
          estimatedDuration: '45-60 minutes',
          difficulty: 'Advanced',
          objectives: [
            'Evaluate React hooks proficiency',
            'Test state management skills',
            'Assess component architecture knowledge',
            'Review performance optimization techniques'
          ],
          scenario: `You are working on a high-traffic e-commerce application that has been experiencing performance issues. The current React application has several components that re-render unnecessarily, causing slow user interactions.

Your task is to:

1. **Component Optimization**: Review the provided ProductList component and identify performance bottlenecks. Implement React.memo, useMemo, and useCallback where appropriate.

2. **State Management**: Refactor the shopping cart functionality to use a more efficient state management pattern. Consider using useReducer for complex state updates.

3. **Code Splitting**: Implement lazy loading for the checkout flow to reduce initial bundle size.

4. **Custom Hooks**: Create a custom hook for handling API calls with loading states, error handling, and caching.

**Background Context:**
- The application serves 100K+ daily active users
- Page load times must be under 2 seconds
- The team follows TypeScript strict mode
- All components must be fully tested

**Available Resources:**
- React DevTools Profiler data
- Bundle analyzer reports
- Existing component library
- API documentation`,
          requirements: [
            'Strong proficiency in React hooks and lifecycle methods',
            'Experience with performance optimization techniques',
            'TypeScript knowledge for type safety',
            'Understanding of modern React patterns',
            'Familiarity with testing frameworks (Jest, React Testing Library)'
          ],
          evaluationCriteria: [
            'Code quality and organization',
            'Performance optimization implementation',
            'Proper use of React patterns and hooks',
            'TypeScript usage and type safety',
            'Problem-solving approach and reasoning',
            'Code documentation and comments'
          ],
          createdAt: new Date().toISOString(),
          status: 'published'
        };
        
        setScenario(mockScenario);
      } catch {
        setError('Failed to load scenario. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchScenario();
    } else {
      setError('No scenario ID provided');
      setLoading(false);
    }
  }, [id]);

  // Handler functions
  const handleBack = () => navigate('/create');
  const handleDownload = () => console.log('Download scenario as PDF');
  const handleShare = () => console.log('Share scenario');
  const handleCreateAnother = () => navigate('/create/persona');
  const handleBackToCreate = () => navigate('/create');

  if (loading) {
    return <ScenarioLoadingState />;
  }

  if (error || !scenario) {
    return <ScenarioErrorState error={error || 'Unknown error'} onBack={handleBack} />;
  }

  return (
    <div className={cn(spacing.container, 'py-8 relative min-h-screen bg-background')}>
      <ScenarioBackground />
      
      <ScenarioHeader 
        onBack={handleBack}
        onShare={handleShare}
        onDownload={handleDownload}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <ScenarioOverview scenario={scenario} />
          <ScenarioContent scenario={scenario} />
          <ScenarioObjectives scenario={scenario} />
          <ScenarioEvaluationCriteria scenario={scenario} />
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <ScenarioInfo scenario={scenario} />
          <ScenarioRequirements scenario={scenario} />
          <ScenarioActions 
            onCreateAnother={handleCreateAnother}
            onBackToCreate={handleBackToCreate}
          />
        </div>
      </div>
    </div>
  );
} 