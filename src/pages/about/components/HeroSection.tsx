import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { spacing, layouts } from '@/lib/design-system';
import { cn } from '@/lib/utils';

export const HeroSection = () => {
  const { t } = useTranslation();

  return (
    <div className={layouts.pageHeader}>
      <div className={layouts.pageHeaderBackground}></div>
      <h1 className={layouts.pageTitle}>
        <span className="text-blue-600">{t('about')}</span>{' '}
        <span className="text-gray-600">{t('appName')}</span>
      </h1>
      <p className={layouts.pageDescription}>
        {t('aboutPage.hero.subtitle')}
      </p>
      <div className="flex justify-center gap-4">
        <Button>{t('aboutPage.hero.ourStory')}</Button>
        <Button variant="outline">{t('aboutPage.hero.joinOurTeam')}</Button>
      </div>
    </div>
  );
};
