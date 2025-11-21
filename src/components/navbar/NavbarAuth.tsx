'use client';

import { createHash } from 'crypto';
import { ChevronDownIcon, LogOut, User } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useOutsideClick } from '@/hooks/useOutsideClick';

// import { useAuthStore } from "@/stores/auth.store";

// Helper: Generate SHA256 hash for Gravatar
const genSHA256 = (email: string) =>
  createHash('sha256').update(email.trim().toLowerCase()).digest('hex');

// Helper: Get initials for fallback avatar
const getInitials = (name: string) =>
  name
    .split(' ')
    .map((word) => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);

export function NavbarAuth() {
  // TODO: Replace mock data with Zustand auth store once backend ready
  // const { token, user, logout } = useAuthStore()
  const token = 'zdcsdvasDv';
  const user = {
    name: 'Vijay S B',
    email: 'vijaysb@example.com',
  };

  const logout = () => console.log('Logged out');

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const router = useRouter();
  useOutsideClick(dropdownRef as React.RefObject<HTMLElement>, () =>
    setDropdownOpen(false),
  );

  if (!token || !user) {
    return (
      <Link href="/auth">
        <Button
          variant="default"
          size="sm"
          className="text-sm font-semibold bg-anokha-orange hover:bg-anokha-orange/90 text-white border-0 px-6 py-6 rounded-lg transition-all duration-200 hover:scale-105 shadow-md hover:shadow-lg"
        >
          Login / Signup
        </Button>
      </Link>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="ghost"
        size="lg"
        className="flex items-center gap-3 text-sm bg-transparent hover:border-anokha-orange/50 px-5 py-8 rounded-3xl transition-all duration-200 group"
        onClick={() => setDropdownOpen((prev) => !prev)}
        aria-expanded={dropdownOpen}
        aria-haspopup="true"
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 bg-anokha-orange text-white text-xs font-semibold rounded-full group-hover:scale-105 transition-transform duration-200 overflow-hidden">
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
          </div>
          <span className="font-medium text-muted-foreground group-hover:text-anokha-orange transition-all duration-200">
            {getInitials(user.name || 'User')}
          </span>
        </div>
        <ChevronDownIcon
          className={`w-4 h-4 text-muted-foreground group-hover:text-anokha-orange transition-all duration-200 ${
            dropdownOpen ? 'rotate-180' : 'rotate-0'
          }`}
        />
      </Button>

      {dropdownOpen && (
        <div
          className="
absolute right-0 mt-3 w-56 
    backdrop-blur-lg bg-background
    border border-border/60 shadow-2xl
    rounded-2xl overflow-hidden
    animate-in slide-in-from-top-4 fade-in-50 duration-200
    z-50

    "
          role="menu"
        >
          <div className="px-4 py-4 border-b border-border/30 bg-popover/30 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div
                className="
          flex items-center justify-center w-11 h-11 
          bg-anokha-orange text-white text-sm font-semibold 
          rounded-full overflow-hidden ring-1 ring-border/40
        "
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
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground truncate tracking-wide">
                  {user.name || 'User'}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {user.email || 'user@example.com'}
                </p>
              </div>
            </div>
          </div>
          <div className="py-2">
            <button
              className="
          w-full flex items-center gap-3 px-4 py-2.5 
          text-sm text-muted-foreground
          hover:bg-popover/40 hover:text-anokha-orange
          transition-all duration-200
        "
              onClick={() => {
                setDropdownOpen(false);
                router.push('/profile');
              }}
            >
              <User className="w-4 h-4" />
              Profile
            </button>

            <div className="border-t border-border/30 my-1" />

            <button
              className="
          w-full flex items-center gap-3 px-4 py-2.5 text-sm 
          text-destructive hover:bg-destructive/5 
          hover:text-destructive transition-all duration-200
        "
              onClick={() => {
                logout();
                setDropdownOpen(false);
                router.push('/');
              }}
            >
              <LogOut className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
