'use client';

import { useRef } from 'react';
import { ComingSoon } from '@/components/ComingSoon/ComingSoon';
import { useComingSoonAnimation } from '@/hooks/useComingSoonAnimation';

export default function ComingSoonPage() {
  const logoRef = useRef<HTMLDivElement>(null);
  const anokhaRef = useRef<HTMLDivElement>(null);
  const yearRef = useRef<HTMLDivElement>(null);
  const comingRef = useRef<HTMLDivElement>(null);
  const extraNoteRef = useRef<HTMLDivElement>(null);

  const { handleMouseEnter, handleMouseLeave } = useComingSoonAnimation({
    logoRef,
    anokhaRef,
    yearRef,
    comingRef,
    extraNoteRef,
  });

  return (
    <ComingSoon
      logoRef={logoRef}
      anokhaRef={anokhaRef}
      yearRef={yearRef}
      comingRef={comingRef}
      extraNoteRef={extraNoteRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    />
  );
}
