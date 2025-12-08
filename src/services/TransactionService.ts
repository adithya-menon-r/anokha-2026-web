import { apiGet, apiPost } from '@/lib/api';
import { Transaction } from '@/types/transactionTypes';

export const transactionService = {
  getTransactions: async (): Promise<Transaction[]> => {
    const res = await apiGet<{ message: string; transactions: Transaction[] }>(
      '/user/profile/transactions',
    );
    return res.transactions;
  },

  verifyTransaction: async (txn_id: string): Promise<string> => {
    const verify = { txn_id: txn_id };
    const res = await apiPost<{ message: string }>('events/verify', verify);
    return res.message;
  },
};
