export interface Transaction {
  ID: string;
  dateTime: string;
  amount: number;
  statusBadge: transactionStatus;
}

export type transactionStatus = 'success' | 'failed' | 'pending';
