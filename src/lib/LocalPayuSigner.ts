import crypto from 'crypto';
import { PAYU_URLS, PAYU_MERCHANT_KEY, GST_RATE, CURRENCY } from '@/lib/constants';
import type { PaymentParams, PaymentOrder, LocalPaymentPayload } from '@/types/paymentTypes';

/**
 * TEMPORARY — WILL MOVE TO BACKEND LATER
 */

const SALT = process.env.NEXT_PUBLIC_PAYU_SALT!; // Temporary only!

/**
 * LocalPayuSigner
 * ----------------------------------------------------------------------------
 * Generates signed PayU payment parameters for local development and testing.
 * WARNING: This is insecure and should NEVER be used in production.
 * - Hash signing is done on the client for dev only; must be moved to backend for prod.
 * - Uses environment variables for merchant key, salt, and app URL.
 * - Returns a payment URL and signed params for use in a payment redirect form.
 */

export const LocalPayuSigner = {
  createOrder: (payload: LocalPaymentPayload): PaymentOrder => {
    const txnid = `txn_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
    const amountStr = payload.amount.toFixed(2);

    const params: PaymentParams = {
      key: PAYU_MERCHANT_KEY,
      txnid,
      amount: amountStr,
      productinfo: payload.productId,
      firstname: payload.userName,
      email: payload.userEmail,
      phone: payload.userPhone,
      surl: `${process.env.NEXT_PUBLIC_APP_URL}/payments/success`,
      furl: `${process.env.NEXT_PUBLIC_APP_URL}/payments/failed`,
      hash: '', // will compute below
    };

    const hashString = [
      params.key,
      params.txnid,
      params.amount,
      params.productinfo,
      params.firstname,
      params.email,
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      SALT,
    ].join('|');

    params.hash = crypto.createHash('sha512').update(hashString).digest('hex');

    return {
      paymentUrl: PAYU_URLS.TEST,
      params,
    };
  },
};
