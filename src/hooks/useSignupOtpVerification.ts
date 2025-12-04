'use client';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { AuthService } from '@/services/auth.service';

export function useSignupOtpVerification() {
  const router = useRouter();
  return useMutation({
    mutationFn: AuthService.verifySignupOtp,
    onSuccess: () => {
      toast.success('OTP verified successfully. Please login.');
      router.push('/login');
    },
  });
}
