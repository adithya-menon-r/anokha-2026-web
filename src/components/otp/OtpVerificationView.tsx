//Dumb component
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';
import { OtpProps } from '@/types/otpTypes';

function formatCountdown(seconds: number): string {
  const mins = Math.floor(seconds / 60)
    .toString()
    .padStart(2, '0');
  const secs = (seconds % 60).toString().padStart(2, '0');
  return `${mins}:${secs}`;
}

export function OtpVerficationView({
  otp,
  onOtpChange,
  onSubmit,
  isSubmitting,
  error,
  showResend,
  onResendClick,
  isResending,
  countdown,
}: OtpProps) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="flex flex-col items-center gap-4"
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

      {showResend ? (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onResendClick}
          disabled={isResending}
        >
          {isResending ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Resending...
            </>
          ) : (
            'Resend OTP'
          )}
        </Button>
      ) : (
        <p className="text-sm text-muted-foreground">Resend in {formatCountdown(countdown)}</p>
      )}
    </form>
  );
}
