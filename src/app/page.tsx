import OrbitGallery from '@/components/gallery/OrbitGallery';
import ParallaxSection from '@/components/ParallaxSection';
import HeroWarp from '@/features/home/components/HeroWarp';

export default function HomePage() {
  return (
    <main className="min-h-screen w-full">
      <HeroWarp />
      <ParallaxSection />
      <OrbitGallery />
    </main>
  );
}
