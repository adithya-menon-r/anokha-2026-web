import { apiPost } from '@/lib/api';
import type { LoginFormValues, LoginResponse } from '@/types/login';

export const AuthService = {
  login: (payload: LoginFormValues) =>
    apiPost<LoginResponse>('/auth/login', payload),
  forgotPassword: (payload: { email: string }): Promise<void> =>
    apiPost('/auth/forgot-password', payload, { skipAuth: true }),
  verifyOtp: (payload: { email: string; otp: string }): Promise<void> =>
    apiPost('/auth/verify-otp', payload, { skipAuth: true }),
  resetPassword: (payload: {
    email: string;
    otp: string;
    password: string;
  }): Promise<void> =>
    apiPost('/auth/reset-password', payload, { skipAuth: true }),
};
