export interface Transaction {
  id: string;
  txn_id: string;
  event_name: string;
  registration_fee: number | 0;
  txn_status: transactionStatus;
  created_at: string;
}

export interface TransactionTableProps {
  transactions: Transaction[];
  onVerify?: (id: string) => Promise<void> | void;
}

export type transactionStatus = 'SUCCESS' | 'FAILED' | 'PENDING';
