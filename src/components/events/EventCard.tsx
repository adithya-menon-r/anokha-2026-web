import { Event } from '@/types/eventTypes';

type Props = {
  event: Event;
};

export function EventCard({ event }: Props) {
  return (
    <div className="rounded-2xl p-4 shadow-md bg-white border space-y-2">
      <img
        src={event.eventImageURL}
        alt={event.eventName}
        className="w-full h-48 object-cover rounded-xl"
      />
      <div className="text-xl font-semibold">{event.eventName}</div>
      <div className="text-sm text-gray-500">
        {event.eventDate} · {event.eventTime}
      </div>
      <div className="text-sm">{event.eventDescription}</div>
      <div className="text-sm text-green-600 font-medium">₹{event.eventPrice}</div>
    </div>
  );
}
