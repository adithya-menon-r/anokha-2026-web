'use client';

import { Home } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import HeroCanvas from '../features/home/components/HeroCanvas';

const NotFound: React.FC = () => {
  return (
    <section
      className="relative h-screen w-full overflow-hidden"
      aria-label="404 Not Found"
    >
      {/* Background Animation */}
      <HeroCanvas />
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 mx-auto pt-24 md:pt-12 translate-y-4">
        {/* Main Error Code */}
        <h1
          className="font-orbitron text-6xl md:text-[12rem] font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-600 mix-blend-overlay text-center leading-none"
          style={{ fontFamily: 'SPINC' }}
        >
          404
        </h1>

        {/* Error Subtitle */}
        <h2
          className="font-orbitron text-4xl md:text-6xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-orange-400 to-red-600 mix-blend-screen text-center mb-6 md:mb-8"
          style={{ fontFamily: 'SPINC' }}
        >
          SIGNAL LOST
        </h2>

        {/* Narrative Tagline */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-10">
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-12 md:w-24 bg-gradient-to-r from-transparent via-orange-500 to-transparent"></div>
            <p
              className="text-md md:text-xl text-white/80 drop-shadow-lg tracking-wide"
              style={{ fontFamily: 'Monderna' }}
            >
              The coordinates you are looking for do not exist in the
              Anokhaverse.
            </p>
            <div className="h-px w-12 md:w-24 bg-gradient-to-r from-transparent via-orange-500 to-transparent"></div>
          </div>
        </div>

        {/* Return Home Button */}
        <Link
          href="/"
          className="pointer-events-auto group relative inline-flex items-center justify-center px-8 py-4 text-base md:text-lg font-semibold text-white transition-all duration-300 ease-out bg-gradient-to-r from-orange-600 via-orange-500 to-amber-600 rounded-full shadow-lg shadow-orange-500/50 hover:shadow-2xl hover:shadow-orange-500/80 hover:scale-105 border-2 border-orange-400/30 hover:border-orange-400"
        >
          <Home className="w-5 h-5 mr-2 transition-transform group-hover:scale-105" />
          <span className="relative z-10">Return Home</span>
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
