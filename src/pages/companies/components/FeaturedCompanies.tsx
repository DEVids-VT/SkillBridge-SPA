import { Button } from '@/components/ui/button';
import { layouts } from '@/lib/design-system';
import { Company } from '../types';
import CompanyCardWrapper from './CompanyCardWrapper';
import { CompanyProps } from '@/pages/companies/components/CompanyCard';

interface FeaturedCompaniesProps {
  companies: Company[];
  onViewCompanyDetails?: (company: CompanyProps) => void;
}

export const FeaturedCompanies = ({ companies, onViewCompanyDetails }: FeaturedCompaniesProps) => {
  const featuredCompanies = companies.filter((company) => company.featured);

  if (featuredCompanies.length === 0) {
    return null;
  }

  return (
    <div className="mb-16">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">Featured Partners</h2>
        <Button variant="link" className="text-blue-600">
          View All Featured
        </Button>
      </div>
      <div className={layouts.grid.cards2}>
        {featuredCompanies.map((company) => (
          <CompanyCardWrapper
            key={company.id}
            company={company}
            onViewDetails={onViewCompanyDetails}
          />
        ))}
      </div>
    </div>
  );
};
