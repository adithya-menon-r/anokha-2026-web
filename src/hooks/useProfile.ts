import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { ProfileService } from '@/services/ProfileService';
import type { Profile, UpdateProfilePayload } from '@/types/profileTypes';

export function useUserProfile() {
  return useQuery<Profile, Error>({
    queryKey: ['getProfile'],
    queryFn: ProfileService.getProfile,
    staleTime: 1000 * 60 * 5,
    retry: 3,
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateProfilePayload) =>
      ProfileService.updateProfile(payload),
    onSuccess: () => {
      toast.success('Successfully Updated!');
      queryClient.invalidateQueries({ queryKey: ['getProfile'] });
    },
    onError: () => {
      toast.error('Update Failed!');
    },
  });
}
