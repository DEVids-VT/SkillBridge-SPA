import { IndustryFilters } from './IndustryFilters';
import { PartnershipLevelFilters } from './PartnershipLevelFilters';
import { IndustryFilter, PartnershipLevelFilter } from '../types';

interface FilterSectionProps {
  industryFilters: IndustryFilter[];
  selectedIndustry: string;
  setSelectedIndustry: (industryId: string) => void;
  partnershipLevelFilters: PartnershipLevelFilter[];
  selectedPartnershipLevel: string;
  setSelectedPartnershipLevel: (levelId: string) => void;
}

export const FilterSection = ({
  industryFilters,
  selectedIndustry,
  setSelectedIndustry,
  partnershipLevelFilters,
  selectedPartnershipLevel,
  setSelectedPartnershipLevel,
}: FilterSectionProps) => {
  return (
    <div className="mb-8 flex flex-col sm:flex-row gap-4 justify-between items-start">
      <IndustryFilters
        industryFilters={industryFilters}
        selectedIndustry={selectedIndustry}
        setSelectedIndustry={setSelectedIndustry}
      />

      <PartnershipLevelFilters
        partnershipLevelFilters={partnershipLevelFilters}
        selectedPartnershipLevel={selectedPartnershipLevel}
        setSelectedPartnershipLevel={setSelectedPartnershipLevel}
      />
    </div>
  );
};
