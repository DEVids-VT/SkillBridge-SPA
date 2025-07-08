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
import { spacing, layouts, colors, cards, components } from '@/lib/design-system';
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
    <div className="min-h-screen" style={{ backgroundColor: colors.dark }}>
      <div className={spacing.container}>
        {/* Header section */}
        <div className={layouts.pageHeader}>
          <div className={layouts.pageHeaderBackground}></div>
          <h1 className={layouts.pageTitle}>
            <span style={{ color: colors.yellow }}>{t('projectPage.header.title1')}</span>{' '}
            <span style={{ color: colors.white }}>{t('projectPage.header.title2')}</span>
          </h1>
        </div>

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-9 gap-4 lg:gap-8 max-w-7xl mx-auto">
          {/* Main content */}
          <div className="lg:col-span-6 order-1">
            <div className={cards.base}>
              <div className={cards.body}>
                <div className="flex items-start gap-4 md:gap-6 mb-6">
                  <div
                    className="w-12 h-12 md:w-16 md:h-16 rounded-lg overflow-hidden flex items-center justify-center"
                    style={{ backgroundColor: colors.blueDark }}
                  >
                    <Building2 className="h-6 w-6 md:h-8 md:w-8" style={{ color: colors.white }} />
                  </div>
                  <div>
                    <h2
                      className="text-xl md:text-2xl font-bold mb-2"
                      style={{ color: colors.white }}
                    >
                      {project.title}
                    </h2>
                    <div
                      className="flex flex-wrap items-center gap-2 md:gap-4 text-sm"
                      style={{ color: colors.white }}
                    >
                      <span className="flex items-center gap-1">
                        <Building2 className="h-4 w-4" />
                        {project.companyName}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {t('projectPage.projectInfo.posted')}{' '}
                        {new Date(project.createdAt).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {t('projectPage.projectInfo.deadline')}{' '}
                        {new Date(project.deadline).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Project Details */}
                <div
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 p-4 rounded-lg"
                  style={{ backgroundColor: colors.blueDark }}
                >
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" style={{ color: colors.yellow }} />
                    <div>
                      <p className="text-sm" style={{ color: colors.white }}>
                        {t('projectPage.projectDetails.duration')}
                      </p>
                      <p className="font-medium" style={{ color: colors.white }}>
                        TBD
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4" style={{ color: colors.yellow }} />
                    <div>
                      <p className="text-sm" style={{ color: colors.white }}>
                        {t('projectPage.projectDetails.salary')}
                      </p>
                      <p className="font-medium" style={{ color: colors.white }}>
                        Negotiable
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" style={{ color: colors.yellow }} />
                    <div>
                      <p className="text-sm" style={{ color: colors.white }}>
                        {t('projectPage.projectDetails.capacity')}
                      </p>
                      <p className="font-medium" style={{ color: colors.white }}>
                        0/10 {t('projectPage.projectDetails.enrolled')}
                        <span style={{ color: colors.yellow }}>
                          (10 {t('projectPage.projectDetails.seatsLeft')})
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.skills.map((skill) => (
                    <Badge
                      key={skill.id}
                      className={`${components.tag} ${components.tagColors.blue}`}
                    >
                      <Tag className="h-3 w-3 mr-1" />
                      {skill.name}
                    </Badge>
                  ))}
                </div>

                {/* Description */}
                <div className="max-w-none mb-8">
                  <h3 className="text-lg font-semibold mb-3" style={{ color: colors.white }}>
                    {t('projectPage.description.title')}
                  </h3>
                  <p className="mb-4" style={{ color: colors.white }}>
                    {project.description}
                  </p>
                  <p style={{ color: colors.white }}>
                    {t('projectPage.description.additionalText')}
                  </p>
                </div>

                {/* Business Context & Learning Opportunities */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-4" style={{ color: colors.white }}>
                    {t('projectPage.learning.title')}
                  </h3>

                  <div className="space-y-6">
                    <div>
                      <h4
                        className="flex items-center gap-2 font-medium mb-2"
                        style={{ color: colors.white }}
                      >
                        <Lightbulb className="h-4 w-4" style={{ color: colors.yellow }} />
                        {t('projectPage.learning.businessLogic.title')}
                      </h4>
                      <ul className="space-y-1 ml-6">
                        {(
                          t('projectPage.learning.businessLogic.items', {
                            returnObjects: true,
                          }) as string[]
                        ).map((item: string, index: number) => (
                          <li key={index} style={{ color: colors.white }}>
                            • {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4
                        className="flex items-center gap-2 font-medium mb-2"
                        style={{ color: colors.white }}
                      >
                        <Coffee className="h-4 w-4" style={{ color: colors.orange }} />
                        {t('projectPage.learning.companyCulture.title')}
                      </h4>
                      <ul className="space-y-1 ml-6">
                        {(
                          t('projectPage.learning.companyCulture.items', {
                            returnObjects: true,
                          }) as string[]
                        ).map((item: string, index: number) => (
                          <li key={index} style={{ color: colors.white }}>
                            • {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4
                        className="flex items-center gap-2 font-medium mb-2"
                        style={{ color: colors.white }}
                      >
                        <FileText className="h-4 w-4" style={{ color: colors.blue }} />
                        {t('projectPage.learning.codeStyle.title')}
                      </h4>
                      <ul className="space-y-1 ml-6">
                        {(
                          t('projectPage.learning.codeStyle.items', {
                            returnObjects: true,
                          }) as string[]
                        ).map((item: string, index: number) => (
                          <li key={index} style={{ color: colors.white }}>
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
          </div>

          {/* Right sidebar - Company Profile */}
          <div className="lg:col-span-3 order-2">
            <div className={`${cards.base} sticky top-24`}>
              <div className={cards.body}>
                <div className="flex flex-col items-center mb-6">
                  <div
                    className="w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden flex items-center justify-center mb-4"
                    style={{ backgroundColor: colors.blueDark }}
                  >
                    <Building2
                      className="h-8 w-8 md:h-10 md:w-10"
                      style={{ color: colors.white }}
                    />
                  </div>
                  <h3
                    className="text-base md:text-lg font-semibold"
                    style={{ color: colors.white }}
                  >
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
      </div>
    </div>
  );
}
