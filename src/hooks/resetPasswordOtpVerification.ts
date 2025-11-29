'use client';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { AuthService } from '@/services/auth.service';

export function useResetPasswordOtpVerification() {
  const router = useRouter();
  return useMutation({
    mutationFn: AuthService.verifyOtp,
    onSuccess: () => {
      router.push('/reset-password');
    },
    onError: () => {
      router.push('/forgot-password');
    },
  });
}
