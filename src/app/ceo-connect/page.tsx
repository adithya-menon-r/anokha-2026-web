'use client';
import gsap from 'gsap';
import React, { useEffect, useRef } from 'react';
import AboutSection from '@/components/ceoConnect/AboutSection';
import Hero from '@/components/ceoConnect/Hero';
import SpeakerSchedule from '@/components/ceoConnect/SpeakerSchedule';
import ThematicDomains from '@/components/ceoConnect/ThematicDomains';
import StarBackground from '@/components/techfair/StarsBackground';

const CEOConnectPage = () => {
  const aboutRef = useRef<HTMLDivElement>(null);
  const domainsRef = useRef<HTMLDivElement>(null);
  const scheduleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerOptions = { threshold: 0.2 };
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          gsap.to(entry.target, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power2.out',
          });
        }
      });
    };

    const observer = new IntersectionObserver(
      handleIntersection,
      observerOptions,
    );
    const sections = [
      aboutRef.current,
      domainsRef.current,
      scheduleRef.current,
    ];

    sections.forEach((section) => {
      if (section) {
        gsap.set(section, { opacity: 0, y: 60 });
        observer.observe(section);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative min-h-screen bg-slate-950 text-white overflow-hidden">
      <StarBackground />
      <Hero />
      <AboutSection ref={aboutRef} />
      <ThematicDomains ref={domainsRef} />
      <div ref={scheduleRef}>
        <SpeakerSchedule />
      </div>
    </div>
  );
};

export default CEOConnectPage;
