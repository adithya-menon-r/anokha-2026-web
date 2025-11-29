import { apiGet, apiPost } from '@/lib/api';
import type { LoginFormValues, LoginResponse } from '@/types/login';
import type { VerifyOtpResponse } from '@/types/otpTypes';
import type { SignUpFormValues } from '@/types/signUpTypes';

export const AuthService = {
  signUp: async (
    payload: SignUpFormValues,
  ): Promise<{ message: string; expiry_at: string }> => {
    try {
      const csrfData = await apiGet<{ key: string }>('/auth/user/register');
      const csrfToken = csrfData.key;
      console.log(csrfToken);

      return await apiPost<{ message: string; expiry_at: string }>(
        '/auth/user/register',
        payload,
        {
          headers: {
            'X-Csrf-Token': csrfToken,
          },
        },
      );
    } catch (error: any) {
      const message =
        error?.response?.data?.message || error.message || 'Signup failed';
      throw new Error(message);
    }
  },

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

  login: (payload: LoginFormValues) =>
    apiPost<LoginResponse>('/auth/login', payload),

  forgotPassword: (payload: { email: string }): Promise<void> =>
    apiPost('/auth/forgot-password', payload, { skipAuth: true }),

  resetPassword: (payload: {
    email: string;
    otp: string;
    password: string;
  }): Promise<void> =>
    apiPost('/auth/reset-password', payload, { skipAuth: true }),
};
