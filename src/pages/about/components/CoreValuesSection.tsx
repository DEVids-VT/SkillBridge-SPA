import { BookOpen, Briefcase, Code, GraduationCap, LineChart, Users } from 'lucide-react';
import { spacing } from '@/lib/design-system';
import { useTranslation } from 'react-i18next';

export const StudentsSection = () => {
  const { t } = useTranslation();

  // Student benefits data
  const studentBenefits = [
    {
      icon: <Briefcase className="h-6 w-6" />,
      title: t('aboutPage.students.benefits.realBusinessCases.title'),
      description: t('aboutPage.students.benefits.realBusinessCases.description'),
    },
    {
      icon: <GraduationCap className="h-6 w-6" />,
      title: t('aboutPage.students.benefits.skillDevelopment.title'),
      description: t('aboutPage.students.benefits.skillDevelopment.description'),
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: t('aboutPage.students.benefits.supportivePlatform.title'),
      description: t('aboutPage.students.benefits.supportivePlatform.description'),
    },
    {
      icon: <LineChart className="h-6 w-6" />,
      title: t('aboutPage.students.benefits.directOpportunities.title'),
      description: t('aboutPage.students.benefits.directOpportunities.description'),
    },
    {
      icon: <Code className="h-6 w-6" />,
      title: t('aboutPage.students.benefits.projectPortfolio.title'),
      description: t('aboutPage.students.benefits.projectPortfolio.description'),
    },
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: t('aboutPage.students.benefits.structuredFeedback.title'),
      description: t('aboutPage.students.benefits.structuredFeedback.description'),
    },
  ];

  return (
    <section className="bg-green-50 py-16 md:py-24">
      <div className={spacing.container}>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-green-600 flex items-center justify-center">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-green-900">{t('aboutPage.students.title')}</h2>
          </div>
          <p className="text-gray-700 text-lg">
            {t('aboutPage.students.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {studentBenefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-green-100"
            >
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <div className="text-green-600">{benefit.icon}</div>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* How it works for students */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-green-100">
          <h3 className="text-2xl font-bold text-green-900 mb-6 text-center">{t('aboutPage.students.howItWorksTitle')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-green-600 text-white font-bold text-lg flex items-center justify-center mx-auto mb-3">1</div>
              <h4 className="font-semibold mb-2">{t('aboutPage.students.steps.browseCases.title')}</h4>
              <p className="text-sm text-gray-600">{t('aboutPage.students.steps.browseCases.description')}</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-green-600 text-white font-bold text-lg flex items-center justify-center mx-auto mb-3">2</div>
              <h4 className="font-semibold mb-2">{t('aboutPage.students.steps.applySolve.title')}</h4>
              <p className="text-sm text-gray-600">{t('aboutPage.students.steps.applySolve.description')}</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-green-600 text-white font-bold text-lg flex items-center justify-center mx-auto mb-3">3</div>
              <h4 className="font-semibold mb-2">{t('aboutPage.students.steps.getEvaluated.title')}</h4>
              <p className="text-sm text-gray-600">{t('aboutPage.students.steps.getEvaluated.description')}</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-green-600 text-white font-bold text-lg flex items-center justify-center mx-auto mb-3">4</div>
              <h4 className="font-semibold mb-2">{t('aboutPage.students.steps.getHired.title')}</h4>
              <p className="text-sm text-gray-600">{t('aboutPage.students.steps.getHired.description')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
