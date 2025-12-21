import Image from 'next/image';
import UnifiedBackground from '../UnifiedBackground';

export function ComingSoon() {
  return (
    <div className="fixed left-0 right-0 w-full top-[6.55rem] h-[calc(100dvh-6.55rem)] flex items-center justify-center overscroll-none touch-none select-none">
      <UnifiedBackground />
      <div className="absolute inset-0 z-10"></div>
      <div className="relative z-30 flex items-center justify-center">
        <div className="relative w-fit h-fit">
          <Image
            src="/images/coming-soon.png"
            alt="Coming Soon Board"
            width={680}
            height={680}
            className="object-contain select-none"
            priority
          />

          <div
            className="absolute animate-floatingSlow select-none"
            style={{
              bottom: '-8%',
              right: '-14%',
              width: '60%',
              aspectRatio: '500 / 450',
            }}
          >
            <Image
              src="/images/mascot-floating.png"
              alt="Floating Character"
              fill
              className="object-contain opacity-100"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}
