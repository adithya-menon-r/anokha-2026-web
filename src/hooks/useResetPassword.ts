import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { AuthService } from '@/services/auth.service';

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
