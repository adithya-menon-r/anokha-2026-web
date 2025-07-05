//Dumb Component

import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';

import { Button } from '../ui/button';
import { OtpProps } from '@/types/otpTypes';

export function OtpVerficationView({ otp, onOtpChange, onSubmit, isSubmitting, error }: OtpProps) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="flex flex-col items-center gap-6"
    >
      <InputOTP maxLength={6} value={otp} onChange={onOtpChange} disabled={isSubmitting}>
        <InputOTPGroup>
          {Array.from({ length: 6 }).map((_, i) => (
            <InputOTPSlot key={i} index={i} />
          ))}
        </InputOTPGroup>
      </InputOTP>
      {error && <p className="text-sm text-destructive">{error}</p>}
      <Button type="submit" disabled={otp.length !== 6 || isSubmitting} className="w-full">
        {isSubmitting ? 'Verifying...' : 'Verify OTP'}
      </Button>
    </form>
  );
}
