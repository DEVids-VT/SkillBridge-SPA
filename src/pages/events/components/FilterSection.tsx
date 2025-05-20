import { Button } from "@/components/ui/button";
import { GanttChart, Calendar as CalendarIcon } from "lucide-react";
import { EventType, EventFilter, LocationFilter } from "../types";
import { EventTypeFilters } from "./EventTypeFilters";
import { LocationFilters } from "./LocationFilters";

interface FilterSectionProps {
  eventTypeFilters: EventFilter[];
  selectedEventType: "all" | EventType;
  setSelectedEventType: (type: "all" | EventType) => void;
  locationFilters: LocationFilter[];
  selectedLocation: string;
  setSelectedLocation: (location: string) => void;
  view: "list" | "calendar";
  setView: (view: "list" | "calendar") => void;
}

export const FilterSection = ({
  eventTypeFilters,
  selectedEventType,
  setSelectedEventType,
  locationFilters,
  selectedLocation,
  setSelectedLocation,
  view,
  setView,
}: FilterSectionProps) => {
  return (
    <div className="flex flex-col lg:flex-row items-start justify-between mb-8 gap-4">
      <EventTypeFilters
        filters={eventTypeFilters}
        selectedEventType={selectedEventType}
        setSelectedEventType={setSelectedEventType}
      />
      
      <div className="flex items-center gap-4">
        <LocationFilters
          filters={locationFilters}
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
        />
        
        <div className="flex border border-gray-200 rounded-lg overflow-hidden">
          <Button
            variant={view === "list" ? "default" : "ghost"}
            size="sm"
            className="rounded-none"
            onClick={() => setView("list")}
          >
            <GanttChart size={18} />
          </Button>
          <Button
            variant={view === "calendar" ? "default" : "ghost"}
            size="sm" 
            className="rounded-none"
            onClick={() => setView("calendar")}
          >
            <CalendarIcon size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
};
