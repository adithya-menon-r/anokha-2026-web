import { apiGet, apiPost } from '@/lib/api';
import type { LoginFormValues, LoginResponse, User } from '@/types/login';
import type { VerifyOtpResponse } from '@/types/otpTypes';
import { ResetPasswordFormValues } from '@/types/resetPasswordTypes';
import type { SignUpFormValues } from '@/types/signUpTypes';

export const AuthService = {
  signUp: async (
    payload: SignUpFormValues,
  ): Promise<{ message: string; expiry_at: string }> => {
    try {
      const csrfData = await apiGet<{ key: string }>('/auth/user/register');
      const csrfToken = csrfData.key;

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

  verifySignupOtp: async (payload: {
    otp: string;
  }): Promise<VerifyOtpResponse> => {
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

  resendSignupOtp: async (): Promise<{ message: string }> => {
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

  resetPassword: async (
    payload: ResetPasswordFormValues,
  ): Promise<{ message: string }> => {
    try {
      const csrfData = await apiGet<{ key: string }>(
        '/auth/user/forgot-password',
      );
      const csrfToken = csrfData.key;

      const { email, password } = payload;
      return await apiPost<{ message: string }>(
        '/auth/user/forgot-password',
        { email, new_password: password },
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
        'Reset password failed';
      throw new Error(message);
    }
  },

  verifyResetPasswordOtp: async (payload: {
    otp: string;
  }): Promise<VerifyOtpResponse> => {
    try {
      const csrfData = await apiGet<{ key: string }>(
        '/auth/user/forgot-password/otp/verify',
      );
      const csrfToken = csrfData.key;

      return apiPost<VerifyOtpResponse>(
        '/auth/user/forgot-password/otp/verify',
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
        'OTP Verification for Reset Password failed';
      throw new Error(message);
    }
  },

  resendResetPasswordOtp: async (): Promise<{ message: string }> => {
    try {
      return await apiGet<{ message: string }>(
        '/auth/user/forgot-password/otp/resend',
      );
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error.message ||
        'Resend Reset Password OTP failed';
      throw new Error(message);
    }
  },
};
