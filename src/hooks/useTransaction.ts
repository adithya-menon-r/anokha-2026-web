import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
// import { getMockTransactions } from '@/mocks/mockProfile';
import { transactionService } from '@/services/TransactionService';
import { useAuthStore } from '@/stores/auth.store';
import type {
  Transaction,
  TransactionVerificationResponse,
} from '@/types/transactionTypes';

export function useTransaction() {
  const email = useAuthStore((state) => state.user)?.email;
  return useQuery<Transaction[], Error>({
    queryKey: ['Transactions', email],
    queryFn: transactionService.getTransactions,
    // queryFn: getMockTransactions,
    staleTime: 1000 * 60 * 10,
    retry: 1,
  });
}

export function useVerifyTransaction() {
  const email = useAuthStore((state) => state.user)?.email;
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (txn_id: string) =>
      transactionService.verifyTransaction(txn_id),
    onSuccess: (data?: TransactionVerificationResponse) => {
      const status = data?.status && String(data.status).toUpperCase();

      if (status === 'SUCCESS') {
        toast.success('Payment successfully verified!');
      } else if (status === 'FAILED') {
        toast.success('Payment status updated!');
      } else {
        toast.error('Verification pending');
      }

      queryClient.invalidateQueries({ queryKey: ['Transactions', email] });
    },
    onError: () => {
      toast.error('Verification failed!');
    },
  });
}
