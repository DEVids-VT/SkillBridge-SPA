import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Company } from '../types';
import { CompanyItem } from './CompanyItem';

interface CompaniesListProps {
  companies: Company[];
  loadMore?: () => void;
  onViewCompanyDetails?: (company: Company) => void;
}

export const CompaniesList = ({
  companies,
  loadMore,
  onViewCompanyDetails,
}: CompaniesListProps) => {
  const { t: tCompanies } = useTranslation('companies');

  return (
    <div className="space-y-6">
      {companies.map((company) => (
        <CompanyItem key={company.id} company={company} onViewDetails={onViewCompanyDetails} />
      ))}

      {companies.length > 0 && loadMore && (
        <div className="mt-12 flex justify-center">
          <Button variant="outline" className="rounded-full px-8" onClick={loadMore}>
            {tCompanies('loadMore', 'Load More Companies')}
          </Button>
        </div>
      )}

      {companies.length === 0 && (
        <div className="text-center py-16">
          <p className="text-gray-500">{tCompanies('noResults')}</p>
          <Button
            variant="link"
            className="mt-2 text-blue-600"
            onClick={() => window.location.reload()}
          >
            {tCompanies('resetFilters')}
          </Button>
        </div>
      )}
    </div>
  );
};
