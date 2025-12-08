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
      className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 px-4 sm:px-6 md:px-10 lg:px-16 py-10"
    >
      {/* Upper Section - Title */}
      <div ref={titleRef} className="text-center mb-2">
        <h1 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-300 to-cyan-400 font-mono mb-2">
          ABOUT AMRITA
        </h1>
        <div className="text-[11px] md:text-xs text-blue-300 font-mono tracking-widest">
          ▌ HOME - INITIALIZATION COMPLETE
        </div>
      </div>

      {/* Middle Section - Image and Text Side by Side */}
      <div className="flex flex-col md:flex-row items-center gap-6 max-w-6xl w-full px-2 sm:px-6 md:px-10 lg:px-16">
        {/* Campus Image - 16:9 aspect ratio */}
        <div
          ref={imageRef}
          className="relative w-full md:w-[420px] h-54 rounded-lg overflow-hidden border-2 border-blue-400/50 flex-shrink-0 aspect-video"
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
          className="relative text-blue-200 text-sm md:text-base leading-relaxed font-light text-center md:text-left max-w-2xl md:max-w-lg px-2"
        >
          <p>
            Amrita Vishwa Vidyapeetham's Coimbatore campus is dedicated to
            fostering academic excellence with a range of undergraduate and
            postgraduate programs spanning diverse disciplines – engineering,
            management, and sciences. Renowned for its dedication to research
            and innovation, the campus boasts world-class facilities and
            actively cultivates an environment conducive to personal growth.
            Beyond academics, Amrita emphasizes holistic student development,
            encouraging participation in cultural events, sports, and community
            service initiatives. This commitment creates a vibrant and enriching
            learning environment, making Amrita Vishwa Vidyapeetham a great
            choice for students from across India.
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
