'use client';

import Link from 'next/link';
import React from 'react';
import HeroCanvas from './HeroCanvas';

const HeroWarp: React.FC = () => {
  return (
    <section
      className="relative h-screen w-full overflow-hidden"
      aria-label="Hero Section"
    >
      <HeroCanvas />

      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 mt-64 px-4">
        {/* Main Title */}
        <h1
          className="font-orbitron text-7xl md:text-9xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 mix-blend-overlay text-center"
          style={{ fontFamily: 'SPINC' }}
        >
          anokha
        </h1>
        <h1
          className="font-orbitron text-7xl md:text-9xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 mix-blend-overlay text-center mb-6"
          style={{ fontFamily: 'SPINC' }}
        >
          2026
        </h1>

        {/* Storyline Tagline */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-8">
          <div className="flex items-center">
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-orange-500 to-transparent"></div>
            <h2
              className="text-lg md:text-2xl text-white/90 drop-shadow-lg"
              style={{ fontFamily: 'Monderna' }}
            >
              Explore the World of Anokha
            </h2>
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-orange-500 to-transparent"></div>
          </div>
        </div>

        {/* CTA Button */}
        <Link
          href="/events"
          className="pointer-events-auto group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white transition-all duration-300 ease-out bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-lg hover:shadow-2xl hover:scale-105 hover:from-blue-500 hover:to-purple-500"
        >
          <span className="relative z-10 ">Explore Events</span>
          <svg
            className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1"
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
        </Link>
      </div>
    </section>
  );
};

export default HeroWarp;
