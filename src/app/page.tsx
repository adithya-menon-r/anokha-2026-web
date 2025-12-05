import OrbitGallery from '@/components/gallery/OrbitGallery';
import ParallaxSection from '@/components/ParallaxSection';
import SponsorsMarquee from '@/components/SponsorsMarquee';
import UnifiedBackground from '@/components/UnifiedBackground';
import HeroWarp from '@/features/home/components/HeroWarp';

export default function HomePage() {
  return (
    <main className="relative min-h-screen w-full bg-void">
      <UnifiedBackground />
      <div className="relative z-10">
        <HeroWarp />
        <SponsorsMarquee />
        <ParallaxSection />
        <OrbitGallery />
      </div>
    </main>
  );
}
