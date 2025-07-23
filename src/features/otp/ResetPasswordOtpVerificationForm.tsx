import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { OtpVerficationSkeleton } from '@/components/otp/OtpVerificationSkeleton';
import { OtpVerficationView } from '@/components/otp/OtpVerificationView';
import { useOtpCountdownTimer } from '@/hooks/useOtpCountdownTimer';
import { useResetPasswordOtpVerification } from '@/hooks/resetPasswordOtpVerification';
import { UseResendOtp } from '@/hooks/useResendOtp';
import { type OtpFormValues, otpSchema } from '@/types/otpTypes';
import { UseMutationResult } from '@tanstack/react-query';

interface ResetPasswordOtpVerificationFormProps {
  mutation?: UseMutationResult<any, any, { otp: string }, any>;
}

export function ResetPasswordOtpVerificationForm({ mutation }: ResetPasswordOtpVerificationFormProps = {}) {
  const { setValue, watch, formState } = useForm<OtpFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: '' },
  });

  const otp = watch('otp');
  const { mutate: verifyOtp, isPending } = mutation || useResetPasswordOtpVerification();
  const { mutate: resendOtp, isPending: isResending } = UseResendOtp();

  const { countdown, showResend, handleResend } = useOtpCountdownTimer({
    onResend: () => resendOtp(),
  });
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