import { Transaction } from '@/types/transactionTypes';

interface TransactionTableProps {
  transactions: Transaction[];
  onVerify?: (id: string) => void;
}

export function TransactionTable({
  transactions,
  onVerify,
}: TransactionTableProps) {
  if (!transactions || transactions.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-muted-foreground">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-orange-500/20 to-yellow-500/20 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-orange-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            No Transactions Found
          </h3>
          <p>You haven't made any transactions yet.</p>
        </div>
      </div>
    );
  }

  const maxVisibleRows = 7;
  const isScrollable = transactions.length > maxVisibleRows;

  return (
    <div className="w-full">
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <div className="bg-card/20 backdrop-blur-sm rounded-xl overflow-hidden border border-border/30">
          <table className="min-w-full">
            <thead className="bg-gradient-to-r from-orange-500/10 to-yellow-500/10 backdrop-blur-sm border-b border-orange-400/30">
              <tr>
                <th className="py-4 px-6 text-left text-sm font-semibold text-orange-200 uppercase tracking-wider">
                  Transaction ID
                </th>
                <th className="py-4 px-6 text-left text-sm font-semibold text-orange-200 uppercase tracking-wider">
                  Date/Time
                </th>
                <th className="py-4 px-6 text-left text-sm font-semibold text-orange-200 uppercase tracking-wider">
                  Amount
                </th>
                <th className="py-4 px-6 text-left text-sm font-semibold text-orange-200 uppercase tracking-wider">
                  Status
                </th>
                <th className="py-4 px-6 text-left text-sm font-semibold text-orange-200 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
          </table>

          <div className={isScrollable ? 'max-h-96 overflow-y-auto' : ''}>
            <table className="min-w-full">
              <tbody className="backdrop-blur-sm">
                {transactions.map((tx, index) => (
                  <tr
                    key={tx.ID}
                    className={`border-t border-border/20 text-sm hover:bg-white/5 transition-colors duration-200 ${
                      index % 2 === 0 ? 'bg-white/2' : 'bg-transparent'
                    }`}
                  >
                    <td className="py-4 px-6 text-foreground font-mono">
                      {tx.ID}
                    </td>
                    <td className="py-4 px-6 text-foreground">{tx.dateTime}</td>
                    <td className="py-4 px-6 text-foreground font-semibold">
                      ₹{tx.amount.toFixed(2)}
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-sm ${
                          tx.statusBadge === 'success'
                            ? 'bg-green-500/20 border border-green-500/50 text-green-400'
                            : tx.statusBadge === 'failed'
                              ? 'bg-red-500/20 border border-red-500/50 text-red-400'
                              : 'bg-yellow-500/20 border border-yellow-500/50 text-yellow-400'
                        }`}
                      >
                        {tx.statusBadge}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <button
                        onClick={() =>
                          tx.statusBadge === 'pending' && onVerify?.(tx.ID)
                        }
                        disabled={tx.statusBadge !== 'pending'}
                        className={`text-xs py-2 px-4 rounded-lg font-medium transition-all duration-300 backdrop-blur-sm ${
                          tx.statusBadge === 'pending'
                            ? 'bg-green-500/20 border border-green-500/50 text-green-400 hover:bg-green-500/30 hover:scale-105 cursor-pointer'
                            : 'bg-muted/20 border border-muted-foreground/30 text-muted-foreground cursor-not-allowed'
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

      {/* Mobile Cards */}
      <div className="md:hidden">
        <div className="space-y-4">
          {transactions.map((tx) => (
            <div
              key={tx.ID}
              className="bg-card/20 backdrop-blur-sm border border-border/30 rounded-xl p-4"
            >
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-orange-200 font-medium">
                    Transaction ID:
                  </span>
                  <p className="text-foreground font-mono mt-1 break-all">
                    {tx.ID}
                  </p>
                </div>
                <div>
                  <span className="text-orange-200 font-medium">Amount:</span>
                  <p className="text-foreground font-semibold mt-1">
                    ₹{tx.amount.toFixed(2)}
                  </p>
                </div>
                <div className="col-span-2">
                  <span className="text-orange-200 font-medium">
                    Date/Time:
                  </span>
                  <p className="text-foreground mt-1">{tx.dateTime}</p>
                </div>
                <div>
                  <span className="text-orange-200 font-medium">Status:</span>
                  <div className="mt-2">
                    <span
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-sm ${
                        tx.statusBadge === 'success'
                          ? 'bg-green-500/20 border border-green-500/50 text-green-400'
                          : tx.statusBadge === 'failed'
                            ? 'bg-red-500/20 border border-red-500/50 text-red-400'
                            : 'bg-yellow-500/20 border border-yellow-500/50 text-yellow-400'
                      }`}
                    >
                      {tx.statusBadge}
                    </span>
                  </div>
                </div>
                <div className="flex items-end">
                  <button
                    onClick={() =>
                      tx.statusBadge === 'pending' && onVerify?.(tx.ID)
                    }
                    disabled={tx.statusBadge !== 'pending'}
                    className={`text-sm py-2 px-4 rounded-lg font-medium transition-all duration-300 backdrop-blur-sm w-full ${
                      tx.statusBadge === 'pending'
                        ? 'bg-green-500/20 border border-green-500/50 text-green-400 hover:bg-green-500/30 hover:scale-105 cursor-pointer'
                        : 'bg-muted/20 border border-muted-foreground/30 text-muted-foreground cursor-not-allowed'
                    }`}
                  >
                    Verify
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
