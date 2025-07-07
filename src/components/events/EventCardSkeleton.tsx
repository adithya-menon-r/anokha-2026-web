import { SkeletonBlock } from '@/components/SkeletonBlock';

export const EventCardSkeleton = () => {
  return (
    <div className="relative rounded-2xl overflow-hidden border border-border shadow-sm bg-card aspect-[3/5] min-w-[240px] sm:min-w-[260px]">
      {/* Poster */}
      <div className="absolute inset-0 bg-muted" />

      {/* Top-left: Date and Time */}
      <div className="absolute top-3 left-3 z-10 space-y-1">
        <SkeletonBlock className="h-12 w-16 rounded-md" />
        <SkeletonBlock className="h-5 w-16 rounded-md" />
      </div>

      {/* Top-right: Star */}
      <div className="absolute top-3 right-3 z-10 bg-background/90 rounded-full p-2 shadow">
        <SkeletonBlock className="w-6 h-6 rounded-full" />
      </div>

      {/* Bottom content preview */}
      <div className="absolute bottom-0 w-full px-4 py-3 z-10 bg-background shadow-lg space-y-2">
        <SkeletonBlock className="h-6 w-3/4 rounded" />
        <SkeletonBlock className="h-4 w-full rounded" />
        <SkeletonBlock className="h-4 w-1/2 rounded" />
        <SkeletonBlock className="h-8 w-full rounded-md" />
      </div>
    </div>
  );
};
