import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { spacing, colors, layouts, typography, components } from '@/lib/design-system';
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
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{ borderBottomColor: colors.blue }}></div>
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
            <div className="mb-4" style={{ color: colors.orange }}>
              <Brain className="h-12 w-12 mx-auto mb-2" />
            </div>
            <h2 className="text-white text-xl mb-2">Error Loading Quiz</h2>
            <p className={cn('mb-4', typography.body.default)}>{error}</p>
            <Button onClick={handleBack} variant="outline" style={{ borderColor: colors.blue, color: colors.white }}>
              Return to Create
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return { backgroundColor: colors.orange };
      case 'Medium': return { backgroundColor: colors.yellow };
      case 'Hard': return { backgroundColor: colors.blue };
      default: return { backgroundColor: colors.blue };
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
            style={{ borderColor: colors.blue, color: colors.white }}
            className="hover:opacity-80"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Create
          </Button>
          
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white mb-2">Quiz Generated</h1>
            <p className={typography.body.default}>Ready for assessment and evaluation</p>
          </div>

          <div className="flex space-x-2">
            <Button
              onClick={handleShare}
              variant="outline"
              style={{ borderColor: colors.blue, color: colors.white }}
              className="hover:opacity-80"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button
              onClick={handleDownload}
              variant="outline"
              style={{ borderColor: colors.blue, color: colors.white }}
              className="hover:opacity-80"
            >
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quiz Overview */}
        <div className="lg:col-span-2 space-y-6">
          <Card style={{ backgroundColor: colors.blueDark, borderColor: colors.blue }}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-white text-2xl mb-2">{quiz.title}</CardTitle>
                  <p className={typography.body.default}>{quiz.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={cn(components.tag, components.tagColors.orange)}>
                    <Trophy className="h-3 w-3 mr-1" />
                    {quiz.status.charAt(0).toUpperCase() + quiz.status.slice(1)}
                  </Badge>
                  <Button
                    onClick={handleStartQuiz}
                    style={{ backgroundColor: colors.orange, color: colors.dark }}
                    className="ml-4"
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Start Quiz
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-3 rounded-lg" style={{ backgroundColor: colors.blue }}>
                  <div className="text-2xl font-bold text-white">{quiz.totalQuestions}</div>
                  <div className="text-sm" style={{ color: colors.yellow }}>Questions</div>
                </div>
                <div className="text-center p-3 rounded-lg" style={{ backgroundColor: colors.blue }}>
                  <div className="text-2xl font-bold text-white">{quiz.totalPoints}</div>
                  <div className="text-sm" style={{ color: colors.yellow }}>Total Points</div>
                </div>
                <div className="text-center p-3 rounded-lg" style={{ backgroundColor: colors.blue }}>
                  <div className="text-2xl font-bold text-white">{quiz.estimatedDuration}</div>
                  <div className="text-sm" style={{ color: colors.yellow }}>Duration</div>
                </div>
                <div className="text-center p-3 rounded-lg" style={{ backgroundColor: colors.blue }}>
                  <div className="text-2xl font-bold text-white">{quiz.passingScore}</div>
                  <div className="text-sm" style={{ color: colors.yellow }}>Passing Score</div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {quiz.tags.map((tag, index) => (
                  <Badge key={index} className={cn(components.tag, components.tagColors.yellow)}>
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Question Preview */}
          {currentQuestion && (
            <Card style={{ backgroundColor: colors.blueDark, borderColor: colors.blue }}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg" style={{ backgroundColor: colors.blue }}>
                      <div style={{ color: colors.yellow }}>
                        {getQuestionTypeIcon(currentQuestion.type)}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        Question {selectedQuestion + 1} of {quiz.questions.length}
                      </h3>
                      <div className="flex items-center gap-2">
                        <Badge style={getDifficultyColor(currentQuestion.difficulty)} className="text-xs">
                          {currentQuestion.difficulty}
                        </Badge>
                        <span className="text-sm" style={{ color: colors.yellow }}>
                          {currentQuestion.points} points
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <p className={cn('font-medium mb-4', typography.body.default)}>{currentQuestion.question}</p>
                  
                  {currentQuestion.options && (
                    <div className="space-y-2 mb-4">
                      {currentQuestion.options.map((option, index) => (
                        <div
                          key={index}
                          className="p-3 rounded-lg border transition-colors"
                          style={{ 
                            backgroundColor: index === currentQuestion.correctAnswer ? colors.orange : colors.blue,
                            borderColor: colors.blue,
                            color: index === currentQuestion.correctAnswer ? colors.dark : colors.white
                          }}
                        >
                          <span className="font-medium">{String.fromCharCode(65 + index)}.</span> {option}
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <div className="p-4 rounded-lg" style={{ backgroundColor: colors.blue, borderColor: colors.blue }}>
                    <h4 className="font-semibold mb-2" style={{ color: colors.yellow }}>Explanation:</h4>
                    <p className={typography.body.default}>{currentQuestion.explanation}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Question Navigation */}
        <div className="space-y-6">
          <Card style={{ backgroundColor: colors.blueDark, borderColor: colors.blue }}>
            <CardHeader>
              <CardTitle className="text-white">Questions Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-5 gap-2">
                {quiz.questions.map((question, index) => (
                  <button
                    key={question.id}
                    onClick={() => setSelectedQuestion(index)}
                    className={cn(
                      'w-10 h-10 rounded-lg border-2 flex items-center justify-center text-sm font-medium transition-colors',
                      selectedQuestion === index
                        ? 'border-orange-400 bg-orange-400 text-gray-900'
                        : 'border-gray-600 text-gray-300 hover:border-gray-500'
                    )}
                    style={{
                      borderColor: selectedQuestion === index ? colors.orange : colors.blue,
                      backgroundColor: selectedQuestion === index ? colors.orange : 'transparent',
                      color: selectedQuestion === index ? colors.dark : colors.white
                    }}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card style={{ backgroundColor: colors.blueDark, borderColor: colors.blue }}>
            <CardHeader>
              <CardTitle className="text-white">Quiz Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <User className="h-4 w-4" style={{ color: colors.yellow }} />
                <div>
                  <div className="text-sm" style={{ color: colors.yellow }}>Role</div>
                  <div className="font-medium text-white">{quiz.roleTitle}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Target className="h-4 w-4" style={{ color: colors.yellow }} />
                <div>
                  <div className="text-sm" style={{ color: colors.yellow }}>Level</div>
                  <div className="font-medium text-white">{quiz.seniorityLevel}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-4 w-4" style={{ color: colors.yellow }} />
                <div>
                  <div className="text-sm" style={{ color: colors.yellow }}>Created</div>
                  <div className="font-medium text-white">
                    {new Date(quiz.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 