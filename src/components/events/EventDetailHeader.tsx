/**
 * EventDetailHeader Component
 *
 * Displays the main header information for an event including:
 * - Event image
 * - Event name
 * - Date, time, and venue from schedules
 * - Tags
 * - Registration status
 * - Star/favorite button
 */

import { format } from 'date-fns';
import { Calendar, Clock, MapPin, Star, Users } from 'lucide-react';
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
  // Get first schedule for display (main event date/time)
  const mainSchedule = event.schedules?.[0];

  // Format date from schedule
  const formattedDate = mainSchedule?.event_date
    ? format(new Date(mainSchedule.event_date), 'MMMM dd, yyyy')
    : 'Date TBA';

  // Format time range from schedule
  const timeRange = mainSchedule
    ? `${mainSchedule.start_time} - ${mainSchedule.end_time}`
    : 'Time TBA';

  return (
    <div className="w-full">
      {/* Event Image */}
      <div className="relative w-full h-64 md:h-96 mb-6 rounded-lg overflow-hidden">
        <Image
          src={event.cover_image_url}
          alt={event.event_name}
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
            aria-label={event.isStarred ? 'Unstar event' : 'Star event'}
          >
            <Star
              className={`w-5 h-5 ${event.isStarred ? 'fill-yellow-400 text-yellow-400' : 'text-foreground'}`}
            />
          </button>
        )}

        {/* Registration Status Badge */}
        {event.isRegistered && (
          <div className="absolute top-4 left-4 px-4 py-2 bg-green-500/90 backdrop-blur-sm rounded-full text-white text-sm font-medium">
            Registered
          </div>
        )}
      </div>

      {/* Event Name */}
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-foreground">
        {event.event_name}
      </h1>

      {/* Blurb (Short Description) */}
      {event.blurb && (
        <p className="text-lg text-foreground/80 mb-6 leading-relaxed">
          {event.blurb}
        </p>
      )}

      {/* Event Meta Information */}
      <div className="flex flex-wrap gap-4 mb-4 text-foreground/80">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          <span>{formattedDate}</span>
        </div>

        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5" />
          <span>{timeRange}</span>
        </div>

        {mainSchedule?.venue && (
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            <span>{mainSchedule.venue}</span>
          </div>
        )}

        <div className="flex items-center gap-2">
          <Users className="w-5 h-5" />
          <span>
            {event.seats_filled}/{event.total_seats} seats filled
          </span>
        </div>
      </div>

      {/* Tags */}
      {event.tags && event.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {event.tags.map((tag, index) => (
            <span
              key={`${tag.tag_name}-${index}`}
              className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
              title={tag.tag_abbreviation}
            >
              {tag.tag_name}
            </span>
          ))}
        </div>
      )}

      {/* Event Type Badges */}
      <div className="flex flex-wrap gap-2">
        {event.is_group && (
          <span className="px-3 py-1 bg-blue-500/10 text-blue-500 rounded-md text-sm font-medium">
            Group Event
          </span>
        )}
        <span
          className={`px-3 py-1 rounded-md text-sm font-medium ${
            event.event_type === 'WORKSHOP'
              ? 'bg-purple-500/10 text-purple-500'
              : event.event_type === 'TECHNICAL'
                ? 'bg-green-500/10 text-green-500'
                : 'bg-gray-500/10 text-gray-500'
          }`}
        >
          {event.event_type}
        </span>
        <span
          className={`px-3 py-1 rounded-md text-sm font-medium ${
            event.event_mode === 'ONLINE'
              ? 'bg-cyan-500/10 text-cyan-500'
              : 'bg-orange-500/10 text-orange-500'
          }`}
        >
          {event.event_mode}
        </span>
      </div>
    </div>
  );
}
