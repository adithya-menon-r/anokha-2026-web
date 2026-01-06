'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

interface Event {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  date: string;
  accent: string;
  image: string;
}

export default function ScrollableEvents({ events }: { events: Event[] }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const bgRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const titles = gsap.utils.toArray<HTMLElement>('.event-title');

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: `+=${events.length * 400}%`,
          pin: true,
          scrub: 1.5,
          immediateRender: true,
        },
      });

      tl.set(titles, { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' });
      tl.set(bgRefs.current, { opacity: 0, scale: 1.1 });
      if (bgRefs.current[0]) tl.set(bgRefs.current[0], { opacity: 0.4 });

      events.forEach((_, index) => {
        const otherTitles = titles.filter((_, i) => i !== index);
        const currentBg = bgRefs.current[index];
        const nextBg = bgRefs.current[index + 1];

        tl.to(
          otherTitles,
          {
            opacity: 0,
            filter: 'blur(20px)',
            duration: 0.8,
            ease: 'power2.inOut',
          },
          `event-${index}`,
        );

        if (currentBg) {
          tl.to(
            currentBg,
            { opacity: 0.6, scale: 1, duration: 1 },
            `event-${index}`,
          );
        }

        tl.to(
          titles[index],
          {
            y: (i, target) => {
              const contentEl = contentRefs.current[index];
              if (!contentEl) return 0;

              const subtitleArea = contentEl.querySelector(
                '.space-y-2',
              ) as HTMLElement;

              if (subtitleArea) {
                const titleTop = (target as HTMLElement).offsetTop;
                const subtitleTop = subtitleArea.offsetTop;

                // CHANGED: Increased mobile push (220) vs desktop (140)
                // to move title higher up on smaller screens.
                const extraPush = window.innerWidth < 768 ? 320 : 140;

                return subtitleTop - titleTop - extraPush;
              }

              return 0;
            },
            scale: 0.35,
            transformOrigin: index === 1 ? 'right center' : 'left center',
            duration: 1.2,
            ease: 'expo.inOut',
          },
          `event-${index}`,
        );

        tl.fromTo(
          contentRefs.current[index],
          { opacity: 0, y: 60, filter: 'blur(10px)' },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 1,
            pointerEvents: 'auto',
            ease: 'power3.out',
          },
          `event-${index}+=0.3`,
        );

        tl.to(
          [contentRefs.current[index], titles[index], currentBg],
          {
            opacity: 0,
            filter: 'blur(30px)',
            y: -100,
            duration: 1,
            pointerEvents: 'none',
          },
          `exit-${index}`,
        );

        if (index < events.length - 1) {
          tl.fromTo(
            titles,
            { opacity: 0, y: 80 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              filter: 'blur(0px)',
              duration: 0.8,
              stagger: 0.05,
              ease: 'power2.out',
            },
          );
          if (nextBg) {
            tl.to(nextBg, { opacity: 0.4, duration: 0.8 }, '<');
          }
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [events]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden text-white"
    >
      {/* BACKGROUNDS */}
      <div className="absolute inset-0 z-0">
        {events.map((event, index) => (
          <div
            key={`bg-${event.id}`}
            ref={(el) => {
              bgRefs.current[index] = el;
            }}
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={event.image}
              className="w-full h-full object-cover opacity-60 grayscale-[0.5]"
              alt=""
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black via-black/40 to-black" />
          </div>
        ))}
      </div>

      {/* INITIAL HERO GRID */}
      <div className="absolute inset-0 flex flex-col z-10 py-12 md:py-24">
        {events.slice(0, 3).map((event, index) => (
          <div
            key={`row-${event.id}`}
            className="flex-1 flex items-center px-6 md:px-24"
          >
            <h2
              className="event-title font-black italic tracking-tighter uppercase leading-[0.8] w-full select-none"
              style={{
                fontSize: 'clamp(2.5rem, 15vw, 12vw)',
                textAlign: index === 1 ? 'right' : 'left',
                textShadow: '0 10px 30px rgba(0,0,0,0.5)',
              }}
            >
              {event.title}
            </h2>
          </div>
        ))}
      </div>

      {/* DETAILS LAYER */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        {events.map((event, index) => (
          <div
            key={`content-${event.id}`}
            ref={(el) => {
              contentRefs.current[index] = el;
            }}
            className="absolute inset-0 flex items-center justify-center px-6 md:px-24 opacity-0"
          >
            <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-12 items-start lg:items-center mt-32 md:mt-40">
              {/* Added pr-4 md:pr-12 to ensure subtitle doesn't merge with image */}
              <div className="order-2 lg:order-1 lg:col-span-5 space-y-4 md:space-y-8 pr-4 md:pr-12">
                <div className="space-y-2">
                  <div className="flex items-center gap-4">
                    <span className="h-[2px] w-8 bg-orange-600"></span>
                    <p className="text-orange-600 font-mono tracking-[0.3em] text-[10px] uppercase font-bold">
                      {event.date}
                    </p>
                  </div>
                  <h3
                    className={`text-6xl sm:text-8xl md:text-8xl lg:text-9xl font-black uppercase italic leading-[0.85] tracking-tighter ${event.accent}`}
                  >
                    {event.subtitle}
                  </h3>
                </div>

                <p className="text-white/70 text-sm md:text-base leading-relaxed font-light max-w-sm border-l border-white/20 pl-4 md:pl-6">
                  {event.description}
                </p>

                <button className="group pointer-events-auto flex items-center gap-4 text-white text-[9px] md:text-[10px] tracking-[0.4em] uppercase font-bold">
                  <div className="w-8 h-[1px] bg-white/40 group-hover:w-16 group-hover:bg-orange-600 transition-all duration-500" />
                </button>
              </div>

              <div className="order-1 lg:order-2 lg:col-span-7">
                <div className="lg:ml-24 relative aspect-video w-full max-h-[35vh] md:max-h-none group pointer-events-auto rounded-lg overflow-hidden border border-white/10 shadow-2xl">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
