import { SkeletonBlock } from '@/components/SkeletonBlock';

export function ProfileCardSkeleton() {
  return (
    <div className="rounded-xl p-6 shadow bg-white border space-y-4 max-w-md w-full">
      {/* Avatar Placeholder */}
      <div className="flex justify-center">
        <SkeletonBlock className="w-24 h-24 rounded-full" />
      </div>

      {/* Name */}
      <SkeletonBlock className="h-6 w-1/2 mx-auto" />

      {/* Email */}
      <SkeletonBlock className="h-4 w-1/3 mx-auto" />

      {/* Divider */}
      <div className="border-t my-2" />

      {/* Info rows */}
      <div className="space-y-2">
        <SkeletonBlock className="h-4 w-3/4" />
        <SkeletonBlock className="h-4 w-2/3" />
        <SkeletonBlock className="h-4 w-1/2" />
      </div>
    </div>
  );
}
