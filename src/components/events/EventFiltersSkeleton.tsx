import { SkeletonBlock } from '@/components/SkeletonBlock';
import { Card } from '@/components/ui/card';

/**
 * Skeleton component for EventFilters
 * Shows loading state while filter data is being fetched
 */
export function EventFiltersSkeleton() {
  return (
    <Card className="w-full p-4 bg-gray-50">
      {/* Top row: Search and Sort skeleton */}
      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        <div className="flex-1">
          <div className="flex gap-2">
            <SkeletonBlock className="h-10 flex-grow" />
            <SkeletonBlock className="h-10 w-20" />
          </div>
        </div>
        <div className="flex-shrink-0 lg:w-48">
          <SkeletonBlock className="h-5 w-20 mb-1" />
          <SkeletonBlock className="h-10 w-full" />
        </div>
      </div>

      {/* Filters row skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {/* Category filter skeleton */}
        <div>
          <SkeletonBlock className="h-5 w-20 mb-2" />
          <div className="flex flex-wrap gap-1">
            {Array.from({ length: 3 }).map((_, i) => (
              <SkeletonBlock key={i} className="h-6 w-16 rounded-full" />
            ))}
          </div>
        </div>

        {/* Date filter skeleton */}
        <div>
          <SkeletonBlock className="h-5 w-16 mb-2" />
          <div className="flex flex-wrap gap-1">
            {Array.from({ length: 2 }).map((_, i) => (
              <SkeletonBlock key={i} className="h-6 w-24 rounded-full" />
            ))}
          </div>
        </div>

        {/* Tags filter skeleton */}
        <div>
          <SkeletonBlock className="h-5 w-16 mb-2" />
          <div className="flex flex-wrap gap-1">
            {Array.from({ length: 4 }).map((_, i) => (
              <SkeletonBlock key={i} className="h-6 w-20 rounded-full" />
            ))}
          </div>
        </div>

        {/* Price range filter skeleton */}
        <div>
          <SkeletonBlock className="h-5 w-24 mb-2" />
          <div className="flex items-center gap-2">
            <SkeletonBlock className="h-8 flex-1" />
            <SkeletonBlock className="h-4 w-6" />
            <SkeletonBlock className="h-8 flex-1" />
            <SkeletonBlock className="h-8 w-12" />
          </div>
        </div>
      </div>

      {/* Reset filters button skeleton */}
      <div className="flex justify-end">
        <SkeletonBlock className="h-8 w-32" />
      </div>
    </Card>
  );
}
