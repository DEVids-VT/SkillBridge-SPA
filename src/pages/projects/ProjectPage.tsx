import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Calendar,
  Building2,
  Clock,
  Tag,
  Users,
  Globe,
  DollarSign,
  Briefcase,
  FileText,
  Coffee,
  Lightbulb,
  Loader2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { spacing, layouts } from '@/lib/design-system';
import { projectData } from '@/data/mock-data';
import { useProjectDetail } from './hooks/useProjectDetail';

export default function ProjectPage() {
  const { id } = useParams<{ id: string }>();
  const { data: project, isLoading, error } = useProjectDetail(id);

  // If loading, show loading indicator
  if (isLoading) {
    return (
      <div
        className={cn(
          spacing.container,
          spacing.headerOffset,
          'py-4 md:py-8',
          'flex justify-center items-center min-h-[60vh]'
        )}
      >
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-lg font-medium text-gray-600">Loading project details...</p>
        </div>
      </div>
    );
  }

  // If there's an error, show error message
  if (error || !project) {
    return (
      <div
        className={cn(
          spacing.container,
          spacing.headerOffset,
          'py-4 md:py-8',
          'flex justify-center items-center min-h-[60vh]'
        )}
      >
        <div className="text-center">
          <div className="h-12 w-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">!</span>
          </div>
          <p className="text-lg font-medium text-gray-900 mb-2">Error Loading Project</p>
          <p className="text-gray-600">Unable to load project details. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn(spacing.container, spacing.headerOffset, 'py-4 md:py-8')}>
      {/* Header section */}
      <div className={layouts.pageHeader}>
        <div className={layouts.pageHeaderBackground}></div>
        <h1 className={layouts.pageTitle}>
          <span className="text-blue-600">Project</span>{' '}
          <span className="text-gray-600">Details</span>
        </h1>
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-9 gap-4 lg:gap-8 max-w-7xl mx-auto">
        {/* Main content */}
        <div className="lg:col-span-6 order-1">
          <div className="bg-white rounded-xl shadow-sm p-4 md:p-8">
            <div className="flex items-start gap-4 md:gap-6 mb-6">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-lg bg-gray-100 overflow-hidden flex items-center justify-center">
                <Building2 className="h-6 w-6 md:h-8 md:w-8 text-gray-500" />
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                  {project.title}
                </h2>
                <div className="flex flex-wrap items-center gap-2 md:gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <Building2 className="h-4 w-4" />
                    {project.companyName}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    Posted: {new Date(project.createdAt).toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    Deadline: {new Date(project.deadline).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Project Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Duration</p>
                  <p className="font-medium">{projectData.projectDetails.duration}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Salary Upon Completion</p>
                  <p className="font-medium">$4,500 - $6,000</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Maximum Intern Capacity</p>
                  <p className="font-medium">
                    3/10 enrolled <span className="text-green-600">(7 seats left)</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className="flex flex-wrap gap-2 mb-6">
              {project.skills.map((skill) => (
                <Badge key={skill.id} variant="secondary" className="px-3 py-1 text-sm font-medium">
                  <Tag className="h-3 w-3 mr-1" />
                  {skill.name}
                </Badge>
              ))}
            </div>

            {/* Description */}
            <div className="prose max-w-none mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Project Description</h3>
              <p className="text-gray-600 mb-4">{project.description}</p>
              <p className="text-gray-600">
                This internship opportunity offers hands-on experience in a real-world business
                environment. You'll work directly with our development team to build innovative
                solutions while learning industry best practices and modern development workflows.
              </p>
            </div>

            {/* Business Context & Learning Opportunities */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                What You'll Learn & Experience
              </h3>

              <div className="space-y-6">
                <div>
                  <h4 className="flex items-center gap-2 font-medium text-gray-900 mb-2">
                    <Lightbulb className="h-4 w-4 text-yellow-500" />
                    Business Logic & Problem Solving
                  </h4>
                  <ul className="space-y-1 ml-6">
                    <li className="text-gray-600">
                      • Understanding customer needs and translating them into technical
                      requirements
                    </li>
                    <li className="text-gray-600">
                      • Working with real business constraints and deadlines
                    </li>
                    <li className="text-gray-600">
                      • Learning to balance technical excellence with business priorities
                    </li>
                    <li className="text-gray-600">
                      • Participating in product planning and feature prioritization discussions
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="flex items-center gap-2 font-medium text-gray-900 mb-2">
                    <Coffee className="h-4 w-4 text-brown-500" />
                    Company Culture & Traditions
                  </h4>
                  <ul className="space-y-1 ml-6">
                    <li className="text-gray-600">
                      • Daily stand-ups with collaborative problem-solving approach
                    </li>
                    <li className="text-gray-600">
                      • Weekly code review sessions with constructive feedback culture
                    </li>
                    <li className="text-gray-600">
                      • Monthly innovation hours for personal project exploration
                    </li>
                    <li className="text-gray-600">
                      • Open communication policy with direct access to senior developers
                    </li>
                    <li className="text-gray-600">
                      • Learning-first mindset where questions are always encouraged
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="flex items-center gap-2 font-medium text-gray-900 mb-2">
                    <FileText className="h-4 w-4 text-blue-500" />
                    Code Style & Development Practices
                  </h4>
                  <ul className="space-y-1 ml-6">
                    <li className="text-gray-600">
                      • Clean, self-documenting code with comprehensive comments
                    </li>
                    <li className="text-gray-600">• Test-driven development (TDD) methodology</li>
                    <li className="text-gray-600">
                      • Git workflow with feature branches and pull request reviews
                    </li>
                    <li className="text-gray-600">
                      • Agile development practices with 2-week sprint cycles
                    </li>
                    <li className="text-gray-600">
                      • Code documentation and technical writing standards
                    </li>
                    <li className="text-gray-600">
                      • Performance optimization and accessibility best practices
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Benefits & Opportunities</h3>
              <ul className="space-y-2">
                {projectData.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-600">
                    <span className="text-green-600">•</span>
                    {benefit}
                  </li>
                ))}
                <li className="flex items-start gap-2 text-gray-600">
                  <span className="text-green-600">•</span>
                  Potential for full-time employment upon successful completion
                </li>
                <li className="flex items-start gap-2 text-gray-600">
                  <span className="text-green-600">•</span>
                  Industry networking opportunities and professional references
                </li>
              </ul>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="w-full sm:flex-1">
                Start Now
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:flex-1">
                Save Project
              </Button>
            </div>
          </div>
        </div>

        {/* Right sidebar - Company Profile */}
        <div className="lg:col-span-3 order-2">
          <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 sticky top-24">
            <div className="flex flex-col items-center mb-6">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-lg bg-gray-100 overflow-hidden flex items-center justify-center mb-4">
                <Building2 className="h-8 w-8 md:h-10 md:w-10 text-gray-500" />
              </div>
              <h3 className="text-base md:text-lg font-semibold text-gray-900">
                {project.companyName}
              </h3>
              <p className="text-sm text-gray-600 text-center mt-2">
                {projectData.company.description}
              </p>
            </div>

            <div className="space-y-3 md:space-y-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Globe className="h-4 w-4" />
                <a href={projectData.company.website} className="text-blue-600 hover:underline">
                  {projectData.company.website}
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Users className="h-4 w-4" />
                <span>{projectData.company.size}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Briefcase className="h-4 w-4" />
                <span>{projectData.company.industry}</span>
              </div>
            </div>

            <Button className="w-full mt-6" variant="outline">
              View Company Profile
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
