import { apiGet, apiPost } from '@/lib/api';
import { API_ROUTES } from '@/lib/routes';
import { Profile, UpdateProfilePayload } from '@/types/profileTypes';

export const ProfileService = {
  getProfile: (): Promise<Profile> => apiGet(API_ROUTES.PROFILE.GET),

  updateProfile: (payload: UpdateProfilePayload) => {
    console.log(payload);
    return apiPost(API_ROUTES.PROFILE.UPDATE, payload);
  },
};
