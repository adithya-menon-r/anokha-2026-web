'use client';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { AuthService } from '@/services/auth.service';

export function useOtpVerfication() {
  const router = useRouter();
  return useMutation({
    mutationFn: AuthService.verifyOtp,
    onSuccess: () => {
      router.push('/login');
    },
    onError: () => {
      router.push('/signup');
    },
  });
}
