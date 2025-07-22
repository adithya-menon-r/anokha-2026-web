import { useMutation } from '@tanstack/react-query';
import { AuthService } from '@/services/auth.service';
import { useAuthStore } from '@/stores/auth.store';
import { useRouter } from 'next/navigation';

export function useLogin() {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: AuthService.login,
    onSuccess: (data) => {
      setAuth(data.token, data.user);
      router.push('/events');
    },
  });
}
