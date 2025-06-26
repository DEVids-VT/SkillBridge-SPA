import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { ArrowRight, Users, Award, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

export const HeroSection = () => {
  const { t } = useTranslation('landing');

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Modern Dots Background Pattern */}
      <div className="absolute inset-0 opacity-40">
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
        <div className="flex flex-col items-center justify-center min-h-screen text-center space-y-8">
          
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium border border-blue-200">
            <div className="flex h-2 w-2 bg-blue-500 rounded-full animate-pulse" />
            <span>{t('landingPage.hero.badge')}</span>
          </div>

          {/* Main Title */}
          <div className="space-y-6 max-w-4xl">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-gray-900 leading-[1.1]">
              {t('landingPage.hero.title')}
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {t('landingPage.hero.subtitle')}
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button
              asChild
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <Link to="/register" className="flex items-center gap-2">
                {t('landingPage.hero.primaryCta')}
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-2 border-gray-300 hover:border-blue-300 text-gray-700 hover:text-blue-700 bg-white/80 backdrop-blur-sm px-8 py-4 text-lg font-medium rounded-xl transition-all duration-300"
            >
              <Link to="/projects">{t('landingPage.hero.secondaryCta')}</Link>
            </Button>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 max-w-4xl w-full">
            <div className="flex flex-col items-center p-6 bg-white/70 backdrop-blur-sm rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <p className="text-gray-700 font-medium text-center">{t('landingPage.hero.features.feature1')}</p>
            </div>
            
            <div className="flex flex-col items-center p-6 bg-white/70 backdrop-blur-sm rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
                <Award className="h-6 w-6 text-blue-600" />
              </div>
              <p className="text-gray-700 font-medium text-center">{t('landingPage.hero.features.feature2')}</p>
            </div>
            
            <div className="flex flex-col items-center p-6 bg-white/70 backdrop-blur-sm rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
              <p className="text-gray-700 font-medium text-center">{t('landingPage.hero.features.feature3')}</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 pt-8 max-w-md">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-blue-600">500+</div>
              <div className="text-sm text-gray-600">{t('landingPage.hero.stats.projects')}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-blue-600">50+</div>
              <div className="text-sm text-gray-600">{t('landingPage.hero.stats.companies')}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-blue-600">1000+</div>
              <div className="text-sm text-gray-600">{t('landingPage.hero.stats.students')}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Reduced Floating Elements - Only one static bubble */}
      <div className="absolute top-1/3 right-20 w-16 h-16 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30" />
    </section>
  );
};
