'use client';
import gsap from 'gsap';
import { useEffect, useRef, useState } from 'react';
import DotNavigation from './DotNavigation';
import FloatingParticles from './FloatingParticles';
import LoadingOrb from './LoadingOrb';
import NavigationButtons from './NavigationButtons';
import NebulaBackground from './NebulaBackground';
import OrbitItems from './OrbitItems';
import Starfield from './Starfield';
import TitleHeader from './TitleHeader';

const OrbitGallery = () => {
  // Local images from `public/Images/delete` (URL-encoded filenames)
  const images = [''];

  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [loadedCount, setLoadedCount] = useState(0);
  const allLoaded = loadedCount >= images.length;
  const autoPlayTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const radius = 400;
  const angleStep = (2 * Math.PI) / Math.max(images.length, 1);

  const getPosition = (index: number, currentAngle: number) => {
    const angle = currentAngle + index * angleStep;
    const x = Math.sin(angle) * radius;
    const z = Math.cos(angle) * radius;
    const scale = (z + radius) / (2 * radius);
    const opacity = 0.4 + scale * 0.6;
    const zIndex = Math.round(scale * 100);

    return { x, z, scale, opacity, zIndex };
  };

  useEffect(() => {
    if (!isAutoPlaying || !allLoaded) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => {
      clearInterval(interval);
      if (autoPlayTimeoutRef.current) {
        clearTimeout(autoPlayTimeoutRef.current);
      }
    };
  }, [isAutoPlaying, allLoaded, images.length]);

  useEffect(() => {
    if (!orbitRef.current || !allLoaded) return;

    const items = orbitRef.current.querySelectorAll('.orbit-item');
    const currentAngle = -activeIndex * angleStep;

    items.forEach((item: Element, index: number) => {
      const { x, z, scale, opacity, zIndex } = getPosition(index, currentAngle);

      gsap.to(item, {
        x: x,
        z: z,
        scale: scale,
        opacity: opacity,
        zIndex: zIndex,
        duration: 0.8,
        ease: 'power2.out',
      });
    });
  }, [activeIndex, allLoaded, angleStep]);

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);

    if (autoPlayTimeoutRef.current) {
      clearTimeout(autoPlayTimeoutRef.current);
    }
    autoPlayTimeoutRef.current = setTimeout(() => {
      setIsAutoPlaying(true);
    }, 5000);
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setActiveIndex((prev) => (prev + 1) % images.length);

    if (autoPlayTimeoutRef.current) {
      clearTimeout(autoPlayTimeoutRef.current);
    }
    autoPlayTimeoutRef.current = setTimeout(() => {
      setIsAutoPlaying(true);
    }, 5000);
  };

  const handleDotClick = (index: number) => {
    setIsAutoPlaying(false);
    setActiveIndex(index);

    if (autoPlayTimeoutRef.current) {
      clearTimeout(autoPlayTimeoutRef.current);
    }
    autoPlayTimeoutRef.current = setTimeout(() => {
      setIsAutoPlaying(true);
    }, 5000);
  };

  return (
    <div className="relative w-full min-h-screen bg-background overflow-hidden pt-32 pb-20">
      <Starfield />
      <NebulaBackground />
      <FloatingParticles />

      <TitleHeader />

      {!allLoaded && <LoadingOrb />}

      <div
        ref={containerRef}
        className={`relative h-[600px] max-md:h-[400px] perspective-1000 ${allLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000`}
        style={{ perspective: '1200px' }}
      >
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-radial from-orange-500/30 via-orange-500/10 to-transparent rounded-full blur-3xl pointer-events-none animate-pulse"></div>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-radial from-yellow-400/20 via-yellow-500/10 to-transparent rounded-full blur-2xl pointer-events-none"></div>

        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[850px] max-md:w-[320px] max-md:h-[320px] border border-orange-400/20 rounded-full pointer-events-none animate-spin"
          style={{ animationDuration: '30s' }}
        ></div>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] max-md:w-[300px] max-md:h-[300px] border-2 border-orange-500/30 rounded-full pointer-events-none shadow-[0_0_30px_rgba(251,146,60,0.3)]"></div>
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] max-md:w-[280px] max-md:h-[280px] border border-yellow-400/15 rounded-full pointer-events-none animate-spin"
          style={{ animationDuration: '45s', animationDirection: 'reverse' }}
        ></div>

        <OrbitItems
          images={images}
          activeIndex={activeIndex}
          angleStep={angleStep}
          radius={radius}
          onDotClick={handleDotClick}
          onImageLoad={() => setLoadedCount((prev) => prev + 1)}
          orbitRef={orbitRef}
        />

        <NavigationButtons onPrev={handlePrev} onNext={handleNext} />
      </div>

      <DotNavigation
        count={images.length}
        activeIndex={activeIndex}
        onClick={handleDotClick}
      />
    </div>
  );
};

export default OrbitGallery;
