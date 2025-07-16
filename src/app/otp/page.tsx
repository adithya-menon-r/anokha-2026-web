"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { OtpForm, OtpFormValues } from "@/components/OtpForm";
import { OtpFormSkeleton } from "@/components/OtpFormSkeleton";
import { useOtpVerify } from "@/hooks/useOtpVerify";
import { toast } from "react-hot-toast";

export default function OtpPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const error = searchParams.get("error");
  const mutation = useOtpVerify();

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <main className="forgot-password-container">
      <div className="forgot-password-card">
        <div className="forgot-password-header">
          <Image src="/logo.png" alt="Anokha Logo" width={120} height={90} priority />
          <h1 className="forgot-password-title">Verify OTP</h1>
          <p className="forgot-password-subtitle">
            Enter the OTP sent to your email
          </p>
        </div>
        {mutation.isPending ? (
          <OtpFormSkeleton />
        ) : (
          <OtpForm
            onSubmit={(values: OtpFormValues) => mutation.mutate({ ...values, email })}
            isSubmitting={mutation.isPending}
            email={email}
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