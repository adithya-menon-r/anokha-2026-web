'use client';

import { MenuIcon, XIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRef, useState } from 'react';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import { NavbarAuth } from './NavbarAuth';

const navLinks = [
  { label: 'Home', href: '/coming-soon' },
  { label: 'About', href: '/coming-soon' },
  { label: 'Events', href: '/events' },
  { label: 'Eventide', href: '/coming-soon' },
  { label: 'TechFair', href: '/coming-soon' },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useOutsideClick(menuRef, () => setMobileOpen(false));

  const hiddenRoutes = ['/auth', '/login', '/signup', '/profile']; // To hide navbar on specific routes like auth login signup and profile pages
  const shouldHideNavbar = hiddenRoutes.some((route) =>
    pathname.startsWith(route),
  );

  if (shouldHideNavbar) return null;

  return (
    <nav className="fixed top-3 left-3 right-3 z-50 rounded-xl border border-border/40 backdrop-blur-xl shadow-sm transition-all duration-300 hover:shadow-md">
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

        <div className="hidden md:flex items-center gap-3">
          {navLinks.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="text-lg font-medium text-muted-foreground hover:text-foreground px-5 py-3 rounded-lg 
border-b-2 border-transparent hover:border-anokha-orange transition-all duration-200"
            >
              {label}
              <span className="absolute bottom-1 left-4 right-4 h-0.5 bg-[--anokha-orange] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <NavbarAuth />
          </div>
          <button
            className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors duration-200"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close mobile menu' : 'Open mobile menu'}
            aria-controls="mobile-menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <XIcon className="h-5 w-5 text-muted-foreground" />
            ) : (
              <MenuIcon className="h-5 w-5 text-muted-foreground" />
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div
          id="mobile-menu"
          className="md:hidden border-t border-border/40 backdrop-blur-sm animate-in slide-in-from-top-2 duration-200 text-center"
          ref={menuRef}
        >
          <div className="px-4 sm:px-6 lg:px-8 py-4">
            <nav className="flex flex-col gap-2">
              {navLinks.map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className="px-5 py-4 text-lg font-medium text-muted-foreground hover:text-foreground hover:bg-muted/60 rounded-lg transition-colors duration-200"
                >
                  {label}
                </Link>
              ))}
            </nav>

            <div className="pt-4 mt-4 border-t border-border/40 flex justify-center">
              <NavbarAuth />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
