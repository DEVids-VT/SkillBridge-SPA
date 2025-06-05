import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Building2, Clock, Tag, Users, Globe, MapPin, DollarSign, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";
import { spacing, layouts } from "@/lib/design-system";
import { projectData, relatedProjects } from "@/data/mock-data";

export default function ProjectPage() {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();

  // In a real app, you'd fetch project data based on the ID
  // For now, we'll use the mock data
  console.log('Project ID:', id);

  return (
    <div className={cn(spacing.container, spacing.headerOffset, "py-4 md:py-8")}>
      {/* Header section */}
      <div className={layouts.pageHeader}>
        <div className={layouts.pageHeaderBackground}></div>
        <h1 className={layouts.pageTitle}>
          <span className="text-blue-600">Project</span>{" "}
          <span className="text-gray-600">Details</span>
        </h1>
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 max-w-7xl mx-auto">
        {/* Left sidebar - Company Profile */}
        <div className="lg:col-span-3 order-2 lg:order-1">
          <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 sticky top-24">
            <div className="flex flex-col items-center mb-6">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-lg bg-gray-100 overflow-hidden flex items-center justify-center mb-4">
                <Building2 className="h-8 w-8 md:h-10 md:w-10 text-gray-500" />
              </div>
              <h3 className="text-base md:text-lg font-semibold text-gray-900">{projectData.company.name}</h3>
              <p className="text-sm text-gray-600 text-center mt-2">{projectData.company.description}</p>
            </div>

            <div className="space-y-3 md:space-y-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="h-4 w-4" />
                <span>{projectData.company.location}</span>
              </div>
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

        {/* Main content */}
        <div className="lg:col-span-6 order-1 lg:order-2">
          <div className="bg-white rounded-xl shadow-sm p-4 md:p-8">
            <div className="flex items-start gap-4 md:gap-6 mb-6">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-lg bg-gray-100 overflow-hidden flex items-center justify-center">
                <Building2 className="h-6 w-6 md:h-8 md:w-8 text-gray-500" />
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">{projectData.title}</h2>
                <div className="flex flex-wrap items-center gap-2 md:gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <Building2 className="h-4 w-4" />
                    {projectData.company.name}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    Posted: {new Date(projectData.postedDate).toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    Deadline: {new Date(projectData.deadline).toLocaleDateString()}
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
                  <p className="text-sm text-gray-500">Budget</p>
                  <p className="font-medium">{projectData.projectDetails.budget}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Team Size</p>
                  <p className="font-medium">{projectData.projectDetails.teamSize}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-medium">{projectData.projectDetails.location}</p>
                </div>
              </div>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2 mb-6">
              {projectData.categories.map((category, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="px-3 py-1 text-sm font-medium"
                >
                  <Tag className="h-3 w-3 mr-1" />
                  {category}
                </Badge>
              ))}
            </div>

            {/* Description */}
            <div className="prose max-w-none mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Project Description</h3>
              <p className="text-gray-600">{projectData.description}</p>
            </div>

            {/* Requirements */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Requirements</h3>
              <ul className="space-y-2">
                {projectData.requirements.map((requirement, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-600">
                    <span className="text-blue-600">•</span>
                    {requirement}
                  </li>
                ))}
              </ul>
            </div>

            {/* Benefits */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Benefits</h3>
              <ul className="space-y-2">
                {projectData.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-600">
                    <span className="text-green-600">•</span>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="w-full sm:flex-1">
                Apply Now
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:flex-1">
                Save Project
              </Button>
            </div>
          </div>
        </div>

        {/* Right sidebar - Related Projects */}
        <div className="lg:col-span-3 order-3">
          <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 sticky top-24">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Projects</h3>
            <div className="space-y-4">
              {relatedProjects.slice(0, 3).map((project) => (
                <div key={project.id} className="p-4 border rounded-lg hover:border-blue-500 transition-colors cursor-pointer">
                  <h4 className="font-medium text-gray-900 mb-2">{project.title}</h4>
                  <p className="text-sm text-gray-600 mb-2">{project.company}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.categories.map((category, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {category}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Posted: {new Date(project.postedDate).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 