import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Building2 } from 'lucide-react';
import { Company } from '../types';
import { layouts, typography, cards, colors, components } from '@/lib/design-system';
import { cn } from '@/lib/utils';

interface CompanyMarqueeProps {
  companies: Company[];
}

export const CompanyMarquee = ({ companies }: CompanyMarqueeProps) => {
  const { t } = useTranslation('landing');

  return (
    <section className={cn('relative min-h-screen overflow-hidden bg-gradient-to-br from-background via-card to-primary', 'py-20')}>
      {/* Modern Dots Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle, ${colors.yellow} 1px, transparent 1px)`,
            backgroundSize: '30px 30px',
            backgroundPosition: '0 0, 15px 15px',
          }}
        />
      </div>

      {/* Gradient overlay for better readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-card/80 via-background/60 to-card/80" />

      {/* Content Container */}
      <div className={cn('relative z-10', 'container mx-auto px-6 lg:px-8')}>
        {/* Section Header */}
        <div className="text-center mb-16 space-y-6">
          <div className={cn(components.tag, components.tagColors.blue, 'inline-flex items-center space-x-2 border border-accent')}>
            <Building2 className="h-4 w-4" />
            <span>{t('landingPage.companyMarquee.badge')}</span>
          </div>

          <h2 className={typography.sectionTitle.main}>
            {t('landingPage.companyMarquee.title')}
          </h2>

          <p className={cn(typography.body.lg, 'text-accent max-w-3xl mx-auto leading-relaxed')}>
            {t('landingPage.companyMarquee.subtitle')}
          </p>
        </div>

        {/* Company Grid */}
        <div className={cn(layouts.grid.cards4, 'lg:grid-cols-5 max-w-6xl mx-auto mb-16')}>
          {companies.slice(0, 10).map((company) => (
            <div key={company.id} className="group cursor-pointer">
              <div className="relative flex flex-col items-center space-y-4">
                {/* Company Card */}
                <div className={cn(
                  cards.base,
                  'w-full aspect-square max-w-[160px] flex items-center justify-center p-6',
                  'backdrop-blur-sm transition-colors'
                )}>
                  <img
                    src={company.logo}
                    alt={`${company.name} logo`}
                    className="max-h-full max-w-full object-contain filter grayscale-[50%] group-hover:grayscale-0 transition-all"
                    loading="lazy"
                  />
                </div>

                {/* Company Info */}
                <div className="text-center space-y-1">
                  <h3 className={cn(typography.body.default, 'text-sm font-semibold group-hover:text-accent transition-colors duration-300 line-clamp-1')}>
                    {company.name}
                  </h3>
                  <p className={cn(typography.body.sm, 'text-accent')}>{company.industry}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className={cn(layouts.grid.cards3, 'max-w-4xl mx-auto mb-16')}>
          <div className={cn(cards.base, 'text-center backdrop-blur-sm')}>
            <div className={cards.body}>
              <div className={cn(typography.heading[2], 'text-accent mb-2')}>50+</div>
              <div className={cn(typography.body.default, 'font-medium')}>
                {t('landingPage.companyMarquee.stats.companies')}
              </div>
            </div>
          </div>
          <div className={cn(cards.base, 'text-center backdrop-blur-sm')}>
            <div className={cards.body}>
              <div className={cn(typography.heading[2], 'text-accent mb-2')}>500+</div>
              <div className={cn(typography.body.default, 'font-medium')}>
                {t('landingPage.companyMarquee.stats.projects')}
              </div>
            </div>
          </div>
          <div className={cn(cards.base, 'text-center backdrop-blur-sm')}>
            <div className={cards.body}>
              <div className={cn(typography.heading[2], 'text-accent mb-2')}>95%</div>
              <div className={cn(typography.body.default, 'font-medium')}>
                {t('landingPage.companyMarquee.stats.success')}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center space-y-6">
          <div className="space-y-3">
            <h3 className={typography.heading[3]}>
              {t('landingPage.companyMarquee.cta.title')}
            </h3>
            <p className={cn(typography.body.lg, 'text-accent max-w-2xl mx-auto')}>
              {t('landingPage.companyMarquee.cta.subtitle')}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-accent hover:bg-accent/80 text-accent-foreground px-8 py-4 text-lg font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <Link to="/companies" className="flex items-center gap-2">
                {t('landingPage.companyMarquee.cta.joinButton')}
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-2 border-primary hover:border-accent text-foreground hover:text-accent bg-card/80 backdrop-blur-sm px-8 py-4 text-lg font-medium rounded-xl transition-all duration-300"
            >
              <Link to="/about">{t('landingPage.companyMarquee.cta.learnMoreButton')}</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Reduced Floating Elements - Only one static bubble */}
      <div className="absolute top-1/4 right-16 w-20 h-20 bg-accent rounded-full mix-blend-multiply filter blur-xl opacity-40" />
    </section>
  );
};
