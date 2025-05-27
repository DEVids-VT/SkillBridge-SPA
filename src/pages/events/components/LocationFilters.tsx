import { Button } from '@/components/ui/button';
import { LocationFilter } from '../types';

interface LocationFiltersProps {
  filters: LocationFilter[];
  selectedLocation: string;
  setSelectedLocation: (location: string) => void;
}

export const LocationFilters = ({
  filters,
  selectedLocation,
  setSelectedLocation,
}: LocationFiltersProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => (
        <Button
          key={filter.id}
          variant={selectedLocation === filter.id ? 'default' : 'outline'}
          size="sm"
          className="rounded-full flex items-center gap-1"
          onClick={() => setSelectedLocation(filter.id)}
        >
          {filter.id === 'virtual' && <span className="w-2 h-2 rounded-full bg-green-500"></span>}
          {filter.name}
        </Button>
      ))}
    </div>
  );
};
