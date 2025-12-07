'use client';

import React, { useEffect, useRef, useState } from 'react';
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
      'Dive into a world of innovation with hands-on workshops and competitive events designed to challenge your skills and expand your horizons. From cutting-edge technologies to collaborative learning experiences, discover opportunities that fuel your passion for technology.',
    mascot: '/images/TCW.png',
    images: [
      { src: '/images/delete/Group 40.png', alt: 'Workshop', size: 'large' },
      {
        src: '/images/delete/4c4b401e538f739fd3d54498de45708d.jpg',
        alt: 'Event',
        size: 'medium',
      },
      {
        src: '/images/delete/WhatsApp Image 2023-12-18 at 22.13.43_33f6001d.jpg',
        alt: 'Competition',
        size: 'small',
      },
    ],
  },
  {
    id: 'techfair',
    title: 'Techfair',
    description:
      'Experience the future of technology at Techfair, where groundbreaking projects and innovative solutions come to life. Witness demonstrations from talented minds, explore emerging technologies, and connect with industry leaders in an immersive showcase of creativity and engineering excellence.',
    mascot: '/images/TF.png',
    images: [
      {
        src: '/images/delete/PIA17172 (1).jpg',
        alt: 'Tech Exhibition',
        size: 'medium',
      },
      { src: '/images/delete/wp5847395.jpg', alt: 'Innovation', size: 'large' },
      { src: '/images/delete/1130469.png', alt: 'Showcase', size: 'small' },
    ],
  },
  {
    id: 'eventide',
    title: 'Eventide',
    description:
      'As the sun sets, Eventide comes alive with vibrant performances, cultural celebrations, and entertainment that brings together the entire Anokha community. Unwind after a day of technical excellence with music, dance, and festivities that celebrate the perfect fusion of technology and culture.',
    mascot: '/images/ET.png',
    images: [
      {
        src: '/images/delete/desktop background.jpg',
        alt: 'Performance',
        size: 'small',
      },
      {
        src: '/images/delete/4c4b401e538f739fd3d54498de45708d.jpg',
        alt: 'Cultural Event',
        size: 'medium',
      },
      { src: '/images/delete/Group 40.png', alt: 'Celebration', size: 'large' },
    ],
  },
];

export const HorizontalScrollSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const itemWidth = container.scrollWidth / scrollData.length;
      const newIndex = Math.round(scrollLeft / itemWidth);
      setActiveIndex(newIndex);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative w-full py-12 md:py-20 overflow-hidden">
      {/* Section Header with Mascots */}
      <SectionHeader
        activeIndex={activeIndex}
        mascotImage={scrollData[activeIndex]?.mascot}
      />

      {/* Horizontal Scroll Container */}
      <div
        ref={containerRef}
        className="horizontal-scroll-container overflow-x-auto overflow-y-hidden pb-6 md:pb-8 px-4 md:px-6 lg:px-12"
        style={{
          scrollSnapType: 'x mandatory',
          scrollBehavior: 'smooth',
        }}
      >
        <div className="flex gap-6 md:gap-12 lg:gap-20 min-w-max py-4 md:py-8">
          {scrollData.map((item, index) => (
            <HorizontalScrollItem key={item.id} data={item} index={index} />
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="flex justify-center items-center gap-2 md:gap-3 mt-6 md:mt-8">
        <div className="text-gray-500 text-xs md:text-sm">
          Scroll horizontally
        </div>
        <svg
          className="w-5 h-5 md:w-6 md:h-6 text-anokha-secondary animate-pulse"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 7l5 5m0 0l-5 5m5-5H6"
          />
        </svg>
      </div>
    </section>
  );
};
