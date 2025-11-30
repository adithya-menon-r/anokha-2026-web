'use client';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { AuthService } from '@/services/auth.service';

export function useOtpVerfication() {
  const router = useRouter();
  return useMutation({
    mutationFn: AuthService.verifyOtp,
    onSuccess: () => {
      toast.success('OTP verified successfully. Please login.');
      router.push('/login');
    },
  });
}
