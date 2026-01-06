'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

export default function EventideIntro() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 60%',
        },
      });

      tl.fromTo(
        '.massive-header',
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'expo.out' },
      )
        .fromTo(
          '.massive-text',
          { y: 100, opacity: 0, skewY: 5 },
          {
            y: 0,
            opacity: 1,
            skewY: 0,
            duration: 1.2,
            stagger: 0.1,
            ease: 'expo.out',
          },
          '-=0.5',
        )
        .fromTo(
          '.content-reveal',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' },
          '-=0.8',
        );

      gsap.to('.bg-26', {
        yPercent: -15,
        scrollTrigger: {
          trigger: containerRef.current,
          scrub: 1,
        },
      });
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col p-6 md:p-12 lg:p-16 overflow-hidden uppercase font-inter text-white bg-transparent"
    >
      {/* BACKGROUND GIANT 26 */}
      <div className="bg-26 absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.015] z-0">
        <span className="text-[100vw] md:text-[80vw] font-black italic select-none leading-none">
          26
        </span>
      </div>

      {/* TOP POSITIONED TITLE & HUD */}
      <div className="relative z-10 w-full mb-12">
        <div className="flex justify-between items-end border-b border-white/10 pb-6 mb-8 massive-header">
          <div>
            <h2 className="font-orbitron font-black italic text-3xl md:text-5xl tracking-tighter leading-none">
              EVEN<span className="text-orange-500">TIDE</span>
            </h2>
          </div>
          <div className="text-right hidden sm:block">
            <p className="font-mono text-[9px] text-white/30 tracking-[0.2em] leading-relaxed uppercase">
              <span className="text-white/60 uppercase">Amrita University</span>
            </p>
          </div>
        </div>

        {/* MASSIVE HERO TEXT */}
        <div className="w-full">
          <p className="massive-text font-orbitron font-black text-xs md:text-sm tracking-[0.8em] text-orange-500 mb-4 ml-1 drop-shadow-[0_0_10px_rgba(249,115,22,0.3)]">
            EXPERIENCE THE
          </p>

          <h1 className="massive-text text-[12vw] lg:text-[10vw] font-black italic leading-[0.75] text-white tracking-tighter uppercase">
            <span className="text-orange-500">EXTRA</span>VAGANZA
          </h1>

          <div className="massive-text flex flex-col md:flex-row md:items-end gap-6 md:gap-12 mt-8">
            <div className="flex items-center gap-6 md:gap-12 flex-grow">
              <h1 className="text-[12vw] lg:text-[9vw] font-black italic leading-[0.7] text-transparent stroke-white stroke-[1px] tracking-tighter opacity-40">
                18:30
              </h1>
              <div className="h-[1px] flex-grow bg-white/20" />
            </div>

            {/* TIRED TIME & LOCATION BLOCK */}
            <div className="flex flex-col items-start md:items-end">
              <span className="font-orbitron text-5xl md:text-7xl lg:text-9xl text-orange-500 italic font-black tracking-tighter leading-none">
                6:30{' '}
                <span className="text-xl md:text-4xl ml-[-0.15em] opacity-80">
                  PM
                </span>
              </span>
              <div className="flex items-center gap-2 mt-2 md:mt-4 group">
                {/* SVG LOCATION ICON */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-orange-500 w-5 h-5 md:w-8 md:h-8 animate-bounce"
                >
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span className="font-orbitron text-xl md:text-3xl tracking-[0.1em] text-white font-black italic">
                  MAIN{' '}
                  <span className="text-orange-500 underline decoration-white/20 underline-offset-4">
                    GROUND
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 mt-auto">
        {/* LEFT: THE MANIFESTO */}
        <div className="lg:col-span-6 content-reveal self-end pb-4">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-[1px] flex-1 bg-orange-500/20" />
          </div>
          <p className="text-white text-xl md:text-3xl font-light normal-case leading-tight tracking-tight">
            eventide is the{' '}
            <span className="text-orange-500 italic font-normal">
              heart and soul
            </span>{' '}
            of Anokha 2026. A three-night journey bringing together art, rhythm,
            and celebration in a flagship atmosphere that transforms the campus
            into a digital carnival.
          </p>
        </div>

        {/* RIGHT: SEQUENCE */}
        <div className="lg:col-span-6 content-reveal">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-[1px] flex-1 bg-white/5" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { id: 'I', title: 'RAAGASUDHA', desc: 'Classical Fusion.' },
              { id: 'II', title: 'NATYASUDHA', desc: 'Rhythmic Explosion.' },
              { id: 'III', title: 'PROSHOW', desc: 'Grand Finale.' },
            ].map((item) => (
              <div
                key={item.id}
                className="group border-t border-white/5 pt-4 hover:border-orange-500 transition-colors"
              >
                <span className="text-orange-500 font-mono text-[10px] block mb-2">
                  {item.id}
                </span>
                <h4 className="font-orbitron text-base md:text-lg font-black italic text-white mb-1 group-hover:translate-x-1 transition-transform tracking-tight">
                  {item.title}
                </h4>
                <p className="text-white/30 text-[9px] tracking-widest leading-relaxed uppercase">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* DECORATIVE CORNER ACCENT */}
      <div className="absolute top-0 right-0 w-32 h-32 border-t border-r border-white/5 pointer-events-none" />
    </section>
  );
}
