/*
  TransactionList - displays the Transaction details of the user.
  Information - transaction ID, time, transaction amount, Transaction status, verify transaction(action).
  User can able to verify any pending transaction using the Verify Action Button.
*/

import { ErrorBlock } from '@/components/ErrorBlock';
import { TransactionTable } from '@/components/Transaction/TransactionTable';
import { TransactionTableSkeleton } from '@/components/Transaction/TransactionTableSkeleton';
import { useTransaction, useVerifyTransaction } from '@/hooks/useTransaction';

export default function TransactionList() {
  // TANSTACK HOOK CALL
  const { data, isLoading, error } = useTransaction();
  const verifyTransaction = useVerifyTransaction();

  if (isLoading) {
    return <TransactionTableSkeleton />;
  }

  if (error) {
    return (
      <ErrorBlock
        title="Unable to load Transactions"
        message="Please try again later"
      />
    );
  }

  if (!data || data.length === 0) {
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
            No Transactions
          </h3>
          <p>You haven't made any transactions yet.</p>
        </div>
      </div>
    );
  }

  return (
    <TransactionTable
      transactions={data}
      onVerify={async (txn_id) => {
        await verifyTransaction.mutateAsync(txn_id);
      }}
    />
  );
}
