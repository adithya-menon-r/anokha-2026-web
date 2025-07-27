'use client';

import { ChevronDownIcon, User2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/stores/auth.store';

export function NavbarAuth() {
  const { token, user, logout } = useAuthStore();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!token || !user) {
    return (
      <Link href="/auth">
        <Button variant="default" size="sm" className="text-sm font-semibold">
          Login / Signup
        </Button>
      </Link>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="outline"
        size="sm"
        className="flex items-center gap-2 text-sm bg-transparent"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-expanded={dropdownOpen}
        aria-haspopup="true"
      >
        {user.name ?? 'Profile'}
        <User2 className="w-4 h-4" />
      </Button>

      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-popover border border-border rounded-md shadow-lg z-50 py-1">
          <button
            className="w-full text-left px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-colors"
            onClick={() => {
              setDropdownOpen(false);
              router.push('/profile');
            }}
          >
            Profile
          </button>
          <button
            className="w-full text-left px-4 py-2 text-sm text-destructive hover:bg-muted transition-colors"
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
