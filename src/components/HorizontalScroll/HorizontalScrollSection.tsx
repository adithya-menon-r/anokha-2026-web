'use client';

import React, { useEffect, useRef, useState } from 'react';
import DotNavigation from '../gallery/DotNavigation';
import { HorizontalScrollItem } from './HorizontalScrollItem';
import { SectionHeader } from './SectionHeader';

interface ScrollItemData {
  id: string;
  title: string;
  description: string;
  mascot: string;
  images: {
    src: string;
    alt: string;
    size: 'small' | 'medium' | 'large';
  }[];
}

const scrollData: ScrollItemData[] = [
  {
    id: 'events-workshops',
    title: 'Events and Workshops',
    description:
      'Embark on a valuable journey with our diverse workshops and events. We offer a lively atmosphere that encourages continuous learning, shifting participants from passive observers to active explorers. Unite technical expertise with engaging experiences in our programming language events. Explore the captivating realms of coding and current market trends through activities like coding challenges and interactive games. This balanced blend ensures a well-rounded and fulfilling experience for everyone involved. Showcase your skills, build meaningful connections, and expand your knowledge. Join us and let the fun of exploration be your guide!',
    mascot: '/images/TCW.png',
    images: [
      {
        src: 'https://i.imgur.com/kWBGAkz.jpg',
        alt: 'Drone Workshop',
        size: 'large',
      },
      {
        src: 'https://i.imgur.com/aH94zxw.jpg',
        alt: 'Gaming Event',
        size: 'medium',
      },
      {
        src: 'https://i.imgur.com/c1V7G0v.jpg',
        alt: 'Aero Competition',
        size: 'small',
      },
    ],
  },
  {
    id: 'techfair',
    title: 'Techfair',
    description:
      'Tech Fair serves as a unifying platform, bringing students from various universities nationwide to showcase their creativity to industry experts. Recognized as a premier event for talent and innovation, this expansive fair provides a stage for diverse talents to shine. Beyond showcasing skills, Tech Fair stands as a clear testament to the collaboration between academia and industry, where students not only display technical skills but also gain valuable insights for their professional journey. It represents a unique blend of teamwork and creativity, emphasizing the crucial connection between academic excellence and practical application in the industry.',
    mascot: '/images/TF.png',
    images: [
      {
        src: 'https://i.imgur.com/hMvLF8h.jpg',
        alt: 'Tech Exhibition',
        size: 'medium',
      },
      {
        src: 'https://z8zpxxhr4u.ufs.sh/f/a50ALO7tkuEHTZKL5VoxtcAalWirudhSwnFZP5XB67JjEb1m',
        alt: 'Innovation',
        size: 'large',
      },
      {
        src: 'https://z8zpxxhr4u.ufs.sh/f/a50ALO7tkuEHdtoaTy53hiwyYOkvFXcMzm5xZRJIoQ01fqbn',
        alt: 'Showcase',
        size: 'small',
      },
    ],
  },
  {
    id: 'eventide',
    title: 'Eventide',
    description:
      "Eventide, a decade-long celebration nestled within Anokha's cultural showcase, is a jubilant ode to India's cultural richness. Featuring explosive performances by a stellar cast of skilled artists, including percussionist Sivamani, playback singers Vijay Prakash, Karthik, Benny Dayal, Haricharan, Rahul Nambiar, Alaap Raju, Shaktisree Gopalan, Sunitha Sarathy, Ranjani-Gayatri, Nikita Gandhi, and Andrea Jeremiah, the stage transforms into a canvas for diverse and enchanting musical expressions. Beyond entertainment, Eventide resonates with classical notes and pulsating beats, offering a captivating journey that blends dedication and talent into an unforgettable cultural odyssey, representing every corner of the country.",
    mascot: '/images/ET.png',
    images: [
      {
        src: 'https://i.imgur.com/OV3UoKl.jpg',
        alt: 'Natiya',
        size: 'small',
      },
      {
        src: 'https://i.imgur.com/63NLNh8.jpg',
        alt: 'Raaga',
        size: 'medium',
      },
      {
        src: 'https://i.imgur.com/7r8gQN5.jpg',
        alt: 'Eventide',
        size: 'large',
      },
    ],
  },
];

export const HorizontalScrollSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<HTMLDivElement[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const centerX = container.scrollLeft + container.clientWidth / 2;
      let nearestIdx = 0;
      let nearestDist = Number.POSITIVE_INFINITY;
      itemRefs.current.forEach((el, idx) => {
        if (!el) return;
        const itemCenter = el.offsetLeft + el.offsetWidth / 2;
        const dist = Math.abs(itemCenter - centerX);
        if (dist < nearestDist) {
          nearestDist = dist;
          nearestIdx = idx;
        }
      });
      setActiveIndex(nearestIdx);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDotClick = (index: number) => {
    const container = containerRef.current;
    const target = itemRefs.current[index];
    if (container && target) {
      const left =
        target.offsetLeft - (container.clientWidth - target.offsetWidth) / 2;
      container.scrollTo({ left, behavior: 'smooth' });
      setActiveIndex(index);
    }
  };

  return (
    <section className="relative w-full py-12 md:py-20 overflow-hidden">
      {/* Section Header with Mascots */}
      <SectionHeader
        activeIndex={activeIndex}
        mascotImage={scrollData[activeIndex]?.mascot}
      />

      {/* Top Dots Navigation (above content, all breakpoints) */}
      <DotNavigation
        className="mt-1"
        count={scrollData.length}
        activeIndex={activeIndex}
        onClick={handleDotClick}
      />

      {/* Horizontal Scroll Container */}
      <div
        ref={containerRef}
        className="horizontal-scroll-container overflow-x-auto overflow-y-hidden pb-6 md:pb-8 px-4 md:px-6 lg:px-12"
        style={{
          scrollSnapType: 'x mandatory',
          scrollBehavior: 'smooth',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        <div className="flex gap-6 md:gap-12 lg:gap-20 min-w-max py-4 md:py-8">
          {scrollData.map((item, index) => (
            <div
              key={item.id}
              ref={(el) => {
                if (el) itemRefs.current[index] = el;
              }}
            >
              <HorizontalScrollItem data={item} index={index} />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Dot Navigation removed per request */}
    </section>
  );
};
