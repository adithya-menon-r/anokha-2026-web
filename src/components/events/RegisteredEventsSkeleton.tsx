import { SkeletonBlock } from '@/components/SkeletonBlock';

export function RegisteredEventListSkeleton() {
  const placeholderCards = Array.from({ length: 3 });

  const EventCardSkeleton = () => (
    <div className="w-60 flex-shrink-0">
      <div className="bg-card/20 backdrop-blur-sm border border-border/30 rounded-xl overflow-hidden p-4 pr-6 h-full animate-pulse">
        <SkeletonBlock className="h-56 w-full rounded-lg mb-4 bg-white/10" />

        {/* Title Placeholder */}
        <SkeletonBlock className="h-5 w-4/5 rounded bg-white/10 mb-2" />

        {/* Date/Time Placeholder */}
        <SkeletonBlock className="h-4 w-1/2 rounded bg-white/10 mb-4" />

        {/* Action Button/Detail Placeholder */}
        <div className="flex justify-between items-center mt-3">
          <SkeletonBlock className="h-4 w-1/3 rounded bg-white/10" />
          {/* Simulate 'View Details' Button */}
          <SkeletonBlock className="h-8 w-1/2 rounded-lg bg-orange-400/20 border border-orange-400/30" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full h-full max-h-[100dvh] md:max-h-none">
      <div className="overflow-x-auto md:overflow-x-visible md:overflow-y-auto pb-4 h-full md:h-auto">
        <div
          className="flex flex-col md:flex-row gap-4 md:gap-6 px-2 py-2 md:flex-nowrap md:items-stretch h-full"
          style={{ maxHeight: '100dvh' }}
        >
          {placeholderCards.map((_, index) => (
            <EventCardSkeleton key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
