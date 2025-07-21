import { SkeletonBlock } from '@/components/SkeletonBlock';

export function TransactionTableSkeleton() {
  const rows = Array.from({ length: 5 });

  return (
    <div className="overflow-x-auto mt-4 justify-center">
      <table className="min-w-full bg-white text-black rounded-xl overflow-hidden shadow-sm">
        <thead className="bg-gray-100 text-left text-sm font-semibold uppercase">
          <tr>
            <th className="px-4 py-3">Transaction ID</th>
            <th className="px-4 py-3">Date/Time</th>
            <th className="px-4 py-3">Amount</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Verify</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((_, index) => (
            <tr key={index} className="border-t border-gray-200 text-sm">
              <td className="px-4 py-2">
                <SkeletonBlock className="h-4 w-24 rounded" />
              </td>
              <td className="px-4 py-2">
                <SkeletonBlock className="h-4 w-32 rounded" />
              </td>
              <td className="px-4 py-2">
                <SkeletonBlock className="h-4 w-16 rounded" />
              </td>
              <td className="px-4 py-2">
                <SkeletonBlock className="h-5 w-20 rounded-full" />
              </td>
              <td className="px-4 py-2">
                <SkeletonBlock className="h-8 w-20 rounded-md" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
