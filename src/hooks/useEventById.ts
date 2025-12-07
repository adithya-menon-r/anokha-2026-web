'use client';

import { useQuery } from '@tanstack/react-query';
import { EventService } from '@/services/EventService';
import { useAuthStore } from '@/stores/auth.store';
// import { getMockEventById } from '@/mocks/mockEventById';
import type { EventDetails } from '@/types/eventTypes';

export function useEventById(eventId: string) {
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = !!user;

  return useQuery<EventDetails, Error>({
    queryKey: ['event', eventId, isAuthenticated],
    queryFn: () => EventService.getById(eventId, isAuthenticated),
    // queryFn: () => getMockEventById(eventId),
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
    refetchOnWindowFocus: false,
  });
}
