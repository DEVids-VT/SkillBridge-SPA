import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { cards } from "@/lib/design-system";
import { EventProps, getEventTypeColor } from "../types";

interface CalendarViewProps {
  groupedEvents: Record<string, EventProps[]>;
}

export const CalendarView = ({ groupedEvents }: CalendarViewProps) => {
  return (
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
                    <Button className="w-full">
                      Register
                    </Button>
                    <Button variant="outline" className="w-full">
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
  );
};
