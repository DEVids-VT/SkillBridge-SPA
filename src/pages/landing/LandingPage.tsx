import { useEffect } from 'react';
import { HeroSection } from './components/HeroSection';
import { CategoryGrid } from './components/CategoryGrid';
import { useJobCategories } from './useJobCategories';
import { CompanyMarquee } from './components/CompanyMarquee';
import { companiesData } from '../companies/newCompaniesData';

const LandingPage = () => {
  const { jobCategories, subcategories } = useJobCategories();

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <HeroSection />
      <CategoryGrid categories={jobCategories} />

      {/* Company logos marquee */}
      <CompanyMarquee companies={companiesData} />
    </div>
  );
};

export default LandingPage;
