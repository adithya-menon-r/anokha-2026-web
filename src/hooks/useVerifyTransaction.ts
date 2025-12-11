'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { TransactionService } from '@/services/TransactionVerificationService';
import type {
  TransactionVerificationPayload,
  TransactionVerificationResponse,
} from '@/types/transactionTypes';

/**
 * Hook for verifying transaction status
 * Automatically redirects to appropriate page based on status
 * Shows toast notifications for errors
 */
export function useVerifyTransaction() {
  const router = useRouter();

  console.log('===== useVerifyTransaction Hook - Initialized =====');

  return useMutation({
    mutationFn: async (
      payload: TransactionVerificationPayload,
    ): Promise<TransactionVerificationResponse> => {
      console.log('===== useVerifyTransaction - Mutation Started =====');
      console.log('Timestamp:', new Date().toISOString());
      console.log('Transaction ID:', payload.txn_id);

      const result = await TransactionService.verifyTransaction(payload);

      console.log('===== useVerifyTransaction - Mutation Result =====');
      console.log('Result:', JSON.stringify(result, null, 2));

      return result;
    },
    onSuccess: (data) => {
      console.log('===== useVerifyTransaction - Success Callback =====');
      console.log('Timestamp:', new Date().toISOString());
      console.log('Verification Status:', data.status);
      console.log('Response Data:', JSON.stringify(data, null, 2));

      // Redirect based on status
      setTimeout(() => {
        let redirectPath = '';
        switch (data.status) {
          case 'success':
            redirectPath = '/transactions/success';
            break;
          case 'failed':
            redirectPath = '/transactions/failure';
            break;
          default:
            redirectPath = '/transactions/pending';
        }

        console.log('Redirecting to:', redirectPath);
        console.log(
          '===== useVerifyTransaction - Success Callback Completed =====\n',
        );
        router.push(redirectPath);
      }, 2000);
    },
    onError: (error: Error) => {
      console.error('===== useVerifyTransaction - Error Callback =====');
      console.error('Error timestamp:', new Date().toISOString());
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
      console.error('Full error object:', error);

      toast.error(
        error.message || 'Failed to verify transaction. Please try again.',
      );

      // Redirect to pending page on error after a delay
      setTimeout(() => {
        console.log('Redirecting to /transactions/pending due to error');
        console.error(
          '===== useVerifyTransaction - Error Callback Completed =====\n',
        );
        router.push('/transactions/pending');
      }, 3000);
    },
  });
}
