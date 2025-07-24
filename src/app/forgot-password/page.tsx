'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import {
  ForgotPasswordForm,
  ForgotPasswordFormValues,
} from '@/components/ForgotPasswordForm';
import { ForgotPasswordFormSkeleton } from '@/components/ForgotPasswordFormSkeleton';
import { GlassFormWrapper } from '@/components/GlassFormWrapper';
import { useForgotPassword } from '@/hooks/useForgotPassword';

export default function ForgotPasswordPage() {
  const mutation = useForgotPassword();
  const router = useRouter();

  const handleSubmit = (values: ForgotPasswordFormValues) => {
    mutation.mutate(values);
  };

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
              Forgot Password
            </h1>
            <p className="text-muted-foreground text-center text-sm mt-1">
              Enter your email to receive a password reset link
            </p>
          </div>
          {mutation.isPending ? (
            <ForgotPasswordFormSkeleton />
          ) : (
            <ForgotPasswordForm
              onSubmit={handleSubmit}
              isSubmitting={mutation.isPending}
            />
          )}
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
