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
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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

      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { opacity: 0, scale: 0.8, y: 30 },
          { opacity: 1, scale: 1, y: 0, duration: 1.2, ease: 'back.out(1.2)' },
        );
      }

      if (subtitleRef.current) {
        gsap.fromTo(
          subtitleRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, delay: 0.4, ease: 'power2.out' },
        );
      }

      if (containerRef.current) {
        const floatingElements =
          containerRef.current.querySelectorAll('.floating-element');
        floatingElements.forEach((el, i) => {
          gsap.to(el, {
            y: -15 + Math.random() * 30,
            duration: 4 + i,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          });
        });
      }

      gsap.to('.glow-pulse', {
        opacity: [0.3, 0.8, 0.3],
        duration: 3,
        repeat: -1,
        ease: 'sine.inOut',
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    // Added clip-path to create the slanted bottom
    <section
      ref={containerRef}
      className="h-[100svh] w-full overflow-hidden relative [clip-path:polygon(0_0,100%_0,100%_90%,0_100%)]"
    >
      {/* Background Cards Grid */}
      <div className="absolute inset-0 z-0 origin-center scale-[2] md:scale-150 rotate-[15deg] opacity-60">
        <div className="grid grid-cols-3 gap-3 md:gap-6 h-full w-full">
          {columns.map((images, i) => (
            <div key={i} className="relative h-full overflow-hidden">
              <div
                ref={(el) => (colRefs.current[i] = el)}
                className="flex flex-col gap-3 md:gap-6 will-change-transform"
              >
                {[...images, ...images, ...images].map((img, idx) => (
                  <div
                    key={idx}
                    className="h-[25vh] md:h-[35vh] w-full overflow-hidden rounded-md bg-neutral-900 border border-white/10 floating-element relative"
                  >
                    <div className="glow-pulse absolute inset-0 bg-anokha-orange/20 blur-3xl -z-10" />
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

      {/* Overlays */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-anokha-dark/15 via-anokha-dark/10 to-anokha-dark/5" />
      <div className="absolute inset-0 z-15 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(255,255,255,0.02)_50%,transparent_100%)] animate-pulse" />
      </div>

      {/* Central Title Content */}
      <div className="relative z-20 flex h-full flex-col items-center justify-center pointer-events-none">
        <div className="flex flex-col items-center text-center px-4">
          <span className="text-anokha-gold font-orbitron tracking-[0.5em] md:tracking-[1em] text-[8px] md:text-xs mb-2 uppercase animate-pulse">
            ANOKHA '26 PRESENTS
          </span>

          <h1
            ref={titleRef}
            className="font-orbitron font-black italic text-white text-[22vw] md:text-[14vw] leading-[0.8] tracking-tighter drop-shadow-2xl"
          >
            eventide
          </h1>

          <p
            ref={subtitleRef}
            className="mt-6 md:mt-10 text-white/80 font-inter font-medium tracking-[0.3em] md:tracking-[0.5em] text-[8px] md:text-xs uppercase"
          >
            The Digital Convergence
          </p>
        </div>
      </div>

      {/* Scroll Indicator - Adjusted bottom position to stay within slant */}
      <div className="absolute bottom-16 left-0 w-full flex justify-center z-30">
        <div className="flex flex-col items-center gap-6">
          <div className="h-12 w-[2px] bg-gradient-to-b from-anokha-orange via-anokha-gold to-transparent animate-pulse" />
          <button className="text-white font-orbitron text-[10px] md:text-[11px] tracking-[0.3em] uppercase hover:text-anokha-orange transition-colors pointer-events-auto hover:drop-shadow-[0_0_10px_rgba(255,165,0,0.5)]">
            Scroll to Explore
          </button>
        </div>
      </div>

      {/* Aesthetic Border Decor - Adjusted to follow slant or stay inner */}
      <div className="absolute inset-4 md:inset-8 border border-white/5 pointer-events-none z-30 mb-10" />
    </section>
  );
}
