import { apiGet, apiPost } from '@/lib/api';
import type { LoginFormValues, LoginResponse, User } from '@/types/login';
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
    try {
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
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error.message ||
        'OTP Verification failed';
      throw new Error(message);
    }
  },

  resendOtp: async (): Promise<{ message: string }> => {
    try {
      return await apiGet<{ message: string }>(
        '/auth/user/register/otp/resend',
      );
    } catch (error: any) {
      const message =
        error?.response?.data?.message || error.message || 'Resend OTP failed';
      throw new Error(message);
    }
  },

  login: async (payload: LoginFormValues): Promise<LoginResponse> => {
    try {
      const csrfData = await apiGet<{ key: string }>('/auth/user/login');
      const csrfToken = csrfData.key;

      return await apiPost<LoginResponse>('/auth/user/login', payload, {
        headers: {
          'X-Csrf-Token': csrfToken,
        },
      });
    } catch (error: any) {
      const message =
        error?.response?.data?.message || error.message || 'Login failed';
      throw new Error(message);
    }
  },

  logout: async (): Promise<{ message: string }> => {
    try {
      return await apiGet<{ message: string }>('/auth/user/logout');
    } catch (error: any) {
      const message =
        error?.response?.data?.message || error.message || 'Logout failed';
      throw new Error(message);
    }
  },

  getSession: async (): Promise<{ user: User | null }> => {
    try {
      const data = await apiGet<User & { message: string }>(
        '/auth/user/session',
      );
      return {
        user: data,
      };
    } catch (error) {
      console.error('Session fetch error:', error);
      return { user: null };
    }
  },

  forgotPassword: (payload: { email: string }): Promise<void> =>
    apiPost('/auth/forgot-password', payload, { skipAuth: true }),

  resetPassword: (payload: {
    email: string;
    otp: string;
    password: string;
  }): Promise<void> =>
    apiPost('/auth/reset-password', payload, { skipAuth: true }),
};
