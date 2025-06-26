import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CategoryType } from '../types';

type CategoryGridProps = {
  categories: CategoryType[];
};

// Background image mapping for categories
const getCategoryBackground = (categoryId: string, index: number) => {
  const imageNumber = (index % 8) + 1; // Cycle through images 1-8
  return `url('/images/landing-categories/${imageNumber}.png')`;
};

export const CategoryGrid = ({ categories }: CategoryGridProps) => {
  const { t } = useTranslation('landing');
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    align: 'start',
    skipSnaps: false,
    dragFree: true,
  });
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section className="relative py-20 bg-gray-50">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-6">
          <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium border border-blue-200">
            <div className="flex h-2 w-2 bg-blue-500 rounded-full animate-pulse" />
            <span>{t('landingPage.categoryGrid.badge')}</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 leading-[1.1]">
            {t('landingPage.categoryGrid.title')}
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t('landingPage.categoryGrid.subtitle')}
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white shadow-lg hover:shadow-xl disabled:opacity-50"
            onClick={scrollPrev}
            disabled={!prevBtnEnabled}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white shadow-lg hover:shadow-xl disabled:opacity-50"
            onClick={scrollNext}
            disabled={!nextBtnEnabled}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          {/* Embla Carousel */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6">
              {categories.map((category, index) => (
                <div key={category.id} className="flex-[0_0_300px] md:flex-[0_0_350px]">
                  <Link to={`/projects?category=${category.id}`} className="block h-full">
                    <Card 
                      className="relative h-[400px] overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow duration-300"
                      style={{
                        backgroundImage: getCategoryBackground(category.id, index),
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                      }}
                    >
                      {/* Dark overlay for better text readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/20" />

                      {/* Content */}
                      <div className="relative h-full flex flex-col justify-between p-8">
                        {/* Top Label */}
                        <div className="flex justify-start">
                          <span className="inline-block bg-black/30 backdrop-blur-sm text-white text-sm font-medium px-3 py-1.5 rounded-lg border border-white/20">
                            {t('landingPage.categoryGrid.categoryCard.label')}
                          </span>
                        </div>

                        {/* Bottom Content */}
                        <div className="space-y-4">
                          <h3 className="text-white text-2xl md:text-3xl font-bold leading-tight drop-shadow-lg">
                            {category.name}
                          </h3>
                          
                          {/* Minimalist project count */}
                          <div className="text-white/80 text-sm drop-shadow">
                            {category.count} {t('landingPage.categoryGrid.categoryCard.availableProjects')}
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Carousel Indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: Math.ceil(categories.length / 3) }).map((_, index) => (
            <div
              key={index}
              className="w-2 h-2 rounded-full bg-gray-300 hover:bg-blue-500 transition-colors cursor-pointer"
            />
          ))}
        </div>
      </div>
    </section>
  );
};
