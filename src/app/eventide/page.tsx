'use client';

import { useRef } from 'react';
import AnimatedIntro from '@/components/eventide/animated-intro';
import HeroSection from '@/components/eventide/herosection';
import ScrollableEvents from '@/components/eventide/scrollable-section';

const eventideNights = [
  {
    id: 1,
    title: 'Raagasudha',
    subtitle: 'Melodies Unbound',
    description:
      'Raagasudha, the official music club, sets the stage with soul-stirring performances that blend melody, harmony, and emotion. Powered entirely by students from diverse departments, Raagasudha is a testament to collaborative creativity and the musical spirit thriving within the university.',
    date: 'NIGHT_01',
    accent: 'text-teal-200/80',
    image: '/eventide/BG1.png',
  },
  {
    id: 2,
    title: 'Natyasudha',
    subtitle: 'Dance Fusion',
    description:
      'The energy then shifts with Natyasudha, the official dance club, delivering a visually stunning and high-energy showcase. With seven specialised teams representing genres like freestyle, classical, semiclassical, hip-hop, and more, Natyasudha promises powerful choreography, expressive storytelling, and pulse-pounding performances that keep the crowd on its feet',
    date: 'NIGHT_02',
    accent: 'text-red-500/80',
    image: '/eventide/BG2.png',
  },
  {
    id: 3,
    title: 'Proshow',
    subtitle: 'Naresh Iyer',
    description:
      'Eventide reaches its crescendo on the final night with a performance by Naresh Iyer. A voice that has captivated millions, his performance promises an atmosphere charged with excitement, nostalgia, and pure musical magic. This spectacular show marks the grand finale of Anokha 2026, ending the fest on an unforgettable note. Get a chance to see Naresh Iyer perform live and be part of a night that celebrates music, energy, and shared moments.',
    date: 'NIGHT_03',
    accent: 'text-anokha-orange',
    image: '/eventide/BG3.png',
  },
];

export default function EventidePage() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  return (
    <main
      ref={containerRef}
      className="bg-anokha-dark text-white overflow-x-hidden"
    >
      <div className="relative h-[100svh] w-full">
        <HeroSection />
      </div>
      <AnimatedIntro />

      <ScrollableEvents events={eventideNights} />
    </main>
  );
}
