import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { OtpAuthService } from '@/services/OtpAuthService';

export function UseResendOtp() {
  return useMutation({
    mutationFn: OtpAuthService.resendOtp,
    onSuccess: () => {
      toast.success('OTP resent successfully!');
    },
    onError: () => {
      toast.error('Failed to resend OTP. Please try again.');
    },
  });
}
