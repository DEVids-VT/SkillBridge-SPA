import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { spacing } from '@/lib/design-system';
import { CompaniesHeader } from './components/CompaniesHeader';
import { FeaturedCompanies } from './components/FeaturedCompanies';
import { FilterSection } from './components/FilterSection';
import { CompaniesList } from './components/CompaniesList';
import { PartnershipBenefits } from './components/PartnershipBenefits';
import { companiesData, industryFilters, partnershipLevelFilters } from './companiesData';

const CompaniesPage = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  const [selectedPartnershipLevel, setSelectedPartnershipLevel] = useState('all');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality
    console.log('Searching for:', searchQuery);
  };

  // Filter companies based on selections
  const filteredCompanies = companiesData.filter((company) => {
    // Filter by industry (simplified matching)
    const industryMatch =
      selectedIndustry === 'all' ||
      company.industry.toLowerCase().includes(selectedIndustry.toLowerCase());

    // Filter by partnership level
    const partnershipMatch =
      selectedPartnershipLevel === 'all' ||
      company.partnershipLevel.toLowerCase() === selectedPartnershipLevel.toLowerCase();

    // Return if both conditions are met
    return industryMatch && partnershipMatch;
  });

  const handleLoadMore = () => {
    console.log('Loading more companies...');
    // This would load more companies from an API in a real application
  };

  return (
    <div className={cn(spacing.container, spacing.headerOffset, 'py-8')}>
      {/* Header section */}
      <CompaniesHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
      />
      {/* Featured companies section */}
      <FeaturedCompanies
        companies={companiesData}
        onViewCompanyDetails={(company) => {
          console.log('Viewing company details:', company);
          // Here you would typically open a modal or navigate to a detail page
        }}
      />

      {/* Filter section */}
      <FilterSection
        industryFilters={industryFilters}
        selectedIndustry={selectedIndustry}
        setSelectedIndustry={setSelectedIndustry}
        partnershipLevelFilters={partnershipLevelFilters}
        selectedPartnershipLevel={selectedPartnershipLevel}
        setSelectedPartnershipLevel={setSelectedPartnershipLevel}
      />
      {/* Companies list */}
      <CompaniesList
        companies={filteredCompanies}
        loadMore={handleLoadMore}
        onViewCompanyDetails={(company) => {
          console.log('Viewing company details:', company);
          // Here you would typically open a modal or navigate to a detail page
        }}
      />

      {/* Partnership benefits section */}
      <PartnershipBenefits />
    </div>
  );
};

export default CompaniesPage;
