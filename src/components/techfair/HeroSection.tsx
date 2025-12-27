'use client';
import { gsap } from 'gsap';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

const mainSponsors = [
  { name: 'IIC Logo', src: '/techfair/IIC.png' },
  { name: 'AVV CBE', src: '/techfair/AVV_CBE.png' },
  { name: 'ANOKHA', src: '/anokha_circle.png' },
];

const collaborators = [
  { name: 'AICTE', src: '/techfair/AICTE.png' },
  { name: 'MOE', src: '/techfair/MoE.svg' },
  { name: 'MIC', src: '/techfair/MIC.webp' },
  { name: 'NITI Ayog', src: '/techfair/NITI_Aayog.png' },
  { name: 'AIM', src: '/techfair/AIM.png' },
  { name: 'ATL Sarthi', src: '/techfair/ATL_Sarthi.png' },
  { name: 'AIC ACE', src: '/techfair/AIC_ACE.png' },
];

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });

      tl.fromTo(
        '.hero-title',
        { opacity: 0, y: 100 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'power4.out' },
      )
        .fromTo(
          '.hero-subtitle',
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
          '-=0.6',
        )
        .fromTo(
          '.hero-sponsors-fade',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.2 },
          '-=0.4',
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex flex-col items-center justify-start pt-20 sm:pt-2 md:pt-12 lg:pt-20 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0a0f]" />

      <div className="max-w-7xl mx-auto text-center relative z-10 px-4">
        <h1
          className="hero-title text-3xl sm:text-3xl md:text-6xl lg:text-8xl xl:text-8xl font-bold mb-6 lg:mb-8"
          style={{ opacity: 0 }}
        >
          <span className="font-outerspaceMilitia bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(251,146,60,0.5)] font-[900] tracking-tight">
            TechFair
          </span>
          <br />
          <span className="text-white/90 font-[800] tracking-tighter">&</span>
          <br />
          <span className="font-outerspaceMilitia text-white/90 font-[800] tracking-tighter">
            Exhibitions
          </span>
        </h1>

        <p
          className="hero-subtitle text-xl sm:text-2xl lg:text-4xl text-orange-200/80 mb-12 lg:mb-16 font-light tracking-wide"
          style={{ fontFamily: 'SPINC', opacity: 0 }}
        >
          ANOKHA 2026
        </p>

        {/* --- MAIN SPONSORS SECTION --- */}
        <div className="hero-sponsors-fade mb-20" style={{ opacity: 0 }}>
          <p className="text-orange-400/80 text-sm sm:text-base font-orbitron font-light tracking-[0.3em] uppercase mb-8">
            Sponsored By
          </p>
          <div className="flex flex-wrap justify-center items-center gap-6 lg:gap-12">
            {mainSponsors.map((logo, i) => (
              <div
                key={i}
                className="group w-24 h-24 sm:w-32 sm:h-32 bg-white rounded-2xl border border-slate-200 flex items-center justify-center p-4 transition-all duration-300 shadow-sm hover:shadow-lg hover:scale-105"
              >
                <div className="relative w-full h-full">
                  <Image
                    src={logo.src}
                    alt={logo.name}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- COLLABORATORS MARQUEE SECTION --- */}
      <div
        className="w-full hero-sponsors-fade relative z-10"
        style={{ opacity: 0 }}
      >
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
                {collaborators.map((org, i) => (
                  <div
                    key={i}
                    className="w-36 h-20 sm:w-48 sm:h-24 bg-white rounded-xl border border-slate-200 flex items-center justify-center flex-shrink-0 p-4 shadow-sm"
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src={org.src}
                        alt={org.name}
                        fill
                        className="object-contain"
                      />
                    </div>
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
