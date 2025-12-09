import { apiGet, apiPost } from '@/lib/api';
import { API_ROUTES } from '@/lib/routes';
import type {
  BookingResponse,
  GroupBookingPayload,
} from '@/types/bookingTypes';

export const BookingService = {
  /**
   * Book event for individual user
   * Follows same pattern as AuthService - fetches CSRF token then makes POST request
   */
  bookIndividualEvent: async (eventId: string): Promise<BookingResponse> => {
    try {
      const csrfData = await apiGet<{ key: string }>(
        API_ROUTES.EVENTS.BOOK(eventId),
      );
      const csrfToken = csrfData.key;

      return await apiPost<BookingResponse>(
        API_ROUTES.EVENTS.BOOK(eventId),
        undefined,
        {
          headers: {
            'X-Csrf-Token': csrfToken,
          },
        },
      );
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error.message ||
        'Failed to book event';
      throw new Error(message);
    }
  },

  /**
   * Book event for team/group
   * Follows same pattern as AuthService - fetches CSRF token then makes POST request
   */
  bookGroupEvent: async (
    eventId: string,
    payload: GroupBookingPayload,
  ): Promise<BookingResponse> => {
    try {
      const csrfData = await apiGet<{ key: string }>(
        API_ROUTES.EVENTS.BOOK(eventId),
      );
      const csrfToken = csrfData.key;

      return await apiPost<BookingResponse>(
        API_ROUTES.EVENTS.BOOK(eventId),
        payload,
        {
          headers: {
            'X-Csrf-Token': csrfToken,
          },
        },
      );
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error.message ||
        'Failed to book group event';
      throw new Error(message);
    }
  },
};
