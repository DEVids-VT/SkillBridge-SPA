import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { spacing, colors, layouts, typography } from '@/lib/design-system';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Info, User, Edit3 } from 'lucide-react';

export default function CreatePage() {
  const navigate = useNavigate();
  const { t } = useTranslation('createProject');

  const handlePersonaClick = () => {
    navigate('/create/persona');
  };

  const handleManualClick = () => {
    navigate('/create/manual');
  };

  return (
    <div className="relative min-h-screen" style={{ backgroundColor: colors.dark }}>
      {/* Soft Grid Pattern Background */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(${colors.blue}33 1px, transparent 1px),
            linear-gradient(90deg, ${colors.blue}33 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          maskImage: 'radial-gradient(ellipse 70% 60% at 50% 50%, black 30%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 50%, black 30%, transparent 70%)'
        }}
      />
      
      {/* Background accent elements */}
      <div 
        className="absolute top-20 right-20 w-72 h-72 rounded-full opacity-10 blur-3xl"
        style={{ backgroundColor: colors.blue }}
      />
      <div 
        className="absolute bottom-20 left-20 w-60 h-60 rounded-full opacity-15 blur-3xl"
        style={{ backgroundColor: colors.orange }}
      />

      <div className={cn(spacing.container, spacing.section)}>
        {/* Page Header */}
        <div className={layouts.pageHeader}>
          <div className={layouts.pageHeaderBackground} />
          <h1 className={layouts.pageTitle}>
            <span style={{ color: colors.yellow }}>{t('createPage.header.title1')}</span>{' '}
            <span style={{ color: colors.white }}>{t('createPage.header.title2')}</span>
          </h1>
          <p className={layouts.pageDescription}>
            {t('createPage.header.subtitle')}
          </p>
        </div>

        {/* Main Content */}
        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl w-full">
            
            {/* Persona Card */}
            <div 
              className="group relative overflow-hidden border-2 cursor-pointer rounded-xl"
              onClick={handlePersonaClick}
              style={{ 
                backgroundColor: colors.blueDark,
                borderColor: colors.blue
              }}
            >
              {/* Card Header with Icon */}
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div 
                    className="w-16 h-16 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: colors.blue }}
                  >
                    <User className="h-8 w-8" style={{ color: colors.white }} />
                  </div>
                  
                  {/* Info Button */}
                  <div className="relative group/tooltip">
                    <div 
                      className="w-8 h-8 rounded-full flex items-center justify-center cursor-help transition-colors"
                      style={{ backgroundColor: colors.blue + '40' }}
                    >
                      <Info className="h-4 w-4" style={{ color: colors.white }} />
                    </div>
                    
                    {/* Tooltip */}
                    <div className="absolute right-0 top-10 w-64 p-3 rounded-lg border opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-opacity z-10"
                         style={{ backgroundColor: colors.dark, borderColor: colors.blue }}>
                      <p className={cn('text-xs', typography.body.sm)}>
                        {t('createPage.personaCard.infoTooltip')}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold mb-3 text-white">
                    {t('createPage.personaCard.title')}
                  </h3>
                  
                  <p className={cn(typography.body.default, 'leading-relaxed mb-6 min-h-[60px] flex items-center')}>
                    {t('createPage.personaCard.description')}
                  </p>

                  <Button 
                    className="w-full py-3 font-medium"
                    style={{ backgroundColor: colors.blue, color: colors.white }}
                  >
                    {t('createPage.personaCard.button')}
                  </Button>
                </div>
              </div>
            </div>

            {/* Manual Card */}
            <div 
              className="group relative overflow-hidden border-2 cursor-pointer rounded-xl"
              onClick={handleManualClick}
              style={{ 
                backgroundColor: colors.blueDark,
                borderColor: colors.blue
              }}
            >
              {/* Card Header with Icon */}
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div 
                    className="w-16 h-16 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: colors.orange }}
                  >
                    <Edit3 className="h-8 w-8" style={{ color: colors.dark }} />
                  </div>
                  
                  {/* Info Button */}
                  <div className="relative group/tooltip">
                    <div 
                      className="w-8 h-8 rounded-full flex items-center justify-center cursor-help transition-colors"
                      style={{ backgroundColor: colors.blue + '40' }}
                    >
                      <Info className="h-4 w-4" style={{ color: colors.white }} />
                    </div>
                    
                    {/* Tooltip */}
                    <div className="absolute right-0 top-10 w-64 p-3 rounded-lg border opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-opacity z-10"
                         style={{ backgroundColor: colors.dark, borderColor: colors.blue }}>
                      <p className={cn('text-xs', typography.body.sm)}>
                        {t('createPage.manualCard.infoTooltip')}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold mb-3 text-white">
                    {t('createPage.manualCard.title')}
                  </h3>
                  
                  <p className={cn(typography.body.default, 'leading-relaxed mb-6 min-h-[60px] flex items-center')}>
                    {t('createPage.manualCard.description')}
                  </p>

                  <Button 
                    className="w-full py-3 font-medium"
                    style={{ backgroundColor: colors.orange, color: colors.dark }}
                  >
                    {t('createPage.manualCard.button')}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 