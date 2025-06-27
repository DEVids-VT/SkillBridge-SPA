import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Calendar,
  Building2,
  Clock,
  Tag,
  Users,
  DollarSign,
  FileText,
  Coffee,
  Lightbulb,
  Loader2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { spacing, layouts } from '@/lib/design-system';
import { useProjectDetail } from './hooks/useProjectDetail';

export default function ProjectPage() {
  const { t } = useTranslation('project');
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
          <p className="text-lg font-medium text-gray-600">{t('projectPage.loading.message')}</p>
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
          <p className="text-lg font-medium text-gray-900 mb-2">{t('projectPage.error.title')}</p>
          <p className="text-gray-600">{t('projectPage.error.message')}</p>
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
          <span className="text-blue-600">{t('projectPage.header.title1')}</span>{' '}
          <span className="text-gray-600">{t('projectPage.header.title2')}</span>
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
                    {t('projectPage.projectInfo.posted')} {new Date(project.createdAt).toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {t('projectPage.projectInfo.deadline')} {new Date(project.deadline).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Project Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">{t('projectPage.projectDetails.duration')}</p>
                  <p className="font-medium">TBD</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">{t('projectPage.projectDetails.salary')}</p>
                  <p className="font-medium">Negotiable</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">{t('projectPage.projectDetails.capacity')}</p>
                  <p className="font-medium">
                    0/10 {t('projectPage.projectDetails.enrolled')} 
                    <span className="text-green-600">
                      (10 {t('projectPage.projectDetails.seatsLeft')})
                    </span>
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
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('projectPage.description.title')}</h3>
              <p className="text-gray-600 mb-4">{project.description}</p>
              <p className="text-gray-600">
                {t('projectPage.description.additionalText')}
              </p>
            </div>

            {/* Business Context & Learning Opportunities */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {t('projectPage.learning.title')}
              </h3>

              <div className="space-y-6">
                <div>
                  <h4 className="flex items-center gap-2 font-medium text-gray-900 mb-2">
                    <Lightbulb className="h-4 w-4 text-yellow-500" />
                    {t('projectPage.learning.businessLogic.title')}
                  </h4>
                  <ul className="space-y-1 ml-6">
                    {(t('projectPage.learning.businessLogic.items', { returnObjects: true }) as string[]).map((item: string, index: number) => (
                      <li key={index} className="text-gray-600">
                        • {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="flex items-center gap-2 font-medium text-gray-900 mb-2">
                    <Coffee className="h-4 w-4 text-brown-500" />
                    {t('projectPage.learning.companyCulture.title')}
                  </h4>
                  <ul className="space-y-1 ml-6">
                    {(t('projectPage.learning.companyCulture.items', { returnObjects: true }) as string[]).map((item: string, index: number) => (
                      <li key={index} className="text-gray-600">
                        • {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="flex items-center gap-2 font-medium text-gray-900 mb-2">
                    <FileText className="h-4 w-4 text-blue-500" />
                    {t('projectPage.learning.codeStyle.title')}
                  </h4>
                  <ul className="space-y-1 ml-6">
                    {(t('projectPage.learning.codeStyle.items', { returnObjects: true }) as string[]).map((item: string, index: number) => (
                      <li key={index} className="text-gray-600">
                        • {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="w-full sm:flex-1">
                {t('projectPage.actions.startNow')}
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:flex-1">
                {t('projectPage.actions.saveProject')}
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
            </div>

            <Button className="w-full mt-6" variant="outline">
              {t('projectPage.actions.viewCompanyProfile')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
