import { EventCard } from '@/components/events/EventCard';
import type { Event } from '@/types/eventTypes';

interface RegisteredEventListProps {
  listOfEvents: Event[];
}

export function RegisteredEventList({
  listOfEvents,
}: RegisteredEventListProps) {
  return (
    <div className="w-full">
      <div className="pb-4">
        <div className="flex flex-col md:flex-row md:flex-wrap gap-8 md:gap-6 px-2 py-2 md:items-stretch">
          {listOfEvents.map((event) => (
            <div key={event.event_id} className="w-full md:w-60 flex-shrink-0">
              <EventCard event={event} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
