import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { spacing, colors, layouts } from '@/lib/design-system';
import { cn } from '@/lib/utils';
import { 
  FileText, 
  Clock, 
  User, 
  Target, 
  CheckCircle,
  ArrowLeft,
  Download,
  Share2
} from 'lucide-react';

interface ScenarioData {
  id: string;
  title: string;
  description: string;
  roleTitle: string;
  seniorityLevel: string;
  estimatedDuration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  objectives: string[];
  scenario: string;
  requirements: string[];
  evaluationCriteria: string[];
  createdAt: string;
  status: 'draft' | 'published' | 'archived';
}

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

  const handleBack = () => {
    navigate('/create');
  };

  const handleDownload = () => {
    // Implement download functionality
    console.log('Download scenario as PDF');
  };

  const handleShare = () => {
    // Implement share functionality
    console.log('Share scenario');
  };

  if (loading) {
    return (
      <div className={cn(spacing.container, spacing.section, 'relative min-h-screen')} style={{ backgroundColor: colors.dark }}>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-white">Loading scenario...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !scenario) {
    return (
      <div className={cn(spacing.container, spacing.section, 'relative min-h-screen')} style={{ backgroundColor: colors.dark }}>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="text-red-500 mb-4">
              <FileText className="h-12 w-12 mx-auto mb-2" />
            </div>
            <h2 className="text-white text-xl mb-2">Error Loading Scenario</h2>
            <p className="text-gray-400 mb-4">{error}</p>
            <Button onClick={handleBack} variant="outline">
              Return to Create
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-500';
      case 'Intermediate': return 'bg-yellow-500';
      case 'Advanced': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className={cn(spacing.container, spacing.section, 'relative min-h-screen')} style={{ backgroundColor: colors.dark }}>
      {/* Background pattern */}
      <div 
        className="absolute top-8 right-0 w-64 h-64 rounded-full opacity-20 blur-3xl -z-10"
        style={{ backgroundColor: colors.blue }}
      ></div>
      <div 
        className="absolute bottom-12 left-8 w-48 h-48 rounded-full opacity-20 blur-3xl -z-10"
        style={{ backgroundColor: colors.blueDark }}
      ></div>

      {/* Header */}
      <div className={layouts.pageHeader}>
        <div className={layouts.pageHeaderBackground}></div>
        <div className="flex items-center justify-between">
          <Button
            onClick={handleBack}
            variant="outline"
            className="text-white border-gray-600 hover:bg-gray-700"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Create
          </Button>
          
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white mb-2">Scenario Generated</h1>
            <p className="text-gray-300">Ready for implementation and testing</p>
          </div>

          <div className="flex space-x-2">
            <Button
              onClick={handleShare}
              variant="outline"
              className="text-white border-gray-600 hover:bg-gray-700"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button
              onClick={handleDownload}
              variant="outline"
              className="text-white border-gray-600 hover:bg-gray-700"
            >
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Scenario Overview */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-white text-xl mb-2">{scenario.title}</CardTitle>
                  <p className="text-gray-300">{scenario.description}</p>
                </div>
                <Badge className={cn('text-white', getDifficultyColor(scenario.difficulty))}>
                  {scenario.difficulty}
                </Badge>
              </div>
            </CardHeader>
          </Card>

          {/* Scenario Content */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Scenario Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-invert max-w-none">
                <div className="whitespace-pre-wrap text-gray-300 leading-relaxed">
                  {scenario.scenario}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Objectives */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Target className="h-5 w-5 mr-2" />
                Learning Objectives
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {scenario.objectives.map((objective, index) => (
                  <li key={index} className="flex items-start text-gray-300">
                    <CheckCircle className="h-4 w-4 mt-1 mr-2 text-green-500 flex-shrink-0" />
                    {objective}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Evaluation Criteria */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Evaluation Criteria</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {scenario.evaluationCriteria.map((criteria, index) => (
                  <li key={index} className="flex items-start text-gray-300">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    {criteria}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Scenario Info */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Scenario Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center text-gray-300">
                <User className="h-4 w-4 mr-2" />
                <span className="text-sm">{scenario.roleTitle}</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Badge variant="outline" className="text-gray-300 border-gray-600">
                  {scenario.seniorityLevel}
                </Badge>
              </div>
              <div className="flex items-center text-gray-300">
                <Clock className="h-4 w-4 mr-2" />
                <span className="text-sm">{scenario.estimatedDuration}</span>
              </div>
              <div className="pt-2 border-t border-gray-700">
                <p className="text-xs text-gray-400">
                  Created: {new Date(scenario.createdAt).toLocaleDateString()}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Requirements */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Requirements</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {scenario.requirements.map((requirement, index) => (
                  <li key={index} className="text-sm text-gray-300">
                    • {requirement}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                onClick={() => navigate('/create/persona')}
                className="w-full"
              >
                Create Another Scenario
              </Button>
              <Button 
                onClick={() => navigate('/create')}
                variant="outline"
                className="w-full text-white border-gray-600 hover:bg-gray-700"
              >
                Back to Create
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 