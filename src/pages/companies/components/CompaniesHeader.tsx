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
  const { t } = useTranslation('companies');

  return (
    <div className={layouts.pageHeader + ' text-foreground'}>
      <div className={layouts.pageHeaderBackground}></div>
      <h1 className={layouts.pageTitle}>
        <span className="text-accent">{t('companiesPage.header.title1')}</span>{' '}
        <span className="text-foreground">{t('companiesPage.header.title2')}</span>
      </h1>
      <p className={layouts.pageDescription + ' text-muted-foreground'}>
        {t('companiesPage.header.subtitle')}
      </p>

      {/* Search bar */}
      <form onSubmit={handleSearch} className="max-w-3xl mx-auto relative">
        <div className="relative flex items-center">
          <Input
            type="text"
            placeholder={t('companiesPage.header.searchPlaceholder')}
            className="h-14 pl-6 pr-12 rounded-full shadow-sm border border-border bg-card text-foreground placeholder-muted-foreground"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            type="submit"
            className="absolute right-4 bg-accent hover:bg-accent/80 text-accent-foreground rounded-full p-2 transition-colors"
            aria-label={t('companiesPage.header.searchAriaLabel')}
          >
            <Search className="h-5 w-5" />
          </button>
        </div>
        <div className="flex justify-center gap-4 mt-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Building2 size={14} /> {t('companiesPage.header.topCompanies')}
          </span>
          <span className="flex items-center gap-1">
            <TrendingUp size={14} /> {t('companiesPage.header.partners')}
          </span>
        </div>
      </form>
    </div>
  );
};
