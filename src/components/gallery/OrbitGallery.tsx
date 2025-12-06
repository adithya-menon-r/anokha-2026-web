'use client';
import gsap from 'gsap';
import { useEffect, useRef, useState } from 'react';
import DotNavigation from './DotNavigation';
import LoadingOrb from './LoadingOrb';
import NavigationButtons from './NavigationButtons';
import OrbitItems from './OrbitItems';
import TitleHeader from './TitleHeader';

const OrbitGallery = () => {
  // Local images from `public/Images/delete` (URL-encoded filenames)
  const images = [
    '/Images/delete/1130469.png',
    '/Images/delete/4c4b401e538f739fd3d54498de45708d.jpg',
    '/Images/delete/desktop%20background.jpg',
    '/Images/delete/Fuck%20Yeah%20Animation.gif',
    '/Images/delete/Group%2040.png',
    '/Images/delete/PIA17172%20%281%29.jpg',
    '/Images/delete/Trying%20to%20find%20a%20good%20pixel%20art%20style.gif',
    '/Images/delete/WhatsApp%20Image%202023-12-18%20at%2022.13.43_33f6001d.jpg',
    '/Images/delete/wp5847395.jpg',
  ];

  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [loadedCount, setLoadedCount] = useState(0);
  const allLoaded = loadedCount >= images.length;
  const autoPlayTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Reduced radius to suit smaller/tighter orbit layout
  const radius = 260;
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

    // Create timeline for smoother coordinated animations
    const tl = gsap.timeline();

    items.forEach((item: Element, index: number) => {
      const { x, z, scale, opacity, zIndex } = getPosition(index, currentAngle);

      tl.to(
        item,
        {
          x: x,
          z: z,
          scale: scale,
          opacity: opacity,
          zIndex: zIndex,
          duration: 0.1,
          ease: 'expo.inOut',
        },
        0, // Start all at the same time but with smoother easing
      );
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
    <div className="relative w-full min-h-screen overflow-hidden pt-32 pb-20">
      <TitleHeader />

      {!allLoaded && <LoadingOrb />}

      <div
        ref={containerRef}
        className={`relative h-[420px] max-md:h-[300px] perspective-1000 ${allLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000`}
        style={{ perspective: '1200px' }}
      >
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 max-md:w-80 max-md:h-80 bg-gradient-radial from-orange-500/30 via-orange-500/10 to-transparent rounded-full blur-3xl pointer-events-none animate-pulse"></div>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 max-md:w-64 max-md:h-64 bg-gradient-radial from-yellow-400/20 via-yellow-500/10 to-transparent rounded-full blur-2xl pointer-events-none"></div>

        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] max-md:w-[420px] max-md:h-[420px] border border-orange-400/20 rounded-full pointer-events-none animate-spin"
          style={{ animationDuration: '30s' }}
        ></div>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] h-[560px] max-md:w-[380px] max-md:h-[380px] border-2 border-orange-500/30 rounded-full pointer-events-none shadow-[0_0_30px_rgba(251,146,60,0.3)]"></div>
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] max-md:w-[340px] max-md:h-[340px] border border-yellow-400/15 rounded-full pointer-events-none animate-spin"
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
