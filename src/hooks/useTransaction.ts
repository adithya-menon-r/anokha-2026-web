import { useQuery, useQueryClient } from '@tanstack/react-query';
import { transactionService } from '@/services/TransactionService';
import { Transaction } from '@/types/transactionTypes';

export function useTransaction() {
  return useQuery<Transaction[], Error>({
    queryKey: ['getTransaction'],
    queryFn: transactionService.getTransactions,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
    refetchOnWindowFocus: true,
  });
}

export function useInvalidateTransaction() {
  const queryClient = useQueryClient();
  return () => {
    queryClient.invalidateQueries({ queryKey: ['getTransaction'] });
  };
}
