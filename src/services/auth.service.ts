import { apiPost } from '@/lib/api';
import { LoginFormValues} from '@/types/login';

export const AuthService = {
  login: (payload: LoginFormValues) => apiPost<{ token: string }>('/auth/login', payload),
};
