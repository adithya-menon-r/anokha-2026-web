import { useMutation } from '@tanstack/react-query';
import { AuthService } from '@/services/auth.service';
interface ForgotPasswordPayload {
  email: string;
}

export function useForgotPassword() {
  return useMutation<void, Error, ForgotPasswordPayload>({
    mutationFn: (payload) => AuthService.forgotPassword(payload),
  });
}
