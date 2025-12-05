'use client';

import { Canvas } from '@react-three/fiber';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React, { useLayoutEffect, useRef } from 'react';
import gsap from '@/lib/gsap';
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
        <StarsTrail count={900} scrollRef={scrollRef} focalZ={-400} />
      </Canvas>
    </div>
  );
};

export default HeroCanvas;
