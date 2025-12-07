'use client';

import { useQuery } from '@tanstack/react-query';
import { EventService } from '@/services/EventService';
import { useAuthStore } from '@/stores/auth.store';
import type { Event } from '@/types/eventTypes';

export function useAllEvents() {
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = !!user;

  return useQuery<Event[], Error>({
    queryKey: ['events', isAuthenticated],
    queryFn: () => EventService.getAll(isAuthenticated),
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
    refetchOnWindowFocus: false,
  });
}
