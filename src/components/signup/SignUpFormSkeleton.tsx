'use client';

import { SkeletonBlock } from '@/components/SkeletonBlock';

export function SignUpFormDesktopSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="col-span-2 space-y-2">
          <SkeletonBlock className="h-4 w-24" />
          <SkeletonBlock className="h-10 w-full rounded-md" />
        </div>

        <div className="space-y-2">
          <SkeletonBlock className="h-4 w-20" />
          <SkeletonBlock className="h-10 w-full rounded-md" />
        </div>

        <div className="space-y-2">
          <SkeletonBlock className="h-4 w-20" />
          <SkeletonBlock className="h-10 w-full rounded-md" />
        </div>

        <div className="col-span-2">
          <div className="flex items-center gap-2">
            <SkeletonBlock className="h-5 w-5 rounded-sm" />
            <SkeletonBlock className="h-4 w-52" />
          </div>
        </div>
        <div className="space-y-2">
          <SkeletonBlock className="h-4 w-32" />
          <SkeletonBlock className="h-10 w-full rounded-md" />
        </div>

        <div className="space-y-2">
          <SkeletonBlock className="h-4 w-32" />
          <SkeletonBlock className="h-10 w-full rounded-md" />
        </div>

        <div className="space-y-2">
          <SkeletonBlock className="h-4 w-24" />
          <SkeletonBlock className="h-10 w-full rounded-md" />
        </div>

        <div className="space-y-2">
          <SkeletonBlock className="h-4 w-32" />
          <SkeletonBlock className="h-10 w-full rounded-md" />
        </div>
      </div>

      <div className="mt-6 flex justify-center">
        <SkeletonBlock className="h-10 w-full max-w-xl rounded-md" />
      </div>
    </div>
  );
}

export function SignUpFormMobileSkeleton() {
  return (
    <div className="space-y-4">
      <div className="space-y-2 pb-2">
        <SkeletonBlock className="h-4 w-full" />
      </div>

      <div className="space-y-2">
        <SkeletonBlock className="h-4 w-24" />
        <SkeletonBlock className="h-10 w-full" />
      </div>

      <div className="space-y-2">
        <SkeletonBlock className="h-4 w-24" />
        <SkeletonBlock className="h-10 w-full" />
      </div>
      <div className="space-y-2">
        <SkeletonBlock className="h-4 w-24" />
        <SkeletonBlock className="h-10 w-full" />
      </div>

      <div className="flex justify-between gap-x-4 pt-2">
        <SkeletonBlock className="h-10 flex-1" />
        <SkeletonBlock className="h-10 flex-1" />
      </div>
    </div>
  );
}
