import { useQuery } from '@tanstack/react-query';
import { AccommodationService } from '@/services/AccommodationService';
import type { AccommodationStatus } from '@/types/accommodationTypes';

export function useAccommodationStatus() {
  return useQuery<AccommodationStatus>({
    queryKey: ['accommodationStatus'],
    queryFn: async () => {
      return AccommodationService.getEligibility();
    },
    staleTime: 1000 * 60,
    retry: 1,
  });
}

export default useAccommodationStatus;
