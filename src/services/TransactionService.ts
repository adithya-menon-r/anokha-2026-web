import { apiGet, apiPost } from '@/lib/api';
import { API_ROUTES } from '@/lib/routes';
import { Transaction } from '@/types/transactionTypes';

export const transactionService = {
  getTransactions: async (): Promise<Transaction[]> => {
    const res = await apiGet<{ message: string; transactions: Transaction[] }>(
      API_ROUTES.TRANSACTIONS.GET,
    );
    return res.transactions;
  },

  verifyTransaction: async (txn_id: string): Promise<string> => {
    const payload = { txn_id: txn_id };
    const res = await apiPost<{ message: string }>(
      API_ROUTES.TRANSACTIONS.VERIFY,
      payload,
    );
    return res.message;
  },
};
