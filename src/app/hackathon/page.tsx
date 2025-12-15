'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React, { useLayoutEffect, useRef } from 'react';
import HackathonAbout from '@/components/hackathon/HackathonAbout';
import HackathonFAQ from '@/components/hackathon/HackathonFAQ';
import HackathonFooter from '@/components/hackathon/HackathonFooter';
import HackathonHeader from '@/components/hackathon/HackathonHeader';
import HackathonHero from '@/components/hackathon/HackathonHero';
import HackathonJudging from '@/components/hackathon/HackathonJudging';
import HackathonOrganizers from '@/components/hackathon/HackathonOrganizers';
import HackathonPartners from '@/components/hackathon/HackathonPartners';
import HackathonPrizes from '@/components/hackathon/HackathonPrizes';
import HackathonRegister from '@/components/hackathon/HackathonRegister';
import HackathonSchedule from '@/components/hackathon/HackathonSchedule';
import HackathonThemes from '@/components/hackathon/HackathonThemes';

// Register GSAP plugin
if (typeof window !== 'undefined' && gsap && ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HackathonPage() {
  const mainRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!mainRef.current) return;

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>('[data-animate]');
      items.forEach((el, i) => {
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: 40 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            delay: Math.min(0.2 * i, 0.6),
            scrollTrigger: {
              trigger: el,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          },
        );
      });

      const groups = gsap.utils.toArray<HTMLElement>('[data-stagger]');
      groups.forEach((group) => {
        const children = group.querySelectorAll<HTMLElement>(
          '[data-stagger-item]',
        );
        gsap.fromTo(
          children,
          { autoAlpha: 0, y: 20 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: group,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          },
        );
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={mainRef}
      className="min-h-screen bg-gradient-to-b from-neutral-950 via-neutral-950 to-black text-zinc-100 selection:bg-orange-500 selection:text-black relative"
    >
      <div className="relative z-10">
        <HackathonHeader />
        <HackathonHero />
        <HackathonAbout />
        <HackathonOrganizers />
        <HackathonThemes />
        <HackathonPartners />
        <HackathonSchedule />
        <HackathonJudging />
        <HackathonPrizes />
        <HackathonFAQ />
        <HackathonRegister />
        <HackathonFooter />
      </div>
    </div>
  );
}
