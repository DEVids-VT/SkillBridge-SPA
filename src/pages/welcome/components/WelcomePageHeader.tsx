import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';

export default function WelcomePageHeader() {
  const { t } = useTranslation('welcome');

  return (
    <>
      {/* Logo Badge */}
      <div className="flex justify-center mb-6">
        <div
          className="inline-flex items-center justify-center px-3 py-1.5 rounded-full backdrop-blur-sm border bg-primary border-primary"
        >
          <img
            src="/images/sblogosmall.svg"
            alt="SkillBridge"
            className="h-6 object-contain mr-2"
          />
          <span className="text-xs font-medium text-primary-foreground">
            {t('welcome.badge')}
          </span>
        </div>
      </div>

      {/* Page Header */}
      <div className="text-center mb-10 max-w-3xl mx-auto">
        <h1
          className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 leading-tight text-foreground"
        >
          <span>
            {t('welcome.title', { appName: t('welcome.appName') })}
          </span>
        </h1>
      </div>
    </>
  );
}
