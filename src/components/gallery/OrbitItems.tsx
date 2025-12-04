'use client';
import Image from 'next/image';
import React from 'react';

type Props = {
  images: string[];
  activeIndex: number;
  angleStep: number;
  radius: number;
  onDotClick: (index: number) => void;
  onImageLoad: () => void;
  orbitRef: React.RefObject<HTMLDivElement | null>;
};

const OrbitItems = ({
  images,
  activeIndex,
  angleStep,
  radius,
  onDotClick,
  onImageLoad,
  orbitRef,
}: Props) => {
  return (
    <div
      ref={orbitRef}
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      style={{ transformStyle: 'preserve-3d' }}
    >
      {images.map((src, index) => {
        const initialAngle = index * angleStep;
        const x = Math.sin(initialAngle) * radius;
        const z = Math.cos(initialAngle) * radius;
        const scale = (z + radius) / (2 * radius);
        const isActive = index === activeIndex;

        return (
          <div
            key={index}
            className={`orbit-item absolute cursor-pointer transition-all duration-500 ${
              isActive
                ? 'shadow-2xl shadow-orange-500/60'
                : 'hover:shadow-2xl hover:shadow-orange-500/40'
            }`}
            style={{
              width: '200px',
              height: '280px',
              marginLeft: '-100px',
              marginTop: '-140px',
              transform: `translateX(${x}px) translateZ(${z}px) scale(${scale})`,
              opacity: 0.4 + scale * 0.6,
              zIndex: Math.round(scale * 100),
            }}
            onClick={() => onDotClick(index)}
          >
            <div
              className={`relative w-full h-full rounded-xl overflow-hidden backdrop-blur-sm shadow-lg transition-all duration-500 ${
                isActive
                  ? 'border-2 border-orange-400 ring-2 ring-orange-500/50'
                  : 'border-2 border-orange-400/20 hover:border-orange-400/60'
              }`}
            >
              <Image
                src={src}
                alt={`Gallery image ${index + 1}`}
                fill
                style={{ objectFit: 'cover' }}
                className="rounded-xl"
                onLoad={() => onImageLoad()}
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-orange-500/20 pointer-events-none"></div>

              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute w-full h-1 bg-gradient-to-r from-transparent via-orange-400/50 to-transparent animate-scan"></div>
              </div>

              {isActive && (
                <>
                  <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-orange-400"></div>
                  <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-orange-400"></div>
                  <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-orange-400"></div>
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-orange-400"></div>
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OrbitItems;
