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
    <div className="relative mb-8 md:mb-12 px-4 md:px-6">
      {/* Mobile: Mascot on right side with title */}
      <div className="md:hidden flex items-start justify-between gap-3 mb-6">
        {/* Title on left */}
        <div className="flex-1">
          <h2 className="text-3xl font-bold tracking-wide text-white leading-tight">
            Experience
            <br />
            <span style={{ fontFamily: 'SPINC' }}>anokha</span>
          </h2>
          <p className="text-gray-400 text-xs mt-2">
            Discover the diverse facets of our tech extravaganza
          </p>
          <div className="flex items-center gap-2 mt-3">
            <div className="text-gray-500 text-xs">Scroll horizontally</div>
            <svg
              className="w-4 h-4 text-anokha-secondary animate-pulse"
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
        </div>

        {/* Mascot on right */}
        <div className="flex-shrink-0 w-24 h-24">
          <div className="relative w-full h-full transition-all duration-500 opacity-100 scale-100">
            <div className="mascot-bounce relative w-full h-full">
              <Image
                src={mascotImage}
                alt="Anokha Mascot"
                fill
                className="object-contain drop-shadow-2xl"
                priority={false}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Desktop: Container with mascots on sides */}
      <div className="hidden md:flex items-center justify-center gap-4 lg:gap-8 max-w-7xl mx-auto">
        {/* Left Mascot */}
        <div className="flex-shrink-0 w-40 h-40 lg:w-56 lg:h-56">
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
          <h2 className="text-4xl lg:text-6xl font-bold tracking-wide text-white mb-4">
            Experience <span style={{ fontFamily: 'SPINC' }}>anokha</span>
          </h2>
          <p className="text-gray-400 text-base lg:text-lg max-w-2xl mx-auto">
            Discover the diverse facets of our tech extravaganza
          </p>
          <div className="flex justify-center items-center gap-2 md:gap-3 mt-4">
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
        </div>

        {/* Right Mascot */}
        <div className="flex-shrink-0 w-40 h-40 lg:w-56 lg:h-56">
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
