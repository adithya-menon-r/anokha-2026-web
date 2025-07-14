"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ForgotPasswordForm, ForgotPasswordFormValues } from "@/components/ForgotPasswordForm";
import { ForgotPasswordFormSkeleton } from "@/components/ForgotPasswordFormSkeleton";
import { useForgotPassword } from "@/hooks/useForgotPassword";

export default function ForgotPasswordPage() {
  const mutation = useForgotPassword();

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 space-y-6">
        <div className="flex flex-col items-center mb-2">
          <Image src="/logo.png" alt="Anokha Logo" width={120} height={90} priority />
          <h1 className="text-2xl font-bold text-primary mt-2">Forgot Password</h1>
          <p className="text-muted-foreground text-center text-sm mt-1">
            Enter your email to receive a password reset link
          </p>
        </div>
        {mutation.isPending ? (
          <ForgotPasswordFormSkeleton />
        ) : (
          <ForgotPasswordForm
            onSubmit={(values: ForgotPasswordFormValues) => mutation.mutate(values)}
            isSubmitting={mutation.isPending}
            error={mutation.isError ? (mutation.error as Error)?.message : undefined}
            success={mutation.isSuccess}
          />
        )}
        <div className="text-center mt-2">
          <Link href="/login" className="text-primary hover:underline text-sm">
            &larr; Back to Login
          </Link>
        </div>
      </div>
    </main>
  );
}
