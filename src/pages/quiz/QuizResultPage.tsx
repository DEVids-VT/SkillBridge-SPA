import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { spacing, colors, layouts } from '@/lib/design-system';
import { cn } from '@/lib/utils';
import { 
  Brain, 
  Clock, 
  User, 
  Target, 
  CheckCircle,
  ArrowLeft,
  Download,
  Share2,
  HelpCircle,
  Trophy,
  Play
} from 'lucide-react';

interface QuizQuestion {
  id: string;
  type: 'multiple-choice' | 'code-review' | 'scenario-based' | 'true-false';
  question: string;
  options?: string[];
  correctAnswer: string | number;
  explanation: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  points: number;
}

interface QuizData {
  id: string;
  title: string;
  description: string;
  roleTitle: string;
  seniorityLevel: string;
  estimatedDuration: string;
  totalQuestions: number;
  totalPoints: number;
  passingScore: number;
  questions: QuizQuestion[];
  tags: string[];
  createdAt: string;
  status: 'draft' | 'published' | 'archived';
}

export default function QuizResultPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [quiz, setQuiz] = useState<QuizData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedQuestion, setSelectedQuestion] = useState<number>(0);

  // Mock data for demonstration - replace with actual API call
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock quiz data - replace with actual API
        const mockQuiz: QuizData = {
          id: id || '1',
          title: 'Senior React Developer Assessment',
          description: 'Comprehensive quiz covering React hooks, state management, performance optimization, and modern React patterns.',
          roleTitle: 'Senior React Developer',
          seniorityLevel: 'Senior',
          estimatedDuration: '30-40 minutes',
          totalQuestions: 15,
          totalPoints: 150,
          passingScore: 120,
          tags: ['React', 'TypeScript', 'Hooks', 'Performance', 'Testing'],
          questions: [
            {
              id: 'q1',
              type: 'multiple-choice',
              question: 'Which hook should you use to optimize expensive calculations in React?',
              options: ['useState', 'useEffect', 'useMemo', 'useCallback'],
              correctAnswer: 2,
              explanation: 'useMemo is used to memoize expensive calculations and prevent unnecessary recalculations on every render.',
              difficulty: 'Medium',
              points: 10
            },
            {
              id: 'q2',
              type: 'code-review',
              question: 'What is wrong with this React component code?\n\n```jsx\nfunction UserList({ users }) {\n  const [filteredUsers, setFilteredUsers] = useState([]);\n  \n  useEffect(() => {\n    setFilteredUsers(users.filter(user => user.active));\n  });\n  \n  return (\n    <ul>\n      {filteredUsers.map(user => <li key={user.id}>{user.name}</li>)}\n    </ul>\n  );\n}\n```',
              correctAnswer: 'Missing dependency array in useEffect',
              explanation: 'The useEffect hook is missing a dependency array, causing it to run on every render and potentially creating an infinite loop.',
              difficulty: 'Hard',
              points: 15
            },
            {
              id: 'q3',
              type: 'scenario-based',
              question: 'You have a React app with performance issues. Users report that typing in a search input is laggy. The search input is in a parent component that renders a large list of items. What optimization strategies would you implement?',
              correctAnswer: 'Use React.memo for list items, debounce search input, implement virtualization for large lists',
              explanation: 'Multiple strategies can help: React.memo prevents unnecessary re-renders, debouncing reduces API calls, and virtualization handles large datasets efficiently.',
              difficulty: 'Hard',
              points: 20
            },
            {
              id: 'q4',
              type: 'true-false',
              question: 'useCallback should be used for every function in React components to optimize performance.',
              correctAnswer: 'false',
              explanation: 'useCallback should only be used when you need to prevent unnecessary re-renders of child components that depend on the function reference. Overusing it can actually hurt performance.',
              difficulty: 'Medium',
              points: 10
            },
            {
              id: 'q5',
              type: 'multiple-choice',
              question: 'What is the best way to handle forms in React?',
              options: ['Controlled components', 'Uncontrolled components', 'React Hook Form', 'It depends on the use case'],
              correctAnswer: 3,
              explanation: 'The best approach depends on the specific use case. Simple forms can use controlled components, complex forms benefit from libraries like React Hook Form.',
              difficulty: 'Medium',
              points: 10
            }
          ],
          createdAt: new Date().toISOString(),
          status: 'published'
        };
        
        setQuiz(mockQuiz);
      } catch {
        setError('Failed to load quiz. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchQuiz();
    } else {
      setError('No quiz ID provided');
      setLoading(false);
    }
  }, [id]);

  const handleBack = () => {
    navigate('/create');
  };

  const handleDownload = () => {
    // Implement download functionality
    console.log('Download quiz as PDF');
  };

  const handleShare = () => {
    // Implement share functionality
    console.log('Share quiz');
  };

  const handleStartQuiz = () => {
    // Implement quiz taking functionality
    console.log('Start taking quiz');
  };

  if (loading) {
    return (
      <div className={cn(spacing.container, spacing.section, 'relative min-h-screen')} style={{ backgroundColor: colors.dark }}>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-white">Loading quiz...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !quiz) {
    return (
      <div className={cn(spacing.container, spacing.section, 'relative min-h-screen')} style={{ backgroundColor: colors.dark }}>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="text-red-500 mb-4">
              <Brain className="h-12 w-12 mx-auto mb-2" />
            </div>
            <h2 className="text-white text-xl mb-2">Error Loading Quiz</h2>
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
      case 'Easy': return 'bg-green-500';
      case 'Medium': return 'bg-yellow-500';
      case 'Hard': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getQuestionTypeIcon = (type: string) => {
    switch (type) {
      case 'multiple-choice': return <HelpCircle className="h-4 w-4" />;
      case 'code-review': return <Brain className="h-4 w-4" />;
      case 'scenario-based': return <Target className="h-4 w-4" />;
      case 'true-false': return <CheckCircle className="h-4 w-4" />;
      default: return <HelpCircle className="h-4 w-4" />;
    }
  };

  const currentQuestion = quiz.questions[selectedQuestion];

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
            <h1 className="text-3xl font-bold text-white mb-2">Quiz Generated</h1>
            <p className="text-gray-300">Ready for assessment and evaluation</p>
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
          {/* Quiz Overview */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-white text-xl mb-2">{quiz.title}</CardTitle>
                  <p className="text-gray-300 mb-3">{quiz.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {quiz.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-gray-300 border-gray-600">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Button onClick={handleStartQuiz} className="bg-blue-600 hover:bg-blue-700">
                  <Play className="h-4 w-4 mr-2" />
                  Take Quiz
                </Button>
              </div>
            </CardHeader>
          </Card>

          {/* Question Preview */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white flex items-center">
                  {getQuestionTypeIcon(currentQuestion.type)}
                  <span className="ml-2">Question {selectedQuestion + 1} of {quiz.totalQuestions}</span>
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <Badge className={cn('text-white', getDifficultyColor(currentQuestion.difficulty))}>
                    {currentQuestion.difficulty}
                  </Badge>
                  <Badge variant="outline" className="text-gray-300 border-gray-600">
                    {currentQuestion.points} pts
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-gray-300">
                  <p className="text-sm uppercase tracking-wide text-gray-400 mb-2">
                    {currentQuestion.type.replace('-', ' ')}
                  </p>
                  <div className="whitespace-pre-wrap text-base leading-relaxed">
                    {currentQuestion.question}
                  </div>
                </div>

                {currentQuestion.options && (
                  <div className="space-y-2">
                    <p className="text-sm text-gray-400">Options:</p>
                    <ul className="space-y-2">
                      {currentQuestion.options.map((option, index) => (
                        <li key={index} className="flex items-center text-gray-300">
                          <span className="w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center text-xs mr-3">
                            {String.fromCharCode(65 + index)}
                          </span>
                          {option}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="border-t border-gray-700 pt-4">
                  <p className="text-sm text-gray-400 mb-2">Explanation:</p>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {currentQuestion.explanation}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Question Navigation */}
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <p className="text-white font-medium">Question Navigation</p>
                <p className="text-gray-400 text-sm">{quiz.totalQuestions} questions total</p>
              </div>
              <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
                {quiz.questions.map((_, index) => (
                  <Button
                    key={index}
                    variant={selectedQuestion === index ? "default" : "outline"}
                    size="sm"
                    className={cn(
                      'w-full',
                      selectedQuestion === index 
                        ? 'bg-blue-600 hover:bg-blue-700' 
                        : 'text-white border-gray-600 hover:bg-gray-700'
                    )}
                    onClick={() => setSelectedQuestion(index)}
                  >
                    {index + 1}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quiz Info */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Quiz Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center text-gray-300">
                <User className="h-4 w-4 mr-2" />
                <span className="text-sm">{quiz.roleTitle}</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Badge variant="outline" className="text-gray-300 border-gray-600">
                  {quiz.seniorityLevel}
                </Badge>
              </div>
              <div className="flex items-center text-gray-300">
                <Clock className="h-4 w-4 mr-2" />
                <span className="text-sm">{quiz.estimatedDuration}</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Trophy className="h-4 w-4 mr-2" />
                <span className="text-sm">Passing: {quiz.passingScore}/{quiz.totalPoints} points</span>
              </div>
              <div className="pt-2 border-t border-gray-700">
                <p className="text-xs text-gray-400">
                  Created: {new Date(quiz.createdAt).toLocaleDateString()}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Quiz Stats */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Quiz Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">Total Questions:</span>
                <span className="text-white">{quiz.totalQuestions}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">Total Points:</span>
                <span className="text-white">{quiz.totalPoints}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">Easy Questions:</span>
                <span className="text-white">{quiz.questions.filter(q => q.difficulty === 'Easy').length}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">Medium Questions:</span>
                <span className="text-white">{quiz.questions.filter(q => q.difficulty === 'Medium').length}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">Hard Questions:</span>
                <span className="text-white">{quiz.questions.filter(q => q.difficulty === 'Hard').length}</span>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                onClick={handleStartQuiz}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                <Play className="h-4 w-4 mr-2" />
                Take Quiz
              </Button>
              <Button 
                onClick={() => navigate('/create/persona')}
                variant="outline"
                className="w-full text-white border-gray-600 hover:bg-gray-700"
              >
                Create Another Quiz
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