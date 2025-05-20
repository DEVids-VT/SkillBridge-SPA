import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CallToAction = () => {
  const { t } = useTranslation();

  return (
    <section className="py-16 bg-blue-600 text-white relative">
      {/* Top curved transition */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-blue-50 rounded-b-[50%] -translate-y-full"></div>

      <div className="container px-4 lg:px-8 mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
          <span>
            {t('landingPage.cta.title', 'Ready to Transform the Internship and Hiring Process?')}
          </span>
        </h2>
        <p className="text-xl max-w-3xl mx-auto mb-8 text-white/90">
          {t(
            'landingPage.cta.subtitle',
            'Join SkillBridge today and be part of the future of education and hiring'
          )}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            asChild
            size="lg"
            className="gap-2 bg-white text-blue-600 hover:bg-white/90 font-medium"
          >
            <Link to="/register">
              {t('landingPage.cta.primaryButton', 'Get Started Now')}
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="gap-2 border-white text-white hover:bg-white/10 font-medium"
          >
            <Link to="/projects">{t('landingPage.cta.secondaryButton', 'Explore Projects')}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
