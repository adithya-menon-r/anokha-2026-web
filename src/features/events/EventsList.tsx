'use client';

import { EventCard } from '@/components/events/EventCard';
import { EventCardSkeleton } from '@/components/events/EventCardSkeleton';
import { useAllEvents } from '@/hooks/useAllEvents';

export default function EventsList() {
  const { data, isLoading, isError } = useAllEvents();

  if (isLoading)
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: using index as key is acceptable for skeletons
          <EventCardSkeleton key={i} />
        ))}
      </div>
    );
  if (isError || !data) return <ErrorEvent>Failed to load event</ErrorEvent>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {data.map((event) => (
        <EventCard key={event.eventId} event={event} />
      ))}
    </div>
  );
}
