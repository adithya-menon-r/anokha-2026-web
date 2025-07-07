import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { PaymentService } from '@/services/PaymentService';
import type { CreatePaymentPayload, PaymentOrder } from '@/types/paymentTypes';

/**
 * usePayuRedirect
 * ----------------------------------------------------------------------------
 * React hook for handling PayU payment redirects.
 * - Uses TanStack Query's useMutation to create a payment order.
 * - On success, builds and submits a hidden form to PayU with signed params.
 * - On error, shows a toast notification.
 * - Forwards all payment param generation to the PaymentService.
 */
export function usePayuRedirect() {
  return useMutation<PaymentOrder, Error, CreatePaymentPayload>({
    mutationFn: PaymentService.createOrder,
    onSuccess: ({ paymentUrl, params }) => {
      // Build a hidden form
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = paymentUrl;

      Object.entries(params).forEach(([key, value]) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = value as string;
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();
      document.body.removeChild(form);
    },
    onError: () => {
      toast.error('Unable to initiate payment. Please try again.');
    },
  });
}
