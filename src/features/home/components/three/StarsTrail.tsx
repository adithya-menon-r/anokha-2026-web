'use client';

import { useFrame } from '@react-three/fiber';
import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';

interface StarsTrailProps {
  count?: number;
  scrollRef: React.MutableRefObject<number>;
  focalZ?: number;
}

export const StarsTrail = ({
  count = 800,
  scrollRef,
  focalZ = -400,
}: StarsTrailProps) => {
  const focalPoint = useMemo(() => new THREE.Vector3(0, 0, focalZ), [focalZ]);

  const points = useMemo(() => {
    const starters: THREE.Vector3[] = [];
    const velocities: THREE.Vector3[] = [];

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 80 + Math.random() * 600;

      const x = Math.sin(phi) * Math.cos(theta) * r;
      const y = Math.sin(phi) * Math.sin(theta) * r;
      const z = Math.cos(phi) * r;

      const pos = new THREE.Vector3(x, y, z);
      starters.push(pos);

      const dir = focalPoint.clone().sub(pos).normalize();
      const vel = dir.multiplyScalar(0.6 + Math.random() * 1.4);
      velocities.push(vel);
    }

    return { starters, velocities };
  }, [count, focalPoint]);

  const lineRef = useRef<THREE.LineSegments | null>(null);

  useFrame((_, delta) => {
    if (!lineRef.current) return;

    const geometry = lineRef.current.geometry as THREE.BufferGeometry;
    const posAttr = geometry.getAttribute('position') as THREE.BufferAttribute;
    const array = posAttr.array as Float32Array;

    const starters = (points as any).starters as THREE.Vector3[];
    const velocities = (points as any).velocities as THREE.Vector3[];

    const trailBase = 6;
    const progress = Math.max(0, Math.min(1, scrollRef.current || 0));

    // baseline ensures motion even when there's no scroll activity
    const baseline = 0.12;
    const scrollBoost = Math.exp(progress * 3);
    const speedFactor = baseline + scrollBoost * 0.9; // keep baseline contribution
    const trailLen = trailBase * Math.pow(1.6, progress * 2);

    for (let i = 0; i < starters.length; i++) {
      const toFocal = focalPoint.clone().sub(starters[i]);
      const dist = toFocal.length();

      // acceleration scales with distance so far particles speed up as they approach
      const accel = Math.max(0.4, Math.exp(progress * 1.8) * (dist / 120));

      // Ensure velocity vector is valid
      if (!velocities[i] || !velocities[i].length()) {
        const dir = focalPoint.clone().sub(starters[i]).normalize();
        velocities[i] = dir.multiplyScalar(0.8 + Math.random() * 1.2);
      }

      // advance particle; scaled so baseline keeps them moving
      starters[i].addScaledVector(
        velocities[i],
        delta * speedFactor * 30 * accel,
      );

      // respawn if particle has passed the focal point (or gone NaN)
      if (!isFinite(starters[i].x) || starters[i].distanceTo(focalPoint) < 10) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const r = 160 + Math.random() * 800;
        starters[i].set(
          Math.sin(phi) * Math.cos(theta) * r,
          Math.sin(phi) * Math.sin(theta) * r,
          Math.cos(phi) * r,
        );
        const dir = focalPoint.clone().sub(starters[i]).normalize();
        velocities[i].copy(dir.multiplyScalar(0.6 + Math.random() * 1.4));
      }

      const cur = starters[i];
      const prev = cur
        .clone()
        .sub(velocities[i].clone().multiplyScalar(trailLen));

      const idx = i * 6;
      array[idx + 0] = cur.x;
      array[idx + 1] = cur.y;
      array[idx + 2] = cur.z;

      array[idx + 3] = prev.x;
      array[idx + 4] = prev.y;
      array[idx + 5] = prev.z;
    }

    posAttr.needsUpdate = true;
  });

  const segments = useMemo(() => {
    const positions = new Float32Array(count * 6);
    const starters = (points as any).starters as THREE.Vector3[];
    const velocities = (points as any).velocities as THREE.Vector3[];

    for (let i = 0; i < starters.length; i++) {
      const cur = starters[i];
      const prev = cur.clone().sub(velocities[i].clone().multiplyScalar(6));
      const idx = i * 6;
      positions[idx + 0] = cur.x;
      positions[idx + 1] = cur.y;
      positions[idx + 2] = cur.z;
      positions[idx + 3] = prev.x;
      positions[idx + 4] = prev.y;
      positions[idx + 5] = prev.z;
    }

    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geom;
  }, [points, count]);

  return (
    <lineSegments ref={lineRef} geometry={segments}>
      <lineBasicMaterial
        attach="material"
        color={0xffffff}
        transparent
        opacity={0.85}
        linewidth={1}
        depthTest={true}
        blending={THREE.AdditiveBlending}
      />
    </lineSegments>
  );
};

export default StarsTrail;
