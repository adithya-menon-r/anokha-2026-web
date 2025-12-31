'use client';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

interface EventData {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  date: string;
  accent: string;
  image: string;
}

interface HorizontalScrollSectionProps {
  events: EventData[];
}

export default function HorizontalScrollSection({
  events,
}: HorizontalScrollSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current || !horizontalRef.current) return;

    const ctx = gsap.context(() => {
      const container = containerRef.current;
      const horizontal = horizontalRef.current;
      if (!container || !horizontal) return;

      const horizontalScroll = gsap.to(horizontal, {
        x: () => -(horizontal.scrollWidth - window.innerWidth),
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: () => `+=${horizontal.scrollWidth}`,
          pin: true,
          scrub: 1.2,
          markers: false,
          onUpdate: (self) => {
            // Update progress indicator
            if (progressRef.current) {
              const progress = Math.round(self.progress * 100);
              progressRef.current.style.width = `${progress}%`;
            }

            // Update card progress indicators
            cardRefs.current.forEach((card, i) => {
              if (!card) return;
              const cardProgress = (self.progress * events.length - i) / 1;
              const clampedProgress = Math.max(0, Math.min(1, cardProgress));

              const indicator = card.querySelector('.card-indicator');
              if (indicator) {
                gsap.to(indicator, {
                  width: `${clampedProgress * 100}%`,
                  duration: 0.1,
                  overwrite: 'auto',
                });
              }
            });
          },
        },
      });

      cardRefs.current.forEach((card, i) => {
        if (!card) return;

        const imageEl = card.querySelector('.card-image');
        const contentEl = card.querySelector('.card-content');
        const buttonEl = card.querySelector('.card-button');

        // Card and image entrance
        gsap.fromTo(
          card,
          { opacity: 0 },
          {
            opacity: 1,
            scrollTrigger: {
              trigger: card,
              containerAnimation: horizontalScroll,
              start: 'left 90%',
              end: 'left 50%',
              scrub: 0.5,
              onUpdate: (self) => {
                // Image parallax
                if (imageEl) {
                  gsap.to(imageEl, {
                    x: self.progress * 50,
                    duration: 0.1,
                    overwrite: 'auto',
                  });
                }
              },
            },
          },
        );

        // Content fade in + slide up
        if (contentEl) {
          gsap.fromTo(
            contentEl,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              scrollTrigger: {
                trigger: card,
                containerAnimation: horizontalScroll,
                start: 'left 80%',
                end: 'left 45%',
                scrub: 0.5,
              },
            },
          );
        }

        // Button stagger entrance
        if (buttonEl) {
          gsap.fromTo(
            buttonEl,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              scrollTrigger: {
                trigger: card,
                containerAnimation: horizontalScroll,
                start: 'left 70%',
                end: 'left 40%',
                scrub: 0.5,
              },
            },
          );
        }
      });

      gsap.to(scrollIndicatorRef.current, {
        opacity: 0,
        pointerEvents: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top center',
          onEnter: () => {
            gsap.to(scrollIndicatorRef.current, { opacity: 0, duration: 0.4 });
          },
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [events]);

  const handleCardHover = (index: number, isEnter: boolean) => {
    const card = cardRefs.current[index];
    if (!card) return;

    gsap.to(card, {
      scale: isEnter ? 1.02 : 1,
      boxShadow: isEnter
        ? '0 0 40px rgba(255, 149, 0, 0.3)'
        : '0 0 20px rgba(255, 149, 0, 0.1)',
      duration: 0.3,
      overwrite: 'auto',
    });
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-anokha-dark overflow-hidden"
    >
      <div
        ref={horizontalRef}
        className="flex gap-0 will-change-transform"
        style={{ width: `${events.length * 100}%` }}
      >
        {events.map((event, index) => (
          <div
            key={event.id}
            ref={(el) => (cardRefs.current[index] = el)}
            onMouseEnter={() => handleCardHover(index, true)}
            onMouseLeave={() => handleCardHover(index, false)}
            className="relative w-screen h-[70vh] flex-shrink-0 overflow-hidden border-r border-white/10 transition-all duration-300 will-change-transform"
          >
            {/* Background image with parallax */}
            <div
              className="card-image absolute inset-0 will-change-transform"
              style={{
                backgroundImage: `url(${event.image}?auto=format&fit=crop&w=1920&q=75)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'brightness(0.5) saturate(1.2)',
              }}
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-anokha-dark via-anokha-dark/50 to-transparent z-10" />
            <div className="absolute inset-0 bg-gradient-to-b from-anokha-dark/30 via-transparent to-anokha-dark/80 z-10" />

            {/* Grid overlay */}
            <div className="absolute inset-0 z-15 pointer-events-none opacity-5 bg-[linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] bg-[size:50px_50px]" />

            {/* Card content */}
            <div className="card-content absolute inset-0 z-20 flex flex-col items-start justify-center px-12 md:px-16">
              <div className="max-w-xl space-y-6">
                {/* Date badge */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-[2px] bg-gradient-to-r from-anokha-orange to-transparent" />
                  <span className="font-orbitron text-[10px] tracking-[0.3em] text-anokha-gold uppercase opacity-80">
                    {event.date}
                  </span>
                </div>

                {/* Title */}
                <div>
                  <h3
                    className={`text-5xl md:text-7xl font-orbitron font-black italic uppercase tracking-tighter leading-none ${event.accent} drop-shadow-[0_0_20px_rgba(255,165,0,0.2)] transition-all duration-300`}
                  >
                    {event.title}
                  </h3>
                  <p className="text-lg md:text-xl text-white/60 font-inter mt-2 tracking-wide">
                    {event.subtitle}
                  </p>
                </div>

                {/* Description */}
                <p className="text-white/70 font-inter text-sm md:text-base leading-relaxed max-w-lg">
                  {event.description}
                </p>

                {/* CTA Button */}
                <button className="card-button mt-8 px-8 py-3 border-2 border-anokha-orange text-anokha-orange font-orbitron text-[10px] tracking-widest uppercase hover:bg-anokha-orange/10 transition-all duration-300 hover:drop-shadow-[0_0_15px_rgba(255,165,0,0.5)]">
                  Explore Night
                </button>
              </div>
            </div>

            {/* Card progress indicator */}
            <div className="absolute bottom-0 left-0 right-0 z-30 h-1 bg-white/10">
              <div
                className="card-indicator h-full bg-gradient-to-r from-anokha-orange to-anokha-gold transition-all duration-200"
                style={{ width: '0%' }}
              />
            </div>

            {/* HUD corner */}
            {index === 0 && (
              <div className="absolute top-8 right-8 z-30">
                <div className="w-20 h-20 border-r-2 border-t-2 border-anokha-orange/50 opacity-60" />
              </div>
            )}

            {/* Scroll indicator (first card only) */}
            {index === 0 && (
              <div
                ref={scrollIndicatorRef}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 opacity-100 transition-opacity duration-300"
              >
                <span className="font-orbitron text-xs tracking-widest text-white/60 uppercase">
                  Scroll →
                </span>
                <div className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="w-1 h-4 bg-anokha-orange/40 rounded-full"
                      style={{
                        animation: `pulse 1.5s ease-in-out infinite`,
                        animationDelay: `${i * 0.2}s`,
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Global progress bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 h-1 bg-white/5">
        <div
          ref={progressRef}
          className="h-full bg-gradient-to-r from-anokha-orange to-anokha-gold"
          style={{ width: '0%' }}
        />
      </div>

      {/* Page indicator */}
      <div className="fixed bottom-8 right-8 z-40 font-orbitron text-sm tracking-widest text-white/60">
        <span className="block text-center">
          <span className="text-anokha-orange">01</span> /{' '}
          {String(events.length).padStart(2, '0')}
        </span>
      </div>
    </section>
  );
}
