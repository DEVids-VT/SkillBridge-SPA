import { Link, useParams } from 'react-router-dom';
import { FolderOpen, GraduationCap, Calendar } from 'lucide-react';
import { colors } from '@/lib/design-system';

// Mock project data - in real app this would come from API/context
const mockProjects = [
  {
    id: '1',
    title: 'Build Your First Real Project',
    type: 'Fullstack',
    lessons: '1 lesson',
    description: 'Perfect for junior devs, aspiring founders, and seasoned professionals',
    status: 'online',
    date: 'Apr 9'
  },
  {
    id: '2', 
    title: 'Advanced React Patterns',
    type: 'Frontend',
    lessons: '8 lessons',
    description: 'Master advanced React concepts and patterns',
    status: 'online',
    date: 'Apr 8'
  },
  {
    id: '3',
    title: 'Node.js API Development',
    type: 'Backend',
    lessons: '12 lessons', 
    description: 'Build scalable REST APIs with Node.js and Express',
    status: 'online',
    date: 'Apr 7'
  }
];

export const ProjectsSidebar = () => {
  const { projectId } = useParams();

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-6" style={{ borderBottomWidth: '1px', borderBottomColor: colors.blue }}>
        <h1 className="text-xl font-semibold text-white mb-4">All posts</h1>
        
        {/* Learn Section */}
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-gray-300">
            <GraduationCap size={20} />
            <span className="font-medium">Learn</span>
          </div>
          
          {/* Courses label */}
          <div className="flex items-center gap-2 text-sm text-gray-400 ml-8">
            <FolderOpen size={16} />
            <span>Courses</span>
          </div>
        </div>
      </div>

      {/* Projects List */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-3">
          {mockProjects.map((project) => (
            <Link
              key={project.id}
              to={`/dashboard/project/${project.id}`}
              className={`block p-4 rounded-lg transition-all duration-200 border-2 ${
                projectId === project.id
                  ? ''
                  : 'hover:border-[#003566]'
              }`}
              style={{
                backgroundColor: projectId === project.id ? colors.blue + '40' : colors.blue + '20',
                borderColor: projectId === project.id ? colors.orange : 'transparent'
              }}
            >
              {/* Project Header */}
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-md flex items-center justify-center" style={{ backgroundColor: colors.orange }}>
                    <GraduationCap size={16} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium text-sm leading-tight">
                      {project.title}
                    </h3>
                    <p className="text-xs" style={{ color: colors.yellow }}>{project.type}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <Calendar size={12} />
                  <span>{project.date}</span>
                </div>
              </div>

              {/* Project Details */}
              <div className="space-y-1">
                <p className="text-xs text-gray-300">{project.lessons}</p>
                <p className="text-xs text-gray-400 line-clamp-2">
                  {project.description}
                </p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-gray-500">0 online</span>
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.orange }}></div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}; 