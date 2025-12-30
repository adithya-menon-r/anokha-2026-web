'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect } from 'react';
import AboutSection from '@/components/techfair/AboutSection';
import HeroSection from '@/components/techfair/HeroSection';
import InitiativesSection from '@/components/techfair/InitiativesSection';
import PreEventsSection from '@/components/techfair/preEventsSection';
import RegistrationCTA from '@/components/techfair/Registration';
import StarsBackground from '@/components/techfair/StarsBackground';
import TakeawaysSection from '@/components/techfair/TakeAwaySection';
import TechFairContact from '@/components/techfair/TechFairContact';
import ThemesSection from '@/components/techfair/ThemesSection';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function TechFairPage() {
  useEffect(() => {
    // Set initial state for scroll-triggered sections
    gsap.set('.fade-in-section', { opacity: 1, y: 0 });

    // Small delay to ensure DOM is ready and hero animation has started
    const timer = setTimeout(() => {
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

      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(timer);
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
        <TakeawaysSection />
        <TechFairContact />
      </div>
    </div>
  );
}
