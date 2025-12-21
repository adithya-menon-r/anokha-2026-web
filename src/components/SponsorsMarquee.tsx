'use client';

import Image from 'next/image';
import React from 'react';

const SponsorsMarquee: React.FC = () => {
  // Example sponsor logos - replace with actual sponsor images
  const sponsors = [
    { name: 'Sponsor 1', logo: '/images/BLACK LOGO.png' },
    { name: 'Sponsor 2', logo: '/images/BLACK LOGO.png' },
    { name: 'Sponsor 3', logo: '/images/BLACK LOGO.png' },
    { name: 'Sponsor 4', logo: '/images/BLACK LOGO.png' },
    { name: 'Sponsor 5', logo: '/images/BLACK LOGO.png' },
    { name: 'Sponsor 6', logo: '/images/BLACK LOGO.png' },
  ];

  return (
    <section className="relative w-full overflow-hidden backdrop-blur-xl bg-white/80">
      {/* Marquee container */}
      <div className="relative">
        {/* Gradient overlays for fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white/80 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white/80 to-transparent z-10 pointer-events-none"></div>

        {/* Marquee track */}
        <div className="flex animate-marquee gap-16">
          {/* First set of sponsors */}
          {sponsors.map((sponsor, index) => (
            <div
              key={`sponsor-1-${index}`}
              className="flex-shrink-0 flex items-center justify-center w-40 h-24 p-4"
            >
              <Image
                src={sponsor.logo}
                alt={sponsor.name}
                width={120}
                height={60}
                className="object-contain"
              />
            </div>
          ))}
          {/* Duplicate set for seamless loop */}
          {sponsors.map((sponsor, index) => (
            <div
              key={`sponsor-2-${index}`}
              className="flex-shrink-0 flex items-center justify-center w-40 h-24 p-4"
            >
              <Image
                src={sponsor.logo}
                alt={sponsor.name}
                width={120}
                height={60}
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SponsorsMarquee;
