'use client';
// No need for Image or Link in this specific file if they are not directly used here
// import Image from 'next/image';
// import Link from 'next/link';

import EventsList from '@/features/events/EventsList';

export default function EventsPage() {
  return (
    <main className="p-6 flex flex-col items-center min-h-screen">
      <div className="w-full mx-auto mb-6">
        <h1 className="mb-4 text-3xl font-bold text-foreground">All Events</h1>
        <EventsList />
      </div>
    </main>
  );
}
