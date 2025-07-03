import { useEffect, RefObject } from 'react';
import gsap from 'gsap';

interface UseComingSoonAnimationProps {
  logoRef: RefObject<HTMLDivElement | null>;
  comingRef: RefObject<HTMLDivElement | null>;
  extraNoteRef: RefObject<HTMLDivElement | null>;
  anokhaRef: RefObject<HTMLDivElement | null>;
  yearRef: RefObject<HTMLDivElement | null>;
}

export function useComingSoonAnimation({
  logoRef,
  comingRef,
  extraNoteRef,
  anokhaRef,
  yearRef,
}: UseComingSoonAnimationProps) {
  useEffect(() => {
    gsap.to(logoRef.current, {
      rotate: 360,
      duration: 4,
      repeat: -1,
      ease: 'linear',
    });
    gsap.set(extraNoteRef.current, { opacity: 0, y: -20 });
  }, [logoRef, extraNoteRef]);

  const handleMouseEnter = () => {
    if (comingRef.current) comingRef.current.style.display = '';
    if (extraNoteRef.current) extraNoteRef.current.style.display = '';
    gsap.killTweensOf(comingRef.current);
    gsap.killTweensOf(extraNoteRef.current);
    gsap.to(comingRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.2,
      ease: 'power3.out',
      onComplete: () => {
        if (comingRef.current) comingRef.current.style.display = 'none';
      },
    });
    gsap.to(extraNoteRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.3,
      ease: 'power3.inOut',
    });

    gsap.killTweensOf(anokhaRef.current);
    gsap.to(anokhaRef.current, {
      x: 0,
      opacity: 1,
      duration: 0.7,
      ease: 'power3.out',
    });

    gsap.killTweensOf(yearRef.current);
    gsap.to(yearRef.current, {
      x: 0,
      opacity: 1,
      duration: 0.7,
      ease: 'power3.out',
    });
  };

  const handleMouseLeave = () => {
    if (comingRef.current) comingRef.current.style.display = '';
    if (extraNoteRef.current) extraNoteRef.current.style.display = '';
    gsap.killTweensOf(comingRef.current);
    gsap.killTweensOf(extraNoteRef.current);
    gsap.to(extraNoteRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.2,
      ease: 'power3.in',
    });
    gsap.to(comingRef.current, { opacity: 1, y: 0, duration: 0.2, ease: 'power3.inOut' });

    gsap.killTweensOf(anokhaRef.current);
    gsap.to(anokhaRef.current, {
      x: -50,
      opacity: 0,
      duration: 0.5,
      ease: 'power3.in',
    });

    gsap.killTweensOf(yearRef.current);
    gsap.to(yearRef.current, {
      x: 50,
      opacity: 0,
      duration: 0.5,
      ease: 'power3.in',
    });
  };

  return { handleMouseEnter, handleMouseLeave };
}
