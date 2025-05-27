import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';

export const CallToAction = () => {
  const { t } = useTranslation();

  return (
    <section className="bg-gray-50 rounded-xl p-8 md:p-12 text-center">
      <h2 className="text-2xl md:text-3xl font-bold mb-3">{t('coursesPage.cta.title')}</h2>
      <p className="text-gray-600 max-w-2xl mx-auto mb-6">{t('coursesPage.cta.description')}</p>
      <Button size="lg" asChild>
        <a href="/projects">{t('coursesPage.cta.button')}</a>
      </Button>
    </section>
  );
};
