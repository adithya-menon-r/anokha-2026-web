'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

export default function EventideIntro() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgTextRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          // Changed start from 'top 70%' to 'top 85%' so it triggers sooner as you scroll
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });

      // Background "26" - Faster opacity fade
      gsap.fromTo(
        bgTextRef.current,
        {
          y: 50,
          opacity: 0,
        },
        {
          y: -50,
          opacity: 0.08,
          duration: 1, // Quick initial reveal
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.5, // Tighter scrub for more direct movement
          },
        },
      );

      // Optimized Timeline for "Quickness"
      tl.fromTo(
        '.grid-line',
        { scaleX: 0, opacity: 0 },
        {
          scaleX: 1,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'expo.out',
        },
      )
        .fromTo(
          '.data-point',
          { y: 15, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.05,
            ease: 'power4.out',
          },
          '-=0.6', // Heavy overlap with lines for simultaneous feel
        )
        .fromTo(
          '.glow-box',
          { opacity: 0, scale: 0.98 },
          { opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out' },
          '-=0.4',
        );
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col items-center justify-center py-24 px-6 overflow-hidden bg-transparent font-inter mt-24"
    >
      {/* 26 BACKGROUND */}
      <div
        ref={bgTextRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0"
      >
        <span className="text-[50vw] font-black italic text-transparent stroke-white stroke-[1px] opacity-5">
          26
        </span>
      </div>

      {/* ARCHITECTURAL GRID LINES */}
      <div className="grid-line absolute top-1/4 left-0 w-full h-[1px] bg-white/5" />
      <div className="grid-line absolute bottom-1/4 left-0 w-full h-[1px] bg-white/5" />
      <div className="grid-line absolute left-1/3 top-0 w-[1px] h-full bg-white/5 hidden lg:block" />

      <div className="relative z-10 w-full max-w-6xl mx-auto">
        {/* HEADER AREA */}
        <div className="mb-20 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-6 data-point">
              <span className="text-orange-500 font-mono text-[10px] tracking-widest uppercase font-bold">
                Protocol_03
              </span>
              <div className="h-[1px] w-12 bg-orange-500" />
            </div>
            <h2 className="data-point font-orbitron font-black italic text-white text-5xl md:text-6xl uppercase tracking-tight leading-none">
              even<span className="text-orange-500">tide</span>
            </h2>
          </div>
          <div className="lg:col-span-5 data-point">
            <p className="text-white/40 text-xs md:text-sm leading-relaxed font-mono uppercase tracking-wider border-l border-white/20 pl-6">
              Flagship Techno-Cultural Convergence // <br />
              Amrita Vishwa Vidyapeetham, CBE.
            </p>
          </div>
        </div>

        {/* MAIN DESCRIPTION */}
        <div className="glow-box mb-24 p-8 md:p-16 border border-white/5 bg-white/[0.01] backdrop-blur-3xl">
          <p className="text-white text-xl md:text-3xl font-light leading-snug md:leading-normal">
            Eventide is the{' '}
            <span className="text-orange-500 italic font-normal">
              heart and soul
            </span>{' '}
            of Anokha 2026. A three-night journey bringing together art, rhythm,
            and celebration in a flagship atmosphere that transforms the campus
            into a digital carnival.
          </p>
        </div>

        {/* CHRONOLOGY DETAILS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          {/* DAY MODULE */}
          <div className="data-point group">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-white font-orbitron font-bold text-lg uppercase tracking-widest italic group-hover:text-orange-500 transition-colors">
                By Day
              </span>
              <div className="h-[1px] flex-1 bg-white/10" />
              <span className="text-[10px] font-mono text-white/20 uppercase tracking-tighter">
                09:00 - 17:00
              </span>
            </div>
            <p className="text-white/50 text-sm md:text-base leading-relaxed font-light">
              Anokha buzzes with{' '}
              <span className="text-white">workshops and competitions</span>,
              fueling the campus with technical excellence and innovation.
            </p>
          </div>

          {/* NIGHT MODULE */}
          <div className="data-point group">
            <div className="flex items-center gap-4 mb-6 text-orange-500">
              <span className="text-white font-orbitron font-bold text-lg uppercase tracking-widest italic group-hover:text-orange-500 transition-colors">
                By Night
              </span>
              <div className="h-[1px] flex-1 bg-orange-500/20" />
              <span className="text-[10px] font-mono animate-pulse uppercase tracking-tighter">
                18:00 - LATE
              </span>
            </div>
            <div className="space-y-6">
              <p className="text-white/50 text-sm md:text-base leading-relaxed font-light">
                The landscape transforms into a cultural carnival of music,
                dance, and unforgettable performances across three distinct
                nights.
              </p>

              <div className="flex gap-6 border-t border-white/5 pt-6">
                {['Ragasudha', 'Natyasudha', 'Proshow'].map((item) => (
                  <div key={item} className="flex flex-col gap-1">
                    <span className="w-1 h-1 bg-orange-500 rounded-full" />
                    <span className="text-white font-orbitron text-[9px] font-bold tracking-[0.2em] uppercase">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
