import { TransactionTableProps } from '@/types/transactionTypes';

function formatDateTime(dateString: string) {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  const day = date.getDate().toString().padStart(2, '0');
  const month = date.toLocaleString('en-US', { month: 'short' });
  const year = date.getFullYear();
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  const time = `${hours.toString().padStart(2, '0')}:${minutes} ${ampm}`;
  return `${day} ${month} ${year}, ${time}`;
}

export function TransactionTable({
  transactions,
  onVerify,
}: TransactionTableProps) {
  const maxVisibleRows = 7;
  const isScrollable = transactions.length > maxVisibleRows;

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

  return (
    <div className="w-full">
      {/* Desktop Table */}
      <div className="hidden md:block">
        <div className="bg-card/20 backdrop-blur-sm rounded-xl border border-border/30">
          <table className="min-w-full">
            <thead className="bg-gradient-to-r from-orange-500/10 to-yellow-500/10 backdrop-blur-sm border-b border-orange-400/30">
              <tr>
                <th className="py-4 md:max-lg:px-1 text-center text-sm font-semibold text-orange-200 uppercase tracking-wider">
                  Transaction ID
                </th>
                <th className="py-4 px-5 lg:px-6 text-center text-sm font-semibold text-orange-200 uppercase tracking-wider md:max-lg:px-7">
                  Date/Time
                </th>
                <th className="py-4 px-5 md:max-lg:px-5 lg:px-8  text-center text-sm font-semibold text-orange-200 uppercase tracking-wider">
                  Amount
                </th>
                <th className="py-4 px-4 lg:px-4 text-center text-sm font-semibold text-orange-200 uppercase tracking-wider">
                  Status
                </th>
                <th className="py-4 px-4 lg:px-6 text-center text-sm font-semibold text-orange-200 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
          </table>

          <div className={isScrollable ? 'max-h-96 overflow-y-auto' : ''}>
            <table className="min-w-full">
              <tbody className="backdrop-blur-sm text-center">
                {transactions.map((tx, index) => (
                  <tr
                    key={tx.txn_id}
                    className={`border-t border-border/20 text-sm hover:bg-white/5 transition-colors duration-200 ${
                      index % 2 === 0 ? 'bg-white/2' : 'bg-transparent'
                    }`}
                  >
                    <td className="py-4 px-2 md:max-lg:px-4 text-foreground font-mono">
                      {tx.txn_id}
                    </td>
                    <td className="py-4  md:max-lg:px-5 text-foreground">
                      {formatDateTime(tx.created_at)}
                    </td>
                    <td className="py-4 px-8 md:max-lg:px-5 text-foreground font-semibold">
                      ₹{tx.registration_fee?.toFixed(2) ?? '0.00'}
                    </td>
                    <td className="py-4 px-4 md:max-lg:px-6">
                      <span
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold backdrop-blur-sm ${
                          tx.txn_status === 'SUCCESS'
                            ? 'bg-green-500/20 border border-green-500/50 text-green-400'
                            : tx.txn_status === 'FAILED'
                              ? 'bg-red-500/20 border border-red-500/50 text-red-400'
                              : 'bg-yellow-500/20 border border-yellow-500/50 text-yellow-400'
                        }`}
                      >
                        {tx.txn_status}
                      </span>
                    </td>
                    <td className="py-4 px-4 md:max-lg:px-3">
                      <button
                        onClick={() =>
                          tx.txn_status === 'PENDING' && onVerify?.(tx.txn_id)
                        }
                        disabled={tx.txn_status !== 'PENDING'}
                        className={`text-xs py-2 px-4 lg:mr-1 rounded-lg font-medium transition-all duration-300 backdrop-blur-sm ${
                          tx.txn_status === 'PENDING'
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
      <div className="md:hidden pb-4">
        <div className="space-y-4">
          {transactions.map((tx) => (
            <div
              key={tx.txn_id}
              className="bg-card/20 backdrop-blur-sm border border-border/30 rounded-xl p-4"
            >
              <div className="grid grid-cols-3 gap-2 text-sm">
                <div className="col-span-2">
                  <span className="text-orange-200 font-medium">
                    Transaction ID:
                  </span>
                  <p className="text-foreground font-mono mt-1 break-all">
                    {tx.txn_id}
                  </p>
                </div>
                <div className="col-span-1">
                  <span className="text-orange-200 font-medium">Amount:</span>
                  <p className="text-foreground font-semibold mt-1">
                    ₹{tx.registration_fee?.toFixed(2) ?? '0.00'}
                  </p>
                </div>
                <div className="col-span-2">
                  <span className="text-orange-200 font-medium">
                    Date/Time:
                  </span>
                  <p className="text-foreground mt-1">
                    {formatDateTime(tx.created_at)}
                  </p>
                </div>
                <div>
                  <span className="text-orange-200 font-medium">Status:</span>
                  <div className="mt-2">
                    <span
                      className={`px-1.5 py-1 rounded-lg text-xs font-semibold backdrop-blur-sm ${
                        tx.txn_status === 'SUCCESS'
                          ? 'bg-green-500/20 border border-green-500/50 text-green-400'
                          : tx.txn_status === 'FAILED'
                            ? 'bg-red-500/20 border border-red-500/50 text-red-400'
                            : 'bg-yellow-500/20 border border-yellow-500/50 text-yellow-400'
                      }`}
                    >
                      {tx.txn_status}
                    </span>
                  </div>
                </div>
                <div className="col-span-3 flex justify-center mt-2">
                  <button
                    onClick={() =>
                      tx.txn_status === 'PENDING' && onVerify?.(tx.txn_id)
                    }
                    disabled={tx.txn_status !== 'PENDING'}
                    className={`flex items-center justify-center text-sm py-2 px-5 rounded-lg font-medium transition-all duration-300 backdrop-blur-sm max-w-[180px] w-auto mx-auto ${
                      tx.txn_status === 'PENDING'
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
