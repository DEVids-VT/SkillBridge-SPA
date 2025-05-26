import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { spacing } from '@/lib/design-system';
import { CompaniesPageHeader, CompaniesList } from './components';
import { companiesData } from './newCompaniesData';
import { Company } from './types';

const CompaniesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustry] = useState('all');
  const [selectedPartnershipLevel] = useState('all');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality
    console.log('Searching for:', searchQuery);
  };

  // Filter companies based on selections
  const filteredCompanies = companiesData.filter((company) => {
    // Filter by search query
    const searchMatch = searchQuery === '' || 
      company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.industry.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by industry
    const industryMatch =
      selectedIndustry === 'all' ||
      company.industry.toLowerCase().includes(selectedIndustry.toLowerCase());

    // Filter by partnership level
    const partnershipMatch =
      selectedPartnershipLevel === 'all' ||
      company.partnershipLevel.toLowerCase() === selectedPartnershipLevel.toLowerCase();

    // Return if all conditions are met
    return searchMatch && industryMatch && partnershipMatch;
  });

  const handleLoadMore = () => {
    console.log('Loading more companies...');
    // This would load more companies from an API in a real application
  };

  return (
    <div className={cn(spacing.container, spacing.headerOffset, 'py-8')}>
      {/* Header section */}
      <CompaniesPageHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
      />

      {/* Companies list */}
      <CompaniesList
        companies={filteredCompanies}
        loadMore={handleLoadMore}
        onViewCompanyDetails={(company: Company) => {
          console.log('Viewing company details:', company);
          // Here you would typically open a modal or navigate to a detail page
        }}
      />
    </div>
  );
};

export default CompaniesPage;
