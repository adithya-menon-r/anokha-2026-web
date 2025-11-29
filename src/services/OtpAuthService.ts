import { apiGet, apiPost } from '@/lib/api';
import type { VerifyOtpResponse } from '@/types/otpTypes';

export const OtpAuthService = {
  verifyOtp: async (payload: { otp: string }): Promise<VerifyOtpResponse> => {
    const csrfData = await apiGet<{ key: string }>(
      '/auth/user/register/otp/verify',
    );
    const csrfToken = csrfData.key;

    return apiPost<VerifyOtpResponse>(
      '/auth/user/register/otp/verify',
      payload,
      {
        headers: {
          'X-Csrf-Token': csrfToken,
        },
      },
    );
  },

  resendOtp: () => apiPost('/auth/resend-otp', null, { skipAuth: true }),
};
