//Smart Component
'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { otpSchema, OtpFormValues } from '@/types/otpTypes';
import { useOtpVerfication } from '@/hooks/useOtpVerification';
import { OtpVerficationView } from './OtpVerificationView';

export function OtpVerificationForm() {
  const { setValue, watch, formState } = useForm<OtpFormValues>({
    // useForm is typed with OtpFormValues (from Zod schema) // for type safety + runtime validation in sync
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: '' },
  });
  const otp = watch('otp');
  const { mutate: verifyOtp, isPending } = useOtpVerfication();

  const handleChange = (val: string) => {
    setValue('otp', val, { shouldValidate: true });
  };
  const onSubmit = () => {
    if (otp.length == 6) {
      verifyOtp({ otp }); //alias for mutate (calls the mutate function inside the hook)
    }
  };
  return (
    <OtpVerficationView
      otp={otp}
      onOtpChange={handleChange}
      onSubmit={onSubmit}
      isSubmitting={isPending}
      error={formState.errors.otp?.message}
    />
  );
}
