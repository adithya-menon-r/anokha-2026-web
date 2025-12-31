'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

export default function AnimatedIntro() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgLayerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const accentRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      gsap.to(bgLayerRef.current, {
        y: 100,
        opacity: 0.7,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
          markers: false,
        },
      });

      gsap.to(textRef.current, {
        y: -80,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
          markers: false,
        },
      });

      const lines = accentRefs.current.filter(Boolean);
      if (lines.length > 0) {
        gsap.fromTo(
          lines,
          {
            scaleX: 0,
            opacity: 0,
          },
          {
            scaleX: 1,
            opacity: 1,
            stagger: 0.2,
            duration: 1,
            ease: 'power3.out',
            delay: 0.3,
          },
        );
      }

      accentRefs.current.forEach((accent, i) => {
        if (accent) {
          gsap.to(accent, {
            opacity: [0.3, 0.8, 0.3],
            duration: 6 + i,
            repeat: -1,
            ease: 'sine.inOut',
            delay: i * 0.5,
          });
        }
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden flex items-center"
    >
      <div
        ref={contentRef}
        className="relative z-10 w-full px-6 md:px-12 max-w-5xl mx-auto"
      >
        <div ref={textRef} className="will-change-transform space-y-12">
          <div className="flex items-center justify-center gap-4">
            <div
              ref={(el) => {
                accentRefs.current[0] = el;
              }}
              className="h-0.5 w-12 bg-gradient-to-r from-transparent via-orange-400 to-transparent origin-left"
            />
            <span className="font-light tracking-[0.2em] text-orange-400/70 text-xs uppercase">
              Eventide
            </span>
            <div
              ref={(el) => {
                accentRefs.current[1] = el;
              }}
              className="h-0.5 w-12 bg-gradient-to-r from-transparent via-orange-400 to-transparent origin-right"
            />
          </div>

          <div className="space-y-8">
            <h2 className="font-light text-white text-center leading-[1.3] tracking-wide">
              <span className="text-4xl md:text-5xl lg:text-6xl block mb-6">
                Eventide is the heart and soul of Anokha 2026
              </span>
              <span className="text-2xl md:text-3xl lg:text-4xl text-white/80 font-light">
                the flagship techno-cultural festival of Amrita Vishwa
                Vidyapeetham, Coimbatore Campus
              </span>
            </h2>

            <div className="max-w-3xl mx-auto space-y-6">
              <p className="text-white/70 text-lg md:text-xl leading-relaxed text-center font-light">
                Eventide unfolds over three electrifying evenings, bringing
                together art, rhythm, and celebration under one vibrant sky.
              </p>

              <div className="flex flex-col md:flex-row gap-8 justify-center text-center">
                <div className="flex-1">
                  <p className="text-white/60 text-base leading-relaxed font-light">
                    By day, Anokha buzzes with workshops and competitions
                  </p>
                </div>
                <div className="w-px bg-white/20" />
                <div className="flex-1">
                  <p className="text-white/60 text-base leading-relaxed font-light">
                    By night, Eventide takes over, transforming the campus into
                    a cultural carnival of music, dance, and unforgettable
                    performances
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <div
              ref={(el) => {
                accentRefs.current[2] = el;
              }}
              className="h-0.5 w-20 bg-gradient-to-r from-transparent via-orange-400 to-transparent origin-center"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
