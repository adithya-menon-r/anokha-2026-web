// Payment types for PayU integration

export interface CreatePaymentPayload {
  amount: number;
  productId: string;
  userId: string;
  userName: string;
  userEmail: string;
  userPhone: string;
}

export interface PaymentParams {
  key: string;
  txnid: string;
  amount: string;
  productinfo: string;
  firstname: string;
  email: string;
  phone: string;
  surl: string;
  furl: string;
  hash: string;
}

export interface PaymentOrder {
  paymentUrl: string;
  params: PaymentParams;
}

// temporary interface for local development
// should be replaced with a backend API call in production
export interface LocalPaymentPayload {
  amount: number;
  productId: string;
  userId: string;
  userName: string;
  userEmail: string;
  userPhone: string;
}
