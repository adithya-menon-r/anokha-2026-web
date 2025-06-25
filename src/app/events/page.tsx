import EventsList from '@/features/events/EventsList';

export default function EventsPage() {
  return (
    <main className="p-6 flex flex-col items-center min-h-screen bg-gray-50">
      <div className="w-full mx-auto mb-6 bg-white px-8">
        <h1 className="mb-4 text-3xl font-bold">All Events</h1>
        <EventsList />
      </div>
    </main>
  );
}
