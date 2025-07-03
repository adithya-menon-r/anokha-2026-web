import { SkeletonBlock } from '@/components/SkeletonBlock';
import { Card } from '@/components/ui/card';

/**
 * Skeleton component for EventFilters
 * Shows loading state while filter data is being fetched
 */
export function EventFiltersSkeleton() {
  return (
    <div className="w-full space-y-4">
      {/* Row 1: Search bar, sort, and filters button skeleton */}
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <div className="flex-1 w-full">
          <SkeletonBlock className="h-10 w-full" />
        </div>

        <div className="flex gap-2">
          <div className="flex-shrink-0">
            <SkeletonBlock className="h-10 w-[140px]" />
          </div>
          {/* Desktop Show Filters button skeleton */}
          <SkeletonBlock className="h-10 w-[120px] hidden sm:block" />
          {/* Mobile "More Filters" button skeleton */}
          <SkeletonBlock className="h-10 w-[120px] sm:hidden" />
        </div>
      </div>

      {/* Row 2: Filter panel skeleton */}
      <Card className="p-4 bg-gray-50">
        <div className="space-y-4">
          {/* Grid layout for filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Tags dropdown skeleton */}
            <SkeletonBlock className="h-10 w-full" />

            {/* Category toggle group skeleton */}
            <div className="flex gap-1">
              {Array.from({ length: 3 }).map((_, i) => (
                <SkeletonBlock key={i} className="h-9 w-16" />
              ))}
            </div>

            {/* Day toggle group skeleton */}
            <div className="flex gap-1">
              {Array.from({ length: 3 }).map((_, i) => (
                <SkeletonBlock key={i} className="h-9 w-16" />
              ))}
            </div>

            {/* Registration status toggle group skeleton */}
            <div className="flex gap-1">
              {Array.from({ length: 3 }).map((_, i) => (
                <SkeletonBlock key={i} className="h-9 w-20" />
              ))}
            </div>
          </div>

          {/* Clear filters button skeleton */}
          <div className="flex justify-end">
            <SkeletonBlock className="h-8 w-32" />
          </div>
        </div>
      </Card>
    </div>
  );
}
