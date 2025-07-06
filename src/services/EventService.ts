import { apiGet } from '@/lib/api';
import { Event, EventDetails } from '@/types/eventTypes';
import { apiPost } from '@/lib/api';
import { VerifyOtpResponse } from '@/types/otpTypes';
export const EventService = {
  getAll: (): Promise<Event[]> => {
    return apiGet<Event[]>('/events');
  },
  getById: (id: string): Promise<EventDetails> => {
    return apiGet<EventDetails>(`/events/${id}`);
  },
};

export const OtpAuthService = {
  verifyOtp: (payload: { otp: string }): Promise<VerifyOtpResponse> =>
    apiPost<VerifyOtpResponse>('/auth/verify-otp', payload, { skipAuth: true }),
};
