import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { ArrowRight, Check } from 'lucide-react';
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
    <section className="relative min-h-[700px] overflow-hidden">
      {/* Video Background - only on right side for larger screens */}
      <div className="absolute inset-0 md:w-1/2 md:left-1/2 h-full z-0">
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
        <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-l from-white via-white/80 to-white z-10"></div>
      </div>

      {/* Content */}
      <div className="container px-6 lg:px-8 mx-auto relative z-30 h-full [&_*]:!transition-none [&_*]:!transform-none">
        <div className="grid grid-cols-1 md:grid-cols-2 h-full">
          <div className="flex flex-col justify-center py-16 md:py-24">
            <div className="max-w-xl">
              <div className="flex items-center space-x-2 mb-6">
                <div className="flex items-center">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 p-1 text-blue-600">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  <span className="ml-2 text-sm font-medium text-blue-600">№1 Стажантска платформа </span>
                </div>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 text-gray-900 leading-[1.1]">
                Мостът между образованието и успеха
              </h1>

              <p className="text-xl md:text-2xl mb-10 text-gray-600 max-w-3xl leading-relaxed">
                От студенти за студенти - където знанието среща възможности и ражда кариера
              </p>

              <div className="flex flex-wrap gap-4 mb-12">
                <Button
                  asChild
                  size="lg"
                  className="gap-2 bg-blue-600 text-white rounded-md px-6 py-6 text-base font-medium !transition-none !transform-none hover:!bg-blue-600 hover:!scale-100 hover:!shadow-none"
                >
                  <Link to="/register" className="!transition-none hover:!opacity-100 hover:!no-underline">
                    Започни сега
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-2 border-gray-300 text-gray-700 bg-white rounded-md px-6 py-6 text-base font-medium !transition-none !transform-none hover:!bg-white hover:!scale-100 hover:!shadow-none"
                >
                  <Link to="/projects" className="!transition-none hover:!opacity-100 hover:!no-underline">Разгледай проекти</Link>
                </Button>
              </div>

              {/* Feature list */}
              <div className="space-y-3">
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-blue-600 mr-2" />
                  <span className="text-gray-600 font-medium">Стажове във водещи компании</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-blue-600 mr-2" />
                  <span className="text-gray-600 font-medium">Реални проекти с менторство</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-blue-600 mr-2" />
                  <span className="text-gray-600 font-medium">Безплатни курсове и събития</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
