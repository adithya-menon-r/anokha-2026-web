import { apiPost } from '@/lib/api';
import { LoginFormValues, LoginResponse } from '@/types/login';

export const AuthService = {
  login: (payload: LoginFormValues) => apiPost<LoginResponse>('/auth/login', payload),
};
