'use client';

import React from 'react';
import HeroCanvas from './HeroCanvas';

const HeroWarp: React.FC = () => {
  return (
    <section
      className="relative h-screen w-full overflow-hidden"
      aria-label="Hero Section"
    >
      <HeroCanvas />

      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 mt-16">
        <h1
          className="font-orbitron text-7xl md:text-9xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 mix-blend-overlay text-center"
          style={{ fontFamily: 'SPINC' }}
        >
          anokha <br /> 2026
        </h1>
      </div>
    </section>
  );
};

export default HeroWarp;
