import { Button } from '@/components/ui/button';
import { spacing } from '@/lib/design-system';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

export const CTASection = () => {
  const { t } = useTranslation();

  return (
    <section className={cn(spacing.container, 'py-16')}>
      <div className="bg-blue-50 rounded-xl p-8 md:p-12 text-center">
        <h2 className="text-3xl font-bold mb-4">{t('aboutPage.cta.title')}</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-8">
          {t('aboutPage.cta.subtitle')}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg">{t('aboutPage.cta.signUpNow')}</Button>
          <Button variant="outline" size="lg">
            {t('aboutPage.cta.learnMore')}
          </Button>
        </div>
      </div>
    </section>
  );
};
