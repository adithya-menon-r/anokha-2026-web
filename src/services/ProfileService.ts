import { apiGet, apiPost } from '@/lib/api';
import { Profile, UpdateProfilePayload } from '@/types/profileTypes';

export const ProfileService = {
  getProfile: (): Promise<Profile> => apiGet('/profile'),
  updateProfile: (payload: UpdateProfilePayload): Promise<Profile> =>
    apiPost('/updateProfile', payload),
};
