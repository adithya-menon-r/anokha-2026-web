'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Image from 'next/image';

export default function ComingSoonPage() {
  const logoRef = useRef<HTMLDivElement>(null);
  const anokhaRef = useRef<HTMLDivElement>(null);
  const yearRef = useRef<HTMLDivElement>(null);
  const comingRef = useRef<HTMLDivElement>(null);
  const extraNoteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.to(logoRef.current, {
      rotate: 360,
      duration: 4,
      repeat: -1,
      ease: 'linear',
    });
    gsap.set(extraNoteRef.current, { opacity: 0, y: -20 });
  }, []);

  const handleMouseEnter = () => {
    gsap.to(comingRef.current, { opacity: 0, y: 20, duration: 0.4, ease: 'power3.out' });
    gsap.to(extraNoteRef.current, { opacity: 1, y: 0, duration: 0.6, delay: 0.2, ease: 'power2.out' });

    gsap.killTweensOf(anokhaRef.current);
    gsap.to(anokhaRef.current, {
      x: 0,
      opacity: 1,
      duration: 0.7,
      ease: 'power3.out',
    });

    gsap.killTweensOf(yearRef.current);
    gsap.to(yearRef.current, {
      x: 0,
      opacity: 1,
      duration: 0.7,
      ease: 'power3.out',
    });
  };

  const handleMouseLeave = () => {
    gsap.to(comingRef.current, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.inOut' });
    gsap.killTweensOf(extraNoteRef.current);
    gsap.to(extraNoteRef.current, { opacity: 0, y: -20, duration: 0.5, ease: 'power3.in' });

    gsap.killTweensOf(anokhaRef.current);
    gsap.to(anokhaRef.current, {
      x: -50,
      opacity: 0,
      duration: 0.5,
      ease: 'power3.in',
    });

    gsap.killTweensOf(yearRef.current);
    gsap.to(yearRef.current, {
      x: 50,
      opacity: 0,
      duration: 0.5,
      ease: 'power3.in',
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white relative">
      <div className="relative w-[320px] sm:w-[420px] h-[220px] flex items-center justify-center group">

        <div
          className="w-24 h-24 z-10"
          ref={logoRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="w-full h-full flex items-center justify-center hover:scale-110 transition-transform duration-300">
            <Image
              src="/anokha-logo.svg"
              alt="Anokha Logo"
              width={96}
              height={96}
              className="rounded-full"
              priority
            />
          </div>
        </div>

        <div
          ref={comingRef}
          className="absolute top-full text-2xl sm:text-4xl text-gray-400 transition-opacity duration-1000 whitespace-nowrap"
        >
          Coming Soon...
        </div>

        <div
          ref={extraNoteRef}
          className="absolute top-full text-2xl text-gray-600 opacity-0"
        >
          Innovation Awaits
        </div>

        <div
          ref={anokhaRef}
          className="absolute left-[-1.2rem] sm:left-[-3.5rem] top-1/2 -translate-y-1/2 text-3xl sm:text-5xl tracking-wide text-white pointer-events-none whitespace-nowrap opacity-0"
          style={{ transform: 'translateY(-50%) translateX(-50px)' }}
        >
          Anokha
        </div>

        <div
          ref={yearRef}
          className="absolute right-[-0.5rem] sm:right-[-0.5rem] top-1/2 -translate-y-1/2 text-3xl sm:text-5xl tracking-wide text-white pointer-events-none whitespace-nowrap opacity-0"
          style={{ transform: 'translateY(-50%) translateX(50px)' }}
        >
          2025
        </div>
      </div>
    </div>
  );
}
