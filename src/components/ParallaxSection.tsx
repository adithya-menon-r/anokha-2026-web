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

      // Text parallax (slower, floats up)

      // Text reveal: starts after fg
      gsap.fromTo(
        textRef.current,
        { y: 80, opacity: 0 },
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
      gsap.to(textRef.current, {
        y: -40,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 40%',
          end: 'bottom 10%',
          scrub: 1.8,
          markers: false,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-void overflow-hidden min-h-screen"
      aria-label="About Anokha Section"
    >
      {/* Space background - subtle */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-gray-900 via-black to-gray-900" />

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
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="z-50 -mb-16">
            <Image
              src="/Images/mascot-flag.png"
              alt="Mascot"
              height={700}
              width={700}
              priority={false}
            />
          </div>
          <div className="about_anokha relative max-w-3xl text-left p-8 md:p-12 backdrop-blur-md bg-white/10 border border-white/50 rounded-3xl shadow-xl z-50">
            {/* Top left corner */}
            <Image
              src="/top_left.png"
              alt=""
              height={60}
              width={60}
              className="absolute -top-2 -left-2 pointer-events-none"
              priority={false}
            />
            {/* Top right corner */}
            <Image
              src="/top_right.png"
              alt=""
              height={60}
              width={60}
              className="absolute -top-2 -right-2 pointer-events-none"
              priority={false}
            />
            {/* Bottom left corner */}
            <Image
              src="/bottom_left.png"
              alt=""
              height={60}
              width={60}
              className="absolute -bottom-2 -left-2 pointer-events-none"
              priority={false}
            />
            {/* Bottom right corner */}
            <Image
              src="/bottom_right.png"
              alt=""
              height={60}
              width={60}
              className="absolute -bottom-2 -right-2 pointer-events-none"
              priority={false}
            />
            {/* Title */}
            <h2 className="font-orbitron text-5xl md:text-7xl font-bold tracking-wide text-white mb-8">
              About Anokha
            </h2>

            {/* Context paragraph */}
            <p className="text-lg md:text-xl text-gray-300 mb-16 leading-relaxed">
              Anokha is a celebration of innovation, creativity, and
              technological excellence. It brings together brilliant minds to
              explore, learn, and showcase the boundless possibilities of modern
              technology and design. Join us on this extraordinary journey.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ParallaxSection;
