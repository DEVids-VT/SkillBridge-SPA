import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { ArrowRight, Users, Award, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

export const HeroSection = () => {
  const { t } = useTranslation('landing');

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#000814] via-[#001d3d] to-[#003566]">
      {/* Modern Dots Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle, #ffd60a 1px, transparent 1px)`,
            backgroundSize: '30px 30px',
            backgroundPosition: '0 0, 15px 15px'
          }}
        />
      </div>
      
      {/* Gradient overlay for better readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#001d3d]/80 via-[#000814]/60 to-[#001d3d]/80" />

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center min-h-screen text-center space-y-8">
          
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-[#003566] text-[#ffd60a] px-4 py-2 rounded-full text-sm font-medium border border-[#ffd60a]">
            <div className="flex h-2 w-2 bg-[#ffd60a] rounded-full animate-pulse" />
            <span>{t('landingPage.hero.badge')}</span>
          </div>

          {/* Main Title */}
          <div className="space-y-6 max-w-4xl">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
              {t('landingPage.hero.title')}
            </h1>
            
            <p className="text-xl md:text-2xl text-[#ffd60a] max-w-3xl mx-auto leading-relaxed">
              {t('landingPage.hero.subtitle')}
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button
              asChild
              size="lg"
              className="bg-[#ffc300] hover:bg-[#ffd60a] text-[#001d3d] px-8 py-4 text-lg font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
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
              className="border-2 border-[#003566] hover:border-[#ffd60a] text-white hover:text-[#ffd60a] bg-[#001d3d]/80 backdrop-blur-sm px-8 py-4 text-lg font-medium rounded-xl transition-all duration-300"
            >
              <Link to="/projects">{t('landingPage.hero.secondaryCta')}</Link>
            </Button>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 max-w-4xl w-full">
            <div className="flex flex-col items-center p-6 bg-[#001d3d]/80 backdrop-blur-sm rounded-xl border border-[#003566] shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-center w-12 h-12 bg-[#003566] rounded-lg mb-4">
                <Users className="h-6 w-6 text-[#ffd60a]" />
              </div>
              <p className="text-white font-medium text-center">{t('landingPage.hero.features.feature1')}</p>
            </div>
            
            <div className="flex flex-col items-center p-6 bg-[#001d3d]/80 backdrop-blur-sm rounded-xl border border-[#003566] shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-center w-12 h-12 bg-[#003566] rounded-lg mb-4">
                <Award className="h-6 w-6 text-[#ffd60a]" />
              </div>
              <p className="text-white font-medium text-center">{t('landingPage.hero.features.feature2')}</p>
            </div>
            
            <div className="flex flex-col items-center p-6 bg-[#001d3d]/80 backdrop-blur-sm rounded-xl border border-[#003566] shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-center w-12 h-12 bg-[#003566] rounded-lg mb-4">
                <BookOpen className="h-6 w-6 text-[#ffd60a]" />
              </div>
              <p className="text-white font-medium text-center">{t('landingPage.hero.features.feature3')}</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 pt-8 max-w-md">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-[#ffd60a]">500+</div>
              <div className="text-sm text-white">{t('landingPage.hero.stats.projects')}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-[#ffd60a]">50+</div>
              <div className="text-sm text-white">{t('landingPage.hero.stats.companies')}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-[#ffd60a]">1000+</div>
              <div className="text-sm text-white">{t('landingPage.hero.stats.students')}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Reduced Floating Elements - Only one static bubble */}
      <div className="absolute top-1/3 right-20 w-16 h-16 bg-[#ffc300] rounded-full mix-blend-multiply filter blur-xl opacity-30" />
    </section>
  );
};
