import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search, Calendar as CalendarIcon, Filter, MapPin, GanttChart } from "lucide-react";
import { EventCard, type EventProps, type EventType } from "@/components/ui/EventCard";
import { cn } from "@/lib/utils";
import { spacing, layouts } from "@/lib/design-system";

// Mock events data
const eventsData: EventProps[] = [
  {
    id: 1,
    title: "TechConnect Hackathon 2023",
    description: "Join us for a 48-hour coding challenge to build innovative solutions for sustainability challenges.",
    image: "/images/events/hackathon.jpg",
    type: "hackathon",
    date: "2023-06-15",
    time: "09:00 AM - 6:00 PM",
    location: "Innovation Hub, San Francisco",
    isVirtual: false,
    organizer: "TechConnect Foundation",
    attendeesCount: 120,
    maxAttendees: 150,
    tags: ["Coding", "Innovation", "Sustainability", "Teamwork"]
  },
  {
    id: 2,
    title: "Design Systems Conference",
    description: "A virtual conference focused on design systems, component libraries, and scaling design in organizations.",
    image: "/images/events/conference.jpg",
    type: "conference",
    date: "2023-07-10",
    time: "10:00 AM - 5:00 PM",
    location: "Online",
    isVirtual: true,
    organizer: "DesignOps Global",
    attendeesCount: 450,
    maxAttendees: 1000,
    tags: ["Design Systems", "UX", "DesignOps", "Figma"]
  },
  {
    id: 3,
    title: "AI and Machine Learning Workshop",
    description: "Hands-on workshop about practical applications of AI and ML in business. Bring your laptop!",
    image: "/images/events/workshop.jpg",
    type: "workshop",
    date: "2023-06-22",
    time: "1:00 PM - 5:00 PM",
    location: "Tech Campus, Building 3, New York",
    isVirtual: false,
    organizer: "AI Academy",
    attendeesCount: 35,
    maxAttendees: 40,
    tags: ["AI", "Machine Learning", "Python", "Data Science"]
  },
  {
    id: 4,
    title: "Frontend Developers Meetup",
    description: "Monthly meetup for frontend developers to network, share knowledge, and discuss latest trends.",
    image: "/images/events/meetup.jpg",
    type: "meetup",
    date: "2023-06-08",
    time: "6:30 PM - 9:00 PM",
    location: "Coworking Space XYZ, Austin",
    isVirtual: false,
    organizer: "Frontend Community",
    attendeesCount: 65,
    maxAttendees: 100,
    tags: ["Frontend", "React", "JavaScript", "CSS", "Networking"]
  },
  {
    id: 5,
    title: "Global Data Science Competition",
    description: "A 2-week online competition to solve real-world data challenges and win prizes.",
    image: "/images/events/competition.jpg",
    type: "competition",
    date: "2023-07-01",
    time: "Starts at 12:00 PM",
    location: "Online",
    isVirtual: true,
    organizer: "DataSci Networks",
    attendeesCount: 320,
    maxAttendees: 500,
    tags: ["Data Science", "Competition", "Analytics", "Prizes"]
  },
  {
    id: 6,
    title: "Building Scalable Cloud Architecture",
    description: "Technical lecture on designing scalable and resilient cloud architectures for enterprise applications.",
    image: "/images/events/lecture.jpg",
    type: "lecture",
    date: "2023-06-28",
    time: "3:00 PM - 4:30 PM",
    location: "Online",
    isVirtual: true,
    organizer: "Cloud Professionals Association",
    attendeesCount: 210,
    maxAttendees: 500,
    tags: ["Cloud", "AWS", "Architecture", "Scalability"]
  },
  {
    id: 7,
    title: "Women in Tech Hackathon",
    description: "A hackathon aimed at encouraging women's participation in technology and coding.",
    image: "/images/events/women-hackathon.jpg",
    type: "hackathon",
    date: "2023-07-15",
    time: "9:00 AM - 9:00 PM",
    location: "Diversity Tech Hub, Boston",
    isVirtual: false,
    organizer: "Women in Tech Alliance",
    attendeesCount: 85,
    maxAttendees: 120,
    tags: ["WomenInTech", "Diversity", "Coding", "Mentorship"]
  },
  {
    id: 8,
    title: "Product Management Workshop",
    description: "Learn practical product management skills from industry leaders. Ideal for aspiring and junior PMs.",
    image: "/images/events/pm-workshop.jpg",
    type: "workshop",
    date: "2023-06-18",
    time: "10:00 AM - 4:00 PM",
    location: "Business Center, Chicago",
    isVirtual: false,
    organizer: "Product School",
    attendeesCount: 28,
    maxAttendees: 30,
    tags: ["Product Management", "Agile", "Strategy", "UX"]
  }
];

// Event type filters
const eventTypeFilters: { id: EventType | "all"; name: string }[] = [
  { id: "all", name: "All Events" },
  { id: "hackathon", name: "Hackathons" },
  { id: "conference", name: "Conferences" },
  { id: "workshop", name: "Workshops" },
  { id: "meetup", name: "Meetups" },
  { id: "competition", name: "Competitions" },
  { id: "lecture", name: "Lectures" }
];

