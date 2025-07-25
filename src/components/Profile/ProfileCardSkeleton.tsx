/*
 * Displays a skeleton loader for the ProfileCard component.
 */

import { SkeletonBlock } from '@/components/SkeletonBlock';

export function ProfileCardSkeleton() {
  return (
    <div className="w-full flex flex-col items-center">
      <h1 className="text-3xl font-bold text-black mb-4">Profile</h1>
      <p className="text-sm text-gray-600">Loading Profile...</p>
      <div className="w-full max-w-4xl bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl px-12 py-10">
        <div className="mt-6 w-full flex flex-col md:flex-row md:gap-10 justify-center">
          <div className="flex flex-col space-y-6 md:border-r md:border-gray-300/30 md:pr-10 flex-1">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-1">
                <SkeletonBlock className="h-4 w-1/4" />
                <SkeletonBlock className="h-10 w-full rounded-md" />{' '}
              </div>
            ))}
            <div className="space-y-1">
              <SkeletonBlock className="h-4 w-1/4" />
              <SkeletonBlock className="h-10 w-full rounded-md opacity-70" />{' '}
            </div>
          </div>

          <div className="flex flex-col items-center justify-start mt-8 xl:mt-12 md:mt-0 gap-6">
            <div className="bg-white p-4 rounded-xl shadow-md">
              <SkeletonBlock className="w-[150px] h-[150px]" />
            </div>
            <SkeletonBlock className="h-10 w-[200px] rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
}
