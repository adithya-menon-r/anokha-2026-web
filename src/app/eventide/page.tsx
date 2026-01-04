'use client';

import { useRef } from 'react';
import HeroSection from '@/components/eventide/herosection';
import ScrollableEvents from '@/components/eventide/scrollable-section';
import AnimatedIntro from './animated-intro';

const eventideNights = [
  {
    id: 1,
    title: 'Raagasudha',
    subtitle: 'Melodies Unbound',
    description:
      'Raagasudha, the official music club, sets the stage with soul-stirring performances that blend melody, harmony, and emotion. Powered entirely by students from diverse departments, Raagasudha is a testament to collaborative creativity and the musical spirit thriving within the university.',
    date: 'PHASE_01',
    accent: 'text-emerald-400',
    image:
      'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 2,
    title: 'Natyasudha',
    subtitle: 'Dance Fusion',
    description:
      'The energy then shifts with Natyasudha, the official dance club, delivering a visually stunning and high-energy showcase. With seven specialised teams representing genres like freestyle, classical, semiclassical, hip-hop, and more, Natyasudha promises powerful choreography, expressive storytelling, and pulse-pounding performances that keep the crowd on its feet',
    date: 'PHASE_02',
    accent: 'text-fuchsia-500',
    image:
      'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 3,
    title: 'Proshow',
    subtitle: 'Naresh Iyer',
    description:
      'Eventide reaches its crescendo on the final night with a performance by Naresh Iyer. A voice that has captivated millions, his performance promises an atmosphere charged with excitement, nostalgia, and pure musical magic. This spectacular show marks the grand finale of Anokha 2026, ending the fest on an unforgettable note. Get a chance to see Naresh Iyer perform live and be part of a night that celebrates music, energy, and shared moments.',
    date: 'PHASE_03',
    accent: 'text-anokha-orange',
    image:
      'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=80',
  },
];

export default function EventidePage() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  return (
    <main
      ref={containerRef}
      className="bg-anokha-dark text-white overflow-x-hidden"
    >
      {/* 1. Wrap the Hero in a relative container so the Intro stays below it */}
      <div className="relative h-[100svh] w-full">
        <HeroSection />
      </div>

      {/* 2. The Intro will now naturally start after the 100vh hero */}
      <AnimatedIntro />

      <ScrollableEvents events={eventideNights} />

      {/* Pause section before footer */}
      <div className="h-40 bg-anokha-dark border-b border-white/5 flex items-center justify-center">
        {/* ... rest of your code */}
        <div className="flex flex-col items-center gap-3 opacity-40">
          <div className="w-1 h-10 bg-gradient-to-b from-anokha-orange to-transparent" />
          <span className="font-orbitron text-[8px] tracking-widest uppercase">
            Experience Complete
          </span>
          <div className="w-1 h-10 bg-gradient-to-b from-transparent to-anokha-orange" />
        </div>
      </div>
    </main>
  );
}
