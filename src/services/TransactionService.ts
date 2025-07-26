import { apiGet } from '@/lib/api';
import { Transaction } from '@/types/transactionTypes';

export const transactionService = {
  getTransactions: (): Promise<Transaction[]> => apiGet('/getTransactions'),
};
