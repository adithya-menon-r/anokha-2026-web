'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { AuthService } from '@/services/auth.service';
import { useAuthStore } from '@/stores/auth.store';

export default function AuthInit() {
  const setUser = useAuthStore((state) => state.setUser);
  const isHydrated = useAuthStore((state) => state.isHydrated);
  const user = useAuthStore((state) => state.user);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!isHydrated) return;

    const checkSession = async () => {
      const currentUser = useAuthStore.getState().user;

      if (currentUser) return;

      try {
        const { user: sessionUser } = await AuthService.getSession();
        if (sessionUser) {
          setUser({
            name: sessionUser.name,
            email: sessionUser.email,
            student_id: sessionUser.student_id,
          });
        }
      } catch (error) {
        console.error('Session check failed', error);
      }
    };

    const timeoutId = setTimeout(checkSession, 100);
    return () => clearTimeout(timeoutId);
  }, [setUser, isHydrated]);

  useEffect(() => {
    if (!isHydrated || !user) return;

    const guestRoutes = ['/login', '/signup', '/reset-password'];
    const isGuestRoute = guestRoutes.some(
      (route) => pathname === route || pathname.startsWith(`${route}/`),
    );

    if (isGuestRoute) {
      router.push('/');
    }
  }, [user, isHydrated, pathname, router]);

  return <></>;
}
