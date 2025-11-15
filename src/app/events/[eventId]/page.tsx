'use client';

import { use } from 'react';
import EventDetailView from '@/features/events/EventDetailView';

export default function EventDetailPage({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = use(params);
  return <EventDetailView eventId={eventId} />;
}
