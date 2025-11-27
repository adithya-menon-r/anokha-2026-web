/*
 * Displays a skeleton loader for the TransactionTable component.
 * Shows placeholder rows while transaction data is loading.
 * Matches the glassmorphism design with responsive desktop/mobile views.
 */

import { SkeletonBlock } from '@/components/SkeletonBlock';

export function TransactionTableSkeleton() {
  const rows = Array.from({ length: 5 });

  return (
    <div className="w-full">
      {/* Desktop Table Skeleton */}
      <div className="hidden md:block overflow-x-auto">
        <div className="bg-card/20 backdrop-blur-sm rounded-xl overflow-hidden border border-border/30">
          <table className="min-w-full">
            <thead className="bg-gradient-to-r from-orange-500/10 to-yellow-500/10 backdrop-blur-sm border-b border-orange-400/30">
              <tr>
                <th className="py-4 md:max-lg:px-1 text-center text-sm font-semibold text-orange-200 uppercase tracking-wider">
                  Transaction ID
                </th>
                <th className="py-4 px-8 text-center text-sm font-semibold text-orange-200 uppercase tracking-wider md:max-lg:px-4">
                  Date/Time
                </th>
                <th className="py-4 px-8 text-center text-sm font-semibold text-orange-200 uppercase tracking-wider">
                  Amount
                </th>
                <th className="py-4 px-4 text-center text-sm font-semibold text-orange-200 uppercase tracking-wider">
                  Status
                </th>
                <th className="py-4 px-6 text-center text-sm font-semibold text-orange-200 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
          </table>

          <div>
            <table className="min-w-full">
              <tbody className="backdrop-blur-sm text-center">
                {rows.map((_, index) => (
                  <tr
                    key={index}
                    className={`border-t border-border/20 text-sm ${
                      index % 2 === 0 ? 'bg-white/2' : 'bg-transparent'
                    }`}
                  >
                    <td className="py-4 px-2 md:max-lg:px-4">
                      <div className="flex justify-center">
                        <SkeletonBlock className="h-5 w-32 rounded" />
                      </div>
                    </td>
                    <td className="py-4 px-2 md:max-lg:px-5">
                      <div className="flex justify-center">
                        <SkeletonBlock className="h-5 w-36 rounded" />
                      </div>
                    </td>
                    <td className="py-4 px-8 md:max-lg:px-7">
                      <div className="flex justify-center">
                        <SkeletonBlock className="h-5 w-20 rounded" />
                      </div>
                    </td>
                    <td className="py-4 px-4 md:max-lg:px-6">
                      <div className="flex justify-center">
                        <SkeletonBlock className="h-6 w-20 rounded-lg" />
                      </div>
                    </td>
                    <td className="py-4 px-4 md:max-lg:px-3">
                      <div className="flex justify-center">
                        <SkeletonBlock className="h-9 w-20 rounded-lg" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Mobile Cards Skeleton */}
      <div className="md:hidden">
        <div className="max-h-[60vh] overflow-y-auto space-y-4 pr-1">
          {rows.map((_, index) => (
            <div
              key={index}
              className="bg-card/20 backdrop-blur-sm border border-border/30 rounded-xl p-4"
            >
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-orange-200 font-medium">
                    Transaction ID:
                  </span>
                  <div className="mt-1">
                    <SkeletonBlock className="h-4 w-full rounded" />
                  </div>
                </div>
                <div>
                  <span className="text-orange-200 font-medium">Amount:</span>
                  <div className="mt-1">
                    <SkeletonBlock className="h-4 w-20 rounded" />
                  </div>
                </div>
                <div className="col-span-2">
                  <span className="text-orange-200 font-medium">
                    Date/Time:
                  </span>
                  <div className="mt-1">
                    <SkeletonBlock className="h-4 w-32 rounded" />
                  </div>
                </div>
                <div>
                  <span className="text-orange-200 font-medium">Status:</span>
                  <div className="mt-2">
                    <SkeletonBlock className="h-7 w-20 rounded-full" />
                  </div>
                </div>
                <div className="flex items-end">
                  <SkeletonBlock className="h-9 w-full rounded-lg" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
