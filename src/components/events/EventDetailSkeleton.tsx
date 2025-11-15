/**
 * EventDetailSkeleton Component
 *
 * Complete loading skeleton for the event detail page.
 * Matches the layout of EventDetail component.
 */

import { SkeletonBlock } from '@/components/SkeletonBlock';
import EventDetailHeaderSkeleton from './EventDetailHeaderSkeleton';
import EventDetailInfoSkeleton from './EventDetailInfoSkeleton';

export default function EventDetailSkeleton() {
  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Header Skeleton */}
      <EventDetailHeaderSkeleton />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        {/* Left Column - Description Skeleton */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card border border-border rounded-lg p-6">
            <SkeletonBlock className="h-8 w-48 mb-4 rounded" />

            {/* Paragraph skeletons */}
            <div className="space-y-3">
              <SkeletonBlock className="h-4 w-full rounded" />
              <SkeletonBlock className="h-4 w-full rounded" />
              <SkeletonBlock className="h-4 w-5/6 rounded" />
              <SkeletonBlock className="h-4 w-full rounded" />
              <SkeletonBlock className="h-4 w-4/5 rounded" />
            </div>

            <div className="mt-6 space-y-3">
              <SkeletonBlock className="h-4 w-full rounded" />
              <SkeletonBlock className="h-4 w-full rounded" />
              <SkeletonBlock className="h-4 w-3/4 rounded" />
            </div>
          </div>

          {/* Action Button Skeleton (Mobile) */}
          <div className="lg:hidden">
            <SkeletonBlock className="h-12 w-full rounded-lg" />
          </div>
        </div>

        {/* Right Column - Info and Actions */}
        <div className="lg:col-span-1 space-y-6">
          {/* Info Card Skeleton */}
          <EventDetailInfoSkeleton />

          {/* Action Button Skeleton (Desktop) */}
          <div className="hidden lg:block">
            <SkeletonBlock className="h-12 w-full rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}
