import { useTranslation } from 'react-i18next';
import { colors, typography, spacing, layouts } from '@/lib/design-system';
import { cn } from '@/lib/utils';

const AboutHero = () => {
  const { t } = useTranslation('about');

  return (
    <div className={cn(layouts.pageHeader, spacing.container, 'space-y-6')}>
      <div className="absolute -top-10 left-0 right-0 h-20 rounded-b-3xl -z-10" style={{ backgroundColor: colors.blue }}></div>
      <h1 className={cn(typography.sectionTitle.main, 'leading-[1.1]')}>
        <span style={{ color: colors.yellow }}>{t('aboutPage.header.title')}</span>{' '}
        <span className="text-white">{t('aboutPage.header.appName')}</span>
      </h1>

      <p className={cn('text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed', typography.body.lg)}>
        {t('aboutPage.header.subtitle')}
      </p>
    </div>
  );
};

export default AboutHero;
