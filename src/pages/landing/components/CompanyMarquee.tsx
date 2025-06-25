import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Building2 } from 'lucide-react';
import { Company } from '../../companies/types';

interface CompanyMarqueeProps {
  companies: Company[];
}

export const CompanyMarquee = ({ companies }: CompanyMarqueeProps) => {
  const { t } = useTranslation();

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50 py-20">
      {/* Modern Dots Background Pattern */}
      <div className="absolute inset-0 opacity-25">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle, #3b82f6 1px, transparent 1px)`,
            backgroundSize: '30px 30px',
            backgroundPosition: '0 0, 15px 15px'
          }}
        />
      </div>
      
      {/* Gradient overlay for better readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/60 to-white/80" />

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-6">
          <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium border border-blue-200">
            <Building2 className="h-4 w-4" />
            <span>{t('landingPage.partners.badge', 'Trusted Partners')}</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 leading-[1.1]">
            {t('landingPage.partners.title', 'Leading Organizations Choose Us')}
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t('landingPage.partners.subtitle', 'Join these innovative companies that trust our platform to connect with top talent')}
          </p>
        </div>

        {/* Company Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 max-w-6xl mx-auto mb-16">
          {companies.slice(0, 10).map((company, index) => (
            <div
              key={company.id}
              className="group cursor-pointer"
            >
              <div className="relative flex flex-col items-center space-y-4">
                {/* Company Card */}
                <div className="w-full aspect-square max-w-[160px] flex items-center justify-center p-6 bg-white/70 backdrop-blur-sm rounded-xl shadow-sm border border-gray-200 transition-all duration-300 group-hover:shadow-lg group-hover:border-blue-300 group-hover:-translate-y-2">
                  <img
                    src={company.logo}
                    alt={`${company.name} logo`}
                    className="max-h-full max-w-full object-contain filter grayscale-[50%] group-hover:grayscale-0 transition-all duration-300"
                    loading="lazy"
                  />
                </div>

                {/* Company Info */}
                <div className="text-center space-y-1">
                  <h3 className="text-sm font-semibold text-gray-700 group-hover:text-blue-600 transition-colors duration-300 line-clamp-1">
                    {company.name}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {company.industry}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-16">
          <div className="text-center p-6 bg-white/70 backdrop-blur-sm rounded-xl border border-gray-200 shadow-sm">
            <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">50+</div>
            <div className="text-gray-600 font-medium">Партньорски Компании</div>
          </div>
          <div className="text-center p-6 bg-white/70 backdrop-blur-sm rounded-xl border border-gray-200 shadow-sm">
            <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">500+</div>
            <div className="text-gray-600 font-medium">Активни Проекти</div>
          </div>
          <div className="text-center p-6 bg-white/70 backdrop-blur-sm rounded-xl border border-gray-200 shadow-sm">
            <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">95%</div>
            <div className="text-gray-600 font-medium">Успех при Наемане</div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center space-y-6">
          <div className="space-y-3">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
              {t('landingPage.partners.cta', 'Want to become a partner?')}
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Присъединете се към нашата мрежа от иновативни компании и открийте най-добрите таланти
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <Link to="/companies" className="flex items-center gap-2">
                {t('landingPage.partners.ctaButton', 'Join Our Network')}
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-2 border-gray-300 hover:border-blue-300 text-gray-700 hover:text-blue-700 bg-white/80 backdrop-blur-sm px-8 py-4 text-lg font-medium rounded-xl transition-all duration-300"
            >
              <Link to="/about">Научи Повече</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Reduced Floating Elements - Only one static bubble */}
      <div className="absolute top-1/4 right-16 w-20 h-20 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-40" />
    </section>
  );
};
