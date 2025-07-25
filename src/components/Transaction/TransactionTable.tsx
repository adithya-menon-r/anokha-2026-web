/*
 * Displays a list of transactions in a responsive table format with verification buttons.
 */

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
    <div className="mt-4">
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <div className="min-w-full bg-white text-black rounded-xl overflow-hidden shadow-sm">
          <table className="min-w-full">
            <thead className="bg-gray-100 text-left text-sm font-semibold uppercase sticky top-0 z-10">
              <tr>
                <th className="py-3 pl-2">Transaction ID</th>
                <th className="py-3 pr-12">Date/Time</th>
                <th className="py-3 px-2">Amount</th>
                <th className="py-3 pr-5">Status</th>
                <th className="py-3 pl-5">Verify</th>
              </tr>
            </thead>
          </table>

          <div className={isScrollable ? 'max-h-72 overflow-y-auto' : ''}>
            <table className="min-w-full">
              <tbody>
                {transactions.map((tx) => (
                  <tr key={tx.ID} className="border-t border-gray-200 text-sm">
                    <td className="py-2 pl-4 pr-2">{tx.ID}</td>
                    <td className="py-2 pl-20">{tx.dateTime}</td>
                    <td className="py-2 pr-6">₹{tx.amount.toFixed(2)}</td>
                    <td className="py-2 pr-6">
                      <span
                        className={`py-1 pr-2 pl-2 ml-2 rounded-full text-xs font-semibold ${
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
                    <td className="py-2 pl-2 pr-4">
                      <button
                        onClick={() =>
                          tx.statusBadge === 'pending' && onVerify?.(tx.ID)
                        }
                        disabled={tx.statusBadge !== 'pending'}
                        className={`text-xs py-1 px-3 rounded-md font-medium transition-colors duration-200 ${
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

      {/* Mobile Cards (Scrollable Row) */}
      {/* Mobile Cards (Horizontal Scrollable Row) */}
      <div className="md:hidden">
        <div className="overflow-x-auto pr-2 mb-10">
          <div className="flex flex-nowrap gap-4 pl-4">
            {transactions.map((tx) => (
              <div
                key={tx.ID}
                className="bg-white text-black rounded-xl shadow-sm p-4 border border-gray-200 w-64 flex-shrink-0"
              >
                <div className="text-sm mb-2">
                  <strong>Transaction ID:</strong> {tx.ID}
                </div>
                <div className="text-sm mb-2">
                  <strong>Date/Time:</strong> {tx.dateTime}
                </div>
                <div className="text-sm mb-2">
                  <strong>Amount:</strong> ₹{tx.amount.toFixed(2)}
                </div>
                <div className="text-sm mb-2">
                  <strong>Status:</strong>{' '}
                  <span
                    className={`py-1 px-2 rounded-full text-xs font-semibold ${
                      tx.statusBadge === 'success'
                        ? 'bg-green-100 text-green-700'
                        : tx.statusBadge === 'failed'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {tx.statusBadge}
                  </span>
                </div>
                <div className="text-sm">
                  <button
                    onClick={() =>
                      tx.statusBadge === 'pending' && onVerify?.(tx.ID)
                    }
                    disabled={tx.statusBadge !== 'pending'}
                    className={`text-xs py-1 px-3 rounded-md font-medium transition-colors duration-200 ${
                      tx.statusBadge === 'pending'
                        ? 'bg-green-600 text-white hover:bg-green-700 cursor-pointer'
                        : 'bg-green-300 text-white cursor-not-allowed'
                    }`}
                  >
                    Verify
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
