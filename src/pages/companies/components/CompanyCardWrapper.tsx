import { CompanyCard, CompanyProps } from '@/pages/companies/components/CompanyCard';

interface CompanyCardWrapperProps {
  company: CompanyProps;
  onViewDetails?: (company: CompanyProps) => void;
}

const CompanyCardWrapper = ({ company, onViewDetails }: CompanyCardWrapperProps) => {
  const handleViewDetails = () => {
    if (onViewDetails) {
      onViewDetails(company);
    }
  };

  return (
    <div
      className="h-full transition-transform duration-200 ease-in-out hover:-translate-y-1"
      onClick={handleViewDetails}
    >
      <CompanyCard {...company} />
    </div>
  );
};

export default CompanyCardWrapper;
