'use client';

import { ArrowRight, Menu, X } from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';
import React, { useMemo, useState } from 'react';

interface NavLink {
  name: string;
  href: string;
}

export default function HackathonHeader(): React.JSX.Element {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  const navLinks = useMemo<NavLink[]>(
    () => [
      { name: 'Home', href: '#home' },
      { name: 'About', href: '#about' },
      { name: 'Themes', href: '#themes' },
      { name: 'Schedule', href: '#schedule' },
      { name: 'Prizes', href: '#prizes' },
      { name: 'FAQs', href: '#faqs' },
    ],
    [],
  );

  return (
    <>
      {/* Floating Header */}
      <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-4xl md:max-w-7xl">
        <div
          className={`backdrop-blur-xl border border-white/10 rounded-full shadow-2xl shadow-purple-500/20 transition-all duration-300 ${
            mobileOpen ? 'bg-black opacity-100' : 'bg-black/40'
          }`}
        >
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              {/* Logo */}
              <a
                href="#home"
                className="flex items-center gap-3 text-[13px] sm:text-sm font-medium text-zinc-300"
              >
                <img
                  src="/hackathon/logo_trans_bg.png"
                  alt="AI-Verse Logo"
                  className="h-8 w-8 hover:shadow-lg hover:shadow-purple-500/30 transition-shadow duration-300"
                />
                <div className="flex flex-col">
                  <span className="tracking-wide hover:text-purple-200 transition-colors ease-in duration-150">
                    AI-Verse Hackathon
                  </span>
                  <span className="text-xs text-zinc-500">Anokha 2026</span>
                </div>
              </a>

              {/* Desktop Nav */}
              <nav className="hidden md:flex items-center gap-6">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-sm text-zinc-300 hover:text-purple-400 transition-colors duration-300 relative group"
                  >
                    {link.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 group-hover:w-full transition-all duration-300" />
                  </a>
                ))}

                {/* Registration Button - Desktop */}
                <Link
                  href="/hackathon/register"
                  className="group relative inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 overflow-hidden transition-all duration-200 active:translate-y-0.5 cursor-pointer"
                  style={{
                    textShadow: '0 1px 3px rgba(0,0,0,0.5)',
                    transform: 'perspective(500px) rotateX(2deg)',
                  }}
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="absolute inset-0 rounded-full pointer-events-none"
                  />
                  <span
                    className="absolute inset-0 rounded-full bg-gradient-to-b from-purple-500 via-purple-600 to-purple-800 transition-all duration-200 group-hover:from-purple-400 group-hover:via-purple-500 group-hover:to-purple-700"
                    style={{
                      boxShadow:
                        '0 4px 0 #5b21b6, 0 6px 15px rgba(168, 85, 247, 0.3)',
                    }}
                  />
                  <span className="absolute inset-x-0 top-0 h-1/2 rounded-t-full bg-gradient-to-b from-white/40 via-white/20 to-transparent opacity-80" />
                  <span className="absolute inset-x-2 top-0.5 h-0.5 rounded-full bg-gradient-to-r from-transparent via-white to-transparent opacity-90 blur-sm" />
                  <span className="absolute inset-x-3 top-0.5 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />
                  <span
                    className="absolute inset-0 rounded-full bg-purple-500/50 blur-md transition-all duration-300 group-hover:blur-lg group-hover:bg-purple-400/60"
                    style={{
                      transform: 'translateY(2px)',
                    }}
                  />
                  <span
                    className="absolute inset-0 rounded-full"
                    style={{
                      boxShadow: 'inset 0 -1px 3px rgba(0,0,0,0.3)',
                    }}
                  />
                  <span className="absolute inset-x-0 bottom-0 h-2 rounded-b-full bg-gradient-to-b from-transparent to-black/30" />
                  <span
                    className="relative z-10 tracking-wide"
                    style={{ transform: 'translateY(-2px)' }}
                  >
                    Registration
                  </span>
                  <ArrowRight
                    className="relative z-10 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                    style={{ transform: 'translateY(-2px)' }}
                  />
                </Link>
              </nav>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden inline-flex items-center justify-center rounded-full p-2 text-zinc-300 hover:text-white hover:bg-white/10 transition-all duration-300"
                onClick={() => setMobileOpen((s) => !s)}
                aria-label="Toggle navigation"
              >
                {mobileOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Dropdown */}
          {mobileOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 mt-2 mx-2 backdrop-blur-xl bg-black border border-white/10 rounded-2xl shadow-2xl shadow-purple-500/20 overflow-hidden transition-all duration-500 ease-in-out opacity-100">
              <div className="px-4 py-4 space-y-2">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-xl px-4 py-3 text-sm text-zinc-200 hover:bg-white/10 hover:text-purple-400 transition-all duration-300"
                  >
                    {link.name}
                  </a>
                ))}

                {/* Registration Button - Mobile */}
                <Link
                  href="/hackathon/register"
                  onClick={() => setMobileOpen(false)}
                  className="group relative inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 overflow-hidden transition-all duration-200 active:translate-y-0.5 cursor-pointer"
                  style={{
                    textShadow: '0 1px 3px rgba(0,0,0,0.5)',
                    transform: 'perspective(500px) rotateX(2deg)',
                  }}
                >
                  <span
                    className="absolute inset-0 rounded-full bg-gradient-to-b from-purple-500 via-purple-600 to-purple-800"
                    style={{
                      boxShadow:
                        '0 4px 0 #5b21b6, 0 6px 15px rgba(168, 85, 247, 0.3)',
                    }}
                  />
                  <span className="absolute inset-x-0 top-0 h-1/2 rounded-t-full bg-gradient-to-b from-white/40 via-white/20 to-transparent opacity-80" />
                  <span
                    className="relative z-10 tracking-wide"
                    style={{ transform: 'translateY(-2px)' }}
                  >
                    Registration
                  </span>
                  <ArrowRight
                    className="relative z-10 h-4 w-4"
                    style={{ transform: 'translateY(-1px)' }}
                  />
                </Link>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
}
