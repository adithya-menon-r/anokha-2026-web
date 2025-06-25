import EventsList from '@/features/events/EventsList';

export default function EventsPage() {
  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-4">All Events</h1>
      <EventsList />
    </main>
  );
}
