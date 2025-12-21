'use client';
import { gsap } from 'gsap';
import { useEffect } from 'react';

export default function HeroSection() {
  useEffect(() => {
    const tl = gsap.timeline();
    tl.from('.hero-title', {
      opacity: 0,
      y: 100,
      duration: 1.2,
      ease: 'power4.out',
    })
      .from(
        '.hero-subtitle',
        { opacity: 0, y: 50, duration: 1, ease: 'power3.out' },
        '-=0.6',
      )
      .from(
        '.hero-sponsors-fade',
        { opacity: 0, y: 30, duration: 0.8, stagger: 0.2 },
        '-=0.4',
      );
  }, []);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0a0f]" />

      <div className="max-w-7xl mx-auto text-center relative z-10 px-4">
        <h1 className="hero-title text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold mb-6 lg:mb-8">
          <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(251,146,60,0.5)] font-[900] tracking-tight">
            TechFair
          </span>
          <br />
          <span className="text-white/90 font-[800] tracking-tight">
            & Exhibitions
          </span>
        </h1>

        <p className="hero-subtitle text-xl sm:text-2xl lg:text-3xl text-orange-200/80 mb-12 lg:mb-16 font-light tracking-wide">
          ANOKHA 2026
        </p>

        <div className="hero-sponsors-fade mb-20">
          <p className="text-orange-400/80 text-sm sm:text-base font-light tracking-[0.3em] uppercase mb-8">
            Sponsored By
          </p>
          <div className="flex flex-wrap justify-center items-center gap-6 lg:gap-12">
            {['IIC Logo', 'AVV CBE', 'ANOKHA'].map((item, i) => (
              <div
                key={i}
                className="w-20 h-20 sm:w-28 sm:h-28 bg-gradient-to-br from-orange-500/20 to-amber-600/20 rounded-2xl border border-orange-400/30 flex items-center justify-center backdrop-blur-sm"
              >
                <span className="text-orange-300 text-xs">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full hero-sponsors-fade">
        <p className="text-amber-400/80 text-sm sm:text-base font-light tracking-[0.3em] uppercase text-center mb-8">
          In Collaboration With
        </p>
        <div className="relative w-full overflow-hidden py-4">
          <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-40 bg-gradient-to-r from-[#0a0a0f] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-40 bg-gradient-to-l from-[#0a0a0f] to-transparent z-10 pointer-events-none" />
          <div className="flex animate-marquee whitespace-nowrap">
            {[...Array(2)].map((_, setIndex) => (
              <div
                key={setIndex}
                className="flex items-center gap-6 sm:gap-12 px-6 sm:px-12"
              >
                {[
                  'AICTE',
                  'MOE',
                  'MIC',
                  'NITI Ayog',
                  'AIM',
                  'ATL Sarthi',
                  'AIC ACE',
                ].map((org, i) => (
                  <div
                    key={i}
                    className="w-32 h-20 sm:w-40 sm:h-24 bg-gradient-to-br from-amber-500/10 to-orange-600/10 rounded-xl border border-amber-400/20 flex items-center justify-center backdrop-blur-md flex-shrink-0"
                  >
                    <span className="text-amber-300/70 text-sm font-medium text-center px-4">
                      {org}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
