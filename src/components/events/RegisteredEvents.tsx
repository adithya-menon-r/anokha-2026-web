import { EventCard } from '@/components/events/EventCard';
import type { Event } from '@/types/eventTypes';

interface RegisteredEventListProps {
  listOfEvents: Event[];
}

export function RegisteredEventList({
  listOfEvents,
}: RegisteredEventListProps) {
  if (!listOfEvents || listOfEvents.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-muted-foreground">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-orange-500/20 to-yellow-500/20 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-orange-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            No Events Found
          </h3>
          <p>You haven't registered for any events yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="pb-4">
        <div className="flex flex-col md:flex-row md:flex-wrap gap-8 md:gap-6 px-2 py-2 md:items-stretch">
          {listOfEvents.map((event) => (
            <div key={event.eventId} className="w-full md:w-60 flex-shrink-0">
              <EventCard event={event} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
