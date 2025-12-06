'use client';

import Image from 'next/image';
import React from 'react';

interface VisorContentProps {
  titleRef: React.RefObject<HTMLDivElement | null>;
  imageRef: React.RefObject<HTMLDivElement | null>;
  textRef: React.RefObject<HTMLDivElement | null>;
  hudElementsRef: React.RefObject<HTMLDivElement | null>;
}

const VisorContent: React.FC<VisorContentProps> = ({
  titleRef,
  imageRef,
  textRef,
  hudElementsRef,
}) => {
  return (
    <div
      ref={hudElementsRef}
      className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 px-8 py-12"
    >
      {/* Upper Section - Title */}
      <div ref={titleRef} className="text-center mb-2">
        <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-300 to-cyan-400 font-mono mb-2">
          ABOUT AMRITA
        </h1>
        <div className="text-xs text-blue-300 font-mono tracking-widest">
          ▌ HOME - INITIALIZATION COMPLETE
        </div>
      </div>

      {/* Middle Section - Image and Text Side by Side */}
      <div className="flex flex-col md:flex-row items-center gap-6 max-w-6xl w-full px-40">
        {/* Campus Image - 16:9 aspect ratio */}
        <div
          ref={imageRef}
          className="relative w-full md:w-96 h-54 rounded-lg overflow-hidden border-2 border-blue-400/50 flex-shrink-0 aspect-video"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-transparent pointer-events-none z-10" />
          <Image
            src="/images/campus.jpg"
            alt="Amrita Campus"
            fill
            className="object-cover"
          />
        </div>

        {/* Description Text */}
        <div
          ref={textRef}
          className="relative text-blue-200 text-sm md:text-base leading-relaxed font-light text-center md:text-left max-w-lg"
        >
          <p>
            Amrita Vishwa Vidyapeetham is a world-class institution dedicated to
            academic excellence and holistic development. With state-of-the-art
            facilities and innovative teaching methodologies, we nurture leaders
            and innovators who shape the future. Our commitment to research,
            entrepreneurship, and community service sets new standards in higher
            education.
          </p>
        </div>
      </div>

      {/* Bottom Section - CTA Element */}
      <div className="mt-4 flex items-center gap-4 font-mono text-xs text-blue-300">
        <div className="w-8 md:w-12 h-px bg-gradient-to-r from-transparent to-blue-400/50" />
        <span className="animate-pulse">EXPLORE HOME</span>
        <div className="w-8 md:w-12 h-px bg-gradient-to-l from-transparent to-blue-400/50" />
      </div>
    </div>
  );
};

export default VisorContent;
