'use client';

import { Sphere } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

const SpinningPlanet = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.003;
    }
  });

  // Create a gradient texture for the planet
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      // Create a gradient background
      const gradient = ctx.createLinearGradient(0, 0, 512, 512);
      gradient.addColorStop(0, '#1e3a8a');
      gradient.addColorStop(0.5, '#3b82f6');
      gradient.addColorStop(1, '#60a5fa');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 512, 512);

      // Add some noise/spots for planet-like appearance
      for (let i = 0; i < 200; i++) {
        const x = Math.random() * 512;
        const y = Math.random() * 512;
        const radius = Math.random() * 15 + 5;
        const opacity = Math.random() * 0.3 + 0.1;

        ctx.fillStyle = `rgba(30, 58, 138, ${opacity})`;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    return tex;
  }, []);

  return (
    <Sphere ref={meshRef} args={[2.5, 64, 64]} position={[0, 0, 0]}>
      <meshStandardMaterial
        map={texture}
        roughness={0.8}
        metalness={0.2}
        emissive="#1e40af"
        emissiveIntensity={0.15}
      />
    </Sphere>
  );
};

export default SpinningPlanet;
