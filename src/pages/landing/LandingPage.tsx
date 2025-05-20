import { useEffect } from 'react';
import { HeroSection } from './components/HeroSection';
import { FeaturedCategories } from './components/FeaturedCategories';
import { CategoryGrid } from './components/CategoryGrid';
import { CallToAction } from './components/CallToAction';
import { useJobCategories } from './useJobCategories';

const LandingPage = () => {
  const { jobCategories, subcategories } = useJobCategories();

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <HeroSection />
      <div className="container mx-auto px-4 lg:px-8 relative z-30">
        <FeaturedCategories categories={jobCategories} />
      </div>
      <CategoryGrid categories={jobCategories} />
      <CallToAction />
    </div>
  );
};

export default LandingPage;
