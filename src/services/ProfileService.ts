import { apiGet, apiPost } from '@/lib/api';
import { API_ROUTES } from '@/lib/routes';
import { Profile, UpdateProfilePayload } from '@/types/profileTypes';

apiGet('user/profile');
export const ProfileService = {
  getProfile: async (): Promise<Profile> => {
    const res = await apiGet<{ profile: Profile; message: string }>(
      'user/profile',
    );
    return res.profile;
  },

  updateProfile: async (payload: UpdateProfilePayload): Promise<string> => {
    try {
      const csrfData = await apiGet<{ message: String; key: string }>(
        'user/profile/edit',
      ); // CSRF for update Profile
      const csrfToken = csrfData.key;

      const res = await apiPost<{ message: string }>(
        '/user/profile/edit',
        payload,
        {
          headers: {
            'X-Csrf-Token': csrfToken,
          },
        },
      );
      return res.message;
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error.message ||
        'edit Profile failed';
      throw new Error(message);
    }
  },
};
