import { Link, useParams } from 'react-router-dom';
import { Calendar, CheckCircle2 } from 'lucide-react';
import { colors } from '@/lib/design-system';

// Mock project data - in real app this would come from API/context
const mockProjects = [
  {
    id: '1',
    companyName: 'TechCorp',
    companyLogo: '/images/companies/axiomy_logo.jpg',
    taskTitle: 'Build Your First Real Project',
    dueDate: 'Apr 15, 2024',
    completionRate: { completed: 3, total: 7 },
    status: 'online'
  },
  {
    id: '2', 
    companyName: 'DevStudio',
    companyLogo: '/images/companies/besco-logo-clean.png',
    taskTitle: 'Advanced React Patterns',
    dueDate: 'Apr 20, 2024',
    completionRate: { completed: 5, total: 8 },
    status: 'online'
  },
  {
    id: '3',
    companyName: 'CodeCraft',
    companyLogo: '/images/companies/black-and-white-simple-minimalist-modern-square-typography-fashion-store-logo-AGB6nOMPxwu1xWKQ.jpg',
    taskTitle: 'Node.js API Development',
    dueDate: 'Apr 25, 2024',
    completionRate: { completed: 8, total: 12 },
    status: 'online'
  },
  {
    id: '4',
    companyName: 'InnovateLab',
    companyLogo: '/images/companies/bulailogo.png',
    taskTitle: 'Full-Stack E-commerce Platform',
    dueDate: 'May 1, 2024',
    completionRate: { completed: 2, total: 10 },
    status: 'online'
  }
];

export const ProjectsList = () => {
  const { projectId } = useParams();

  return (
    <div className="space-y-3">
      {mockProjects.map((project) => (
        <Link
          key={project.id}
          to={`/dashboard/project/${project.id}`}
          className={`block rounded-lg transition-all duration-200 border-2 ${
            projectId === project.id
              ? ''
              : 'hover:border-[#003566]'
          }`}
          style={{
            backgroundColor: colors.blueDark,
            borderColor: projectId === project.id ? colors.orange : 'transparent'
          }}
        >
          <div className="p-3">
            {/* Company Section */}
            <div className="flex items-center gap-3 mb-3">
              {/* Company Logo */}
              <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 border-2 border-slate-600">
                <img 
                  src={project.companyLogo} 
                  alt={`${project.companyName} logo`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback to a placeholder if image fails to load
                    const target = e.target as HTMLImageElement;
                    target.style.backgroundColor = colors.blue;
                    target.style.display = 'flex';
                    target.style.alignItems = 'center';
                    target.style.justifyContent = 'center';
                    target.style.color = colors.white;
                    target.style.fontSize = '12px';
                    target.style.fontWeight = 'bold';
                    target.textContent = project.companyName.charAt(0).toUpperCase();
                  }}
                />
              </div>
              
              {/* Company Name */}
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-medium text-sm leading-tight truncate">
                  {project.companyName}
                </h3>
              </div>
            </div>

            {/* Task Title */}
            <div className="mb-3">
              <h4 className="text-white font-semibold text-sm leading-tight" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {project.taskTitle}
              </h4>
            </div>

            {/* Due Date and Completion Rate */}
            <div className="flex items-center justify-between">
              {/* Due Date */}
              <div className="flex items-center gap-1 text-xs text-gray-400">
                <Calendar size={12} />
                <span>{project.dueDate}</span>
              </div>
              
              {/* Completion Rate */}
              <div className="flex items-center gap-1">
                <CheckCircle2 size={12} className="text-green-400" />
                <span className="text-xs text-gray-300">
                  {project.completionRate.completed}/{project.completionRate.total}
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-2">
              <div className="w-full bg-slate-700 rounded-full h-1.5">
                <div 
                  className="h-1.5 rounded-full transition-all duration-300"
                  style={{ 
                    backgroundColor: colors.orange,
                    width: `${(project.completionRate.completed / project.completionRate.total) * 100}%`
                  }}
                />
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
      );
  }; 