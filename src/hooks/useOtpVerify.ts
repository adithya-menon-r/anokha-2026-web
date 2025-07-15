import { useMutation } from '@tanstack/react-query';
import { AuthService } from '@/services/auth.service';

interface OtpVerifyPayload {
  email: string;
  otp: string;
}

export function useOtpVerify() {
  return useMutation<void, Error, OtpVerifyPayload>({
    mutationFn: (payload) => AuthService.verifyOtp(payload),
  });
} 