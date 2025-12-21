import { LocalPayuSigner } from '@/lib/LocalPayuSigner';
import type { CreatePaymentPayload, PaymentOrder } from '@/types/paymentTypes';

/**
 * PaymentService
 * ----------------------------------------------------------------------------
 * Service layer for handling payment-related API calls.
 * - In development, uses LocalPayuSigner to generate signed payment orders locally.
 * - In production, should call a backend API to securely sign and create payment orders.
 * - Exposes createOrder for use in hooks/components.
 *
 * NOTE: This service uses Node.js crypto and should only be used server-side
 * or in server components/actions.
 */

export const PaymentService = {
  createOrder: (payload: CreatePaymentPayload): Promise<PaymentOrder> => {
    return Promise.resolve(LocalPayuSigner.createOrder(payload));
  },
};
