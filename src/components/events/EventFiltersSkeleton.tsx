import { SkeletonBlock } from '@/components/SkeletonBlock';
import { Card } from '@/components/ui/card';

/**
 * Skeleton component for EventFilters
 * Shows loading state while filter data is being fetched
 */
export function EventFiltersSkeleton() {
  return (
    <div className="w-full space-y-4">
      {/* Always visible search bar skeleton */}
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <div className="flex-1 w-full">
          <SkeletonBlock className="h-10 w-full" />
        </div>

        <div className="flex gap-2">
          <div className="flex-shrink-0">
            <SkeletonBlock className="h-10 w-[140px]" />
          </div>

          {/* Mobile "More Filters" button skeleton */}
          <SkeletonBlock className="h-10 w-[120px] sm:hidden" />
        </div>
      </div>

      {/* Filter panel skeleton */}
      <Card className="p-4 bg-gray-50">
        <div className="space-y-4">
          {/* Category toggle group skeleton */}
          <div>
            <SkeletonBlock className="h-5 w-20 mb-2" />
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <SkeletonBlock key={i} className="h-8 w-16" />
              ))}
            </div>
          </div>

          {/* Day toggle group skeleton */}
          <div>
            <SkeletonBlock className="h-5 w-20 mb-2" />
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <SkeletonBlock key={i} className="h-8 w-16" />
              ))}
            </div>
          </div>

          {/* Registration status toggle group skeleton */}
          <div>
            <SkeletonBlock className="h-5 w-32 mb-2" />
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <SkeletonBlock key={i} className="h-8 w-20" />
              ))}
            </div>
          </div>

          {/* Tags dropdown skeleton */}
          <div>
            <SkeletonBlock className="h-5 w-16 mb-2" />
            <SkeletonBlock className="h-10 w-full" />
          </div>

          {/* Clear filters button skeleton */}
          <div className="flex justify-end pt-2">
            <SkeletonBlock className="h-8 w-32" />
          </div>
        </div>
      </Card>
    </div>
  );
}
