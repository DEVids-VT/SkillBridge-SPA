import { useTranslation } from 'react-i18next';
import { layouts, spacing } from '@/lib/design-system';
import { cn } from '@/lib/utils';
import { CompanyMarquee } from '../landing/components/CompanyMarquee';
import { companiesData } from './newCompaniesData';

const CompaniesPage = () => {
  const { t } = useTranslation();

  return (
    <div className={cn(spacing.container, spacing.headerOffset, 'py-8')}>
      {/* Page Header */}
      <div className={layouts.pageHeader}>
        <div className={layouts.pageHeaderBackground}></div>
        <h1 className={layouts.pageTitle}>
          <span className="text-blue-600">{t('companiesPage.title1', 'Partner')}</span>{' '}
          <span className="text-gray-600">{t('companiesPage.title2', 'Companies')}</span>
        </h1>
        <p className={layouts.pageDescription}>
          {t('companiesPage.subtitle', 'Discover the innovative companies that trust our platform to connect with top talent and drive their success forward.')}
        </p>
      </div>

      {/* Company Marquee */}
      <CompanyMarquee companies={companiesData} />
    </div>
  );
};

export default CompaniesPage;
