import { useTranslation } from 'react-i18next';
import { CheckCircle2, Award, Building, Briefcase } from 'lucide-react';

export const BenefitsSection = () => {
  const { t } = useTranslation();

  // Benefits of company courses
  const benefits = [
    {
      icon: <CheckCircle2 className="h-8 w-8 text-primary" />,
      title: t('coursesPage.benefits.direct.title'),
      description: t('coursesPage.benefits.direct.description'),
    },
    {
      icon: <Award className="h-8 w-8 text-primary" />,
      title: t('coursesPage.benefits.certification.title'),
      description: t('coursesPage.benefits.certification.description'),
    },
    {
      icon: <Building className="h-8 w-8 text-primary" />,
      title: t('coursesPage.benefits.culture.title'),
      description: t('coursesPage.benefits.culture.description'),
    },
    {
      icon: <Briefcase className="h-8 w-8 text-primary" />,
      title: t('coursesPage.benefits.employment.title'),
      description: t('coursesPage.benefits.employment.description'),
    },
  ];

  return (
    <section className="mb-16">
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-bold mb-3">{t('coursesPage.benefits.title')}</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">{t('coursesPage.benefits.subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {benefits.map((benefit, index) => (
          <div
            key={index}
            className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm flex gap-4"
          >
            <div className="flex-shrink-0 mt-1">{benefit.icon}</div>
            <div>
              <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
