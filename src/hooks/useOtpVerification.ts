'use client';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { OtpAuthService } from '@/services/OtpAuthService';

export function useOtpVerfication() {
  const router = useRouter();
  return useMutation({
    mutationFn: OtpAuthService.verifyOtp,
    onSuccess: () => {
      router.push('/login');
    },
    onError: () => {
      router.push('/signup');
    },
  });
}
