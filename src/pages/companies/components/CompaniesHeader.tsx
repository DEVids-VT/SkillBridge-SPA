import { useTranslation } from 'react-i18next';
import { Search, Building2, TrendingUp } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { layouts } from '@/lib/design-system';

interface CompaniesHeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: (e: React.FormEvent) => void;
}

export const CompaniesHeader = ({
  searchQuery,
  setSearchQuery,
  handleSearch,
}: CompaniesHeaderProps) => {
  const { t } = useTranslation();

  return (
    <div className={layouts.pageHeader}>
      <div className={layouts.pageHeaderBackground}></div>
      <h1 className={layouts.pageTitle}>
        <span className="text-blue-600">Our Partner</span>{' '}
        <span className="text-gray-600">Companies</span>
      </h1>
      <p className={layouts.pageDescription}>
        Discover our network of partner companies that collaborate with us to create opportunities,
        drive innovation, and support talent development.
      </p>

      {/* Search bar */}
      <form onSubmit={handleSearch} className="max-w-3xl mx-auto relative">
        <div className="relative flex items-center">
          <Input
            type="text"
            placeholder={t(
              'searchCompaniesPlaceholder',
              'Search companies by name, industry, or location'
            )}
            className="h-14 pl-6 pr-12 rounded-full shadow-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            type="submit"
            className="absolute right-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2 transition-colors"
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </button>
        </div>
        <div className="flex justify-center gap-4 mt-4 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <Building2 size={14} /> {t('topCompanies', '500+ partner companies')}
          </span>
          <span className="flex items-center gap-1">
            <TrendingUp size={14} /> {t('companiesTrending', 'Trending: Tech, Healthcare, Finance')}
          </span>
        </div>
      </form>
    </div>
  );
};
