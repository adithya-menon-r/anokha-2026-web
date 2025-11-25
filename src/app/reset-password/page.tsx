'use client';
export const dynamic = 'force-dynamic';

import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { Suspense } from 'react';
import { ResetPasswordForm } from '@/components/forgotPassword/ResetPasswordForm';
import { GlassFormWrapper } from '@/components/GlassFormWrapper';
import { useResetPassword } from '@/hooks/useResetPassword';

function ResetPasswordPageContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';
  const otp = searchParams.get('otp') || '';
  const mutation = useResetPassword();

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <GlassFormWrapper className="max-w-md">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center mb-2">
            <Image
              src="/logo_w.png"
              alt="Anokha Logo"
              width={200}
              height={150}
              priority
            />
            <h1 className="text-2xl font-bold text-foreground mt-2 text-center">
              Reset Password
            </h1>
            <p className="text-muted-foreground text-center text-sm mt-1">
              Enter your new password below
            </p>
          </div>
          <ResetPasswordForm
            onSubmit={(values) => mutation.mutate({ ...values, email, otp })}
            isSubmitting={mutation.isPending}
            email={email}
            otp={otp}
          />
          <div className="text-center mt-2">
            <Link
              href="/login"
              className="text-primary text-sm hover:underline transition"
            >
              &larr; Back to Login
            </Link>
          </div>
        </div>
      </GlassFormWrapper>
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
