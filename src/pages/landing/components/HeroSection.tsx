import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';

export const HeroSection = () => {
  const { t } = useTranslation();
  const videoRef = useRef<HTMLVideoElement>(null);

  // Ensure video plays automatically when component mounts
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.error('Video autoplay failed:', error);
      });
    }
  }, []);

  return (
    <section className="relative min-h-[600px] md:min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full z-0">
        <video
          ref={videoRef}
          className="absolute top-0 left-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster="/placeholder-poster.jpg"
        >
          <source src="/videos/bridgevideo3.mp4" type="video/mp4" />
          {t('videoNotSupported', 'Your browser does not support the video tag.')}
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/80 to-white z-10"></div>
      </div>

      {/* Content Positioned on top of video - Hero Section */}
      <div className="container px-4 lg:px-8 mx-auto relative z-30 flex flex-col h-full">
        <div className="flex-1 flex flex-col items-center justify-center pt-20 pb-16">
          <div className="w-full max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <img
                src="/images/svgsblogo.svg"
                alt={t('logoAlt', 'SkillBridge Logo')}
                className="h-20 md:h-28 drop-shadow-lg"
              />
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-700 drop-shadow-md">
              {t('landingPage.hero.title', 'Bridge the Gap Between Learning and Employment')}
            </h1>

            <p className="text-xl md:text-2xl mt-2 mb-8 text-gray-500 font-medium max-w-3xl mx-auto drop-shadow-md">
              {t(
                'landingPage.hero.newSubtitle',
                'Platform for internships through real company projects and verified paths to employment'
              )}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Button
                asChild
                size="lg"
                className="gap-2 bg-blue-600 hover:bg-blue-700 font-medium text-white border-2 border-blue-500 shadow-lg"
              >
                <Link to="/register">
                  {t('landingPage.hero.primaryCta', 'Get Started')}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-2 border-gray-500 text-gray-500 bg-transparent hover:bg-white/20 font-medium shadow-lg"
              >
                <Link to="/projects">{t('landingPage.hero.secondaryCta', 'Explore Projects')}</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Transition curve element for smooth flow to categories section */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-blue-50 rounded-t-[50%] z-20"></div>
    </section>
  );
};
