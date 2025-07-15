import { useMutation } from '@tanstack/react-query';
import { AuthService } from '@/services/auth.service';

interface ResetPasswordPayload {
  email: string;
  otp: string;
  password: string;
}

export function useResetPassword() {
  return useMutation<void, Error, ResetPasswordPayload>({
    mutationFn: (payload) => AuthService.resetPassword(payload),
  });
} 