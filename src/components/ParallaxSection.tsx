'use client';

import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import React, { useLayoutEffect, useRef } from 'react';
import gsap from '@/lib/gsap';
import { AboutAnokhaContent } from './ParallaxSection/AboutAnokhaContent';

gsap.registerPlugin?.(ScrollTrigger as any);

interface ParallaxSectionProps {
  backgroundImage?: string;
  foregroundImage?: string;
}

const ParallaxSection: React.FC<ParallaxSectionProps> = ({
  backgroundImage = '/Images/background.png',
  foregroundImage = '/Images/Foreground.png',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const fgRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (
      !containerRef.current ||
      !bgRef.current ||
      !fgRef.current ||
      !textRef.current
    )
      return;

    const ctx = gsap.context(() => {
      // Background reveal and parallax

      // Background reveal: starts later, ends later
      gsap.fromTo(
        bgRef.current,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,

          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 95%', // starts later
            end: 'top 60%', // ends later
            scrub: true,
            markers: false,
          },
        },
      );
      gsap.to(bgRef.current, {
        y: -60,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 60%', // starts after reveal
          end: 'bottom 10%', // ends later
          scrub: 1.2,
          markers: false,
        },
      });

      // Foreground reveal and parallax (starts after bg)

      // Foreground reveal: starts even later
      gsap.fromTo(
        fgRef.current,
        { y: 200, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%', // more delay
            end: 'top 50%',
            scrub: true,
            markers: false,
          },
        },
      );
      gsap.to(fgRef.current, {
        y: -20,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 50%',
          end: 'bottom 10%',
          scrub: 1.5,
          markers: false,
        },
      });

      // Text reveal: fade in without vertical parallax to keep blur static
      gsap.fromTo(
        textRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 70%', // more delay
            end: 'top 40%',
            scrub: true,
            markers: false,
          },
        },
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden min-h-screen"
      aria-label="About Anokha Section"
    >
      {/* Background image with subtle parallax */}
      <div
        ref={bgRef}
        className="absolute inset-0 z-10 opacity-30"
        style={{ transform: 'translateZ(0)' }}
      >
        <Image
          src={backgroundImage}
          alt="Background"
          fill
          className="object-cover"
          priority={false}
        />
      </div>

      {/* Foreground image in front, parallax */}
      <div
        ref={fgRef}
        className="absolute inset-0 z-20 pointer-events-none opacity-40"
        style={{ transform: 'translateZ(0)' }}
      >
        <Image
          src={foregroundImage}
          alt="Foreground"
          fill
          className="object-cover"
          priority={false}
        />
        {/* Gradient overlay - darker at bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black" />
      </div>

      {/* Content with parallax */}
      <div ref={textRef} className="relative z-20 px-6 py-20 md:py-32">
        <AboutAnokhaContent />
      </div>
    </section>
  );
};

export default ParallaxSection;
