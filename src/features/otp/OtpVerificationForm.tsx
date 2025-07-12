'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { otpSchema, OtpFormValues } from '@/types/otpTypes';
import { useOtpVerfication } from '@/hooks/useOtpVerification';
import { UseResendOtp } from '@/hooks/useResendOtp';
import { OtpVerficationView } from '@/components/otp/OtpVerificationView';
import { OtpVerficationSkeleton } from '@/components/otp/OtpVerificationSkeleton';
import { useEffect, useState } from 'react';

export function OtpVerificationForm() {
  const { setValue, watch, formState } = useForm<OtpFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: '' },
  });

  const otp = watch('otp');
  const { mutate: verifyOtp, isPending } = useOtpVerfication();
  const { mutate: resendOtp, isPending: isResending } = UseResendOtp();
  const [showResend, setShowResend] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(120); //2min
  const [resendStartTime, setResendStartTime] = useState<number>(() => {
    const stored = localStorage.getItem('resendStartTime');
    return stored ? parseInt(stored, 10) : Date.now();
  });

  useEffect(() => {
    const now = Date.now();
    const elapsed = Math.floor((now - resendStartTime) / 1000);
    const remaining = Math.max(120 - elapsed, 0);

    setCountdown(remaining);
    if (remaining === 0) {
      setShowResend(true);
      return;
    }

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setShowResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [resendStartTime]);

  // To handle multiple tab synchronisation
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'resendStartTime' && e.newValue) {
        setResendStartTime(parseInt(e.newValue, 10));
        setShowResend(false);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleResend = () => {
    const now = Date.now();
    localStorage.setItem('resendStartTime', String(now));
    setResendStartTime(now); // triggers countdown in current tab
    setCountdown(120);
    setShowResend(false);
    resendOtp();
  };

  const handleChange = (val: string) => {
    setValue('otp', val, { shouldValidate: true });
  };

  const onSubmit = () => {
    if (otp.length === 6) {
      verifyOtp({ otp });
    }
  };

  if (isPending) {
    return <OtpVerficationSkeleton />;
  }

  return (
    <OtpVerficationView
      otp={otp}
      onOtpChange={handleChange}
      onSubmit={onSubmit}
      isSubmitting={isPending}
      error={formState.errors.otp?.message}
      showResend={showResend}
      onResendClick={handleResend}
      isResending={isResending}
      countdown={countdown}
    />
  );
}
