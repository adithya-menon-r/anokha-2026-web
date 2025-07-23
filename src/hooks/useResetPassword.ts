import { useMutation } from '@tanstack/react-query';
import { AuthService } from '@/services/auth.service';
import { useRouter } from 'next/navigation';

interface ResetPasswordPayload {
  email: string;
  otp: string;
  password: string;
}

export function useResetPassword() {
  const router = useRouter();
  return useMutation<void, Error, ResetPasswordPayload>({
    mutationFn: (payload) => AuthService.resetPassword(payload),
    onSuccess: () => {
      router.push('/login');
    },
  });
} 