import { ErrorBlock } from '@/components/ErrorBlock';
import { TransactionTable } from '@/components/Transaction/TransactionTable';
import { TransactionTableSkeleton } from '@/components/Transaction/TransactionTableSkeleton';
import {
  useInvalidateTransaction,
  useTransaction,
} from '@/hooks/useTransaction';

export default function TransactionList() {
  // TODO : TANSTACK HOOK CALL
  const { data, isLoading, error } = useTransaction();
  const invalidateTransaction = useInvalidateTransaction();

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

  if (!data) {
    return (
      <div className="w-full flex justify-center items-center py-10">
        <p className="text-gray-500 text-center">No Transactions found.</p>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="w-full flex justify-center items-center py-16">
        <div className="bg-white/5 border border-white/10 rounded-xl p-8 flex flex-col items-center text-center max-w-md shadow-md">
          <svg
            className="w-12 h-12 text-gray-400 mb-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
          <h3 className="text-lg font-semibold text-white">
            No Transactions Yet
          </h3>
          <p className="text-sm text-gray-400 mt-2">
            You haven't made any transactions yet. Once you do, they'll show up
            here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <TransactionTable
      transactions={data}
      onVerify={(id) => {
        console.log(`Placeholder for verify function: ${id}`);
        invalidateTransaction();
      }}
    />
  );
}
