import { SkeletonBlock } from '@/components/SkeletonBlock';

const PriceCardSkeleton = () => (
  <div className="h-52 bg-card border border-border rounded-lg p-6">
    <SkeletonBlock className="h-8 w-1/3 mb-6 rounded " />
    <SkeletonBlock className="h-6 w-full mb-6 rounded " />
    <SkeletonBlock className="h-12 w-full mb-4 rounded " />
  </div>
);

export default function EventDetailSkeleton() {
  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="md:grid md:grid-cols-12 md:gap-8">
        <div className="col-span-4 space-y-6 mb-4 md:mb-0">
          {/* Image Skeleton */}
          <SkeletonBlock className="relative w-full aspect-[3/4] rounded-lg overflow-hidden mb-6" />

          {/* Price Card */}
          <div className="hidden md:block">
            <PriceCardSkeleton />
          </div>
        </div>

        <div className="col-span-8 space-y-3">
          {/* Title + Tags */}
          <div>
            <SkeletonBlock className="h-10 w-full md:w-2/3 mb-4 rounded" />

            <SkeletonBlock className="h-4 w-5/6 rounded" />

            <div className="mt-6 flex space-x-3">
              <SkeletonBlock className="h-4 w-14 rounded" />
              <SkeletonBlock className="h-4 w-16 rounded" />
              <SkeletonBlock className="h-4 w-14 rounded" />
              <SkeletonBlock className="h-4 w-16 rounded" />
            </div>
          </div>

          {/* Price Card */}
          <div className="md:hidden">
            <PriceCardSkeleton />
          </div>

          {/* Schedule + Organizers */}
          <div className="flex w-full gap-4 flex-col md:flex-row">
            <div className="bg-card border border-border rounded-lg p-6 w-full">
              <SkeletonBlock className="h-4 w-1/2 rounded" />
              <div className="mt-6 space-y-2">
                <SkeletonBlock className="h-6 w-3/4 rounded" />
                <SkeletonBlock className="h-6 w-3/4 rounded" />
              </div>
            </div>
            <div className="bg-card border border-border rounded-lg p-6 w-full">
              <SkeletonBlock className="h-4 w-1/2 rounded" />
              <div className="mt-6 space-y-2">
                <SkeletonBlock className="h-6 w-3/4 rounded" />
                <SkeletonBlock className="h-6 w-3/4 rounded" />
              </div>
            </div>
          </div>

          {/* Markdown */}
          <div className="bg-card border border-border rounded-lg p-6 w-full space-y-4">
            <SkeletonBlock className="h-6 w-1/4 rounded" />
            <SkeletonBlock className="h-5 w-1/2 rounded" />

            <div className="space-y-2 py-4">
              <SkeletonBlock className="h-4 w-5/6 rounded" />
              <SkeletonBlock className="h-4 w-3/4 rounded" />
              <SkeletonBlock className="h-4 w-full rounded" />
            </div>

            <SkeletonBlock className="h-5 w-1/2 rounded" />

            <div className="space-y-2 py-4">
              <SkeletonBlock className="h-4 w-5/6 rounded" />
              <SkeletonBlock className="h-4 w-full rounded" />
            </div>

            <SkeletonBlock className="h-6 w-1/4 rounded" />

            <SkeletonBlock className="h-4 w-5/6 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}
