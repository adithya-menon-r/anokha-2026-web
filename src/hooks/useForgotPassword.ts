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
      toast.success('If an account exists for that email, a reset link has been sent.');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to send reset link.');
    },
  });
}
