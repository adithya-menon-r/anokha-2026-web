import { type NextRequest, NextResponse } from 'next/server';

/**
 * PayU Success Callback Handler
 * ----------------------------------------------------------------------------
 * This route receives POST callback from PayU payment gateway after successful payment.
 * PayU sends transaction details which we can log or process.
 * Then redirect user to success page.
 */
export async function POST(request: NextRequest) {
  try {
    console.log('===== PayU Success Callback - POST Request Received =====');
    console.log('Timestamp:', new Date().toISOString());
    console.log('Request URL:', request.url);

    const formData = await request.formData();

    // Extract PayU response data
    const txnId = formData.get('txnid') as string;
    const status = formData.get('status') as string;
    const amount = formData.get('amount') as string;
    const hash = formData.get('hash') as string;
    const firstname = formData.get('firstname') as string;
    const email = formData.get('email') as string;
    const productinfo = formData.get('productinfo') as string;
    const mihpayid = formData.get('mihpayid') as string;
    const mode = formData.get('mode') as string;

    // Log all PayU response data
    console.log('PayU Success Response Data:', {
      txnId,
      status,
      amount,
      hash,
      firstname,
      email,
      productinfo,
      mihpayid,
      mode,
      timestamp: new Date().toISOString(),
    });

    console.log('All form data entries:');
    for (const [key, value] of formData.entries()) {
      console.log(`  ${key}: ${value}`);
    }

    // Redirect to success page with transaction ID
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const redirectUrl = txnId
      ? `${baseUrl}/transactions/verify/${encodeURIComponent(txnId)}`
      : `${baseUrl}/transactions/success`;

    console.log('Redirecting to:', redirectUrl);
    console.log('===== PayU Success Callback - Completed =====\n');

    return NextResponse.redirect(redirectUrl, 303);
  } catch (error) {
    console.error('===== PayU Success Callback - ERROR =====');
    console.error('Error timestamp:', new Date().toISOString());
    console.error('Error details:', error);
    console.error(
      'Error message:',
      error instanceof Error ? error.message : 'Unknown error',
    );
    console.error(
      'Error stack:',
      error instanceof Error ? error.stack : 'No stack trace',
    );
    console.error('==========================================\n');

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    return NextResponse.redirect(`${baseUrl}/transactions/pending`, 303);
  }
}

// Handle GET requests (in case PayU redirects via GET)
export async function GET(request: NextRequest) {
  console.log('===== PayU Success Callback - GET Request Received =====');
  console.log('Timestamp:', new Date().toISOString());
  console.log('Request URL:', request.url);

  const searchParams = request.nextUrl.searchParams;
  const txnId = searchParams.get('txnid');

  console.log('Query parameters:', Object.fromEntries(searchParams.entries()));
  console.log('Transaction ID from query:', txnId);

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const redirectUrl = txnId
    ? `${baseUrl}/transactions/verify/${encodeURIComponent(txnId)}`
    : `${baseUrl}/transactions/success`;

  console.log('Redirecting to:', redirectUrl);
  console.log('===== PayU Success GET Callback - Completed =====\n');

  return NextResponse.redirect(redirectUrl, 303);
}
