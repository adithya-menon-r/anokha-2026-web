import Image from 'next/image';
import { formatCurrency, toTitleCase } from '@/lib/utilityFunctions';
import type { Event } from '@/types/eventTypes';

type Props = {
  event: Event;
};

export function EventCard({ event }: Props) {
  return (
    <div className="rounded-xl p-4 shadow bg-white border space-y-2 flex flex-col h-[380px] w-full">
      {/* Image Container */}
      <div className="w-full h-40 relative">
        <Image
          src={event.eventImageURL}
          alt={event.eventName}
          fill
          className="object-cover rounded-lg"
          sizes="(max-width: 768px) 100vw, 400px"
          priority
        />
      </div>

      {/* Content */}
      <div className="flex-grow flex flex-col justify-between space-y-2">
        <div>
          <div className="text-xl font-semibold">
            {toTitleCase(event.eventName)}
          </div>
          <div className="text-sm text-gray-500">
            {event.eventDate} · {event.eventTime}
          </div>
          <div className="text-sm line-clamp-2">{event.eventDescription}</div>
        </div>

        <div className="text-sm text-green-600 font-medium">
          {formatCurrency(event.eventPrice)}
        </div>
      </div>
    </div>
  );
}
