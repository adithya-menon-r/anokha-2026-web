/*
 * Displays a horizontal scrollable skeleton loader for the registered event list.
 * Used while event data is loading.
 */

import { SkeletonBlock } from '@/components/SkeletonBlock';

export function RegisteredEventListSkeleton() {
  const skeletons = Array.from({ length: 4 });

  return (
    <div className="overflow-x-auto pr-2 mb-10">
      <div className="flex flex-nowrap gap-4 pl-4">
        {skeletons.map((_, index) => (
          <div
            key={index}
            className="w-64 h-80 flex-shrink-0 bg-white rounded-xl border border-gray-200 shadow-sm p-4 space-y-3"
          >
            {/* Image Placeholder */}
            <SkeletonBlock className="h-40 w-full rounded-lg" />

            {/* Title */}
            <SkeletonBlock className="h-5 w-3/4 rounded" />

            {/* Date/Time */}
            <SkeletonBlock className="h-4 w-1/2 rounded" />

            {/* Description */}
            <SkeletonBlock className="h-4 w-full rounded" />
            <SkeletonBlock className="h-4 w-5/6 rounded" />

            {/* Price */}
            <SkeletonBlock className="h-5 w-1/3 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
