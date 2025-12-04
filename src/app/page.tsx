import OrbitGallery from '@/components/gallery/OrbitGallery';
import HeroWarp from '@/features/home/components/HeroWarp';

export default function HomePage() {
  return (
    <main className="min-h-screen w-full">
      <HeroWarp />
      <OrbitGallery />
    </main>
  );
}
