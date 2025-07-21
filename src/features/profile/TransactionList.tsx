import { ErrorBlock } from '@/components/ErrorBlock';
import { TransactionTable } from '@/components/Transaction/TransactionTable';
import { TransactionTableSkeleton } from '@/components/Transaction/TransactionTableSkeleton';
import {
  useInvalidateTransaction,
  useTransaction,
} from '@/hooks/useTransaction';
import { Transaction } from '@/types/transactionTypes';

export default function TransactionList() {
  const { data, isLoading, error } = useTransaction();

  // dummy data to check alignment
  //  const mockTransactions: Transaction[] = [
  //   {
  //     ID: 'TXN001',
  //     dateTime: '2025-07-21 10:30 AM',
  //     amount: 499.0,
  //     statusBadge: 'success',
  //   },
  //   {
  //     ID: 'TXN002',
  //     dateTime: '2025-07-20 08:15 PM',
  //     amount: 999.0,
  //     statusBadge: 'pending',
  //   },
  //   {
  //     ID: 'TXN004',
  //     dateTime: '2025-07-20 08:15 PM',
  //     amount: 999.0,
  //     statusBadge: 'pending',
  //   },
  //   {
  //     ID: 'TXN003',
  //     dateTime: '2025-07-18 06:10 PM',
  //     amount: 299.0,
  //     statusBadge: 'failed',
  //   },
  //   {
  //     ID: 'TXN005',
  //     dateTime: '2025-07-18 06:10 PM',
  //     amount: 299.0,
  //     statusBadge: 'failed',
  //   },
  //       {
  //     ID: 'TXN006',
  //     dateTime: '2025-07-18 06:10 PM',
  //     amount: 299.0,
  //     statusBadge: 'failed',
  //   },
  //       {
  //     ID: 'TXN007',
  //     dateTime: '2025-07-18 06:10 PM',
  //     amount: 299.0,
  //     statusBadge: 'failed',
  //   },

  // ];

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
        <p className="text-gray-500 text-center">No data found.</p>
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
            You haven't made any transactions yet. Once you do, they’ll show up
            here.
          </p>
        </div>
      </div>
    );
  }

  const invalidateTransaction = useInvalidateTransaction();

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
