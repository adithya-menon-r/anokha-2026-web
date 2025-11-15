/**
 * EventDetailHeader Component
 *
 * Displays the main header information for an event including:
 * - Event image
 * - Event name
 * - Date, time, and venue
 * - Tags
 * - Registration status
 * - Star/favorite button
 */

import { format } from 'date-fns';
import { Calendar, Clock, Star, Users } from 'lucide-react';
import Image from 'next/image';
import type { EventDetails } from '@/types/eventTypes';

interface EventDetailHeaderProps {
  event: EventDetails;
  onStarToggle?: () => void;
  isStarLoading?: boolean;
}

export default function EventDetailHeader({
  event,
  onStarToggle,
  isStarLoading = false,
}: EventDetailHeaderProps) {
  const isStarred =
    typeof event.isStarred === 'boolean'
      ? event.isStarred
      : event.isStarred === 'true';
  const isRegistered =
    typeof event.isRegistered === 'boolean'
      ? event.isRegistered
      : event.isRegistered === 'true';

  // Format date
  const formattedDate = event.eventDate
    ? format(new Date(event.eventDate), 'MMMM dd, yyyy')
    : 'Date TBA';

  return (
    <div className="w-full">
      {/* Event Image */}
      <div className="relative w-full h-64 md:h-96 mb-6 rounded-lg overflow-hidden">
        <Image
          src={event.eventImageURL}
          alt={event.eventName}
          fill
          className="object-cover"
          priority
        />

        {/* Star Button - Positioned on image */}
        {onStarToggle && (
          <button
            type="button"
            onClick={onStarToggle}
            disabled={isStarLoading}
            className="absolute top-4 right-4 p-3 bg-background/80 backdrop-blur-sm rounded-full hover:bg-background transition-colors disabled:opacity-50"
            aria-label={isStarred ? 'Unstar event' : 'Star event'}
          >
            <Star
              className={`w-5 h-5 ${isStarred ? 'fill-yellow-400 text-yellow-400' : 'text-foreground'}`}
            />
          </button>
        )}

        {/* Registration Status Badge */}
        {isRegistered && (
          <div className="absolute top-4 left-4 px-4 py-2 bg-green-500/90 backdrop-blur-sm rounded-full text-white text-sm font-medium">
            Registered
          </div>
        )}
      </div>

      {/* Event Name */}
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-foreground">
        {event.eventName}
      </h1>

      {/* Event Meta Information */}
      <div className="flex flex-wrap gap-4 mb-4 text-foreground/80">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          <span>{formattedDate}</span>
        </div>

        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5" />
          <span>{event.eventTime || 'Time TBA'}</span>
        </div>

        <div className="flex items-center gap-2">
          <Users className="w-5 h-5" />
          <span>
            {event.seatsFilled}/{event.maxSeats} seats filled
          </span>
        </div>
      </div>

      {/* Tags */}
      {event.tags && event.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {event.tags.map((tag, index) => (
            <span
              key={`${tag.tagName}-${index}`}
              className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
            >
              {tag.tagName}
            </span>
          ))}
        </div>
      )}

      {/* Event Type Badges */}
      <div className="flex flex-wrap gap-2">
        {(typeof event.isGroup === 'boolean'
          ? event.isGroup
          : event.isGroup === 'true') && (
          <span className="px-3 py-1 bg-blue-500/10 text-blue-500 rounded-md text-sm font-medium">
            Group Event
          </span>
        )}
        {(typeof event.isWorkshop === 'boolean'
          ? event.isWorkshop
          : event.isWorkshop === 'true') && (
          <span className="px-3 py-1 bg-purple-500/10 text-purple-500 rounded-md text-sm font-medium">
            Workshop
          </span>
        )}
        {(typeof event.isTechnical === 'boolean'
          ? event.isTechnical
          : event.isTechnical === 'true') && (
          <span className="px-3 py-1 bg-green-500/10 text-green-500 rounded-md text-sm font-medium">
            Technical
          </span>
        )}
      </div>
    </div>
  );
}
