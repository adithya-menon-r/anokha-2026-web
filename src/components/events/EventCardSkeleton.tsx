import { SkeletonBlock } from '@/components/SkeletonBlock';

export const EventCardSkeleton = () => {
  return (
    <div className="group relative w-full aspect-[4/6] rounded-lg overflow-hidden bg-card/10 backdrop-blur-sm border border-border/30">
      {/* Corner decorations */}
      <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-primary opacity-60" />
      <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-secondary opacity-60" />
      <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-secondary opacity-60" />
      <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-primary opacity-60" />

      {/* Poster area */}
      <div className="absolute top-0 left-0 right-0 h-[75%] bg-muted">
        <SkeletonBlock className="w-full h-full" />
      </div>

      {/* Star button (same position as real card) */}
      <div className="absolute top-3 right-3 z-30 p-2 rounded-full bg-background/80 backdrop-blur-sm border border-border/50">
        <SkeletonBlock className="w-4 h-4 rounded-full" />
      </div>

      {/* Dark bottom background */}
      <div className="absolute bottom-0 left-0 right-0 h-[25%] bg-background" />

      {/* Footer content */}
      <div className="absolute bottom-0 left-0 right-0 p-4 z-10 bg-background/20 backdrop-blur-md border-t border-border/30">
        {/* Event name & price */}
        <div className="flex items-start justify-between mb-3">
          <SkeletonBlock className="h-5 w-3/4 rounded" />
          <div className="flex flex-col items-end ml-2">
            <SkeletonBlock className="h-5 w-16 rounded" />
            <SkeletonBlock className="h-3 w-12 rounded mt-1" />
          </div>
        </div>

        {/* Event details */}
        <div className="flex items-center gap-4 mb-3">
          <SkeletonBlock className="h-4 w-28 rounded" />
          <SkeletonBlock className="h-4 w-16 rounded" />
        </div>

        {/* Tags */}
        <div className="flex items-center gap-2 overflow-hidden">
          <SkeletonBlock className="h-6 w-16 rounded-md" />
          <SkeletonBlock className="h-6 w-20 rounded-md" />
          <SkeletonBlock className="h-6 w-14 rounded-md" />
        </div>
      </div>
    </div>
  );
};
