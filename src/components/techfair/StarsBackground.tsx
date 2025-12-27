'use client';
import { useEffect, useRef } from 'react';

export default function StarsBackground() {
  const starsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!starsRef.current) return;

    // Clear any existing stars first
    starsRef.current.innerHTML = '';

    const starCount = 200;
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < starCount; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.animationDelay = `${Math.random() * 3}s`;
      star.style.animationDuration = `${2 + Math.random() * 3}s`;
      fragment.appendChild(star);
    }

    starsRef.current.appendChild(fragment);

    // Cleanup on unmount
    return () => {
      if (starsRef.current) {
        starsRef.current.innerHTML = '';
      }
    };
  }, []);

  return (
    <div ref={starsRef} className="fixed inset-0 z-0 pointer-events-none" />
  );
}
