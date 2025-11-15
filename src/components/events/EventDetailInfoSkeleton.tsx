/**
 * EventDetailInfoSkeleton Component
 *
 * Loading skeleton for the event info card.
 * Matches the layout of EventDetailInfo.
 */

import { SkeletonBlock } from '@/components/SkeletonBlock';

export default function EventDetailInfoSkeleton() {
  return (
    <div className="w-full bg-card border border-border rounded-lg p-6 space-y-4">
      <SkeletonBlock className="h-7 w-48 mb-4 rounded" />

      {/* Info rows */}
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="flex items-center justify-between py-3 border-b border-border"
        >
          <SkeletonBlock className="h-5 w-24 rounded" />
          <SkeletonBlock className="h-6 w-20 rounded" />
        </div>
      ))}

      {/* Progress bar */}
      <div className="py-3">
        <div className="flex items-center justify-between mb-2">
          <SkeletonBlock className="h-5 w-32 rounded" />
          <SkeletonBlock className="h-5 w-16 rounded" />
        </div>
        <SkeletonBlock className="h-2 w-full rounded-full" />
      </div>
    </div>
  );
}
