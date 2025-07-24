import { EventCard } from '@/components/events/EventCard';
import type { Event } from '@/types/eventTypes';

type Props = {
  listOfEvents: Event[];
};

export function RegisteredEventList({ listOfEvents }: Props) {
  if (!listOfEvents || listOfEvents.length === 0) {
    return (
      <div className="text-center text-gray-500 py-12">
        No events available.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto pr-4 mb-10 ">
      <div className="flex flex-nowrap gap-4 pl-4">
        {listOfEvents.map((event) => (
          <div key={event.eventId} className="w-64 flex-shrink-0">
            <EventCard event={event} />
          </div>
        ))}
      </div>
    </div>
  );
}
