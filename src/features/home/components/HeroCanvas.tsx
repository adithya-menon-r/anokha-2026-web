'use client';

import { Canvas } from '@react-three/fiber';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React, { useLayoutEffect, useRef } from 'react';
import gsap from '@/lib/gsap';
import SpinningPlanet from './three/SpinningPlanet';
import StarsTrail from './three/StarsTrail';

gsap.registerPlugin?.(ScrollTrigger as any);

const HeroCanvas = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const scrollRef = useRef(0);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.5,
        onUpdate: (self) => {
          scrollRef.current = self.progress;
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 9], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
        <directionalLight position={[-5, 5, 5]} intensity={0.5} />

        <SpinningPlanet />
        <StarsTrail count={900} scrollRef={scrollRef} focalZ={-400} />
      </Canvas>
    </div>
  );
};

export default HeroCanvas;
