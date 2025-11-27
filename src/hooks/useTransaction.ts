import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getMockTransactions } from '@/mocks/mockProfile';
// import { transactionService } from '@/services/TransactionService';
import { Transaction } from '@/types/transactionTypes';

export function useTransaction() {
  return useQuery<Transaction[], Error>({
    queryKey: ['getTransaction'],
    // queryFn: transactionService.getTransactions,
    queryFn: getMockTransactions,
    staleTime: 1000 * 60 * 10,
    retry: 1,
  });
}

export function useInvalidateTransaction() {
  const queryClient = useQueryClient();
  return () => {
    queryClient.invalidateQueries({ queryKey: ['getTransaction'] });
  };
}
