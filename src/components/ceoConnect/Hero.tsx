'use client';
import gsap from 'gsap';
import { Briefcase, Calendar } from 'lucide-react';
import React, { useEffect, useRef } from 'react';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const ufoRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Hero Text Animation
    if (heroRef.current) {
      const heroContent = heroRef.current.querySelector('.hero-content');
      if (heroContent) {
        gsap.fromTo(
          heroContent,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1.5, delay: 2, ease: 'power2.out' },
        );
      }
    }

    // UFO GSAP Animation
    const ufo = ufoRef.current;
    if (!ufo) return;

    const getUFOSettings = () => {
      const w = window.innerWidth;
      if (w < 640) return { scale: 1, x: 20, y: 40 };
      if (w < 768) return { scale: 1.2, x: 40, y: 80 };
      if (w < 1024) return { scale: 1.3, x: 20, y: 80 };
      if (w < 1280) return { scale: 1.4, x: 80, y: 120 };
      return { scale: 1.5, x: 20, y: 140 };
    };

    gsap.set(ufo, { x: -300, y: -300, scale: 0.3, opacity: 0, rotation: -45 });

    const settings = getUFOSettings();
    gsap.to(ufo, {
      x: settings.x,
      y: settings.y,
      scale: settings.scale,
      opacity: 1,
      rotation: 0,
      duration: 2.5,
      ease: 'power2.out',
      delay: 0.5,
    });

    const handleResize = () => {
      const s = getUFOSettings();
      gsap.to(ufo, { scale: s.scale, x: s.x, y: s.y, duration: 0.3 });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative z-10 min-h-screen flex flex-col items-center px-4 sm:px-6 lg:px-8"
    >
      <img
        ref={ufoRef}
        src="/ceo/ufo.png"
        alt="UFO"
        className="justify-center pointer-events-none z-20 will-change-transform max-md:mt-10 max-lg:mt-40 max-xl:mt-40"
        style={{
          filter: 'drop-shadow(0 0 20px rgba(168, 85, 247, 0.6))',
          mixBlendMode: 'screen',
          width: 'auto',
          height: 'auto',
          maxWidth: '1000px',
        }}
      />

      <div className="text-center space-y-4 max-w-5xl mx-auto relative z-30 hero-content max-md:-mt-20">
        <h1 className="text-5xl sm:text-6xl md:text-8xl xl:text-9xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-pulse px-4">
          CEO CONNECT
        </h1>

        <p className="text-base sm:text-lg text-gray-400 max-w-3xl mx-auto px-4">
          A three-day flagship conclave connecting students with industry
          pioneers, founders, and technology leaders shaping tomorrow's
          innovations
        </p>

        <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 pt-6 sm:pt-8 px-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-purple-500/10 rounded-lg border border-purple-500/30 backdrop-blur-sm">
            <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
            <span className="text-sm sm:text-base text-purple-300">
              7-9 January 2026
            </span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 rounded-lg border border-blue-500/30 backdrop-blur-sm">
            <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
            <span className="text-sm sm:text-base text-blue-300">
              15+ Industry Leaders
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
