import { SkeletonBlock } from '../SkeletonBlock';

export function TicketSkeleton() {
  return (
    <div className="w-full max-w-5xl mx-auto p-4 filter drop-shadow-xl">
      <div className="flex flex-col md:flex-row">
        {/* Left Section Skeleton */}
        <div className="flex-1 relative bg-white rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none [mask-image:radial-gradient(circle_at_bottom_left,transparent_12px,black_12.5px),radial-gradient(circle_at_bottom_right,transparent_12px,black_12.5px)] [mask-size:51%_100%] [mask-position:left,right] [mask-repeat:no-repeat] md:[mask-image:radial-gradient(circle_at_top_right,transparent_12px,black_12.5px),radial-gradient(circle_at_bottom_right,transparent_12px,black_12.5px)] md:[mask-size:100%_51%] md:[mask-position:top,bottom]">
          {/* Header */}
          <div className="bg-gray-200 p-4 pb-2 md:px-6 flex justify-start items-center h-[60px] md:h-[56px]">
            <SkeletonBlock className="h-6 w-40 bg-gray-300 rounded" />
          </div>

          <div className="flex">
            {/* Barcode Strip Skeleton */}
            <div className="hidden md:flex w-12 items-center justify-center my-3 ml-3 overflow-hidden">
              <SkeletonBlock className="h-40 w-12 bg-gray-200 rounded" />
            </div>

            <div className="flex-1 p-6 md:p-8 pt-4 md:pl-5">
              {/* Event Details */}
              <div className="mb-3">
                <div className="flex justify-between items-start">
                  <div className="w-3/4">
                    <SkeletonBlock className="h-10 w-full bg-gray-200 rounded mb-2" />
                  </div>
                  <div className="text-right">
                    <SkeletonBlock className="h-10 w-20 bg-gray-200 rounded" />
                  </div>
                </div>
              </div>

              {/* Schedules */}
              <div className="space-y-1">
                <SkeletonBlock className="h-4 w-24 bg-gray-200 rounded mb-2" />
                <div className="flex flex-wrap gap-4">
                  <div className="flex-1 min-w-[200px] h-32 border border-gray-200 rounded-xl bg-gray-50 flex flex-col items-center justify-center p-4">
                    <SkeletonBlock className="h-6 w-32 bg-gray-200 rounded mb-2" />
                    <SkeletonBlock className="h-5 w-24 bg-gray-200 rounded" />
                    <div className="mt-auto w-full pt-2 border-t border-gray-200 flex justify-center">
                      <SkeletonBlock className="h-4 w-40 bg-gray-200 rounded" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-[200px] h-32 border border-gray-200 rounded-xl bg-gray-50 flex flex-col items-center justify-center p-4 hidden sm:flex">
                    <SkeletonBlock className="h-6 w-32 bg-gray-200 rounded mb-2" />
                    <SkeletonBlock className="h-5 w-24 bg-gray-200 rounded" />
                    <div className="mt-auto w-full pt-2 border-t border-gray-200 flex justify-center">
                      <SkeletonBlock className="h-4 w-40 bg-gray-200 rounded" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Dashed Line Border */}
          <div className="absolute bottom-0 left-0 right-0 h-[1px] border-b-2 border-dashed border-gray-300 md:hidden"></div>
          <div className="absolute top-0 bottom-0 right-0 w-[1px] border-r-2 border-dashed border-gray-300 hidden md:block"></div>
        </div>

        {/* Right Section */}
        <div className="md:w-64 bg-gray-50 flex flex-col relative rounded-b-3xl md:rounded-r-3xl md:rounded-bl-none [mask-image:radial-gradient(circle_at_top_left,transparent_12px,black_12.5px),radial-gradient(circle_at_top_right,transparent_12px,black_12.5px)] [mask-size:51%_100%] [mask-position:left,right] [mask-repeat:no-repeat] md:[mask-image:radial-gradient(circle_at_top_left,transparent_12px,black_12.5px),radial-gradient(circle_at_bottom_left,transparent_12px,black_12.5px)] md:[mask-size:100%_51%] md:[mask-position:top,bottom]">
          {/* Header */}
          <div className="bg-gray-200 p-4 h-[60px] md:h-[56px] flex items-center justify-center border-l-2 border-dashed border-white/20 md:border-l-0 md:border-t-0">
            <SkeletonBlock className="h-8 w-32 bg-gray-300 rounded-full" />
          </div>

          {/* QR Code */}
          <div className="p-6 pb-3 flex flex-col items-center flex-1 w-full">
            <div className="flex-1 flex flex-col items-center justify-center w-full">
              <div className="bg-white p-2 rounded-lg shadow-sm border border-gray-200 mb-4 w-full max-w-[140px] aspect-square flex items-center justify-center">
                <SkeletonBlock className="w-full h-full bg-gray-200 rounded" />
              </div>

              <div className="text-center space-y-1 w-full flex flex-col items-center">
                <SkeletonBlock className="h-3 w-32 bg-gray-200 rounded" />
              </div>
            </div>

            <div className="pt-4 w-full">
              <div className="border-t border-gray-300 pt-2 flex justify-between items-center">
                <SkeletonBlock className="h-3 w-24 bg-gray-200 rounded" />
                <SkeletonBlock className="h-3 w-5 bg-gray-200 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
