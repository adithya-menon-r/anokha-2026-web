'use client';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { OtpAuthService } from '@/services/OtpAuthService';
import toast from 'react-hot-toast';

export function useResetPasswordOtpVerification() {
  const router = useRouter();
  return useMutation({
    mutationFn: OtpAuthService.verifyOtp,
    onSuccess: () => {
      toast.success('OTP verified! Redirecting to login...');
      router.push('/reset-password');
    },
    onError: () => {
      toast.error('OTP verification failed.Please Try Again');
      router.push('/forgot-password');
    },
  });
}