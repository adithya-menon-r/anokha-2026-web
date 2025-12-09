import { useQuery } from '@tanstack/react-query';
// import { getMockRegisteredEvents } from '@/mocks/mockProfile';
import { ProfileService } from '@/services/ProfileService';
import { useAuthStore } from '@/stores/auth.store';
import { Event } from '@/types/eventTypes';

export function useRegisteredEvents() {
  const email = useAuthStore((state) => state.user)?.email;
  return useQuery<Event[], Error>({
    queryKey: ['getRegisteredEvents', email],
    queryFn: ProfileService.getRegisteredEvents,
    // queryFn: getMockRegisteredEvents,
    staleTime: 1000 * 60 * 10,
    retry: 1,
  });
}
