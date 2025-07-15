import { useMutation } from '@tanstack/react-query';
import { AuthService } from '@/services/auth.service';
import { toast } from 'react-hot-toast';

interface ForgotPasswordPayload {
  email: string;
}

export function useForgotPassword() {
  return useMutation<void, Error, ForgotPasswordPayload>({
    mutationFn: (payload) => AuthService.forgotPassword(payload),
    onSuccess: () => {
      toast.success('Reset link sent to your email.');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to send reset link.');
    },
  });
}
