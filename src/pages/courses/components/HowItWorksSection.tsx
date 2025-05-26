import { useTranslation } from 'react-i18next';
import { Play } from 'lucide-react';

export const HowItWorksSection = () => {
  const { t } = useTranslation();
  
  // How it works steps
  const steps = [
    {
      number: 1,
      title: t('coursesPage.howItWorks.step1.title'),
      description: t('coursesPage.howItWorks.step1.description')
    },
    {
      number: 2,
      title: t('coursesPage.howItWorks.step2.title'),
      description: t('coursesPage.howItWorks.step2.description')
    },
    {
      number: 3,
      title: t('coursesPage.howItWorks.step3.title'),
      description: t('coursesPage.howItWorks.step3.description')
    },
    {
      number: 4,
      title: t('coursesPage.howItWorks.step4.title'),
      description: t('coursesPage.howItWorks.step4.description')
    }
  ];

  return (
    <section className="mb-16">
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step) => (
          <div key={step.number} className="relative">
            <div className="bg-gray-50 rounded-lg p-6 h-full border border-gray-100">
              <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">
                {step.number}
              </div>
              <h3 className="text-xl font-semibold mt-4 mb-3">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Video demonstration placeholder */}
      <div className="mt-10 rounded-xl overflow-hidden bg-gray-100 aspect-video relative cursor-pointer group">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-primary text-white rounded-full w-16 h-16 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Play className="w-6 h-6 ml-1" />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 text-white">
          <h3 className="text-xl font-semibold">{t('coursesPage.videoDemo.title')}</h3>
          <p className="text-sm opacity-90">{t('coursesPage.videoDemo.description')}</p>
        </div>
      </div>
    </section>
  );
}; 