'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

export default function AnimatedIntro() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const textElementsRef = useRef<HTMLDivElement>(null);
  const accentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const badgeRef = useRef<HTMLDivElement>(null); // New Ref for the badge

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      });

      // 1. Unified Entrance
      tl.fromTo(
        cardRef.current,
        { x: -80, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.2, ease: 'power3.out' },
      );

      // 2. Stagger text
      if (textElementsRef.current) {
        tl.from(
          textElementsRef.current.children,
          {
            y: 20,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power2.out',
          },
          '-=0.8',
        );
      }

      // 3. Badge Entrance & Continuous Rotation
      tl.from(
        badgeRef.current,
        {
          scale: 0,
          opacity: 0,
          rotate: -45,
          duration: 1,
          ease: 'back.out(1.7)',
        },
        '-=0.5',
      );

      // Scroll-linked rotation for the badge
      gsap.to(badgeRef.current, {
        rotate: 360,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1, // Smoothly follows scroll
        },
      });

      // 4. Accent pulses
      accentRefs.current.forEach((accent, i) => {
        if (accent) {
          gsap.to(accent, {
            opacity: 0.4,
            scaleX: 1.2,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: i * 0.3,
          });
        }
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden flex items-start justify-start pt-80 pb-18 bg-transparent"
    >
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Content Card */}
      <div
        ref={cardRef}
        className="relative z-10 w-full px-8 md:ml-16 lg:ml-32 max-w-4xl"
      >
        <div ref={textElementsRef} className="space-y-10">
          <div className="flex items-center gap-6">
            <div
              ref={(el) => {
                accentRefs.current[0] = el;
              }}
              className="h-[1px] w-16 bg-orange-500 origin-left"
            />
            <span className="font-medium tracking-[0.4em] text-orange-500 text-sm uppercase">
              The Grand Finale
            </span>
          </div>

          <h2 className="text-white leading-[1.1] tracking-tighter">
            <span className="text-5xl md:text-7xl lg:text-8xl font-bold block">
              Eventide.
            </span>
            <span className="text-3xl md:text-5xl lg:text-6xl font-light text-white/40 block mt-2">
              The Soul of Anokha 2026.
            </span>
          </h2>

          <div className="max-w-2xl border-l-2 border-orange-500/30 pl-8 space-y-8">
            <p className="text-white/80 text-xl md:text-2xl leading-relaxed font-light">
              Transforming the Amrita Coimbatore campus into an{' '}
              <span className="text-white font-normal">
                {' '}
                immersive cultural carnival{' '}
              </span>{' '}
              of music, dance, and rhythm.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-4">
              <div>
                <h4 className="text-orange-400 text-xs uppercase tracking-widest mb-3 font-bold">
                  The Day
                </h4>
                <p className="text-white/50 text-base leading-relaxed">
                  Workshops, hackathons, and intense technical competitions.
                </p>
              </div>
              <div>
                <h4 className="text-orange-400 text-xs uppercase tracking-widest mb-3 font-bold">
                  The Night
                </h4>
                <p className="text-white/50 text-base leading-relaxed">
                  The stage ignites with world-class performances and
                  electrifying beats.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* NEW: Bottom Right Fulfilling Element (The Interactive Badge) */}
      {/* Updated: Bottom Right Fulfilling Element (The Interactive Badge) */}
      {/* Added 'hidden md:block' to hide on mobile and show on medium screens and up */}
      <div className="hidden md:block absolute bottom-20 right-10 md:right-20 pointer-events-none select-none">
        <div
          ref={badgeRef}
          className="relative flex items-center justify-center w-32 h-32 md:w-48 md:h-48"
        >
          {/* Circular Text (SVG) */}
          <svg
            className="absolute w-full h-full animate-spin-slow"
            viewBox="0 0 100 100"
          >
            <defs>
              <path
                id="circlePath"
                d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
              />
            </defs>
            <text className="text-[8px] uppercase font-bold tracking-[0.2em] fill-orange-500/40">
              <textPath xlinkHref="#circlePath">
                • 3 Days of Innovation • 3 Nights of Celebration •
              </textPath>
            </text>
          </svg>

          {/* Central Logo/Icon */}
          <div className="flex flex-col items-center justify-center bg-zinc-900/50 backdrop-blur-md border border-white/10 rounded-full w-20 h-20 md:w-28 md:h-28 shadow-2xl">
            <span className="text-orange-500 text-2xl font-black">26</span>
            <span className="text-white/40 text-[10px] uppercase tracking-tighter">
              Edition
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
