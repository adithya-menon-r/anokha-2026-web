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
    <div className="w-full h-full flex items-center justify-center md:block">
      <div className="w-full flex items-center justify-center md:block">
        <div className="flex flex-col md:flex-row md:flex-wrap gap-4 md:gap-6 px-2 py-2 items-center justify-center md:items-stretch md:justify-start w-full">
          {placeholderCards.map((_, index) => (
            <EventCardSkeleton key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
