import { SkeletonBlock } from '@/components/SkeletonBlock';

export function EventCardSkeleton() {
  return (
    <div className="rounded-2xl p-4 shadow-md bg-white border space-y-2">
      <SkeletonBlock className="w-full h-48 rounded-xl" />
      <SkeletonBlock className="h-6 w-3/4" />
      <SkeletonBlock className="h-4 w-1/2" />
      <SkeletonBlock className="h-4 w-full" />
      <SkeletonBlock className="h-5 w-1/4" />
    </div>
  );
}
