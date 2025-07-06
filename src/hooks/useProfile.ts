import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ProfileService } from '@/services/ProfileService';
import { toast } from 'react-hot-toast';
import { Profile, UpdateProfilePayload } from '@/types/profileTypes';

export function useUserProfile() {
  return useQuery<Profile, Error>({
    queryKey: ['getProfile'],
    queryFn: ProfileService.getProfile,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
    refetchOnWindowFocus: true,
  });
}

export function useUpdateProfile() {
  return useMutation;
}
