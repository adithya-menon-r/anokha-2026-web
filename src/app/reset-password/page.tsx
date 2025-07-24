'use client';
export const dynamic = 'force-dynamic';

import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { Suspense } from 'react';
import { ResetPasswordForm } from '@/components/ResetPasswordForm';
import { ResetPasswordFormSkeleton } from '@/components/ResetPasswordFormSkeleton';
import { useResetPassword } from '@/hooks/useResetPassword';

function ResetPasswordPageContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';
  const otp = searchParams.get('otp') || '';
  const mutation = useResetPassword();

  return (
    <main className="forgot-password-container">
      <div className="forgot-password-card">
        <div className="forgot-password-header">
          <Image
            src="/logo.png"
            alt="Anokha Logo"
            width={120}
            height={90}
            priority
          />
          <h1 className="forgot-password-title">Reset Password</h1>
          <p className="forgot-password-subtitle">
            Enter your new password below
          </p>
        </div>
        {mutation.isPending ? (
          <ResetPasswordFormSkeleton />
        ) : (
          <ResetPasswordForm
            onSubmit={(values) => mutation.mutate({ ...values, email, otp })}
            isSubmitting={mutation.isPending}
            email={email}
            otp={otp}
          />
        )}
        <div className="forgot-password-footer">
          <Link href="/login" className="forgot-password-back-link">
            &larr; Back to Login
          </Link>
        </div>
      </div>
    </main>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={null}>
      <ResetPasswordPageContent />
    </Suspense>
  );
}
