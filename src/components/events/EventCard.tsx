import { Event } from '@/types/eventTypes';
import { formatCurrency, toTitleCase } from '@/lib/utilityFunctions';
import Image from 'next/image';

type Props = {
  event: Event;
};

export function EventCard({ event }: Props) {
  return (
    <div className="rounded-xl p-4 shadow bg-white border space-y-2">
      <div className="w-full h-48 relative">
        <Image
          src={event.eventImageURL}
          alt={event.eventName}
          fill
          className="object-cover rounded-lg"
          sizes="(max-width: 768px) 100vw, 400px"
          priority
        />
      </div>
      <div className="text-xl font-semibold">{toTitleCase(event.eventName)}</div>
      <div className="text-sm text-gray-500">
        {event.eventDate} · {event.eventTime}
      </div>
      <div className="text-sm">{event.eventDescription}</div>
      <div className="text-sm text-green-600 font-medium">{formatCurrency(event.eventPrice)}</div>
    </div>
  );
}
