'use client';

import { MenuIcon, XIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { NavbarAuth } from './NavbarAuth';

const navLinks = [
  { label: 'Home', href: '/coming-soon' },
  { label: 'About', href: '/coming-soon' },
  { label: 'Events', href: '/events' },
  { label: 'Eventide', href: '/coming-soon' },
  { label: 'TechFair', href: '/coming-soon' },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMobileOpen(false);
      }
    }

    if (mobileOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mobileOpen]);

  return (
    <nav className="w-full sticky top-0 z-50 border-b border-border backdrop-blur-md">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 h-22 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo_w.png"
            alt="Anokha 2025"
            width={200}
            height={200}
            priority
          />
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {navLinks.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="text-md font-lg text-muted-foreground hover:text-foreground transition-colors px-3 py-2 rounded-md"
            >
              {label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <NavbarAuth />
          </div>
          <button
            className="md:hidden p-2 hover:bg-muted rounded-md transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close mobile menu' : 'Open mobile menu'}
          >
            {mobileOpen ? (
              <XIcon className="h-6 w-6 text-muted-foreground" />
            ) : (
              <MenuIcon className="h-6 w-6 text-muted-foreground" />
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden" ref={menuRef}>
          <div className="mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <nav className="flex flex-col gap-2 items-center">
              {navLinks.map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className="w-full px-3 py-2 text-sm font-medium text-accent-foreground text-center transition-all border-b-2 border-transparent hover:border-[--anokha-orange] hover:text-foreground"
                >
                  {label}
                </Link>
              ))}
            </nav>
            <div className="pt-4 flex justify-center">
              <NavbarAuth />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
