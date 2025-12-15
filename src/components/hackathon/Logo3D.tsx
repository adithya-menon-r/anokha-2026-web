'use client';

import { PresentationControls, useGLTF } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { motion } from 'motion/react';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface ModelProps {
  isHovered: boolean;
  scale: number;
}

function Model({ isHovered, scale, ...props }: ModelProps): React.JSX.Element {
  const { scene } = useGLTF('/hackathon/Logo_3D.glb');
  const groupRef = useRef<THREE.Group>(null);

  useLayoutEffect(() => {
    scene.traverse((obj) => {
      if (obj instanceof THREE.Mesh) {
        if (obj.material instanceof THREE.MeshStandardMaterial) {
          obj.material.color.set('white');
          obj.material.roughness = 0.5;
          obj.material.metalness = 0.1;
        }
      }
    });
  }, [scene]);

  useFrame((state, delta) => {
    if (groupRef.current && !isHovered) {
      groupRef.current.rotation.y += delta * 1.2;
    }
  });

  return (
    <group ref={groupRef} scale={scale} {...props}>
      <primitive object={scene} rotation={[Math.PI / 2, 0, 0]} />
    </group>
  );
}

export default function Logo3D(): React.JSX.Element {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [scale, setScale] = useState<number>(1);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = (): void => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setScale(mobile ? 0.9 : 1);
    };

    handleResize(); // Set initial
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: 'easeOut' }}
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
      onTouchStart={() => !isMobile && setIsHovered(true)}
      onTouchEnd={() => !isMobile && setIsHovered(false)}
      className="h-[300px] md:h-[500px] w-full cursor-pointer md:cursor-grab transition-transform duration-300 ease-out"
      style={{
        cursor: isHovered ? 'grab' : 'pointer',
        touchAction: isMobile ? 'auto' : 'none',
      }}
      whileHover={!isMobile ? { scale: 1.05 } : {}}
    >
      <Canvas
        dpr={[1, 2]}
        camera={{ fov: 45, position: [0, 0, 5] }}
        shadows
        gl={{ alpha: true, antialias: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={1.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <directionalLight position={[-5, 5, -5]} intensity={1} />
        <directionalLight position={[0, 10, 0]} intensity={0.5} />

        <PresentationControls
          enabled={!isMobile}
          snap={true}
          speed={1.5}
          global
          zoom={1}
          rotation={[0, 0, 0]}
          polar={[0, 0]}
          azimuth={[-Infinity, Infinity]}
        >
          <Model isHovered={isHovered} scale={scale} />
        </PresentationControls>
      </Canvas>
    </motion.div>
  );
}

useGLTF.preload('/hackathon/Logo_3D.glb');
