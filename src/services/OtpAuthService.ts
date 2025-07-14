import { apiPost } from '@/lib/api';
import type { VerifyOtpResponse } from '@/types/otpTypes';

export const OtpAuthService = {
  verifyOtp: (payload: { otp: string }): Promise<VerifyOtpResponse> =>
    apiPost<VerifyOtpResponse>('/auth/verify-otp', payload, { skipAuth: true }),
  resendOtp: () => apiPost('/auth/resend-otp', null, { skipAuth: true }),
};
