'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { AuthService } from '@/services/auth.service';
import { useAuthStore } from '@/stores/auth.store';

export function useNavbarAuth() {
  const user = useAuthStore((state) => state.user);
  const logoutStore = useAuthStore((state) => state.logout);
  const router = useRouter();

  const logout = async () => {
    try {
      await AuthService.logout();
      logoutStore();
      toast.success('Logged out successfully');
      router.push('/login');
    } catch (error) {
      console.error('Logout failed', error);
      logoutStore();
      router.push('/login');
    }
  };

  return { user, logout, router };
}
