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
    await apiGet('user/profile/edit'); // CSRF for update Profile
    const res = await apiPost<{ message: string }>(
      'user/profile/edit',
      payload,
    );
    return res;
  },
};
