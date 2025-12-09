import { apiGet, apiPost } from '@/lib/api';
import { API_ROUTES } from '@/lib/routes';
import type {
  BookingResponse,
  GroupBookingPayload,
} from '@/types/bookingTypes';

export const BookingService = {
  /**
   * Book event for individual user
   * Fetches CSRF token internally to ensure it's fresh (important for short-lived tokens)
   */
  bookIndividualEvent: async (eventId: string): Promise<BookingResponse> => {
    try {
      console.log('[BookingService] Fetching CSRF token for event:', eventId);

      // Fetch fresh CSRF token
      const csrfData = await apiGet<{ key: string }>(
        API_ROUTES.EVENTS.BOOK(eventId),
      );
      const csrfToken = csrfData.key;

      console.log('[BookingService] CSRF token received, booking event...');

      // Immediately use it for booking
      const response = await apiPost<BookingResponse>(
        API_ROUTES.EVENTS.BOOK(eventId),
        undefined,
        {
          headers: {
            'X-Csrf-Token': csrfToken,
          },
        },
      );

      console.log('[BookingService] Booking response:', response);
      return response;
    } catch (error: any) {
      console.error('[BookingService] Booking error:', error);
      const message =
        error?.response?.data?.message ||
        error.message ||
        'Failed to book event';
      throw new Error(message);
    }
  },

  /**
   * Book event for team/group
   * Fetches CSRF token internally to ensure it's fresh (important for short-lived tokens)
   */
  bookGroupEvent: async (
    eventId: string,
    payload: GroupBookingPayload,
  ): Promise<BookingResponse> => {
    try {
      // Fetch fresh CSRF token
      const csrfData = await apiGet<{ key: string }>(
        API_ROUTES.EVENTS.BOOK(eventId),
      );
      const csrfToken = csrfData.key;

      // Immediately use it for booking
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
