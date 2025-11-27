export interface Transaction {
  ID: string;
  dateTime: string;
  amount: number;
  statusBadge: transactionStatus;
}

export interface TransactionTableProps {
  transactions: Transaction[];
  onVerify?: (id: string) => void;
}

export type transactionStatus = 'success' | 'failed' | 'pending';
