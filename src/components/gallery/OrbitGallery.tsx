'use client';
import gsap from 'gsap';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const OrbitGallery = () => {
  const images = [''];

  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [loadedCount, setLoadedCount] = useState(0);
  const allLoaded = loadedCount >= images.length;
  const autoPlayTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const radius = 400;
  const angleStep = (2 * Math.PI) / images.length;

  // Generate animated stars
  useEffect(() => {
    if (!starsRef.current) return;

    const starCount = 150;
    const stars: HTMLDivElement[] = [];

    for (let i = 0; i < starCount; i++) {
      const star = document.createElement('div');
      star.className = 'absolute rounded-full bg-white';
      const size = Math.random() * 2 + 1;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.opacity = `${Math.random() * 0.7 + 0.3}`;

      gsap.to(star, {
        opacity: Math.random() * 0.3 + 0.2,
        duration: Math.random() * 3 + 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      stars.push(star);
      starsRef.current?.appendChild(star);
    }

    return () => {
      stars.forEach((star) => star.remove());
    };
  }, []);

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

    // Resume auto-play after 5 seconds
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

    // Resume auto-play after 5 seconds
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

    // Resume auto-play after 5 seconds
    if (autoPlayTimeoutRef.current) {
      clearTimeout(autoPlayTimeoutRef.current);
    }
    autoPlayTimeoutRef.current = setTimeout(() => {
      setIsAutoPlaying(true);
    }, 5000);
  };

  return (
    <div className="relative w-full min-h-screen bg-background overflow-hidden pt-32 pb-20">
      {/* Animated Starfield Background */}
      <div
        ref={starsRef}
        className="absolute inset-0 pointer-events-none overflow-hidden"
      ></div>

      {/* Nebula Background Gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-orange-500/15 via-transparent to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-tl from-blue-500/15 via-transparent to-transparent rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '1.5s' }}
        ></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-r from-yellow-500/10 via-orange-500/10 to-transparent rounded-full blur-3xl"></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-orange-400/40 rounded-full animate-[float_15s_linear_infinite]"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Title with Neon Effect */}
      <div className="text-center mb-16 relative z-10">
        <h1 className="text-6xl tracking-[0.2em] text-foreground max-md:text-4xl font-bold font-tech uppercase mb-2 relative inline-block">
          <span className="relative z-10 bg-gradient-to-r from-orange-400 via-yellow-300 to-orange-400 bg-clip-text text-transparent animate-pulse">
            GALLERY
          </span>
          <span className="absolute inset-0 text-orange-500/30 blur-xl">
            GALLERY
          </span>
        </h1>
        <div className="flex items-center justify-center gap-3 mt-6">
          <div className="h-px w-16 bg-gradient-to-r from-transparent via-orange-500 to-transparent"></div>
          <p className="text-foreground/70 text-lg font-sans tracking-wide">
            Cosmic Memories Archive
          </p>
          <div className="h-px w-16 bg-gradient-to-r from-transparent via-orange-500 to-transparent"></div>
        </div>
      </div>

      {/* Loading with Orbital Animation */}
      {!allLoaded && (
        <div className="absolute inset-0 flex items-center justify-center z-20 bg-background/80 backdrop-blur-sm">
          <div className="relative w-64 h-64">
            <div
              className="absolute inset-0 rounded-full border-2 border-orange-500/30 animate-spin"
              style={{ animationDuration: '8s' }}
            ></div>
            <div
              className="absolute inset-8 rounded-full border-2 border-blue-500/30 animate-spin"
              style={{ animationDuration: '6s', animationDirection: 'reverse' }}
            ></div>
            <div
              className="absolute inset-16 rounded-full border-2 border-yellow-500/30 animate-spin"
              style={{ animationDuration: '4s' }}
            ></div>

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full animate-pulse"></div>
                <div className="absolute inset-0 w-16 h-16 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full blur-xl animate-pulse"></div>
              </div>
            </div>

            <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex items-center justify-center">
              <span className="text-foreground/80 font-tech text-sm tracking-widest">
                INITIALIZING...
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Orbit Container */}
      <div
        ref={containerRef}
        className={`relative h-[600px] max-md:h-[400px] perspective-1000 ${
          allLoaded ? 'opacity-100' : 'opacity-0'
        } transition-opacity duration-1000`}
        style={{ perspective: '1200px' }}
      >
        {/* Center Energy Core */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-radial from-orange-500/30 via-orange-500/10 to-transparent rounded-full blur-3xl pointer-events-none animate-pulse"></div>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-radial from-yellow-400/20 via-yellow-500/10 to-transparent rounded-full blur-2xl pointer-events-none"></div>

        {/* Rotating Energy Rings */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[850px] max-md:w-[320px] max-md:h-[320px] border border-orange-400/20 rounded-full pointer-events-none animate-spin"
          style={{ animationDuration: '30s' }}
        ></div>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] max-md:w-[300px] max-md:h-[300px] border-2 border-orange-500/30 rounded-full pointer-events-none shadow-[0_0_30px_rgba(251,146,60,0.3)]"></div>
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] max-md:w-[280px] max-md:h-[280px] border border-yellow-400/15 rounded-full pointer-events-none animate-spin"
          style={{ animationDuration: '45s', animationDirection: 'reverse' }}
        ></div>

        {/* Orbiting Images */}
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
                onClick={() => handleDotClick(index)}
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
                    onLoad={() => setLoadedCount((prev) => prev + 1)}
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

        {/* Navigation Buttons */}
        <button
          onClick={handlePrev}
          className="absolute left-8 max-md:left-4 top-1/2 -translate-y-1/2 z-50 w-14 h-14 max-md:w-12 max-md:h-12 rounded-full bg-gradient-to-br from-card/30 to-card/10 backdrop-blur-md border border-orange-400/30 text-foreground flex items-center justify-center hover:border-orange-400 hover:bg-gradient-to-br hover:from-orange-500/20 hover:to-yellow-500/20 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-orange-500/50 group"
          aria-label="Previous"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="w-6 h-6 text-orange-400 group-hover:text-orange-300 transition-colors"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </button>
        <button
          onClick={handleNext}
          className="absolute right-8 max-md:right-4 top-1/2 -translate-y-1/2 z-50 w-14 h-14 max-md:w-12 max-md:h-12 rounded-full bg-gradient-to-br from-card/30 to-card/10 backdrop-blur-md border border-orange-400/30 text-foreground flex items-center justify-center hover:border-orange-400 hover:bg-gradient-to-br hover:from-orange-500/20 hover:to-yellow-500/20 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-orange-500/50 group"
          aria-label="Next"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="w-6 h-6 text-orange-400 group-hover:text-orange-300 transition-colors"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>

      {/* Dot Navigation */}
      <div className="flex justify-center gap-3 mt-12 relative z-10">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`relative transition-all duration-300 ${
              index === activeIndex ? 'scale-125' : 'scale-100 hover:scale-110'
            }`}
            aria-label={`Go to image ${index + 1}`}
          >
            <div
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? 'bg-gradient-to-r from-orange-500 to-yellow-500'
                  : 'bg-border/40 hover:bg-orange-400/60'
              }`}
            ></div>
            {index === activeIndex && (
              <div className="absolute inset-0 w-3 h-3 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 blur-md animate-pulse"></div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default OrbitGallery;
