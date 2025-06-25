'use client';

import { useQuery } from '@tanstack/react-query';
import { EventService } from '@/services/EventService';
import { Event } from '@/types/eventTypes';

export function useAllEvents() {
  return useQuery<Event[], Error>({
    queryKey: ['events'],
    queryFn: EventService.getAll,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
    refetchOnWindowFocus: false,
  });
}
