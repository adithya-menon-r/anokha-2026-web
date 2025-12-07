'use client';

import { MenuIcon, XIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import { isNavbarHidden } from '@/lib/route-visibility';
import { cn } from '@/lib/utils';
import { useNavbarStore } from '@/stores/useNavbarStore';
import { NavbarAuth } from './NavbarAuth';
import { NavbarAuthMobile } from './NavbarAuthMobile';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/coming-soon?tab=about' },
  { label: 'Events', href: '/events' },
  { label: 'Eventide', href: '/coming-soon?tab=eventide' },
  { label: 'TechFair', href: '/coming-soon?tab=techfair' },
];

function getActiveState(href: string, pathname: string, tab: string | null) {
  if (!href.startsWith('/coming-soon')) return pathname === href;

  const expectedTab = new URLSearchParams(href.split('?')[1]).get('tab');
  return expectedTab === tab;
}

export function Navbar() {
  const pathname = usePathname();
  const search = useSearchParams();
  const tab = search.get('tab');
  const router = useRouter();

  const [mobileOpen, setMobileOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { isNavbarHidden: isHiddenByScroll } = useNavbarStore();

  const shouldHideNavbar = isNavbarHidden(pathname);
  useOutsideClick(menuRef, () => setMobileOpen(false));
  useEffect(() => {
    if (!mobileOpen) return;
    const handleScroll = () => setMobileOpen(false);

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mobileOpen]);
  if (shouldHideNavbar) return null;

  return (
    <nav
      className={cn(
        'sticky top-3 mx-3 z-50 mb-3',
        'rounded-2xl border border-border/40',
        'bg-white/5',
        'backdrop-blur-2xl',
        'shadow-lg',
        'transition-all duration-300',
        'hover:shadow-xl',
        isHiddenByScroll
          ? '-translate-y-[150%] md:translate-y-0'
          : 'translate-y-0',
      )}
    >
      <div className="px-4 sm:px-6 h-[5.6rem] flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 flex-shrink-0 ml-0">
          <Link href="/" aria-label="Go to Home">
            <Image
              src="/logo_w.png"
              alt="Anokha Logo"
              width={40}
              height={40}
              priority
              className="cursor-pointer"
            />
          </Link>
        </Link>
        <div className="hidden lg:flex items-center gap-3">
          {navLinks.map(({ label, href }) => {
            const active = getActiveState(href, pathname, tab);

            return (
              <Link
                key={label}
                href={href}
                className={`relative text-lg font-medium px-5 py-3 rounded-lg transition-all duration-200
                  ${
                    active
                      ? 'text-anokha-orange underline underline-offset-8 decoration-2 decoration-[var(--anokha-orange)]'
                      : 'text-muted-foreground hover:text-foreground hover:underline underline-offset-8 decoration-2'
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
          className="
      lg:hidden 
      border-t border-border/40
      animate-in slide-in-from-top-2 duration-200 text-center  
    "
          ref={menuRef}
        >
          <div className="px-4 sm:px-6 lg:px-8 py-4">
            <nav className="flex flex-col gap-2">
              {navLinks.map(({ label, href }) => {
                const active = getActiveState(href, pathname, tab);

                return (
                  <Link
                    key={label}
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    className={`relative text-lg font-medium px-5 py-2 rounded-lg transition-all duration-200
                      ${
                        active
                          ? 'text-anokha-orange underline underline-offset-8 decoration-2 decoration-[var(--anokha-orange)]'
                          : 'text-white/60 hover:text-foreground hover:underline underline-offset-8 decoration-2'
                      }
                    `}
                  >
                    {label}
                  </Link>
                );
              })}
            </nav>

            <div className="pt-7 pb-3 mt-4 border-t-2 border-white/30 flex flex-col gap-2 ">
              <NavbarAuthMobile />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
