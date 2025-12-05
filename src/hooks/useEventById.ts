'use client';

import { useQuery } from '@tanstack/react-query';
import { EventService } from '@/services/EventService';
// import { getMockEventById } from '@/mocks/mockEventById';
import type { EventDetails } from '@/types/eventTypes';

export function useEventById(eventId: string) {
  return useQuery<EventDetails, Error>({
    queryKey: ['event', eventId],
    queryFn: () => EventService.getById(eventId),
    // queryFn: () => getMockEventById(eventId),
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
    refetchOnWindowFocus: false,
  });
}
