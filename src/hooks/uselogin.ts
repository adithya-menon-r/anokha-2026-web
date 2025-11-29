import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { hashPassword } from '@/lib/utils';
import { AuthService } from '@/services/auth.service';
import { useAuthStore } from '@/stores/auth.store';
import type { LoginFormValues } from '@/types/login';

export function useLogin() {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: async (values: LoginFormValues) => {
      const hashed = await hashPassword(values.password);
      return AuthService.login({ ...values, password: hashed });
    },
    onSuccess: (data) => {
      setAuth(data.token, data.user);
      router.push('/events');
    },
  });
}
