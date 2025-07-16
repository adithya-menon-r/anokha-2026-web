"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ResetPasswordForm, ResetPasswordFormValues } from "@/components/ResetPasswordForm";
import { ResetPasswordFormSkeleton } from "@/components/ResetPasswordFormSkeleton";
import { useResetPassword } from "@/hooks/useResetPassword";

export default function ResetPasswordPage() {
  // For demo, use placeholder email and otp. In real flow, get from router or state.
  const email = "user@example.com";
  const otp = "123456";
  const mutation = useResetPassword();

  return (
    <main className="forgot-password-container">
      <div className="forgot-password-card">
        <div className="forgot-password-header">
          <Image src="/logo.png" alt="Anokha Logo" width={120} height={90} priority />
          <h1 className="forgot-password-title">Reset Password</h1>
          <p className="forgot-password-subtitle">
            Enter your new password below
          </p>
        </div>
        {mutation.isPending ? (
          <ResetPasswordFormSkeleton />
        ) : (
          <ResetPasswordForm
            onSubmit={(values: ResetPasswordFormValues) => mutation.mutate({ ...values, email, otp })}
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