import { components } from "@/lib/design-system";

export type EventType = "hackathon" | "conference" | "workshop" | "meetup" | "competition" | "lecture";

export interface EventProps {
  id: number;
  title: string;
  description: string;
  image: string;
  type: EventType;
  date: string;
  time: string;
  location: string;
  isVirtual: boolean;
  organizer: string;
  attendeesCount: number;
  maxAttendees: number;
  tags: string[];
}

export interface EventFilter {
  id: EventType | "all";
  name: string;
}

export interface LocationFilter {
  id: "all" | "inperson" | "virtual";
  name: string;
}

// Helper function for event type colors
export function getEventTypeColor(type: EventType) {
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
