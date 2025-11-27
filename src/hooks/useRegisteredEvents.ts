import { useQuery } from '@tanstack/react-query';
import { EventService } from '@/services/EventService';
import { Event } from '@/types/eventTypes';

export function useRegisteredEvents() {
  return useQuery<Event[], Error>({
    queryKey: ['getRegisteredEvents'],
    queryFn: EventService.getRegisteredEvents,
    staleTime: 1000 * 60 * 10,
    retry: 1,
  });
}
