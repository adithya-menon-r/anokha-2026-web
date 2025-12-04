'use client';

import { useEffect } from 'react';
import { AuthService } from '@/services/auth.service';
import { useAuthStore } from '@/stores/auth.store';

export default function AuthInit() {
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    const checkSession = async () => {
      const currentUser = useAuthStore.getState().user;

      if (currentUser) return;

      try {
        const { user: sessionUser } = await AuthService.getSession();
        if (sessionUser) {
          setUser({ name: sessionUser.name, email: sessionUser.email });
        }
      } catch (error) {
        console.error('Session check failed', error);
      }
    };

    const timeoutId = setTimeout(checkSession, 100);
    return () => clearTimeout(timeoutId);
  }, [setUser]);

  return null;
}
