"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { OtpForm, OtpFormValues } from "@/components/OtpForm";
import { OtpFormSkeleton } from "@/components/OtpFormSkeleton";
import { useOtpVerify } from "@/hooks/useOtpVerify";
import { toast } from "react-hot-toast";

export default function OtpPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email") || "";
  const error = searchParams.get("error");
  const mutation = useOtpVerify();
  const errorToastShown = useRef(false);

  useEffect(() => {
    if (error) {
      const errorKey = `otp_error_shown:${error}`;
      if (!sessionStorage.getItem(errorKey)) {
        toast.error(error);
        sessionStorage.setItem(errorKey, 'true');
        const params = new URLSearchParams(window.location.search);
        params.delete('error');
        const newUrl = `${window.location.pathname}?${params.toString()}`;
        router.replace(newUrl);
      }
    }
  }, [error, router]);

  useEffect(() => {
    if (mutation.isError && mutation.error) {
      toast.error(mutation.error.message);
    }
  }, [mutation.isError, mutation.error]);

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