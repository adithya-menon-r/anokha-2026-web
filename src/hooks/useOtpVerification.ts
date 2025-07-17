'use client';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { OtpAuthService } from '@/services/OtpAuthService';

export function useOtpVerfication() {
  const router = useRouter();
  return useMutation({
    mutationFn: OtpAuthService.verifyOtp,
    onSuccess: () => {
      toast.success('OTP verified! Redirecting to reset password...');
      router.push('/reset-password');
    },
    onError: () => {
      toast.error('OTP verification failed.Please Try Again');
      router.push('/signup');
    },
  });
}
