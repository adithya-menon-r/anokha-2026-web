import React from 'react';
import Image from 'next/image';

interface ComingSoonProps {
  logoRef: React.RefObject<HTMLDivElement | null>;
  anokhaRef: React.RefObject<HTMLDivElement | null>;
  yearRef: React.RefObject<HTMLDivElement | null>;
  comingRef: React.RefObject<HTMLDivElement | null>;
  extraNoteRef: React.RefObject<HTMLDivElement | null>;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export function ComingSoon({
  logoRef,
  anokhaRef,
  yearRef,
  comingRef,
  extraNoteRef,
  onMouseEnter,
  onMouseLeave,
}: ComingSoonProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white relative">
      <div className="relative w-[320px] sm:w-[420px] h-[220px] flex items-center justify-center group">
        <div
          className="w-24 h-24 z-10"
          ref={logoRef}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
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
          className="absolute top-full text-2xl text-gray-400 opacity-0"
        >
          Innovation Awaits
        </div>

        <div
          ref={anokhaRef}
          className="absolute left-[-1.5rem] sm:left-[-4.0rem] top-1/2 -translate-y-1/2 text-3xl sm:text-5xl tracking-wide text-white pointer-events-none whitespace-nowrap opacity-0 font-spincycle"
          style={{ transform: 'translateY(-50%) translateX(-50px)' }}
        >
          anokHa
        </div>

        <div
          ref={yearRef}
          className="absolute right-[-0.5rem] sm:right-[-0.5rem] top-1/2 -translate-y-1/2 text-3xl sm:text-5xl tracking-wide text-white pointer-events-none whitespace-nowrap opacity-0 font-spincycle"
          style={{ transform: 'translateY(-50%) translateX(50px)' }}
        >
          2025
        </div>
      </div>
    </div>
  );
}
