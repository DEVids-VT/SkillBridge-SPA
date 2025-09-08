import { useTranslation } from 'react-i18next';
import { colors, typography } from '@/lib/design-system';
import { cn } from '@/lib/utils';

export default function WelcomePageHeader() {
  const { t } = useTranslation('welcome');

  return (
    <>
      {/* Logo Badge */}
      <div className="flex justify-center mb-6">
        <div
          className="inline-flex items-center justify-center px-3 py-1.5 rounded-full backdrop-blur-sm border"
          style={{ backgroundColor: colors.blue, borderColor: colors.blue }}
        >
          <img
            src="/images/sblogosmall.svg"
            alt="SkillBridge"
            className="h-6 object-contain mr-2"
          />
          <span className="text-xs font-medium" style={{ color: colors.yellow }}>
            {t('welcome.badge')}
          </span>
        </div>
      </div>

      {/* Page Header */}
      <div className="text-center mb-10 max-w-3xl mx-auto">
        <h1
          className={cn(
            'text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 leading-tight',
            typography.heading[1]
          )}
          style={{ color: colors.white }}
        >
          <span>
            {t('welcome.title', { appName: t('welcome.appName') })}
          </span>
        </h1>
      </div>
    </>
  );
}
