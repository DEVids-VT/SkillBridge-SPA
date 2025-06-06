import { Button } from '@/components/ui/button';
import { ArrowRight, Building, Clock, Target, TrendingUp, Users } from 'lucide-react';
import { spacing } from '@/lib/design-system';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

export const CompaniesSection = () => {
  const { t } = useTranslation();

  const businessBenefits = [
    {
      icon: <Clock className="h-6 w-6" />,
      title: t('aboutPage.companies.benefits.saveTime.title'),
      description: t('aboutPage.companies.benefits.saveTime.description')
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: t('aboutPage.companies.benefits.objectiveAssessment.title'),
      description: t('aboutPage.companies.benefits.objectiveAssessment.description')
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: t('aboutPage.companies.benefits.fasterSelection.title'),
      description: t('aboutPage.companies.benefits.fasterSelection.description')
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: t('aboutPage.companies.benefits.longTermConnections.title'),
      description: t('aboutPage.companies.benefits.longTermConnections.description')
    },
    {
      icon: <Building className="h-6 w-6" />,
      title: t('aboutPage.companies.benefits.innovativeReputation.title'),
      description: t('aboutPage.companies.benefits.innovativeReputation.description')
    },
    {
      icon: <ArrowRight className="h-6 w-6" />,
      title: t('aboutPage.companies.benefits.reducedCosts.title'),
      description: t('aboutPage.companies.benefits.reducedCosts.description')
    }
  ];

  return (
    <section className="bg-blue-50 py-16 md:py-24">
      <div className={spacing.container}>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center">
              <Building className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-blue-900">{t('aboutPage.companies.title')}</h2>
          </div>
          <p className="text-gray-700 text-lg">
            {t('aboutPage.companies.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {businessBenefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-blue-100"
            >
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <div className="text-blue-600">{benefit.icon}</div>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* How it works for companies */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-blue-100">
          <h3 className="text-2xl font-bold text-blue-900 mb-6 text-center">{t('aboutPage.companies.howItWorksTitle')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-blue-600 text-white font-bold text-lg flex items-center justify-center mx-auto mb-3">1</div>
              <h4 className="font-semibold mb-2">{t('aboutPage.companies.steps.defineNeed.title')}</h4>
              <p className="text-sm text-gray-600">{t('aboutPage.companies.steps.defineNeed.description')}</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-blue-600 text-white font-bold text-lg flex items-center justify-center mx-auto mb-3">2</div>
              <h4 className="font-semibold mb-2">{t('aboutPage.companies.steps.autoGenerate.title')}</h4>
              <p className="text-sm text-gray-600">{t('aboutPage.companies.steps.autoGenerate.description')}</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-blue-600 text-white font-bold text-lg flex items-center justify-center mx-auto mb-3">3</div>
              <h4 className="font-semibold mb-2">{t('aboutPage.companies.steps.reviewResults.title')}</h4>
              <p className="text-sm text-gray-600">{t('aboutPage.companies.steps.reviewResults.description')}</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-blue-600 text-white font-bold text-lg flex items-center justify-center mx-auto mb-3">4</div>
              <h4 className="font-semibold mb-2">{t('aboutPage.companies.steps.connect.title')}</h4>
              <p className="text-sm text-gray-600">{t('aboutPage.companies.steps.connect.description')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
