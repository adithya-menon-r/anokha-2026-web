'use client';

import { ChevronDownIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/stores/auth.store';

export function NavbarAuth() {
  const { token, user, logout } = useAuthStore();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();
  if (!token || !user) {
    return (
      <Link href="/auth">
        <Button variant="default" className="text-sm font-semibold">
          Login / Signup
        </Button>
      </Link>
    );
  }
  return (
    <div className="relative">
      <Button
        variant="outline"
        className="flex items-center gap-2 text-sm"
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        {user.name ?? 'Profile'}
        <ChevronDownIcon className="w-4 h-4" />
      </Button>

      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-[hsl(var(--popover))] border border-[hsl(var(--border))] rounded-md shadow-sm z-50">
          <button
            className="w-full text-left px-4 py-2 text-sm hover:bg-[hsl(var(--muted))]"
            onClick={() => {
              setDropdownOpen(false);
              router.push('/profile');
            }}
          >
            Profile
          </button>
          <button
            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-[hsl(var(--muted))]"
            onClick={() => {
              logout();
              setDropdownOpen(false);
              router.push('/');
            }}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
