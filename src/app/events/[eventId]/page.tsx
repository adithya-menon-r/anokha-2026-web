'use client';

import EventDetailView from '@/features/events/EventDetailView';

export default function EventDetailPage({
  params,
}: {
  params: { eventId: string };
}) {
  return <EventDetailView eventId={params.eventId} />;
}
