"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ForgotPasswordForm, ForgotPasswordFormValues } from "@/components/ForgotPasswordForm";
import { ForgotPasswordFormSkeleton } from "@/components/ForgotPasswordFormSkeleton";
import { useForgotPassword } from "@/hooks/useForgotPassword";

export default function ForgotPasswordPage() {
  const mutation = useForgotPassword();
  const router = useRouter();

  const handleSubmit = (values: ForgotPasswordFormValues) => {
    mutation.mutate(values, {
      onSuccess: () => {
        router.push(`/otp?email=${encodeURIComponent(values.email)}`);
      },
      onError: (error) => {
        router.push(`/otp?email=${encodeURIComponent(values.email)}&error=${encodeURIComponent(error.message)}`);
      },
    });
  };

  return (
    <main className="forgot-password-container">
      <div className="forgot-password-card">
        <div className="forgot-password-header">
          <Image src="/logo.png" alt="Anokha Logo" width={120} height={90} priority />
          <h1 className="forgot-password-title">Forgot Password</h1>
          <p className="forgot-password-subtitle">
            Enter your email to receive a password reset link
          </p>
        </div>
          <ForgotPasswordForm
            onSubmit={handleSubmit}
            isSubmitting={mutation.isPending}
          />
        <div className="forgot-password-footer">
          <Link href="/login" className="forgot-password-back-link">
            &larr; Back to Login
          </Link>
        </div>
      </div>
    </main>
  );
}
