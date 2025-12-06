'use client';

import { createHash } from 'crypto';
import { LogOut, User } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNavbarAuth } from '@/hooks/useNavbarAuth';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import { getInitials } from '@/lib/utilityFunctions';

const genSHA256 = (email: string) =>
  createHash('sha256').update(email.trim().toLowerCase()).digest('hex');

export function NavbarAuth() {
  const { user, logout, router } = useNavbarAuth();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useOutsideClick(dropdownRef as React.RefObject<HTMLElement>, () =>
    setDropdownOpen(false),
  );

  if (!isMounted || !user) {
    return (
      <Link href="/login">
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
        className="flex items-center gap-3 text-sm bg-transparent hover:bg-transparent focus:bg-transparent active:bg-transparent hover:border-anokha-orange/50 px-3 py-8 rounded-xl transition-all duration-200 group"
        onClick={() => setDropdownOpen((prev) => !prev)}
        aria-expanded={dropdownOpen}
        aria-haspopup="true"
      >
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-[-6px] rounded-full border-[3px] border-l-anokha-orange border-r-anokha-orange border-t-anokha-red border-b-anokha-red -rotate-45 group-hover:rotate-45 transition-transform duration-300 ease-in-out" />
            <div className="flex items-center justify-center w-10 h-10 bg-anokha-orange text-white text-xs font-semibold rounded-full transition-transform duration-200 overflow-hidden z-10">
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
          </div>
        </div>
      </Button>

      {dropdownOpen && (
        <div
          className="absolute right-8 w-fit backdrop-blur-lg bg-background border border-border/60 shadow-2xl rounded-2xl overflow-hidden animate-in slide-in-from-top-4 fade-in-50 duration-200 z-50"
          role="menu"
        >
          <div className="px-4 py-4 border-b border-border/30 bg-popover/30 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-11 h-11 bg-anokha-orange text-white text-sm font-semibold rounded-full overflow-hidden ring-1 ring-border/40">
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
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-muted-foreground hover:bg-popover/40 hover:text-anokha-orange transition-all duration-200"
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
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-destructive hover:bg-destructive/5 hover:text-destructive transition-all duration-200"
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
