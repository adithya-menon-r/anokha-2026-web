'use client';
import gsap from 'gsap';
import { useEffect, useRef } from 'react';

const columns = [
  [
    '/eventide/HERO2.JPG',
    '/eventide/HERO3.JPG',
    '/eventide/HERO4.JPG',
    '/eventide/HERO5.JPG',
  ],
  [
    '/eventide/HERO1.JPG',
    '/eventide/HERO10.JPG',
    '/eventide/HERO8.JPG',
    '/eventide/HERO11.JPG',
  ],
  [
    '/eventide/HERO9.JPG',
    '/eventide/HERO6.JPG',
    '/eventide/HERO7.JPG',
    '/eventide/HERO12.JPG',
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

        // Accurate height of one third of the tripled array
        const totalHeight = col.scrollHeight / 3;
        const duration = 30 + i * 5;

        if (i % 2 === 0) {
          // Columns 0 and 2: Scroll Up
          gsap.to(col, {
            y: -totalHeight,
            duration: duration,
            ease: 'none',
            repeat: -1,
          });
        } else {
          // Column 1: Scroll Down
          // fromTo ensures the column starts offset so it can pull images down infinitely
          gsap.fromTo(
            col,
            { y: -totalHeight },
            {
              y: 0,
              duration: duration,
              ease: 'none',
              repeat: -1,
            },
          );
        }
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
    <section
      ref={containerRef}
      className="h-[100svh] w-full overflow-hidden relative"
    >
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

      <div className="absolute inset-0 z-10 bg-gradient-to-b from-anokha-dark/15 via-anokha-dark/10 to-anokha-dark/5" />
      <div className="absolute inset-0 z-15 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(255,255,255,0.02)_50%,transparent_100%)] animate-pulse" />
      </div>

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

      {/* <div className="absolute bottom-12 left-0 w-full flex justify-center z-30">
        <div className="flex flex-col items-center gap-6">
          <div className="h-12 w-[2px] bg-gradient-to-b from-anokha-orange via-anokha-gold to-transparent animate-pulse" />
          <button className="text-white font-orbitron text-[10px] md:text-[11px] tracking-[0.3em] uppercase hover:text-anokha-orange transition-colors pointer-events-auto hover:drop-shadow-[0_0_10px_rgba(255,165,0,0.5)]">
            Scroll to Explore
          </button>
        </div>
      </div> */}

      <div className="absolute inset-4 md:inset-8 border border-white/5 pointer-events-none z-30" />
    </section>
  );
}
