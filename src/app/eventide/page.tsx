'use client';

import { useRef } from 'react';
import HeroSection from '@/components/eventide/herosection';
import ScrollableEvents from '@/components/eventide/scrollable-section';
import AnimatedIntro from './animated-intro';

const eventideNights = [
  {
    id: 1,
    title: 'Raagasudha',
    subtitle: 'Digital Melodies',
    description:
      'The official music club of Amrita sets the digital stage with soul-stirring performances that echo through the neon-lit night. Experience an immersive audio journey that blends classical traditions with cutting-edge digital production.',
    date: 'PHASE_01',
    accent: 'text-emerald-400',
    image:
      'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 2,
    title: 'Natyasudha',
    subtitle: 'Kinetic Energy',
    description:
      'A spectacle of rhythm and expression where movement becomes magic under the pulsing glow of immersive lighting. Watch as dancers transform the stage into a canvas of pure kinetic art.',
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
      "The final convergence. An electrifying celebrity finale pushing the boundaries of what's possible in a digital concert experience. The perfect crescendo to three unforgettable nights.",
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
