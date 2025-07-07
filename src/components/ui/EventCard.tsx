import { Calendar, Clock, MapPin, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { cards, components } from '@/lib/design-system';

export type EventType =
  | 'hackathon'
  | 'conference'
  | 'workshop'
  | 'meetup'
  | 'competition'
  | 'lecture';

export interface EventProps {
  id: number;
  title: string;
  description: string;
  image: string;
  type: EventType;
  date: string; // ISO date string
  time: string;
  location: string;
  isVirtual: boolean;
  organizer: string;
  attendeesCount?: number;
  maxAttendees?: number;
  tags: string[];
  registrationLink?: string;
}

export function EventCard({
  title,
  description,
  image,
  type,
  date,
  time,
  location,
  isVirtual,
  organizer,
  attendeesCount,
  maxAttendees,
  tags,
  registrationLink,
}: EventProps) {
  // Format date
  const formatDate = (dateString: string) => {
    const eventDate = new Date(dateString);
    return eventDate.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Get event type color
  const getEventTypeColor = (type: EventType) => {
    const typeColors: Record<EventType, string> = {
      hackathon: components.tagColors.blue,
      conference: components.tagColors.orange,
      workshop: components.tagColors.yellow,
      meetup: components.tagColors.yellow,
      competition: components.tagColors.orange,
      lecture: components.tagColors.white,
    };
    return typeColors[type];
  };

  // Calculate capacity percentage if applicable
  const capacityPercentage =
    attendeesCount && maxAttendees ? (attendeesCount / maxAttendees) * 100 : null;

  // Format capacity status
  const getCapacityStatus = () => {
    if (!capacityPercentage) return null;

    if (capacityPercentage >= 90) {
      return { text: 'Almost Full', color: 'text-red-500' };
    } else if (capacityPercentage >= 75) {
      return { text: 'Filling Fast', color: 'text-yellow-500' };
    } else {
      return { text: 'Spaces Available', color: 'text-green-500' };
    }
  };

  const capacityStatus = getCapacityStatus();

  return (
    <div className={cn(cards.base, 'flex flex-col h-full')}>
      {/* Event Image */}
      <div className="relative h-48 overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover" />

        <div className="absolute top-3 left-3">
          <Badge className={cn('text-xs font-semibold', components.tagColors.blue)}>
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </Badge>
        </div>

        {isVirtual && (
          <div className="absolute top-3 right-3">
            <Badge variant="outline" className="bg-[#003566] text-[#ffd60a] text-xs font-medium">
              Virtual
            </Badge>
          </div>
        )}
      </div>

      {/* Event Content */}
      <div className={cn(cards.body, 'flex-1 flex flex-col text-white')}>
        <h3 className="text-xl font-bold mb-2 line-clamp-2 text-white">{title}</h3>
        <p className="text-sm text-[#ffd60a] font-medium mb-1">By {organizer}</p>

        <p className="text-sm text-gray-400 mb-4 line-clamp-2">{description}</p>

        {/* Event Meta */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <Calendar size={16} className="text-[#ffd60a]" />
            <span>{formatDate(date)}</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-300">
            <Clock size={16} className="text-[#ffd60a]" />
            <span>{time}</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-300">
            <MapPin size={16} className="text-[#ffd60a]" />
            <span className="line-clamp-1">{location}</span>
          </div>

          {attendeesCount && (
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <Users size={16} className="text-[#ffd60a]" />
              <span>
                {attendeesCount} {maxAttendees && `/ ${maxAttendees}`} attendees
              </span>
              {capacityStatus && (
                <span className={capacityStatus.color + ' text-xs font-medium ml-2'}>
                  {capacityStatus.text}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {tags.slice(0, 3).map((tag, index) => (
            <span key={index} className={cn(components.tag, components.tagColors.yellow)}>
              {tag}
            </span>
          ))}
          {tags.length > 3 && (
            <span className={cn(components.tag, components.tagColors.yellow)}>
              +{tags.length - 3}
            </span>
          )}
        </div>

        {/* Action button */}
        <div className="mt-auto">
          <Button
            variant="outline"
            className="w-full text-[#001d3d] border-[#ffc300] bg-[#ffc300] hover:bg-[#ffd60a]"
          >
            Register Now
          </Button>
        </div>
      </div>
    </div>
  );
}
