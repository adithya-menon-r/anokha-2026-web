import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { AuthService } from '@/services/auth.service';
import { useAuthStore } from '@/stores/auth.store';

export function useLogin() {
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: AuthService.login,
    onSuccess: (data) => {
      setAuth(data.token, data.user);
      toast.success('Login successful!');
    },
    onError: () => {
      toast.error('Invalid credentials. Please try again.');
    },
  });
}
