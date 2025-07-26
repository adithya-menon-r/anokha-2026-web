/*
 * Displays a skeleton loader for the ProfileCard component.
 */

import { SkeletonBlock } from '@/components/SkeletonBlock';

export function ProfileCardSkeleton() {
  return (
    <main className="min-h-screen py-4 px-4">
      <div className="max-w-6xl mx-auto bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-8">
        {/* Enhanced Tab Navigation Skeleton */}
        <div className="flex justify-center mb-8">
          <div className="flex bg-card/20 backdrop-blur-sm rounded-lg p-1 border border-border/30 gap-2">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className={`
                  px-2 py-1 md:px-6 md:py-3 rounded-md transition-all duration-300
                  ${
                    i === 0
                      ? 'bg-gradient-to-r from-orange-500/20 to-yellow-500/20 border border-orange-400/50 shadow-lg shadow-orange-500/25'
                      : 'bg-white/5'
                  }
                `}
              >
                <SkeletonBlock className="h-6 w-16 md:w-20" />
              </div>
            ))}
          </div>
        </div>

        {/* Tab Content Skeleton */}
        <div className="min-h-[400px]">
          {/* Profile Tab Content */}
          <div className="w-full flex flex-col items-center">
            <div className="w-full max-w-4xl bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl px-12 py-10">
              <div className="mt-6 w-full flex flex-col md:flex-row md:gap-10 justify-center">
                {/* Form Fields Section */}
                <div className="flex flex-col space-y-6 md:border-r md:border-gray-300/30 md:pr-10 flex-1">
                  {/* Name Field */}
                  <div className="space-y-1">
                    <SkeletonBlock className="h-4 w-16" />
                    <SkeletonBlock className="h-10 w-full rounded-md" />
                  </div>

                  {/* Phone Field */}
                  <div className="space-y-1">
                    <SkeletonBlock className="h-4 w-20" />
                    <SkeletonBlock className="h-10 w-full rounded-md" />
                  </div>

                  {/* College Name Field */}
                  <div className="space-y-1">
                    <SkeletonBlock className="h-4 w-28" />
                    <SkeletonBlock className="h-10 w-full rounded-md" />
                  </div>

                  {/* College City Field */}
                  <div className="space-y-1">
                    <SkeletonBlock className="h-4 w-24" />
                    <SkeletonBlock className="h-10 w-full rounded-md" />
                  </div>

                  {/* Email Field (disabled) */}
                  <div className="space-y-1">
                    <SkeletonBlock className="h-4 w-12" />
                    <SkeletonBlock className="h-10 w-full rounded-md opacity-70" />
                  </div>
                </div>

                {/* Avatar and Update Button Section */}
                <div className="flex flex-col items-center justify-start mt-8 xl:mt-12 md:mt-0 gap-6">
                  {/* Avatar Container */}
                  <div className="bg-white p-4 rounded-xl shadow-md">
                    <SkeletonBlock className="w-[150px] h-[150px] rounded-full" />
                  </div>

                  {/* Update Profile Button */}
                  <SkeletonBlock className="h-10 w-[200px] rounded-md" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
