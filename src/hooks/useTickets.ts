import { useQuery } from '@tanstack/react-query';
import { getMockRegisteredEvents } from '@/mocks/mockProfile';
// import { ProfileService } from '@/services/ProfileService';
import { useAuthStore } from '@/stores/auth.store';
import { Ticket } from '@/types/ticketTypes';

export function useTickets() {
  const email = useAuthStore((state) => state.user)?.email;
  return useQuery<Ticket[], Error>({
    queryKey: ['getRegisteredEvents', email],
    // queryFn: ProfileService.getRegisteredEvents,
    queryFn: getMockRegisteredEvents,
    staleTime: 1000 * 60 * 10,
    retry: 1,
  });
}
