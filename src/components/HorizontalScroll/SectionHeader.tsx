'use client';

import Image from 'next/image';
import React from 'react';

interface SectionHeaderProps {
  activeIndex: number;
  mascotImage: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  activeIndex,
  mascotImage,
}) => {
  // Determine mascot position: left for even index, right for odd index
  const mascotPosition = activeIndex % 2 === 0 ? 'left' : 'right';

  return (
    <div className="relative mb-12 px-6">
      {/* Container with mascots on sides */}
      <div className="flex items-center justify-center gap-8 max-w-7xl mx-auto">
        {/* Left Mascot */}
        <div className="flex-shrink-0 w-32 h-32 md:w-48 md:h-48 lg:w-56 lg:h-56">
          <div
            className={`relative w-full h-full transition-all duration-500 ${
              mascotPosition === 'left'
                ? 'opacity-100 scale-100 translate-x-0'
                : 'opacity-0 scale-75 -translate-x-8'
            }`}
          >
            {mascotPosition === 'left' && (
              <div className="mascot-bounce relative w-full h-full">
                <Image
                  src={mascotImage}
                  alt="Anokha Mascot"
                  fill
                  className="object-contain drop-shadow-2xl"
                  priority={false}
                />
              </div>
            )}
          </div>
        </div>

        {/* Title */}
        <div className="text-center flex-1">
          <h2 className="text-4xl md:text-6xl font-bold tracking-wide text-white mb-4">
            Experience <span style={{ fontFamily: 'SPINC' }}>anokha</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Discover the diverse facets of our tech extravaganza
          </p>
        </div>

        {/* Right Mascot */}
        <div className="flex-shrink-0 w-32 h-32 md:w-48 md:h-48 lg:w-56 lg:h-56">
          <div
            className={`relative w-full h-full transition-all duration-500 ${
              mascotPosition === 'right'
                ? 'opacity-100 scale-100 translate-x-0'
                : 'opacity-0 scale-75 translate-x-8'
            }`}
          >
            {mascotPosition === 'right' && (
              <div className="mascot-bounce relative w-full h-full">
                <Image
                  src={mascotImage}
                  alt="Anokha Mascot"
                  fill
                  className="object-contain drop-shadow-2xl"
                  priority={false}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
