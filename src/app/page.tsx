'use client';
import { useEffect } from 'react';
import { useActiveSection } from '@/components/AboutSmoothScroll/useActiveSection';
import DividerMarquee from '@/components/DividerMarquee';
import OrbitGallery from '@/components/gallery/OrbitGallery';
import { HorizontalScrollSection } from '@/components/HorizontalScroll';
import ParallaxSection from '@/components/ParallaxSection';
import SponsorsMarquee from '@/components/SponsorsMarquee';
import UnifiedBackground from '@/components/UnifiedBackground';
import VisorSection from '@/components/VisorSection';
import HeroWarp from '@/features/home/components/HeroWarp';
import { useAboutScrollStore } from '@/stores/useScrollState';

export default function HomePage() {
  const { targetSectionId, clearScrollTarget } = useAboutScrollStore();
  useActiveSection('about-section', 0.4);

  useEffect(() => {
    if (targetSectionId) {
      const element = document.getElementById(targetSectionId);

      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        clearScrollTarget();
      }
    }
  }, [targetSectionId, clearScrollTarget]);
  return (
    <main className="relative min-h-screen w-full bg-void">
      <UnifiedBackground />
      <div className="relative z-10">
        <HeroWarp />
        <SponsorsMarquee />
        <div id="about-section">
          <ParallaxSection />
        </div>
        <DividerMarquee />
        <VisorSection />
        <DividerMarquee />
        <HorizontalScrollSection />
        <OrbitGallery />
      </div>
    </main>
  );
}
