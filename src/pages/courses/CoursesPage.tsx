import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { spacing } from '@/lib/design-system';
import { CoursesHeader } from './components/CoursesHeader';
import { aiDevelopmentCourse } from './coursesData';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Book, 
  Clock, 
  Users, 
  Star, 
  PlayCircle, 
  Download, 
  MessageSquare,
  Check,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useState } from 'react';

// Define static data to prevent typescript errors with i18n
interface CourseModule {
  title: string;
  length: string;
  lessons: number;
}

const SingleCoursePage = () => {
  const { t } = useTranslation();
  const [expandedModule, setExpandedModule] = useState<number | null>(0);
  
  // Format number of students
  const formatStudentCount = (count: number) => {
    return count > 1000 
      ? `${(count / 1000).toFixed(1)}k ${t('courses.students')}`
      : `${count} ${t('courses.students')}`;
  };

  // Toggle module expansion
  const toggleModule = (index: number) => {
    setExpandedModule(expandedModule === index ? null : index);
  };

  // Use static data with translations
  const learningPoints = [
    t('aiCourse.learningPoints.0', 'How to effectively use AI coding assistants like GitHub Copilot, ChatGPT, and Claude'),
    t('aiCourse.learningPoints.1', 'Understanding MPC (Multi-Party Computation) servers and their applications'),
    t('aiCourse.learningPoints.2', 'No-code and low-code platform development for rapid prototyping'),
    t('aiCourse.learningPoints.3', 'Mastering modern IDEs and productivity tools'),
    t('aiCourse.learningPoints.4', 'Best practices for prompt engineering when working with code-focused LLMs'),
    t('aiCourse.learningPoints.5', 'Building a complete project using AI-assisted development techniques')
  ];

  const courseModules: CourseModule[] = [
    {
      title: t('aiCourse.modules.0.title', 'Introduction to AI-Assisted Development'),
      length: t('aiCourse.modules.0.length', '1.5 hours'),
      lessons: 5
    },
    {
      title: t('aiCourse.modules.1.title', 'Mastering GitHub Copilot & LLMs for Coding'),
      length: t('aiCourse.modules.1.length', '2.5 hours'),
      lessons: 8
    },
    {
      title: t('aiCourse.modules.2.title', 'Understanding MPC Servers'),
      length: t('aiCourse.modules.2.length', '2 hours'),
      lessons: 6
    },
    {
      title: t('aiCourse.modules.3.title', 'No-Code & Low-Code Development'),
      length: t('aiCourse.modules.3.length', '3 hours'),
      lessons: 10
    },
    {
      title: t('aiCourse.modules.4.title', 'Modern IDEs & Productivity Tools'),
      length: t('aiCourse.modules.4.length', '2 hours'),
      lessons: 7
    },
    {
      title: t('aiCourse.modules.5.title', 'Capstone Project: Building with AI Assistance'),
      length: t('aiCourse.modules.5.length', '1 hour'),
      lessons: 3
    }
  ];

  const requirementsList = [
    t('aiCourse.requirementsList.0', 'Basic programming knowledge in any language'),
    t('aiCourse.requirementsList.1', 'No previous AI experience required'),
    t('aiCourse.requirementsList.2', 'Computer capable of running modern IDEs'),
    t('aiCourse.requirementsList.3', 'Open mind and willingness to learn new ways of developing software')
  ];

  return (
    <div className={cn(spacing.container, spacing.headerOffset, 'py-8')}>
      {/* Header section */}
      <CoursesHeader />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Course Title & Badges */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-3">{t('aiCourse.title')}</h1>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                {aiDevelopmentCourse.category}
              </Badge>
              <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                {aiDevelopmentCourse.level}
              </Badge>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                {t('courses.free')}
              </Badge>
            </div>
          </div>

          {/* Course Info Bar */}
          <div className="flex flex-wrap justify-between items-center mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold">{aiDevelopmentCourse.rating.toFixed(1)}</span>
              </div>
              <span className="text-gray-500">|</span>
              <div className="flex items-center gap-1 text-gray-700">
                <Users className="h-5 w-5" />
                <span>{formatStudentCount(aiDevelopmentCourse.studentsCount)}</span>
              </div>
              <span className="text-gray-500">|</span>
              <div className="flex items-center gap-1 text-gray-700">
                <Clock className="h-5 w-5" />
                <span>{aiDevelopmentCourse.duration}</span>
              </div>
            </div>
            <div className="flex items-center text-blue-600 font-medium">
              <span>{t('aiCourse.enrolled')}</span>
              <Check className="ml-2 h-5 w-5" />
            </div>
          </div>

          {/* Course Overview */}
          <div className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">{t('aiCourse.overview')}</h2>
            <p className="text-gray-700 mb-6">{t('aiCourse.longDescription')}</p>
            <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center mb-4">
              <div className="text-center text-gray-500">
                <PlayCircle className="h-16 w-16 mx-auto mb-2 text-blue-600" />
                <span>Course Preview Video</span>
              </div>
            </div>
          </div>

          {/* Instructor */}
          <div className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">{t('aiCourse.instructor')}</h2>
            <div className="flex items-start gap-4">
              <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                <img 
                  src="/images/instructors/alex-mitchell.jpg" 
                  alt={t('aiCourse.instructorName')} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "https://placehold.co/200x200/e2e8f0/64748b?text=AM";
                  }}
                />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-1">{t('aiCourse.instructorName')}</h3>
                <p className="text-gray-700 mb-4">{t('aiCourse.instructorBio')}</p>
              </div>
            </div>
          </div>

          {/* What You'll Learn */}
          <div className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">{t('aiCourse.whatYouWillLearn')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {learningPoints.map((point, index) => (
                <div key={index} className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">{point}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Course Content */}
          <div className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">{t('aiCourse.courseContent')}</h2>
            <div className="border rounded-lg overflow-hidden">
              {courseModules.map((module, index) => (
                <div key={index} className="border-b last:border-b-0">
                  <button 
                    className="flex justify-between items-center w-full p-4 text-left hover:bg-gray-50 transition-colors"
                    onClick={() => toggleModule(index)}
                  >
                    <div className="flex items-center gap-2">
                      {expandedModule === index ? (
                        <ChevronUp className="h-5 w-5 text-blue-600" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-600" />
                      )}
                      <span className="font-medium">{module.title}</span>
                    </div>
                    <div className="text-sm text-gray-500">
                      {module.length} • {module.lessons} lessons
                    </div>
                  </button>
                  {expandedModule === index && (
                    <div className="bg-gray-50 p-4 pt-0">
                      <ul className="space-y-2 pl-7">
                        {Array.from({ length: module.lessons }).map((_, lessonIndex) => (
                          <li key={lessonIndex} className="flex items-center gap-2 text-sm py-2">
                            <PlayCircle className="h-4 w-4 text-blue-600" />
                            <span>Lesson {lessonIndex + 1}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Requirements */}
          <div className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">{t('aiCourse.requirements')}</h2>
            <ul className="space-y-2">
              {requirementsList.map((req, index) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-700 mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">{req}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <div className="bg-white border rounded-lg overflow-hidden shadow-sm">
              {/* Course Image */}
              <div className="aspect-video bg-gray-200 relative">
                <img 
                  src={aiDevelopmentCourse.image}
                  alt={t('aiCourse.title')}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "https://placehold.co/800x450/e2e8f0/1e40af?text=AI+Development";
                  }}
                />
                <div className="absolute top-3 right-3">
                  <Badge className="bg-green-500 text-white border-0">
                    {t('courses.free')}
                  </Badge>
                </div>
              </div>
              
              {/* Course Actions */}
              <div className="p-6">
                <Button className="w-full mb-4 text-lg py-6">
                  {t('aiCourse.continueLearning')}
                </Button>
                
                <div className="space-y-3 mt-6">
                  <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                    <Download className="h-4 w-4" />
                    {t('aiCourse.downloadResources')}
                  </Button>
                  
                  <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    {t('aiCourse.discussionForum')}
                  </Button>
                </div>
                
                {/* Tags */}
                <div className="mt-6 flex flex-wrap gap-2">
                  {aiDevelopmentCourse.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="bg-gray-100">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleCoursePage;
