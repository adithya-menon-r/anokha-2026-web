import { SkeletonBlock } from '@/components/SkeletonBlock';

export function ProfileCardSkeleton() {
  return (
    <div className="w-full mx-auto max-w-5xl py-10">
      {/* NAVBAR SKELETON */}
      <div className="mb-10 w-full max-w-md mx-auto justify-center flex">
        <SkeletonBlock className="h-8 md:h-12 w-3/4 md:w-full rounded-lg" />
      </div>

      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-col md:flex-row md:justify-between md:items-start mb-6">
        <div className="mb-4 md:mb-0 space-y-2">
          <SkeletonBlock className="h-9 w-32 rounded" />
          <SkeletonBlock className="h-5 w-48 rounded" />
        </div>

        {/* AVATAR */}
        <div className="relative flex-shrink-0 hidden md:block lg:hidden w-32 h-32">
          <SkeletonBlock className="w-full h-full rounded-full" />
        </div>
      </div>

      <div className="relative">
        {/* Desktop Avatar */}
        <div className="hidden lg:block absolute right-0 -top-24 w-40 h-40 z-10">
          <SkeletonBlock className="w-full h-full rounded-full" />
        </div>

        <div className="w-full">
          {/* Mobile Avatar */}
          <div className="flex justify-center mb-6 md:hidden">
            <div className="relative w-32 h-32">
              <SkeletonBlock className="w-full h-full rounded-full" />
            </div>
          </div>

          {/* FORM FIELDS */}
          <div className="space-y-5 md:mb-2">
            {/* Name Field */}
            <div className="lg:mr-48 space-y-2">
              <SkeletonBlock className="h-5 w-16 rounded" />
              <SkeletonBlock className="h-10 w-full rounded-md" />
            </div>

            {/* Email & Phone Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2 w-full">
                <SkeletonBlock className="h-5 w-16 rounded" />
                <SkeletonBlock className="h-10 w-full rounded-md" />
              </div>
              <div className="space-y-2 w-full">
                <SkeletonBlock className="h-5 w-24 rounded" />
                <SkeletonBlock className="h-10 w-full rounded-md" />
              </div>
            </div>

            {/* College Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2 w-full">
                <SkeletonBlock className="h-5 w-24 rounded" />
                <SkeletonBlock className="h-10 w-full rounded-md" />
              </div>
              <div className="space-y-2 w-full">
                <SkeletonBlock className="h-5 w-24 rounded" />
                <SkeletonBlock className="h-10 w-full rounded-md" />
              </div>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-row gap-3 w-full justify-center items-center my-6">
          <SkeletonBlock className="h-12 w-40 rounded-md" />
        </div>
      </div>
    </div>
  );
}
