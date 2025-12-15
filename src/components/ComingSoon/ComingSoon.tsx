import Image from 'next/image';
import type React from 'react';
import UnifiedBackground from '../UnifiedBackground';

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
    <div className="fixed left-0 right-0 w-full top-[6.55rem] h-[calc(100dvh-6.55rem)] flex items-center justify-center overscroll-none touch-none select-none">
      <UnifiedBackground />
      <div className="absolute inset-0 z-10 opacity-30"></div>
      <div className="relative z-30 flex items-center justify-center">
        <div className="relative w-fit h-fit">
          <Image
            src="/images/coming-soon.png"
            alt="Coming Soon Board"
            width={900}
            height={900}
            className="object-contain select-none"
            priority
          />
          <Image
            src="/images/maskot-floating.png"
            alt="Floating Character"
            width={800}
            height={750}
            className="absolute animate-floatingSlow opacity-100 select-none"
            style={{
              bottom: '-8%',
              right: '-19%',
            }}
          />
        </div>
      </div>

      {/* <div className="relative w-[320px] sm:w-[420px] h-[220px] flex items-center justify-center group z-20"> */}
      {/* <div
          className="w-14 h-14 md:w-20 md:h-20 z-20"
          ref={logoRef}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <div className="w-full h-full flex items-center justify-center hover:scale-110 transition-transform duration-300">
            <Image
              src="/anokha_circle.png"
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
          className="absolute top-full text-2xl md:text-3xl -mt-14 md:-mt-4 font-semibold text-gray-400 whitespace-nowrap tracking-wider z-20"
        >
          Coming Soon...
        </div>

        <div
          ref={extraNoteRef}
          className="absolute top-full text-2xl md:text-3xl -mt-14 md:-mt-4 font-semibold text-gray-400 opacity-0 whitespace-nowrap tracking-wider z-20"
        >
          Innovation Awaits
        </div>

        <div
          ref={anokhaRef}
          className="absolute right-1/2 mr-12 sm:mr-0 sm:right-auto sm:left-[-4.5rem] top-1/2 -translate-y-1/2 text-2xl md:text-5xl tracking-wide text-white pointer-events-none whitespace-nowrap opacity-0 font-spincycle z-20"
          style={{ transform: "translateY(-50%) translateX(-50px)" }}
        >
          anokHa
        </div>

        <div
          ref={yearRef}
          className="absolute left-1/2 ml-14 sm:ml-2 sm:left-auto sm:right-[-0.5rem] top-1/2 -translate-y-1/2 text-2xl md:text-5xl tracking-wide text-white pointer-events-none whitespace-nowrap opacity-0 font-spincycle z-20"
          style={{ transform: "translateY(-50%) translateX(50px)" }}
        >
          2026
        </div>

      </div> */}
    </div>
  );
}
