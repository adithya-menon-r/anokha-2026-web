import { apiGet, apiPost } from '@/lib/api';
import type {
  BookingResponse,
  GroupBookingPayload,
  IndividualBookingPayload,
} from '@/types/bookingTypes';

export const BookingService = {
  /**
   * Get CSRF token for booking endpoint
   * Must be called before making a booking request
   */
  getCsrfToken: async (eventId: string): Promise<string> => {
    try {
      const csrfData = await apiGet<{ key: string }>(`/events/${eventId}/book`);
      return csrfData.key;
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error.message ||
        'Failed to fetch CSRF token';
      throw new Error(message);
    }
  },

  /**
   * Book event for individual user
   */
  bookIndividualEvent: async (
    eventId: string,
    csrfToken: string,
  ): Promise<BookingResponse> => {
    try {
      return await apiPost<BookingResponse>(
        `/events/${eventId}/book`,
        {},
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
   */
  bookGroupEvent: async (
    eventId: string,
    payload: GroupBookingPayload,
    csrfToken: string,
  ): Promise<BookingResponse> => {
    try {
      return await apiPost<BookingResponse>(
        `/events/${eventId}/book`,
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
