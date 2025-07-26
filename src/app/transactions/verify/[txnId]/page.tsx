'use client';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Lottie from 'react-lottie';
import { GlassFormWrapper } from '@/components/GlassFormWrapper';
import { VERIFY_TRANSACTIONS_URL } from '@/lib/constants';
// Import your verifying animation
import animationData from '../../../../../public/lotties/transactionVerify.json';

export default function PaymentVerifying() {
  const { txnId } = useParams();
  const router = useRouter();
  const [verificationStatus, setVerificationStatus] = useState<
    'verifying' | 'success' | 'failed'
  >('verifying');

  useEffect(() => {
    const verifyTransaction = async () => {
      try {
        const response = await fetch(VERIFY_TRANSACTIONS_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ transactionId: txnId }),
        });

        if (response.status === 200) {
          setVerificationStatus('success');
          setTimeout(() => {
            router.push('/transactions/success');
          }, 2000);
        } else if (response.status === 202) {
          setVerificationStatus('failed');
          setTimeout(() => {
            router.push('/transactions/failure');
          }, 2000);
        } else {
          setTimeout(() => {
            router.push('/transactions/pending');
          }, 4000);
        }
      } catch (error) {
        console.error('Verification error:', error);
        setTimeout(() => {
          router.push('/transactions/pending');
        }, 4000);
      }
    };

    if (txnId) {
      verifyTransaction();
    }
  }, [router, txnId]);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const getStatusText = () => {
    switch (verificationStatus) {
      case 'success':
        return {
          title: 'Verification Complete!',
          subtitle: 'Redirecting to success page...',
          description: 'Your payment has been successfully verified.',
        };
      case 'failed':
        return {
          title: 'Verification Failed',
          subtitle: 'Redirecting...',
          description: 'There was an issue with your payment verification.',
        };
      default:
        return {
          title: 'Verifying Payment',
          subtitle: 'Please wait while we process your transaction...',
          description: 'Do not close this page or navigate away.',
        };
    }
  };

  const statusText = getStatusText();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <GlassFormWrapper className="max-w-lg w-full text-center">
        <div className="flex items-center justify-center mb-6">
          <Lottie options={defaultOptions} height={200} width={200} />
        </div>

        <h1
          className={`text-3xl font-bold mb-2 ${
            verificationStatus === 'success'
              ? 'text-green-400'
              : verificationStatus === 'failed'
                ? 'text-destructive'
                : 'text-foreground'
          }`}
        >
          {statusText.title}
        </h1>

        <p className="text-lg text-muted-foreground mb-4">
          {statusText.subtitle}
        </p>

        <div className="space-y-2 text-sm text-muted-foreground mb-4">
          <p>{statusText.description}</p>
          {txnId && (
            <p>
              Transaction ID:{' '}
              <span className="font-mono font-semibold text-foreground">
                {txnId}
              </span>
            </p>
          )}
        </div>

        {/* Progress indicator */}
        <div className="w-full bg-muted rounded-full h-2 mb-4">
          <div
            className={`h-2 rounded-full transition-all duration-1000 ${
              verificationStatus === 'success'
                ? 'bg-green-400 w-full'
                : verificationStatus === 'failed'
                  ? 'bg-destructive w-full'
                  : 'bg-primary w-3/4 animate-pulse'
            }`}
          />
        </div>
      </GlassFormWrapper>
    </main>
  );
}
