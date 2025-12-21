'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect } from 'react';
import AboutSection from '@/components/techfair/AboutSection';
import HeroSection from '@/components/techfair/HeroSection';
import InitiativesSection from '@/components/techfair/InitiativesSection';
import JudgingSection from '@/components/techfair/JudgingSection';
import PreEventsSection from '@/components/techfair/preEventsSection';
import RegistrationCTA from '@/components/techfair/Registration';
import StarsBackground from '@/components/techfair/StarsBackground';
import TakeawaysSection from '@/components/techfair/TakeAwaySection';
import TechFairFooter from '@/components/techfair/TechFairFooter';
import ThemesSection from '@/components/techfair/ThemesSection';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function TechFairPage() {
  useEffect(() => {
    // Global Scroll-triggered fade-ins
    gsap.utils.toArray<HTMLElement>('.fade-in-section').forEach((section) => {
      gsap.from(section, {
        opacity: 0,
        y: 80,
        duration: 1,
        scrollTrigger: {
          trigger: section,
          start: 'top 85%',
          end: 'top 60%',
          scrub: 1,
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0a0a0f] text-white overflow-x-hidden">
      <StarsBackground />
      <div className="relative z-10">
        <HeroSection />
        <AboutSection />
        <RegistrationCTA />
        <ThemesSection />
        <InitiativesSection />
        <PreEventsSection />
        <JudgingSection />
        <TakeawaysSection />
        <TechFairFooter />
      </div>
    </div>
  );
}
