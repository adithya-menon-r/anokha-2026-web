'use client';
import gsap from 'gsap';
import { useEffect, useRef } from 'react';

const columns = [
  [
    'https://images.unsplash.com/photo-1518972559570-7cc1309f3229',
    'https://images.unsplash.com/photo-1511379938547-c1f69419868d',
    'https://images.unsplash.com/photo-1501386761578-eac5c94b800a',
    'https://images.unsplash.com/photo-1547153760-18fc86324498',
  ],
  [
    'https://images.unsplash.com/photo-1514516870926-206f5e03f33b',
    'https://images.unsplash.com/photo-1464375117522-1311dd7d0cd7',
    'https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2',
    'https://images.unsplash.com/photo-1497032205916-ac775f0649ae',
  ],
  [
    'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee',
    'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7',
    'https://images.unsplash.com/photo-1506157786151-b8491531f063',
    'https://images.unsplash.com/photo-1470225620780-dba8ba36b745',
  ],
];

export default function HeroSection() {
  const colRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      colRefs.current.forEach((col, i) => {
        if (!col) return;

        const totalHeight = col.offsetHeight / 3;
        const duration = 30 + i * 5;

        gsap.to(col, {
          y: i % 2 === 0 ? -totalHeight : totalHeight,
          duration: duration,
          ease: 'none',
          repeat: -1,
          ...(i % 2 !== 0 && { startAt: { y: -totalHeight } }),
        });
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="relative h-[100svh] w-full overflow-hidden bg-anokha-dark">
      {/* 1. Sharp Diagonal Background */}
      <div className="absolute inset-0 z-0 origin-center scale-150 rotate-[15deg] opacity-60">
        <div className="grid grid-cols-3 gap-6 h-full w-full">
          {columns.map((images, i) => (
            <div key={i} className="relative h-full overflow-hidden">
              <div
                ref={(el) => (colRefs.current[i] = el)}
                className="flex flex-col gap-6 will-change-transform"
              >
                {[...images, ...images, ...images].map((img, idx) => (
                  <div
                    key={idx}
                    className="h-[35vh] w-full overflow-hidden rounded-md bg-neutral-900 border border-white/10"
                  >
                    <img
                      src={`${img}?auto=format&fit=crop&w=800&q=75`}
                      alt=""
                      className="h-full w-full object-cover brightness-90 saturate-100"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Sharp Overlays - Pure Gradient for contrast without blur */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-anokha-dark/90 via-transparent to-anokha-dark/90" />
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-anokha-dark/40 via-transparent to-anokha-dark/40" />

      {/* 3. Central Title Content */}
      <div className="relative z-20 flex h-full flex-col items-center justify-center pointer-events-none">
        <div className="flex flex-col items-center">
          <span className="text-anokha-gold font-orbitron tracking-[1em] text-[10px] md:text-xs mb-6 uppercase">
            ANOKHA '26 PRESENTS
          </span>

          <h1 className="font-orbitron font-black italic text-white text-[18vw] md:text-[14vw] leading-[0.8] tracking-tighter drop-shadow-2xl">
            eventide
          </h1>

          <p className="mt-10 text-white/80 font-inter font-medium tracking-[0.5em] text-[10px] md:text-xs uppercase">
            The Digital Convergence
          </p>
        </div>
      </div>

      {/* 4. Functional Bottom UI */}
      <div className="absolute bottom-12 left-0 w-full flex justify-center z-30">
        <div className="flex flex-col items-center gap-6">
          <div className="h-12 w-[2px] bg-anokha-orange" />
          <button className="text-white font-orbitron text-[11px] tracking-[0.3em] uppercase hover:text-anokha-orange transition-colors pointer-events-auto">
            Scroll to Explore
          </button>
        </div>
      </div>

      {/* Aesthetic Border Decor */}
      <div className="absolute inset-8 border border-white/5 pointer-events-none z-30" />
    </section>
  );
}
