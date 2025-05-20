import { Button } from '@/components/ui/button';
import { IndustryFilter } from '../types';

interface IndustryFiltersProps {
  industryFilters: IndustryFilter[];
  selectedIndustry: string;
  setSelectedIndustry: (industryId: string) => void;
}

export const IndustryFilters = ({
  industryFilters,
  selectedIndustry,
  setSelectedIndustry,
}: IndustryFiltersProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      <span className="text-sm font-medium self-center">Industry:</span>
      {industryFilters.map((filter) => (
        <Button
          key={filter.id}
          variant={selectedIndustry === filter.id ? 'default' : 'outline'}
          size="sm"
          className="rounded-full"
          onClick={() => setSelectedIndustry(filter.id)}
        >
          {filter.name}
        </Button>
      ))}
    </div>
  );
};
