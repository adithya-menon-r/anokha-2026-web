import { SkeletonBlock } from '@/components/SkeletonBlock';
import { Card } from '@/components/ui/card';

/**
 * Skeleton component for EventFilters
 * Shows loading state while filter data is being fetched
 */
export function EventFiltersSkeleton() {
  return (
    <div className="w-full space-y-4">
      <SkeletonBlock className="h-3 w-1/2 md:w-1/6" />
      {/* Row 1: Search bar, sort, and filters button skeleton */}
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <div className="flex-1 w-full">
          <SkeletonBlock className="h-10 w-full" />
        </div>

        <div className="flex gap-4">
          <div className="flex-shrink-0">
            <SkeletonBlock className="h-10 w-[140px]" />
          </div>
          {/* More Filters button skeleton */}
          <SkeletonBlock className="h-10 w-[120px]" />
        </div>
      </div>

      {/* Row 2: Filter panel skeleton */}
      {/* <Card className="glass p-4 overflow-visible">
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <SkeletonBlock className="h-10 w-full" />

            <SkeletonBlock className="h-10 w-full" />

            <div className="flex gap-1 bg-anokha-dark-500 p-1 rounded-lg">
              <SkeletonBlock className="h-8 w-16" />
              <SkeletonBlock className="h-8 w-16" />
            </div>

            <div className="flex gap-1 bg-anokha-dark-500 p-1 rounded-lg">
              <SkeletonBlock className="h-8 w-16" />
              <SkeletonBlock className="h-8 w-16" />
            </div>

            <div className="flex gap-1 bg-anokha-dark-500 p-1 rounded-lg">
              <SkeletonBlock className="h-8 w-20" />
              <SkeletonBlock className="h-8 w-20" />
            </div>

            <SkeletonBlock className="h-10 w-full" />
          </div>

          <div className="flex flex-wrap gap-1">
            <SkeletonBlock className="h-6 w-16" />
            <SkeletonBlock className="h-6 w-16" />
            <SkeletonBlock className="h-6 w-16" />
          </div>
        </div>
      </Card> */}
    </div>
  );
}
