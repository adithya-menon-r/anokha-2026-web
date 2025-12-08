'use client';
import { Stars } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import React from 'react';

const ThreeStars: React.FC<{ count?: number }> = ({ count = 400 }) => {
  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      <Canvas className="w-full h-full" camera={{ position: [0, 0, 50] }}>
        <ambientLight intensity={0.5} />
        <Stars
          radius={100}
          depth={50}
          count={count}
          factor={4}
          saturation={0}
          fade
        />
      </Canvas>
    </div>
  );
};

export default ThreeStars;
