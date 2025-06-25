'use client';

import { useAllEvents } from '@/hooks/useAllEvents';
import { EventCard } from '@/components/events/EventCard';

export default function EventsList() {
  const { data, isLoading, isError } = useAllEvents();

  if (isLoading) return <p>Loading events...</p>;
  if (isError || !data) return <p>Failed to load events</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {data.map((event) => (
        <EventCard key={event.eventId} event={event} />
      ))}
    </div>
  );
}
