import { apiGet } from '@/lib/api';
import { Event, EventDetails } from '@/types/eventTypes';
import { apiPost } from '@/lib/api';
export const EventService = {
  getAll: (): Promise<Event[]> => {
    return apiGet<Event[]>('/events');
  },
  getById: (id: string): Promise<EventDetails> => {
    return apiGet<EventDetails>(`/events/${id}`);
  },
};

export const OtpAuthService = {
  verifyOtp: <T>(payload: unknown): Promise<T> =>
    apiPost('/auth/verify-otp', payload, { skipAuth: true }),
};
