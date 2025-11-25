'use client';

import { useRouter } from 'next/navigation';

export function useNavbarAuth() {
  // TODO: Replace mock data with Zustand auth store once backend ready
  // const { token, user, logout } = useAuthStore()
  const token = 'zdcsdvasDv';
  const user = {
    name: 'Vijay S B',
    email: 'vijaysb@example.com',
  };

  const logout = () => console.log('Logged out');
  const router = useRouter();

  return { token, user, logout, router };
}
