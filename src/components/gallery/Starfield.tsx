'use client';
import gsap from 'gsap';
import { useEffect, useRef } from 'react';

const Starfield = ({ starCount = 150 }: { starCount?: number }) => {
  const starsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!starsRef.current) return;

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
      starsRef.current.appendChild(star);
    }

    return () => {
      stars.forEach((star) => star.remove());
    };
  }, [starCount]);

  return (
    <div
      ref={starsRef}
      className="absolute inset-0 pointer-events-none overflow-hidden"
    ></div>
  );
};

export default Starfield;
