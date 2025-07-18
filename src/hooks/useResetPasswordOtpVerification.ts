'use client';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { OtpAuthService } from '@/services/OtpAuthService';

export function useResetPasswordOtpVerification() {
  const router = useRouter();
  return useMutation({
    mutationFn: OtpAuthService.verifyOtp,
    onSuccess: () => {
      router.push('/reset-password');
    },
    onError: () => {
      router.push('/signup');
    },
  });
} 