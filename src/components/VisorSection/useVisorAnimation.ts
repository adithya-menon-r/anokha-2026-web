'use client';

import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { RefObject, useLayoutEffect } from 'react';
import gsap from '@/lib/gsap';

gsap.registerPlugin?.(ScrollTrigger as any);

interface UseVisorAnimationProps {
  containerRef: RefObject<HTMLDivElement | null>;
  visorRef: RefObject<HTMLDivElement | null>;
  titleRef: RefObject<HTMLDivElement | null>;
  imageRef: RefObject<HTMLDivElement | null>;
  textRef: RefObject<HTMLDivElement | null>;
  scanLineRef: RefObject<HTMLDivElement | null>;
  topLeftRef: RefObject<HTMLDivElement | null>;
  topRightRef: RefObject<HTMLDivElement | null>;
  bottomLeftRef: RefObject<HTMLDivElement | null>;
  bottomRightRef: RefObject<HTMLDivElement | null>;
}

export const useVisorAnimation = ({
  containerRef,
  visorRef,
  titleRef,
  imageRef,
  textRef,
  scanLineRef,
  topLeftRef,
  topRightRef,
  bottomLeftRef,
  bottomRightRef,
}: UseVisorAnimationProps) => {
  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top center',
          end: 'center center',
          scrub: false,
          once: true,
        },
      });

      // Boot sequence - Scan line effect
      timeline.fromTo(
        scanLineRef.current,
        { y: '-100%', opacity: 0 },
        { y: '100%', opacity: 1, duration: 0.8, ease: 'power1.inOut' },
        0,
      );

      // HUD elements fade in with stagger
      timeline.fromTo(
        [
          topLeftRef.current,
          topRightRef.current,
          bottomLeftRef.current,
          bottomRightRef.current,
        ],
        { opacity: 0, scale: 0.8 },
        {
          opacity: 0.6,
          scale: 1,
          duration: 0.5,
          stagger: 0.15,
          ease: 'back.out',
        },
        0.3,
      );

      // Title pops in
      timeline.fromTo(
        titleRef.current,
        { opacity: 0, y: 30, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'back.out' },
        0.5,
      );

      // Image fades and scales in
      timeline.fromTo(
        imageRef.current,
        { opacity: 0, scale: 0.95, filter: 'blur(10px)' },
        {
          opacity: 1,
          scale: 1,
          filter: 'blur(0px)',
          duration: 0.7,
          ease: 'power2.out',
        },
        0.7,
      );

      // Description text appears
      timeline.fromTo(
        textRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        0.9,
      );

      // Subtle glow pulse after boot sequence
      timeline.to(
        visorRef.current,
        {
          boxShadow:
            '0 0 60px rgba(59, 130, 246, 0.5), inset 0 0 60px rgba(59, 130, 246, 0.1)',
          duration: 1.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        },
        1.2,
      );
    }, containerRef);

    return () => ctx.revert();
  }, [
    containerRef,
    visorRef,
    titleRef,
    imageRef,
    textRef,
    scanLineRef,
    topLeftRef,
    topRightRef,
    bottomLeftRef,
    bottomRightRef,
  ]);
};
