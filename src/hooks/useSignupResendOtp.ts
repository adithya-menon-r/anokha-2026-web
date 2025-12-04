import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { AuthService } from '@/services/auth.service';

export function useSignupResendOtp() {
  return useMutation({
    mutationFn: AuthService.resendSignupOtp,
    onSuccess: () => {
      toast.success('OTP resent successfully!');
    },
    onError: () => {
      toast.error('Failed to resend OTP. Please try again.');
    },
  });
}
