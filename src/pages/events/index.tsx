import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { spacing } from "@/lib/design-system";
import { EventProps } from "./types";
import { eventsData, eventTypeFilters, locationFilters } from "./eventsData";
import { EventsHeader } from "./components/EventsHeader";
import { FilterSection } from "./components/FilterSection";
import { EventsList } from "./components/EventsList";
import { CalendarView } from "./components/CalendarView";

const EventsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEventType, setSelectedEventType] = useState<"all" | EventProps["type"]>("all");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [view, setView] = useState<"list" | "calendar">("list");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality
    console.log("Searching for:", searchQuery);
  };

  // Filter events based on selections
  const filteredEvents = eventsData.filter(event => {
    // Filter by event type
    const typeMatch = selectedEventType === "all" || event.type === selectedEventType;
    
    // Filter by location
    const locationMatch = 
      selectedLocation === "all" || 
      (selectedLocation === "virtual" && event.isVirtual) || 
      (selectedLocation === "inperson" && !event.isVirtual);
    
    // Return if both conditions are met
    return typeMatch && locationMatch;
  });

  // Group events by month (for calendar view)
  const groupedEvents = filteredEvents.reduce((acc, event) => {
    const date = new Date(event.date);
    const monthYear = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    
    if (!acc[monthYear]) {
      acc[monthYear] = [];
    }
    
    acc[monthYear].push(event);
    return acc;
  }, {} as Record<string, EventProps[]>);

  return (
    <div className={cn(spacing.container, spacing.headerOffset, "py-8")}>
      {/* Header section */}
      <EventsHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
      />

      {/* Filters and View Toggle */}
      <FilterSection
        eventTypeFilters={eventTypeFilters}
        selectedEventType={selectedEventType}
        setSelectedEventType={setSelectedEventType}
        locationFilters={locationFilters}
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
        view={view}
        setView={setView}
      />

      {/* Content section */}
      <div className="mb-12">
        {view === "list" ? (
          <EventsList events={filteredEvents} />
        ) : (
          <CalendarView groupedEvents={groupedEvents} />
        )}
      </div>
      
      {/* No events message */}
      {filteredEvents.length === 0 && (
        <div className="text-center py-16">
          <h3 className="text-xl font-semibold mb-2">No events found</h3>
          <p className="text-gray-500 mb-6">Try adjusting your search or filter criteria</p>
          <Button 
            onClick={() => {
              setSelectedEventType("all");
              setSelectedLocation("all");
              setSearchQuery("");
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}
      
      {/* Load more button */}
      {filteredEvents.length > 0 && (
        <div className="flex justify-center">
          <Button 
            variant="outline" 
            className="px-8 py-2 rounded-full border-blue-600 text-blue-600 hover:bg-blue-50"
          >
            Load More Events
          </Button>
        </div>
      )}
    </div>
  );
};

export default EventsPage;
