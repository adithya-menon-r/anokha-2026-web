import { SkeletonBlock } from '@/components/SkeletonBlock';

export const EventCardSkeleton = () => {
  return (
    <div className="bg-card text-card-foreground aspect-[4/6] relative rounded-2xl overflow-hidden border border-border shadow-sm">
      {/* Poster */}
      <div className="absolute inset-0 bg-muted" />

      {/* Bottom section */}
      <div className="absolute bottom-0 w-full max-w-full px-4 py-3 z-40 bg-background shadow-lg">
        <div className="flex flex-col items-start gap-1 mb-2 w-full">
          {/* Title and Star */}
          <div className="flex items-center justify-between w-full">
            <SkeletonBlock className="h-8 w-3/4 rounded" />
            {/* Star */}
            <div className="bg-background/90 rounded-full p-2 shadow ml-2">
              <SkeletonBlock className="w-5 h-5 rounded-full" />
            </div>
          </div>

          <div className="flex items-center justify-between w-full mb-1">
            <div className="flex flex-col gap-1">
              {/* Group event*/}
              <SkeletonBlock className="h-5 w-24 rounded" />
              {/* Date */}
              <SkeletonBlock className="h-5 w-32 rounded" />
            </div>
            <div className="flex flex-col items-end ml-2">
              {/* Price */}
              <SkeletonBlock className="h-6 w-16 rounded" />
              <SkeletonBlock className="h-3 w-12 rounded mt-1" />
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="flex items-center gap-1 overflow-hidden">
          <SkeletonBlock className="h-7 w-16 rounded-full" />
          <SkeletonBlock className="h-7 w-20 rounded-full" />
          <SkeletonBlock className="h-7 w-14 rounded-full" />
        </div>
      </div>
    </div>
  );
};
