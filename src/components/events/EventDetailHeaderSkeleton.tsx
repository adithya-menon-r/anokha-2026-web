/**
 * EventDetailHeaderSkeleton Component
 *
 * Loading skeleton for the event detail header.
 * Matches the layout of EventDetailHeader.
 */

import { SkeletonBlock } from '@/components/SkeletonBlock';

export default function EventDetailHeaderSkeleton() {
  return (
    <div className="w-full">
      {/* Image Skeleton */}
      <SkeletonBlock className="w-full h-64 md:h-96 mb-6 rounded-lg" />

      {/* Title Skeleton */}
      <SkeletonBlock className="h-10 md:h-12 w-3/4 mb-4 rounded-lg" />

      {/* Meta Info Skeleton */}
      <div className="flex flex-wrap gap-4 mb-4">
        <SkeletonBlock className="h-6 w-32 rounded" />
        <SkeletonBlock className="h-6 w-24 rounded" />
        <SkeletonBlock className="h-6 w-36 rounded" />
      </div>

      {/* Tags Skeleton */}
      <div className="flex flex-wrap gap-2 mb-6">
        <SkeletonBlock className="h-8 w-20 rounded-full" />
        <SkeletonBlock className="h-8 w-24 rounded-full" />
        <SkeletonBlock className="h-8 w-28 rounded-full" />
      </div>

      {/* Type Badges Skeleton */}
      <div className="flex flex-wrap gap-2">
        <SkeletonBlock className="h-8 w-24 rounded-md" />
        <SkeletonBlock className="h-8 w-20 rounded-md" />
      </div>
    </div>
  );
}
