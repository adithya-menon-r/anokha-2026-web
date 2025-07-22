import { useMutation } from '@tanstack/react-query';
import { AuthService } from '@/services/auth.service';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

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
      toast.success('Password reset successful!');
      router.push('/login');
    },
    onError: () => {
      toast.error('Password reset failed.Please Try Again');
    },
  });
} 