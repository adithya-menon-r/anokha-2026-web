import { apiGet, apiPost } from '@/lib/api';
import { API_ROUTES } from '@/lib/routes';
import { Profile, UpdateProfilePayload } from '@/types/profileTypes';
import { Ticket, TicketResponse } from '@/types/ticketTypes';

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
    const res = await apiGet<TicketResponse>(API_ROUTES.PROFILE.TICKETS);
    const soloTickets = (res.solo_events || []).map((ticket) => ({
      ...ticket,
      is_group: false,
    }));
    const teamTickets = (res.team_events || []).map((ticket) => ({
      ...ticket,
      is_group: true,
    }));
    const tickets: Ticket[] = [...soloTickets, ...teamTickets];
    return tickets;
  },
};
