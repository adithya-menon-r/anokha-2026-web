/*
 * Displays a horizontal scrollable skeleton loader for the registered event list.
 * Used while event data is loading.
 */

//OLD CODE
// import { SkeletonBlock } from '@/components/SkeletonBlock';

// export function RegisteredEventListSkeleton() {
//   const skeletons = Array.from({ length: 4 });

//   return (
//     <div className="overflow-x-auto pr-2 mb-10">
//       <div className="flex flex-nowrap gap-4 pl-4">
//         {skeletons.map((_, index) => (
//           <div
//             key={index}
//             className="w-64 h-80 flex-shrink-0 bg-white rounded-xl border border-gray-200 shadow-sm p-4 space-y-3"
//           >
//             {/* Image Placeholder */}
//             <SkeletonBlock className="h-40 w-full rounded-lg" />

//             {/* Title */}
//             <SkeletonBlock className="h-5 w-3/4 rounded" />

//             {/* Date/Time */}
//             <SkeletonBlock className="h-4 w-1/2 rounded" />

//             {/* Description */}
//             <SkeletonBlock className="h-4 w-full rounded" />
//             <SkeletonBlock className="h-4 w-5/6 rounded" />

//             {/* Price */}
//             <SkeletonBlock className="h-5 w-1/3 rounded" />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

import { SkeletonBlock } from '@/components/SkeletonBlock';

export function RegisteredEventListSkeleton() {
  const placeholderCards = Array.from({ length: 5 });

  const EventCardSkeleton = () => (
    <div className="w-60 flex-shrink-0">
      <div className="bg-card/20 backdrop-blur-sm border border-border/30 rounded-xl overflow-hidden p-4 h-full animate-pulse">
        <SkeletonBlock className="h-32 w-full rounded-lg mb-4 bg-white/10" />

        {/* Title Placeholder */}
        <SkeletonBlock className="h-5 w-4/5 rounded bg-white/10 mb-2" />

        {/* Date/Time Placeholder */}
        <SkeletonBlock className="h-4 w-1/2 rounded bg-white/10 mb-4" />

        {/* Action Button/Detail Placeholder */}
        <div className="flex justify-between items-center mt-3">
          <SkeletonBlock className="h-4 w-1/3 rounded bg-white/10" />
          {/* Simulate 'View Details' Button */}
          <SkeletonBlock className="h-8 w-1/4 rounded-lg bg-orange-400/20 border border-orange-400/30" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full">
      <div className="overflow-x-auto pb-4">
        <div className="flex flex-nowrap gap-6 px-2 py-2">
          {placeholderCards.map((_, index) => (
            <EventCardSkeleton key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
