import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { hashPassword } from '@/lib/utils';
import { AuthService } from '@/services/auth.service';

interface ResetPasswordPayload {
  email: string;
  password: string;
}

export function useResetPassword() {
  const router = useRouter();
  return useMutation<void, Error, ResetPasswordPayload>({
    mutationFn: async (data: ResetPasswordPayload) => {
      const hashedNewPassword = await hashPassword(data.password);
      const payload = {
        email: data.email,
        password: hashedNewPassword,
      };
      AuthService.resetPassword(payload);
    },
    onSuccess: () => {
      toast.success('Password reset initiated. Please verify the OTP.');
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(
          'resetPasswordResendStartTime',
          Date.now().toString(),
        );
      }
      router.push('/reset-password/verify');
    },
    onError: () => {
      toast.error('Password reset failed. Please try again.');
    },
  });
}
