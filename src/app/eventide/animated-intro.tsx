'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

export default function AnimatedIntro() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const bgElementsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.intro-kicker',
        { opacity: 0, y: 40, letterSpacing: '-0.5em', filter: 'blur(10px)' },
        {
          opacity: 1,
          y: 0,
          letterSpacing: '0.2em',
          filter: 'blur(0px)',
          scrollTrigger: {
            trigger: '.intro-panel',
            start: 'top 75%',
            end: 'top 35%',
            scrub: 1.5,
          },
        },
      );

      gsap.fromTo(
        '.intro-title',
        { opacity: 0, y: 120, scale: 0.7, rotateX: 90 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          scrollTrigger: {
            trigger: '.intro-panel',
            start: 'top 85%',
            end: 'top 35%',
            scrub: 1.5,
          },
        },
      );

      gsap.fromTo(
        '.intro-divider',
        { scaleX: 0, opacity: 0, y: -10 },
        {
          scaleX: 1,
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'back.out(1.2)',
          scrollTrigger: {
            trigger: '.intro-panel',
            start: 'top 60%',
            end: 'top 40%',
            scrub: 1,
          },
        },
      );

      gsap.fromTo(
        '.intro-text',
        { opacity: 0, y: 50, letterSpacing: '-0.1em' },
        {
          opacity: 1,
          y: 0,
          letterSpacing: '0.05em',
          scrollTrigger: {
            trigger: '.intro-panel',
            start: 'top 55%',
            end: 'top 25%',
            scrub: 1.5,
          },
        },
      );

      bgElementsRef.current.forEach((el, i) => {
        if (!el) return;
        const isBg = i < 2;
        gsap.to(el, {
          y: isBg ? 100 - i * 50 : -80 + i * 40,
          x: Math.random() * 80 - 40,
          opacity: [0.05, 0.15, 0.05],
          duration: 7 + i * 1.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: i * 0.2,
        });
      });

      const accentLines = document.querySelectorAll('.accent-line');
      accentLines.forEach((line, i) => {
        gsap.fromTo(
          line,
          { scaleX: 0, opacity: 0 },
          {
            scaleX: 1,
            opacity: 0.6,
            transformOrigin: 'left',
            duration: 0.8,
            delay: 0.2 + i * 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: '.intro-panel',
              start: 'top 55%',
              end: 'top 30%',
              scrub: 1,
            },
          },
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="intro-panel relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-anokha-dark"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-anokha-dark via-anokha-dark/50 to-anokha-dark" />
      <div className="absolute inset-0 bg-gradient-to-r from-anokha-dark/60 via-transparent to-anokha-dark/60" />

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div
        ref={(el) => (bgElementsRef.current[0] = el)}
        className="absolute top-32 left-20 w-72 h-72 bg-anokha-orange/8 rounded-full blur-3xl will-change-transform"
      />
      <div
        ref={(el) => (bgElementsRef.current[1] = el)}
        className="absolute bottom-32 right-20 w-96 h-96 bg-anokha-gold/8 rounded-full blur-3xl will-change-transform"
      />
      <div
        ref={(el) => (bgElementsRef.current[2] = el)}
        className="absolute top-1/2 left-1/3 w-80 h-80 bg-anokha-orange/5 rounded-full blur-3xl will-change-transform"
      />

      {/* Main content */}
      <div
        ref={containerRef}
        className="intro-content relative z-10 max-w-4xl px-8 text-center"
      >
        <span className="intro-kicker font-orbitron text-[9px] tracking-[0.3em] text-anokha-gold uppercase block opacity-80">
          ▸ System Initializing ◂
        </span>

        <h2 className="intro-title mt-8 font-orbitron font-black italic uppercase leading-tight tracking-tighter text-6xl md:text-8xl">
          EVENTIDE
          <br />
          <span className="text-white/20 text-5xl md:text-7xl">PROTOCOL</span>
        </h2>

        <div className="flex justify-center gap-4 my-10">
          <div className="accent-line h-px w-8 bg-gradient-to-r from-transparent to-anokha-orange" />
          <div className="accent-line h-px w-12 bg-gradient-to-r from-anokha-orange via-anokha-gold to-transparent" />
          <div className="accent-line h-px w-8 bg-gradient-to-r from-anokha-orange to-transparent" />
        </div>

        <p className="intro-text text-white/60 font-inter uppercase tracking-widest text-xs md:text-sm leading-loose max-w-2xl mx-auto">
          Three nights. Three frequencies.
          <br />
          <span className="text-anokha-gold/80">
            One evolving digital experience.
          </span>
        </p>

        <div className="mt-16 flex flex-col items-center gap-3 opacity-60">
          <div className="h-12 w-[1px] bg-gradient-to-b from-anokha-orange to-transparent animate-pulse" />
          <span className="font-orbitron text-[9px] tracking-[0.2em] text-white/50">
            CONTINUE
          </span>
        </div>
      </div>

      {/* Border decoration */}
      <div className="absolute inset-8 border border-white/5 pointer-events-none z-20" />
    </section>
  );
}
