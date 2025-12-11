import { type NextRequest, NextResponse } from 'next/server';

/**
 * PayU Failure Callback Handler
 * ----------------------------------------------------------------------------
 * This route receives POST callback from PayU payment gateway after failed payment.
 * PayU sends transaction details which we can log or process.
 * Then redirect user to failure page.
 */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    // Extract PayU response data
    const txnId = formData.get('txnid') as string;
    const status = formData.get('status') as string;
    const amount = formData.get('amount') as string;
    const error = formData.get('error') as string;
    const errorMessage = formData.get('error_Message') as string;
    const firstname = formData.get('firstname') as string;
    const email = formData.get('email') as string;
    const productinfo = formData.get('productinfo') as string;
    const mihpayid = formData.get('mihpayid') as string;
    const mode = formData.get('mode') as string;

    // Redirect to failure page with transaction ID
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const redirectUrl = txnId
      ? `${baseUrl}/transactions/verify/${encodeURIComponent(txnId)}`
      : `${baseUrl}/transactions/failure`;

    return NextResponse.redirect(redirectUrl, 303);
  } catch (error) {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    return NextResponse.redirect(`${baseUrl}/transactions/failure`, 303);
  }
}

// Handle GET requests (in case PayU redirects via GET)
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const txnId = searchParams.get('txnid');

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const redirectUrl = txnId
    ? `${baseUrl}/transactions/verify/${encodeURIComponent(txnId)}`
    : `${baseUrl}/transactions/failure`;

  console.log('Redirecting to:', redirectUrl);
  console.log('===== PayU Failure GET Callback - Completed =====\n');

  return NextResponse.redirect(redirectUrl, 303);
}
