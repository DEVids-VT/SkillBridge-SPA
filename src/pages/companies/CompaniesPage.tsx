import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { layouts, spacing, typography, cards, colors } from '@/lib/design-system';
import { cn } from '@/lib/utils';
import { Search, Building2, MapPin, Users, Calendar, Award, Globe } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { companiesData, industryFilters, partnershipLevelFilters } from './newCompaniesData';
import { Company } from './types';

const CompaniesPage = () => {
  const { t } = useTranslation('companies');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  const [selectedPartnership, setSelectedPartnership] = useState('all');

  // Filter companies based on search and filters
  const filteredCompanies = companiesData.filter((company) => {
    const matchesSearch = company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.industry.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesIndustry = selectedIndustry === 'all' || 
      company.industry.toLowerCase().replace(/\s+/g, '-') === selectedIndustry;
    
    const matchesPartnership = selectedPartnership === 'all' || 
      company.partnershipLevel.toLowerCase() === selectedPartnership;

    return matchesSearch && matchesIndustry && matchesPartnership;
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const getPartnershipBadgeStyle = (level: string) => {
    switch (level.toLowerCase()) {
      case 'gold':
        return 'bg-[#ffd60a] text-[#001d3d]';
      case 'silver':
        return 'bg-[#ffc300] text-[#001d3d]';
      case 'bronze':
        return 'bg-[#003566] text-[#ffd60a]';
      default:
        return 'bg-[#001d3d] text-[#ffd60a]';
    }
  };

  return (
    <div className={cn('min-h-screen bg-[#000814]', spacing.container, 'py-8')}>
      {/* Page Header */}
      <div className={layouts.pageHeader}>
        <div className={layouts.pageHeaderBackground}></div>
        <h1 className={layouts.pageTitle}>
          <span className="text-[#ffd60a]">{t('companiesPage.title1', 'Partner')}</span>{' '}
          <span className="text-white">{t('companiesPage.title2', 'Companies')}</span>
        </h1>
        <p className={layouts.pageDescription}>
          {t(
            'companiesPage.subtitle',
            'Discover the innovative companies that trust our platform to connect with top talent and drive their success forward.'
          )}
        </p>

        {/* Search and Filters */}
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="relative">
            <div className="relative flex items-center">
              <Input
                type="text"
                placeholder={t('companiesPage.searchPlaceholder', 'Search companies...')}
                className="h-14 pl-6 pr-12 rounded-xl shadow-sm border-2 border-[#003566] bg-[#001d3d] text-white placeholder-gray-400 focus:border-[#ffd60a]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="absolute right-4 bg-[#ffc300] hover:bg-[#ffd60a] text-[#001d3d] rounded-lg p-2 transition-colors"
                aria-label="Search companies"
              >
                <Search className="h-5 w-5" />
              </button>
            </div>
          </form>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-4 justify-center">
            {/* Industry Filters */}
            <div className="flex flex-wrap gap-2">
              {industryFilters.slice(0, 6).map((filter) => (
                <Button
                  key={filter.id}
                  variant={selectedIndustry === filter.id ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedIndustry(filter.id)}
                  className={cn(
                    'rounded-full transition-all',
                    selectedIndustry === filter.id
                      ? 'bg-[#ffc300] text-[#001d3d] hover:bg-[#ffd60a]'
                      : 'border-[#003566] text-white hover:border-[#ffd60a] hover:text-[#ffd60a] bg-[#001d3d]'
                  )}
                >
                  {filter.name}
                </Button>
              ))}
            </div>

            {/* Partnership Level Filters */}
            <div className="flex flex-wrap gap-2">
              {partnershipLevelFilters.map((filter) => (
                <Button
                  key={filter.id}
                  variant={selectedPartnership === filter.id ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedPartnership(filter.id)}
                  className={cn(
                    'rounded-full transition-all',
                    selectedPartnership === filter.id
                      ? 'bg-[#ffc300] text-[#001d3d] hover:bg-[#ffd60a]'
                      : 'border-[#003566] text-white hover:border-[#ffd60a] hover:text-[#ffd60a] bg-[#001d3d]'
                  )}
                >
                  <Award className="h-3 w-3 mr-1" />
                  {filter.name}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Companies Grid */}
      <div className="space-y-8">
        {/* Results Count */}
        <div className="text-center text-gray-300">
          <span className="text-[#ffd60a] font-semibold">{filteredCompanies.length}</span> companies found
        </div>

        {/* Company Cards Grid */}
        <div className={layouts.grid.cards3}>
          {filteredCompanies.map((company) => (
            <div key={company.id} className={cn(cards.base, 'group transition-colors')}>
              {/* Company Header */}
              <div className={cards.header}>
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-16 h-16 bg-white rounded-lg p-2 flex items-center justify-center">
                    <img
                      src={company.logo}
                      alt={`${company.name} logo`}
                      className="max-w-full max-h-full object-contain"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className={typography.heading[4]}>{company.name}</h3>
                    <Badge className={cn('mt-1', getPartnershipBadgeStyle(company.partnershipLevel))}>
                      <Award className="h-3 w-3 mr-1" />
                      {company.partnershipLevel} Partner
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Company Body */}
              <div className={cards.body}>
                <p className={cn(typography.body.default, 'mb-4 line-clamp-3')}>
                  {company.description}
                </p>

                {/* Company Details */}
                <div className="space-y-2 text-sm text-gray-300">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-[#ffd60a]" />
                    <span>{company.industry}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-[#ffd60a]" />
                    <span>{company.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-[#ffd60a]" />
                    <span>{company.employeeCount} employees</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-[#ffd60a]" />
                    <span>Founded {company.yearFounded}</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {company.tags.slice(0, 3).map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="border-[#003566] text-[#ffd60a] hover:border-[#ffd60a]"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Company Footer */}
              <div className={cards.footer}>
                <div className="flex items-center text-sm text-gray-400">
                  <span>Partner since {company.partnerSince}</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-[#003566] text-[#ffd60a] hover:border-[#ffd60a] hover:bg-[#ffd60a] hover:text-[#001d3d] transition-colors"
                  onClick={() => window.open(company.website, '_blank')}
                >
                  <Globe className="h-3 w-3 mr-1" />
                  Visit Website
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredCompanies.length === 0 && (
          <div className="text-center py-16">
            <Building2 className="h-16 w-16 text-[#003566] mx-auto mb-4" />
            <h3 className={typography.heading[3]}>No companies found</h3>
            <p className={typography.body.default}>
              Try adjusting your search or filter criteria to find more companies.
            </p>
            <Button
              variant="outline"
              className="mt-4 border-[#003566] text-[#ffd60a] hover:border-[#ffd60a]"
              onClick={() => {
                setSearchQuery('');
                setSelectedIndustry('all');
                setSelectedPartnership('all');
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompaniesPage;
