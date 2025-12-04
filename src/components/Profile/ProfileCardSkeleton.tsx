/*
 * Displays a skeleton loader for the ProfileCard component.
 * Shows placeholder elements while profile data is loading.
 * Matches the responsive layout with avatar, form fields, QR code, and buttons.
 */

import { SkeletonBlock } from '@/components/SkeletonBlock';

export function ProfileCardSkeleton() {
  const formFieldsCount = 4; // name, phone, collegeName, collegeCity
  const fields = Array.from({ length: formFieldsCount });

  const QRSkeleton = ({ className = '' }: { className?: string }) => {
    return (
      <div className={`p-4 rounded-lg shadow-lg mt-4 lg:mt-0 ${className}`}>
        <div className="flex justify-center">
          <SkeletonBlock className="w-[200px] h-[200px] rounded" />
        </div>
        <SkeletonBlock className="h-8 w-full mt-8 rounded" />
      </div>
    );
  };

  return (
    <div className="w-full mx-auto max-w-6xl py-20">
      <div className="bg-card/30 rounded-2xl shadow-lg p-6 md:p-10">
        {/* NAVBAR SKELETON */}
        <div className="mb-10 w-full max-w-md mx-auto justify-center flex">
          <SkeletonBlock className="h-8 md:h-12 w-3/4 md:w-full rounded-lg" />
        </div>

        {/* HEADER SECTION */}
        <div className="flex flex-col sm:flex-col md:flex-row md:justify-between md:items-start mb-6">
          <div className="mb-4 md:mb-0">
            <SkeletonBlock className="h-9 w-32 mb-2 rounded" />
            <SkeletonBlock className="h-4 w-48 rounded" />
          </div>
          {/* AVATAR SKELETON FOR MD */}
          <div className="relative flex-shrink-0 hidden md:block lg:hidden">
            <SkeletonBlock className="w-32 h-32 rounded-full" />
          </div>
        </div>

        <div>
          <div className="flex flex-col lg:flex-row lg:gap-12 lg:items-start">
            <div className="w-full lg:flex-1">
              {/* AVATAR SKELETON FOR MOBILE */}
              <div className="flex justify-center mb-6 md:hidden">
                <SkeletonBlock className="w-32 h-32 rounded-full" />
              </div>

              {/* FORM FIELDS SKELETON */}
              <div className="space-y-5 md:mb-2">
                {fields.map((_, index) => (
                  <div key={index} className="space-y-2">
                    <SkeletonBlock className="h-4 w-24 rounded" />
                    <SkeletonBlock className="h-10 w-full rounded-md" />
                  </div>
                ))}
                {/* EMAIL FIELD SKELETON */}
                <div className="space-y-2">
                  <SkeletonBlock className="h-4 w-16 rounded" />
                  <SkeletonBlock className="h-10 w-full rounded-md" />
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center justify-start gap-8 lg:-mt-24 lg:ml-26 lg:min-w-[360px]">
              {/* AVATAR SKELETON FOR LG */}
              <div className="relative hidden lg:block">
                <SkeletonBlock className="w-40 h-40 rounded-full" />
              </div>

              {/* QR CODE SKELETON */}
              <QRSkeleton className="hidden md:block" />
            </div>
          </div>
          {/* BUTTON SKELETON */}
          <div className="flex justify-center mt-10">
            <SkeletonBlock className="h-12 w-64 rounded-md" />
          </div>

          <div className="block md:hidden h-px bg-gray-400 w-60 mx-auto mb-8 mt-10" />
          <QRSkeleton className="block md:hidden" />
        </div>
      </div>
    </div>
  );
}
