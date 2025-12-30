'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import type React from 'react';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

interface EventCardProps {
  night: {
    id: number;
    title: string;
    subtitle: string;
    description: string;
    date: string;
    accent: string;
    image: string;
  };
  index: number;
  total: number;
}

export default function EventCard({ night, index, total }: EventCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const cornerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!cardRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 60%',
          end: 'bottom 40%',
          scrub: 1,
          markers: false,
        },
      });

      // Parallax background with subtle movement
      if (bgRef.current) {
        tl.fromTo(
          bgRef.current,
          { y: 80, opacity: 0.4 },
          { y: -40, opacity: 0.8 },
          0,
        );
      }

      // Title fade and scale
      if (titleRef.current) {
        tl.fromTo(
          titleRef.current,
          { scale: 0.8, opacity: 0 },
          { scale: 1, opacity: 1 },
          0,
        );
      }

      // Content entrance
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current,
          { opacity: 0, x: -60, y: 40 },
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardRef.current,
              start: 'top 70%',
            },
          },
        );

        // Stagger children elements
        const children = contentRef.current.querySelectorAll('[data-stagger]');
        gsap.fromTo(
          children,
          { opacity: 0, y: 15, filter: 'blur(8px)' },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.7,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardRef.current,
              start: 'top 65%',
            },
          },
        );
      }

      // Corner glow pulse
      if (cornerRef.current) {
        gsap.to(cornerRef.current, {
          opacity: [0.2, 0.6, 0.2],
          duration: 3.5,
          repeat: -1,
          ease: 'sine.inOut',
          delay: index * 0.3,
        });
      }
    }, cardRef);

    return () => ctx.revert();
  }, [index]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (rect && bgRef.current) {
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      gsap.to(bgRef.current, {
        x: x * 12,
        y: y * 12,
        duration: 0.5,
        overwrite: 'auto',
      });
    }
  };

  const handleMouseLeave = () => {
    if (bgRef.current) {
      gsap.to(bgRef.current, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: 'power2.out',
      });
    }
  };

  return (
    <>
      <div className="h-32 md:h-40 bg-anokha-dark border-b border-white/5 flex items-center justify-center">
        <div className="flex flex-col items-center gap-2 opacity-40">
          <div className="w-1 h-8 bg-gradient-to-b from-anokha-orange to-transparent" />
          <span className="font-orbitron text-[8px] tracking-widest uppercase text-anokha-orange/60">
            PHASE {index + 1} OF {total}
          </span>
          <div className="w-1 h-8 bg-gradient-to-b from-transparent to-anokha-orange" />
        </div>
      </div>

      <section
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="parallax-panel relative w-full h-[80vh] overflow-hidden flex items-center justify-center border-b border-white/5 group"
      >
        {/* Background with parallax */}
        <div
          ref={bgRef}
          className="parallax-bg absolute inset-0 z-0 will-change-transform"
        >
          <Image
            src={night.image || '/placeholder.svg'}
            alt={night.title}
            fill
            className="object-cover opacity-40 brightness-50 saturate-110"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-anokha-dark/30 via-anokha-dark/60 to-anokha-dark/90" />
        </div>

        {/* Background title */}
        <div
          ref={titleRef}
          className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none"
        >
          <h2 className="font-orbitron font-black italic text-[20vw] uppercase leading-none tracking-tight text-white/6 select-none">
            {night.title}
          </h2>
        </div>

        {/* HUD Corner elements */}
        <div
          ref={cornerRef}
          className="absolute top-8 left-8 z-20 will-change-transform"
        >
          <div className="w-20 h-20 border-l-2 border-t-2 border-anokha-orange/50 opacity-60" />
          <div className="absolute top-1 left-0 w-10 h-[1px] bg-gradient-to-r from-anokha-orange/70 to-transparent" />
          <div className="absolute left-1 top-0 h-10 w-[1px] bg-gradient-to-b from-anokha-orange/70 to-transparent" />
        </div>

        {/* Content */}
        <div
          ref={contentRef}
          className="parallax-content container relative z-30 px-6 md:px-12"
        >
          <div className="max-w-2xl md:ml-16 p-6 md:p-10 border-l-2 border-anokha-orange/50 backdrop-blur-md bg-anokha-dark/60 hover:bg-anokha-dark/80 transition-all duration-500 group-hover:border-anokha-orange shadow-2xl">
            <div className="pl-6 space-y-5">
              <span
                className="font-orbitron text-[8px] tracking-[0.35em] text-anokha-gold uppercase block opacity-70"
                data-stagger
              >
                {night.date}
              </span>

              <h3
                className={`text-4xl md:text-6xl font-orbitron font-bold italic uppercase tracking-tighter ${night.accent} group-hover:drop-shadow-[0_0_20px_currentColor] transition-all duration-500 leading-tight`}
                data-stagger
              >
                {night.title}
              </h3>

              <div className="w-10 h-[2px] bg-gradient-to-r from-anokha-orange/80 to-transparent" />

              <p
                className="text-white/60 font-inter text-sm md:text-base leading-relaxed max-w-md group-hover:text-white/75 transition-colors duration-300"
                data-stagger
              >
                {night.description}
              </p>

              <button
                className="mt-6 px-6 py-2 border border-anokha-orange/60 text-anokha-orange font-orbitron text-[10px] tracking-widest uppercase hover:bg-anokha-orange/10 hover:border-anokha-orange transition-all duration-300 group-hover:drop-shadow-[0_0_10px_rgba(255,165,0,0.5)]"
                data-stagger
              >
                Learn More
              </button>
            </div>
          </div>
        </div>

        {/* Grid overlay */}
        <div className="absolute inset-0 z-15 pointer-events-none opacity-5 bg-[linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] bg-[size:50px_50px]" />
      </section>
    </>
  );
}
