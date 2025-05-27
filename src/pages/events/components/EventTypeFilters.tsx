import { Button } from '@/components/ui/button';
import { EventType, EventFilter } from '../types';

interface EventTypeFiltersProps {
  filters: EventFilter[];
  selectedEventType: 'all' | EventType;
  setSelectedEventType: (type: 'all' | EventType) => void;
}

export const EventTypeFilters = ({
  filters,
  selectedEventType,
  setSelectedEventType,
}: EventTypeFiltersProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => (
        <Button
          key={filter.id}
          variant={selectedEventType === filter.id ? 'default' : 'outline'}
          size="sm"
          className="rounded-full"
          onClick={() => setSelectedEventType(filter.id)}
        >
          {filter.name}
        </Button>
      ))}
    </div>
  );
};
