'use client';

import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import React, { useLayoutEffect, useRef } from 'react';
import gsap from '@/lib/gsap';

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

  useLayoutEffect(() => {
    if (!containerRef.current || !bgRef.current) return;

    const ctx = gsap.context(() => {
      // Subtle background parallax
      gsap.to(bgRef.current, {
        y: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top center',
          end: 'bottom center',
          scrub: 1.5,
          markers: false,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-void overflow-hidden"
      aria-label="About Anokha Section"
    >
      {/* Space background - subtle */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-gray-900 via-black to-gray-900" />

      {/* Background image with subtle parallax */}
      <div
        ref={bgRef}
        className="absolute inset-0 z-10 opacity-40"
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

      {/* Foreground image in front */}
      <div className="absolute inset-0 z-30 opacity-60 pointer-events-none">
        <Image
          src={foregroundImage}
          alt="Foreground"
          fill
          className="object-cover"
          priority={false}
        />
      </div>

      {/* Content */}
      <div className="relative z-20 px-6 py-20 md:py-32">
        <div className="max-w-6xl mx-auto">
          {/* Title */}
          <h2 className="font-orbitron text-5xl md:text-7xl font-bold tracking-wide text-white mb-8">
            About Anokha
          </h2>

          {/* Context paragraph */}
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mb-16 leading-relaxed">
            Anokha is a celebration of innovation, creativity, and technological
            excellence. It brings together brilliant minds to explore, learn,
            and showcase the boundless possibilities of modern technology and
            design. Join us on this extraordinary journey.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ParallaxSection;
