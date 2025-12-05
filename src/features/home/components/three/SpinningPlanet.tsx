'use client';

import { Sphere } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

interface SpinningPlanetProps {
  scrollRef: React.MutableRefObject<number>;
}

const SpinningPlanet: React.FC<SpinningPlanetProps> = ({ scrollRef }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      // Base rotation + scroll-based acceleration
      const scrollSpeed = scrollRef.current * 0.05;
      meshRef.current.rotation.y += 0.003 + scrollSpeed;
    }
  });

  // Create a Mars-like texture
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      // Create Mars red-orange gradient background
      const gradient = ctx.createLinearGradient(0, 0, 512, 512);
      gradient.addColorStop(0, '#cd5c5c');
      gradient.addColorStop(0.3, '#e97451');
      gradient.addColorStop(0.6, '#c1440e');
      gradient.addColorStop(1, '#8b3a3a');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 512, 512);

      // Add darker spots/craters for Mars surface
      for (let i = 0; i < 250; i++) {
        const x = Math.random() * 512;
        const y = Math.random() * 512;
        const radius = Math.random() * 20 + 3;
        const opacity = Math.random() * 0.4 + 0.2;

        ctx.fillStyle = `rgba(139, 58, 58, ${opacity})`;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Add lighter spots for variation
      for (let i = 0; i < 150; i++) {
        const x = Math.random() * 512;
        const y = Math.random() * 512;
        const radius = Math.random() * 12 + 2;
        const opacity = Math.random() * 0.25 + 0.1;

        ctx.fillStyle = `rgba(233, 116, 81, ${opacity})`;
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
    <Sphere ref={meshRef} args={[1.8, 64, 64]} position={[0, 0, 0]}>
      <meshStandardMaterial
        map={texture}
        roughness={0.9}
        metalness={0.1}
        emissive="#c1440e"
        emissiveIntensity={0.12}
      />
    </Sphere>
  );
};

export default SpinningPlanet;
