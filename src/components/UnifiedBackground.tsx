'use client';

import { Stars } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import React from 'react';

const UnifiedBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0">
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
      </Canvas>
    </div>
  );
};

export default UnifiedBackground;
