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

// Transaction Verification Types
export interface TransactionVerificationPayload {
  txn_id: string | string[];
}

export interface TransactionVerificationResponse {
  status: 'success' | 'failed' | 'pending' | 'SUCCESS' | 'FAILED' | 'PENDING';
  message?: string;
  transactionId?: string;
}
