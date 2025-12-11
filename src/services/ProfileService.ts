import { apiGet, apiPost } from '@/lib/api';
import { API_ROUTES } from '@/lib/routes';
import { Profile, UpdateProfilePayload } from '@/types/profileTypes';
import { Ticket } from '@/types/ticketTypes';

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

  getTickets: async (): Promise<Ticket[]> => {
    const res = await apiGet<{ tickets: Ticket[] }>(API_ROUTES.PROFILE.TICKETS);
    return res.tickets;
  },
};
