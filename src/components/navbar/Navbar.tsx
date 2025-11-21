'use client';

import { LogOut, MenuIcon, User, XIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import router from 'next/router';
import { useRef, useState } from 'react';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import { useAuthStore } from '@/stores/auth.store';
import { NavbarAuth } from './NavbarAuth';

type NavLinks = {
  label: string;
  href: string;
};
const navLinks: NavLinks[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/coming-soon?tab=about' },
  { label: 'Events', href: '/events' },
  { label: 'Eventide', href: '/coming-soon?tab=eventide' },
  { label: 'TechFair', href: '/coming-soon?tab=techfair' },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { user, token, logout } = useAuthStore();
  const search = useSearchParams();
  const tab = search.get('tab');

  const isActive = (label: string, href: string) => {
    if (!href.startsWith('/coming-soon')) return pathname === href;
    return tab === label.toLowerCase();
  };

  useOutsideClick(menuRef, () => setMobileOpen(false));

  const hiddenRoutes = ['/auth', '/login', '/signup', '/profile']; // To hide navbar on specific routes like auth login signup and profile pages
  const shouldHideNavbar = hiddenRoutes.some((route) =>
    pathname.startsWith(route),
  );

  if (shouldHideNavbar) return null;

  return (
    <nav className="fixed top-3 left-3 right-3 z-50 rounded-xl border border-border/60 backdrop-blur-lg shadow-sm transition-all duration-300 hover:shadow-md">
      <div className="px-4 sm:px-6 lg:px-8 h-24 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <Image
            src="/logo_w.png"
            alt="Anokha 2025"
            width={200}
            height={200}
            priority
          />
        </Link>

        <div className="hidden lg:flex items-center gap-3">
          {navLinks.map(({ label, href }) => {
            const active = isActive(label, href);

            return (
              <Link
                key={label}
                href={href}
                className={`relative text-lg font-medium px-5 py-3 rounded-lg transition-all duration-200
                  ${
                    active
                      ? 'text-anokha-orange underline underline-offset-8 decoration-[--anokha-orange]'
                      : 'text-muted-foreground hover:text-foreground hover:underline underline-offset-8'
                  }
                `}
              >
                {label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden lg:block">
            <NavbarAuth />
          </div>
          <button
            className="lg:hidden p-2 hover:bg-muted rounded-lg transition-colors duration-200"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close mobile menu' : 'Open mobile menu'}
            aria-controls="mobile-menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <XIcon className="h-7 w-7 text-muted-foreground" />
            ) : (
              <MenuIcon className="h-7 w-7 text-muted-foreground" />
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div
          id="mobile-menu"
          className="lg:hidden border-t border-border/40 backdrop-blur-sm animate-in slide-in-from-top-2 duration-200 text-center"
          ref={menuRef}
        >
          <div className="px-4 sm:px-6 lg:px-8 py-4">
            <nav className="flex flex-col gap-2">
              {navLinks.map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className={`px-5 py-3 text-lg font-medium rounded-lg transition-colors duration-200
  ${
    pathname === href
      ? 'text-anokha-orange underline underline-offset-8 decoration-[--anokha-orange]'
      : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
  }
`}
                >
                  {label}
                </Link>
              ))}
            </nav>

            <div className="pt-4 mt-4 border-t border-border/40 flex flex-col gap-2">
              <Link
                href="/profile"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-3 px-5 py-3 
               text-lg font-medium rounded-lg 
               text-muted-foreground hover:bg-muted/60 transition"
              >
                <User className="w-5 h-5 text-muted-foreground " />
                Profile
              </Link>

              <button
                onClick={() => {
                  logout();
                  setMobileOpen(false);
                  router.push('/');
                }}
                className="flex items-center justify-center gap-3 px-5 py-3 
               text-lg font-medium rounded-lg 
               text-destructive hover:bg-destructive/10 transition"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
