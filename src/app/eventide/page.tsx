'use client';

import { useRef } from 'react';
import HeroSection from '@/components/eventide/herosection';
import AnimatedIntro from './animated-intro';
import EventCard from './event-card';

const eventideNights = [
  {
    id: 1,
    title: 'Raagasudha',
    subtitle: 'Digital Melodies',
    description:
      'The official music club of Amrita sets the digital stage with soul-stirring performances that echo through the neon-lit night.',
    date: 'PHASE_01',
    accent: 'text-emerald-400',
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d',
  },
  {
    id: 2,
    title: 'Natyasudha',
    subtitle: 'Kinetic Energy',
    description:
      'A spectacle of rhythm and expression where movement becomes magic under the pulsing glow of immersive lighting.',
    date: 'PHASE_02',
    accent: 'text-fuchsia-500',
    image: 'https://images.unsplash.com/photo-1547153760-18fc86324498',
  },
  {
    id: 3,
    title: 'Proshow',
    subtitle: 'Naresh Iyer',
    description:
      "The final convergence. An electrifying celebrity finale pushing the boundaries of what's possible in a digital concert experience.",
    date: 'PHASE_03',
    accent: 'text-anokha-orange',
    image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a',
  },
];

export default function EventidePage() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  return (
    <main
      ref={containerRef}
      className="bg-anokha-dark text-white overflow-x-hidden"
    >
      <HeroSection />
      <AnimatedIntro />

      {/* Event Cards with Advanced Parallax */}
      <div className="relative space-y-0">
        {eventideNights.map((night, index) => (
          <EventCard
            key={night.id}
            night={night}
            index={index}
            total={eventideNights.length}
          />
        ))}
      </div>

      {/* Pause section before footer */}
      <div className="h-40 bg-anokha-dark border-b border-white/5 flex items-center justify-center">
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
