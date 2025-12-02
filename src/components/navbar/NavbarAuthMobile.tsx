'use client';

import { createHash } from 'crypto';
import { LogOut } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useNavbarAuth } from '@/hooks/useNavbarAuth';
import { getInitials } from '@/lib/utilityFunctions';

const genSHA256 = (email: string) =>
  createHash('sha256').update(email.trim().toLowerCase()).digest('hex');

export function NavbarAuthMobile() {
  const { user, logout, router } = useNavbarAuth();

  if (!user) {
    return (
      <Link href="/login">
        <Button
          variant="default"
          size="sm"
          className="bg-anokha-orange text-white"
        >
          Login / Signup
        </Button>
      </Link>
    );
  }

  return (
    <div className="flex items-center justify-center w-full gap-6">
      {/* Avatar Button */}
      <button
        onClick={() => router.push('/profile')}
        className="group w-10 h-10 rounded-full overflow-hidden bg-anokha-orange text-white 
                 flex items-center justify-center text-lg font-semibold shadow-md 
                 transition transform hover:scale-105 active:scale-95"
      >
        {user.email ? (
          <img
            src={`https://www.gravatar.com/avatar/${genSHA256(
              user.email,
            )}?s=200&d=robohash`}
            alt={user.name || 'User'}
            className="w-full h-full object-cover"
          />
        ) : (
          getInitials(user.name || 'User')
        )}
      </button>
      <button
        className="flex items-center gap-2 px-4 py-2 border border-red-500 text-red-500 
                   rounded-md text-sm font-medium bg-transparent 
                   transition hover:bg-red-500/10 hover:text-red-600 
                   active:scale-95"
        onClick={() => {
          logout();
          router.push('/');
        }}
      >
        <LogOut className="w-4 h-4" />
        Logout
      </button>
    </div>
  );
}
