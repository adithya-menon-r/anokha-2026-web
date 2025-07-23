'use client';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { OtpAuthService } from '@/services/OtpAuthService';

export function useResetPasswordOtpVerification() {
  const router = useRouter();
  return useMutation({
    mutationFn: OtpAuthService.verifyOtp,
    onSuccess: () => {
      router.push('/reset-password');
    },
    onError: () => {
      router.push('/forgot-password');
    },
  });
}