// Location filters
const locationFilters = [
  { id: "all", name: "All Locations" },
  { id: "inperson", name: "In-Person" },
  { id: "virtual", name: "Virtual" }
];

export default function EventsPage() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEventType, setSelectedEventType] = useState<"all" | EventType>("all");
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
      <div className={layouts.pageHeader}>
        <div className={layouts.pageHeaderBackground}></div>
        <h1 className={layouts.pageTitle}>
          <span className="text-blue-600">Upcoming</span>{" "}
          <span className="text-gray-600">Events</span>
        </h1>
        <p className={layouts.pageDescription}>
          Discover industry events, workshops, hackathons, and meetups to expand your network and learn from experts in your field.
        </p>

        {/* Search bar */}
        <form onSubmit={handleSearch} className="max-w-3xl mx-auto relative">
          <div className="relative flex items-center">
            <Input
              type="text"
              placeholder={t("searchEventsPlaceholder", "Search for events, topics, or locations")}
              className="h-14 pl-6 pr-12 rounded-full shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              type="submit"
              className="absolute right-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2 transition-colors"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>
          </div>
        </form>
      </div>

      {/* Filters and View Toggle */}
      <div className="flex flex-col lg:flex-row items-start justify-between mb-8 gap-4">
        <div className="flex flex-wrap gap-2">
          {eventTypeFilters.map((filter) => (
            <Button
              key={filter.id}
              variant={selectedEventType === filter.id ? "default" : "outline"}
              size="sm"
              className="rounded-full"
              onClick={() => setSelectedEventType(filter.id as "all" | EventType)}
            >
              {filter.name}
            </Button>
          ))}
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex flex-wrap gap-2">
            {locationFilters.map((filter) => (
              <Button
                key={filter.id}
                variant={selectedLocation === filter.id ? "default" : "outline"}
                size="sm"
                className="rounded-full flex items-center gap-1"
                onClick={() => setSelectedLocation(filter.id)}
              >
                {filter.id === "virtual" && <span className="w-2 h-2 rounded-full bg-green-500"></span>}
                {filter.name}
              </Button>
            ))}
          </div>
          
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

      {/* Content section */}
      <div className="mb-12">
        {view === "list" ? (
          <div className={layouts.grid.cards3}>
            {filteredEvents.map((event) => (
              <EventCard key={event.id} {...event} />
            ))}
          </div>
        ) : (
          // Calendar View
          <div className="space-y-12">
            {Object.entries(groupedEvents).map(([monthYear, events]) => (
              <div key={monthYear}>
                <h2 className="text-2xl font-bold mb-6 pb-3 border-b">{monthYear}</h2>
                <div className="space-y-4">
                  {events.map((event) => (
                    <div key={event.id} className={cn(cards.base, "flex flex-col md:flex-row")}>
                      {/* Date column */}
                      <div className="md:w-40 p-4 bg-gray-50 flex flex-col items-center justify-center">
                        <div className="text-center">
                          <div className="text-xl font-bold text-blue-600">
                            {new Date(event.date).toLocaleDateString('en-US', { day: '2-digit' })}
                          </div>
                          <div className="text-sm text-gray-500">
                            {new Date(event.date).toLocaleDateString('en-US', { weekday: 'short' })}
                          </div>
                        </div>
                      </div>
                      
                      {/* Event details */}
                      <div className="p-6 flex-1 flex flex-col md:flex-row gap-6">
                        <div className="md:flex-1">
                          <div className="flex items-start gap-2">
                            <h3 className="text-xl font-bold flex-1">{event.title}</h3>
                            <Badge 
                              className={cn(
                                "text-xs font-semibold",
                                getEventTypeColor(event.type)
                              )}
                            >
                              {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                            </Badge>
                          </div>
                          
                          <p className="text-sm text-gray-600 font-medium mt-1 mb-2">
                            By {event.organizer}
                          </p>
                          
                          <p className="text-sm text-gray-500 mb-3">{event.description}</p>
                          
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <Clock size={14} className="text-gray-400" />
                              {event.time}
                            </span>
                            
                            <span className="flex items-center gap-1">
                              <MapPin size={14} className="text-gray-400" />
                              <span className="line-clamp-1">{event.location}</span>
                            </span>
                          </div>
                        </div>
                        
                        <div className="md:w-40 flex md:flex-col items-center gap-3 mt-4 md:mt-0 md:justify-center">
                          <Button 
                            className="w-full"
                          >
                            Register
                          </Button>
                          <Button 
                            variant="outline"
                            className="w-full"
                          >
                            Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
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
}

// Helper function for event type colors
function getEventTypeColor(type: EventType) {
  const typeColors: Record<EventType, string> = {
    'hackathon': components.tagColors.blue,
    'conference': components.tagColors.purple,
    'workshop': components.tagColors.green,
    'meetup': components.tagColors.yellow,
    'competition': components.tagColors.red,
    'lecture': components.tagColors.gray
  };
  
  return typeColors[type];
} 