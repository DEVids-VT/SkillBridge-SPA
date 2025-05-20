import { Button } from '@/components/ui/button';
import { PartnershipLevelFilter } from '../types';

interface PartnershipLevelFiltersProps {
  partnershipLevelFilters: PartnershipLevelFilter[];
  selectedPartnershipLevel: string;
  setSelectedPartnershipLevel: (levelId: string) => void;
}

export const PartnershipLevelFilters = ({
  partnershipLevelFilters,
  selectedPartnershipLevel,
  setSelectedPartnershipLevel,
}: PartnershipLevelFiltersProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      <span className="text-sm font-medium self-center">Partner Level:</span>
      {partnershipLevelFilters.map((filter) => (
        <Button
          key={filter.id}
          variant={selectedPartnershipLevel === filter.id ? 'default' : 'outline'}
          size="sm"
          className="rounded-full"
          onClick={() => setSelectedPartnershipLevel(filter.id)}
        >
          {filter.name}
        </Button>
      ))}
    </div>
  );
};
