'use client';
import { useEffect, useRef } from 'react';

export default function StarsBackground() {
  const starsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!starsRef.current || starsRef.current.children.length > 0) return;
    const starCount = 200;
    for (let i = 0; i < starCount; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.animationDelay = `${Math.random() * 3}s`;
      star.style.animationDuration = `${2 + Math.random() * 3}s`;
      starsRef.current.appendChild(star);
    }
  }, []);

  return <div ref={starsRef} className="fixed inset-0 z-0" />;
}
