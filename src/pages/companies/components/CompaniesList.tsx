import { Button } from '@/components/ui/button';
import { layouts } from '@/lib/design-system';
import { Company } from '../types';
import CompanyCardWrapper from './CompanyCardWrapper';
import { CompanyProps } from './CompanyCard';

interface CompaniesListProps {
  companies: Company[];
  loadMore: () => void;
  onViewCompanyDetails?: (company: CompanyProps) => void;
}

export const CompaniesList = ({
  companies,
  loadMore,
  onViewCompanyDetails,
}: CompaniesListProps) => {
  return (
    <div>
      <div className={layouts.grid.cards2}>
        {companies.map((company) => (
          <CompanyCardWrapper
            key={company.id}
            company={company}
            onViewDetails={onViewCompanyDetails}
          />
        ))}
      </div>

      {companies.length > 0 && (
        <div className="mt-12 flex justify-center">
          <Button variant="outline" className="rounded-full px-8" onClick={loadMore}>
            Load More Companies
          </Button>
        </div>
      )}

      {companies.length === 0 && (
        <div className="text-center py-16">
          <p className="text-gray-500">No companies match your current filters.</p>
          <Button
            variant="link"
            className="mt-2 text-blue-600"
            onClick={() => window.location.reload()}
          >
            Reset Filters
          </Button>
        </div>
      )}
    </div>
  );
};
