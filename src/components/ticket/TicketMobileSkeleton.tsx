import React from 'react';
import { SkeletonBlock } from '@/components/SkeletonBlock';

export const TicketMobileSkeleton = () => {
  return (
    <div className="w-full max-w-sm mx-auto p-0 mt-4 filter drop-shadow-xl">
      <div className="bg-white text-black rounded-3xl overflow-hidden flex flex-col relative">
        {/* Header */}
        <div className="py-4 px-6 pb-2 flex justify-center items-center">
          <SkeletonBlock className="h-8 w-48" />
        </div>

        <div className="p-6 flex flex-col gap-6 pb-8">
          {/* Event Name */}
          <div className="flex flex-col items-center gap-2">
            <SkeletonBlock className="h-8 w-full" />
            <SkeletonBlock className="h-8 w-2/3" />
          </div>

          {/* Price */}
          <div className="flex justify-center">
            <div className="border-2 border-gray-200 rounded-lg px-6 py-2 w-32 h-12 flex items-center justify-center">
              <SkeletonBlock className="h-6 w-16" />
            </div>
          </div>

          {/* Schedule */}
          <div className="space-y-2 w-full">
            <SkeletonBlock className="h-4 w-24" />
            <div className="flex flex-col gap-3">
              {[1].map((_, index) => (
                <div
                  key={index}
                  className="w-full border-2 border-gray-200 rounded-xl flex flex-col items-center justify-center text-center overflow-hidden"
                >
                  <div className="p-3 w-full flex flex-col items-center gap-2">
                    <SkeletonBlock className="h-6 w-3/4" />
                    <SkeletonBlock className="h-5 w-1/2" />
                  </div>
                  <div className="w-full border-t-2 border-gray-200 py-2 flex items-center justify-center gap-2 px-2 bg-gray-50">
                    <SkeletonBlock className="h-4 w-24" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Separator */}
        <div className="relative w-full flex items-center justify-center">
          <div className="w-full border-t-2 border-dashed border-gray-300"></div>
        </div>

        {/* QR Section */}
        <div className="p-6 pt-8 flex flex-col items-center gap-6">
          <div className="bg-white p-2 rounded-lg shadow-sm border border-gray-200">
            <SkeletonBlock className="h-40 w-40" />
          </div>

          <SkeletonBlock className="h-3 w-48" />

          <div className="h-9 w-40 rounded-full bg-gray-200 animate-pulse" />
        </div>
      </div>
    </div>
  );
};
