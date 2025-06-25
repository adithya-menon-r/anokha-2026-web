'use client';

import { useAllEvents } from '@/hooks/useAllEvents';
import { EventCard } from '@/components/events/EventCard';
import { EventCardSkeleton } from '@/components/events/EventCardSkeleton';

export default function EventsList() {
  const { data, isLoading, isError } = useAllEvents();

  if (isLoading)
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <EventCardSkeleton key={i} />
        ))}
      </div>
    );
  if (isError || !data) return <p>Failed to load events</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {data.map((event) => (
        <EventCard key={event.eventId} event={event} />
      ))}
    </div>
  );
}
