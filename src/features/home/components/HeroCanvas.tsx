'use client';

import { Stars } from '@react-three/drei';
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
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#06B6D4" />

        <Stars
          radius={120}
          depth={80}
          count={2000}
          factor={4}
          saturation={0}
          fade
          speed={0.6}
        />

        <StarsTrail count={900} scrollRef={scrollRef} focalZ={-400} />
      </Canvas>
    </div>
  );
};

export default HeroCanvas;
