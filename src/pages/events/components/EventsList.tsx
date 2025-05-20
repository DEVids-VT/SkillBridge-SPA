import { layouts } from "@/lib/design-system";
import { EventCard } from "@/components/ui/EventCard";
import { EventProps } from "../types";

interface EventsListProps {
  events: EventProps[];
}

export const EventsList = ({ events }: EventsListProps) => {
  return (
    <div className={layouts.grid.cards3}>
      {events.map((event) => (
        <EventCard key={event.id} {...event} />
      ))}
    </div>
  );
};
