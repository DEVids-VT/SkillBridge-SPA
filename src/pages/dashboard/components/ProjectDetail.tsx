import { useParams } from 'react-router-dom';
import { Calendar, Clock, Users, GraduationCap, ExternalLink } from 'lucide-react';
import { colors, cards, typography } from '@/lib/design-system';

// Mock project data - would typically come from API
const mockProjectDetails = {
  '1': {
    id: '1',
    title: 'Build Your First Real Project',
    type: 'Fullstack',
    description: 'Perfect for junior devs, aspiring founders, and seasoned professionals. This comprehensive course will guide you through building a complete full-stack application from scratch.',
    lessons: 8,
    duration: '4 weeks',
    level: 'Beginner to Intermediate',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'TypeScript'],
    instructor: 'Sarah Chen',
    enrolled: 1247,
    rating: 4.8,
    lastUpdated: 'Apr 9, 2024',
    content: [
      { title: 'Project Setup & Planning', duration: '45 min', completed: true },
      { title: 'Frontend Architecture', duration: '60 min', completed: true },
      { title: 'Backend API Development', duration: '90 min', completed: false },
      { title: 'Database Design', duration: '75 min', completed: false },
      { title: 'Authentication & Security', duration: '80 min', completed: false },
      { title: 'Testing & Deployment', duration: '70 min', completed: false },
      { title: 'Performance Optimization', duration: '55 min', completed: false },
      { title: 'Final Project Review', duration: '40 min', completed: false }
    ]
  },
  '2': {
    id: '2',
    title: 'Advanced React Patterns',
    type: 'Frontend',
    description: 'Master advanced React concepts including custom hooks, context patterns, performance optimization, and modern state management techniques.',
    lessons: 12,
    duration: '6 weeks',
    level: 'Advanced',
    technologies: ['React', 'TypeScript', 'Zustand', 'React Query'],
    instructor: 'Mike Rodriguez',
    enrolled: 892,
    rating: 4.9,
    lastUpdated: 'Apr 8, 2024',
    content: [
      { title: 'Advanced Hooks Patterns', duration: '65 min', completed: false },
      { title: 'State Management Solutions', duration: '70 min', completed: false }
    ]
  },
  '3': {
    id: '3',
    title: 'Node.js API Development',
    type: 'Backend',
    description: 'Build scalable REST APIs with Node.js and Express. Learn best practices for backend development, authentication, and database integration.',
    lessons: 10,
    duration: '5 weeks',
    level: 'Intermediate',
    technologies: ['Node.js', 'Express', 'MongoDB', 'JWT'],
    instructor: 'David Park',
    enrolled: 654,
    rating: 4.7,
    lastUpdated: 'Apr 7, 2024',
    content: [
      { title: 'Express.js Fundamentals', duration: '50 min', completed: false },
      { title: 'Database Integration', duration: '80 min', completed: false }
    ]
  }
};

export const ProjectDetail = () => {
  const { projectId } = useParams();
  const project = projectId ? mockProjectDetails[projectId as keyof typeof mockProjectDetails] : null;

  if (!project) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl text-white mb-2">Project not found</h2>
          <p className="text-gray-400">The requested project could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div 
              className="w-12 h-12 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: colors.orange }}
            >
              <GraduationCap size={24} className="text-white" />
            </div>
            <div>
              <h1 className={typography.heading[1]}>{project.title}</h1>
              <p className="font-medium" style={{ color: colors.yellow }}>{project.type}</p>
            </div>
          </div>
          
          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            {project.description}
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-6 text-sm">
            <div className="flex items-center gap-2 text-gray-400">
              <Calendar size={16} />
              <span>Updated {project.lastUpdated}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <Clock size={16} />
              <span>{project.duration}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <Users size={16} />
              <span>{project.enrolled.toLocaleString()} enrolled</span>
            </div>
            <div className="flex items-center gap-2" style={{ color: colors.yellow }}>
              <span>★ {project.rating}</span>
            </div>
          </div>
        </div>

        {/* Project Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className={cards.base}>
              <div className={cards.header}>
                <h3 className={typography.heading[4]}>Course Content</h3>
              </div>
              <div className={cards.body}>
                <div className="space-y-3">
                  {project.content.map((lesson, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-lg border-2"
                      style={{
                        backgroundColor: lesson.completed ? colors.orange + '20' : colors.blue + '20',
                        borderColor: lesson.completed ? colors.orange : colors.blue
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-6 h-6 rounded-full flex items-center justify-center text-white text-sm font-medium"
                            style={{
                              backgroundColor: lesson.completed ? colors.orange : colors.blue
                            }}
                          >
                            {lesson.completed ? '✓' : index + 1}
                          </div>
                          <span className="text-white font-medium">{lesson.title}</span>
                        </div>
                        <span className="text-gray-400 text-sm">{lesson.duration}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6">
            {/* Technologies */}
            <div className={cards.base}>
              <div className={cards.header}>
                <h4 className={typography.heading[5]}>Technologies</h4>
              </div>
              <div className={cards.body}>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-sm rounded-md border-2"
                      style={{
                        backgroundColor: colors.blue + '20',
                        color: colors.yellow,
                        borderColor: colors.blue
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Project Details */}
            <div className={cards.base}>
              <div className={cards.header}>
                <h4 className={typography.heading[5]}>Details</h4>
              </div>
              <div className={cards.body}>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Level:</span>
                    <span className="text-white">{project.level}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Lessons:</span>
                    <span className="text-white">{project.lessons}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Instructor:</span>
                    <span className="text-white">{project.instructor}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <button 
                className="w-full font-medium py-3 px-4 rounded-lg transition-colors duration-200 border-2"
                style={{
                  backgroundColor: colors.orange,
                  color: colors.blueDark,
                  borderColor: colors.orange
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = colors.yellow;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = colors.orange;
                }}
              >
                Continue Learning
              </button>
              <button 
                className="w-full font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 border-2"
                style={{
                  backgroundColor: colors.blue,
                  color: colors.yellow,
                  borderColor: colors.blue
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = colors.blueDark;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = colors.blue;
                }}
              >
                <ExternalLink size={16} />
                View in Projects
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 