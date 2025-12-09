import { apiGet, apiPost } from '@/lib/api';
import { API_ROUTES } from '@/lib/routes';
import { BackendEvent, BackendEventDetails, Event } from '@/types/eventTypes';
import { Profile, UpdateProfilePayload } from '@/types/profileTypes';

export const ProfileService = {
  getProfile: async (): Promise<Profile> => {
    const res = await apiGet<{ profile: Profile; message: string }>(
      API_ROUTES.PROFILE.GET,
    );
    return res.profile;
  },

  updateProfile: async (payload: UpdateProfilePayload): Promise<string> => {
    try {
      const csrfData = await apiGet<{ message: String; key: string }>(
        API_ROUTES.PROFILE.UPDATE,
      ); // CSRF for update Profile
      const csrfToken = csrfData.key;

      const res = await apiPost<{ message: string }>(
        API_ROUTES.PROFILE.UPDATE,
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

  getRegisteredEvents: async (): Promise<Event[]> => {
    const events = await apiGet<BackendEvent[]>(
      API_ROUTES.PROFILE.REGISTERED_EVENTS,
    );
    return events.map((event) => {
      const { is_starred, ...rest } = event;
      return {
        ...rest,
        isStarred: is_starred,
      };
    });
  },
};
