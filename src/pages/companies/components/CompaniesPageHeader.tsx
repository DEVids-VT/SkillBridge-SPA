import { useTranslation } from 'react-i18next';
import { Search, Building, Award } from 'lucide-react';
import { layouts } from '@/lib/design-system';

interface CompaniesPageHeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: (e: React.FormEvent) => void;
}

export const CompaniesPageHeader = ({
  searchQuery,
  setSearchQuery,
  handleSearch,
}: CompaniesPageHeaderProps) => {
  const { t } = useTranslation();

  return (
    <div className={layouts.pageHeader}>
      <div className={layouts.pageHeaderBackground}></div>
      <h1 className={layouts.pageTitle}>
        <span className="text-blue-600">{t('companiesPage.title1')}</span>{' '}
        <span className="text-gray-600">{t('companiesPage.title2')}</span>
      </h1>
      <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-10">
        {t('companiesPage.subtitle')}
      </p>

      {/* Search bar */}
      <form onSubmit={handleSearch} className="max-w-3xl mx-auto relative">
        <div className="relative flex items-center">
          <input
            type="text"
            placeholder={t('companiesPage.searchPlaceholder')}
            className="w-full px-6 py-4 pr-12 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            <Building size={14} /> {t('companiesPage.topCompanies')}
          </span>
          <span className="flex items-center gap-1">
            <Award size={14} /> {t('companiesPage.partners')}
          </span>
        </div>
      </form>
    </div>
  );
}; 