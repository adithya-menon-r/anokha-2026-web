import { Transaction } from '@/types/transactionTypes';

interface TransactionTableProps {
  transactions: Transaction[];
  onVerify?: (id: string) => void;
}

export function TransactionTable({
  transactions,
  onVerify,
}: TransactionTableProps) {
  const maxVisibleRows = 7;
  const isScrollable = transactions.length > maxVisibleRows;

  return (
    <div className="overflow-x-auto mt-4 justify-center">
      <div className="min-w-full bg-white text-black rounded-xl overflow-hidden shadow-sm">
        <table className="min-w-full">
          <thead className="bg-gray-100 text-left text-sm font-semibold uppercase sticky top-0 z-10">
            <tr>
              <th className="px-4 py-3">Transaction ID</th>
              <th className="px-4 py-3">Date/Time</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Verify</th>
            </tr>
          </thead>
        </table>

        <div
          className={`${isScrollable ? 'max-h-[300px] overflow-y-auto' : ''}`}
        >
          <table className="min-w-full">
            <tbody>
              {transactions.map((tx) => (
                <tr key={tx.ID} className="border-t border-gray-200 text-sm">
                  <td className="px-4 py-2">{tx.ID}</td>
                  <td className="px-4 py-2">{tx.dateTime}</td>
                  <td className="px-4 py-2">₹{tx.amount.toFixed(2)}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        tx.statusBadge === 'success'
                          ? 'bg-green-100 text-green-700'
                          : tx.statusBadge === 'failed'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {tx.statusBadge}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() =>
                        tx.statusBadge === 'pending' && onVerify?.(tx.ID)
                      }
                      disabled={tx.statusBadge !== 'pending'}
                      className={`text-xs px-3 py-1 rounded-md font-medium transition-colors duration-200 ${
                        tx.statusBadge === 'pending'
                          ? 'bg-green-600 text-white hover:bg-green-700 cursor-pointer'
                          : 'bg-green-300 text-white cursor-not-allowed'
                      }`}
                    >
                      Verify
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
