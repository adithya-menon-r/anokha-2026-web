'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { otpSchema, OtpFormValues } from '@/types/otpTypes';
import { useOtpVerfication } from '@/hooks/useOtpVerification';
import { UseResendOtp } from '@/hooks/useResendOtp';
import { OtpVerficationView } from '@/components/otp/OtpVerificationView';
import { OtpVerficationSkeleton } from '@/components/otp/OtpVerificationSkeleton';
import { useOtpCountdownTimer } from '@/hooks/useOtpCountdownTimer';

export function OtpVerificationForm() {
  const { setValue, watch, formState } = useForm<OtpFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: '' },
  });

  const otp = watch('otp');
  const { mutate: verifyOtp, isPending } = useOtpVerfication();
  const { mutate: resendOtp, isPending: isResending } = UseResendOtp();

  const { countdown, showResend, handleResend } = useOtpCountdownTimer({
    onResend: () => resendOtp(), //API trigger for resending otp
  });
  const handleChange = (val: string) => {
    setValue('otp', val, { shouldValidate: true });
  };

  const onSubmit = () => {
    if (otp.length === 6) {
      verifyOtp({ otp }); //API trigger for verifying otp
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
