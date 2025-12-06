import { apiGet, apiPatch, apiPost } from '@/lib/api';
import { Profile, UpdateProfilePayload } from '@/types/profileTypes';

apiGet('user/profile');
export const ProfileService = {
  getProfile: async (): Promise<Profile> => {
    const res = await apiGet<{ profile: Profile; message: string }>(
      'user/profile',
    );
    return res.profile;
  },

  updateProfile: async (payload: UpdateProfilePayload) => {
    console.log(payload);
    const res = await apiPatch<{ message: string }>('user/profile', payload);
    return res;
  },
};
