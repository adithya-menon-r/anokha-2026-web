'use client';
export const dynamic = 'force-dynamic';

import Image from 'next/image';
import Link from 'next/link';
import React, { Suspense } from 'react';
import { GlassFormWrapper } from '@/components/GlassFormWrapper';
import { ResetPasswordForm } from '@/components/ResetPassword/ResetPasswordForm';
import { useResetPassword } from '@/hooks/useResetPassword';

function ResetPasswordPageContent() {
  const mutation = useResetPassword();

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <GlassFormWrapper className="max-w-md">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center mb-2">
            <Link href="/" aria-label="Go to Home">
              <Image
                src="/logo_w.png"
                alt="Anokha Logo"
                width={200}
                height={150}
                priority
                className="cursor-pointer"
              />
            </Link>
            <h1 className="text-2xl font-bold text-foreground mt-2 text-center">
              Reset Password
            </h1>
            <p className="text-muted-foreground text-center text-sm mt-1">
              Enter your registered email and a new password
            </p>
          </div>
          <ResetPasswordForm
            onSubmit={(values) => mutation.mutate(values)}
            isSubmitting={mutation.isPending}
          />
          <div className="text-center mt-1">
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
