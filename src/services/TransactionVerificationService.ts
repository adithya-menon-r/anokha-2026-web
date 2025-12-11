import { apiPost } from '@/lib/api';
import { VERIFY_TRANSACTIONS_URL } from '@/lib/constants';
import type {
  TransactionVerificationPayload,
  TransactionVerificationResponse,
} from '@/types/transactionTypes';

/**
 * TransactionService
 * ----------------------------------------------------------------------------
 * Service layer for handling transaction-related API calls.
 * Safe for client-side use (no Node.js dependencies).
 */

export const TransactionService = {
  /**
   * Verify transaction status with the backend
   * @param payload - Transaction ID to verify
   * @returns Promise with verification response
   */
  verifyTransaction: async (
    payload: TransactionVerificationPayload,
  ): Promise<TransactionVerificationResponse> => {
    console.log('===== TransactionService.verifyTransaction - Called =====');
    console.log('Timestamp:', new Date().toISOString());
    console.log('Payload:', JSON.stringify(payload, null, 2));
    console.log('Verification URL:', VERIFY_TRANSACTIONS_URL);

    try {
      const response = await apiPost<any>(VERIFY_TRANSACTIONS_URL, payload);

      console.log('Verification Response:', JSON.stringify(response, null, 2));
      console.log(
        '===== TransactionService.verifyTransaction - Success =====\n',
      );

      // Normalize the response status to lowercase for consistency
      const normalizedResponse: TransactionVerificationResponse = {
        ...response,
        status: (response.status?.toLowerCase() || 'pending') as
          | 'success'
          | 'failed'
          | 'pending',
      };

      return normalizedResponse;
    } catch (error: any) {
      console.error('===== TransactionService.verifyTransaction - Error =====');
      console.error('Error timestamp:', new Date().toISOString());
      console.error('Error details:', error);
      console.error('Error response:', error?.response?.data);
      console.error('Error message:', error?.message);
      console.error(
        '========================================================\n',
      );

      const message =
        error?.response?.data?.message ||
        error.message ||
        'Transaction verification failed';
      throw new Error(message);
    }
  },
};
