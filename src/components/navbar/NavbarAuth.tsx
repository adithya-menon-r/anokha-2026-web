'use client';
import { createHash } from 'crypto';
import { ChevronDownIcon, LogOut, Settings, User } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/stores/auth.store';

export function NavbarAuth() {
  // const { token, user, logout } = useAuthStore()
  const token = 'mock-token';
  const user = {
    name: 'Jane Doe',
    email: 'janedoe@example.com',
  };
  const logout = () => console.log('Logged out');
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

  const genSHA256 = (email: string) => {
    return createHash('sha256')
      .update(email.trim().toLowerCase())
      .digest('hex');
  };

  if (!token || !user) {
    return (
      <Link href="/auth">
        <Button
          variant="default"
          size="sm"
          className="text-sm font-semibold bg-anokha-orange hover:bg-anokha-orange/90 text-white border-0 px-6 py-2 rounded-lg transition-all duration-200 hover:scale-105 shadow-md hover:shadow-lg"
        >
          Login / Signup
        </Button>
      </Link>
    );
  }

  // Get user initials for avatar
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((word) => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="ghost"
        size="sm"
        className="flex items-center gap-3 text-sm bg-transparent hover:bg-muted/80 border border-border/50 hover:border-anokha-orange/50 px-4 py-2 rounded-lg transition-all duration-200 group"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-expanded={dropdownOpen}
        aria-haspopup="true"
      >
        {/* User Avatar */}
        <div className="flex items-center justify-center w-8 h-8 bg-anokha-orange text-white text-xs font-semibold rounded-full group-hover:scale-105 transition-transform duration-200">
          {user.email ? (
            <img
              src={`https://www.gravatar.com/avatar/${genSHA256(user.email)}?s=200&d=robohash`}
              alt={user.name || 'User'}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            getInitials(user.name || 'User')
          )}
        </div>
        <span className="hidden sm:block font-medium text-foreground group-hover:text-anokha-orange transition-colors duration-200">
          {user.name?.split(' ')[0] || 'Profile'}
        </span>
        <ChevronDownIcon
          className={`w-4 h-4 text-muted-foreground group-hover:text-anokha-orange transition-all duration-200 ${
            dropdownOpen ? 'rotate-180' : 'rotate-0'
          }`}
        />
      </Button>
      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-popover/95 backdrop-blur-sm border border-border rounded-lg shadow-xl z-50 py-2 animate-in slide-in-from-top-2 duration-200">
          {/* User Info Header */}
          <div className="px-4 py-3 border-b border-border/50">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-anokha-orange text-white text-sm font-semibold rounded-full">
                {user.email ? (
                  <img
                    src={`https://www.gravatar.com/avatar/${genSHA256(user.email)}?s=200&d=robohash`}
                    alt={user.name || 'User'}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  getInitials(user.name || 'User')
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {user.name || 'User'}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {user.email || 'user@example.com'}
                </p>
              </div>
            </div>
          </div>
          <div className="py-1">
            <button
              className="w-full flex items-center gap-3 px-4 py-2 text-sm text-popover-foreground hover:bg-muted/80 hover:text-anokha-orange transition-all duration-200 group"
              onClick={() => {
                setDropdownOpen(false);
                router.push('/profile');
              }}
            >
              <User className="w-4 h-4 " />
              Profile
            </button>

            <button
              className="w-full flex items-center gap-3 px-4 py-2 text-sm text-destructive hover:bg-destructive/10 hover:text-destructive transition-all duration-200 group"
              onClick={() => {
                logout();
                setDropdownOpen(false);
                router.push('/');
              }}
            >
              <LogOut className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
