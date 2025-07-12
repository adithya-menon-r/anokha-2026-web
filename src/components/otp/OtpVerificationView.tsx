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
      <div className="flex flex-col items-center gap-3">
        <InputOTP
          maxLength={6}
          value={otp}
          onChange={(val: string) => {
            const numeric = val.replace(/\D/g, '');
            onOtpChange(numeric);
          }}
          disabled={isSubmitting}
          pattern="\d*"
        >
          <InputOTPGroup>
            {Array.from({ length: 6 }).map((_, i) => (
              <InputOTPSlot
                key={i}
                index={i}
                className="w-10 h-10 sm:w-12 sm:h-12 text-lg font-medium border-2 rounded-lg transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            ))}
          </InputOTPGroup>
        </InputOTP>
      </div>
      {error && <p className="text-sm text-destructive text-center font-medium">{error}</p>}

      <Button
        type="submit"
        disabled={otp.length !== 6 || isSubmitting}
        className="w-full h-11 text-base font-semibold transition-all duration-200 disabled:opacity-50"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Verifying...
          </>
        ) : (
          'Verify OTP'
        )}
      </Button>

      <div className="flex flex-col items-center gap-2">
        {showResend ? (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onResendClick}
            disabled={isResending}
            className="text-primary hover:text-primary/80 font-medium transition-colors duration-200"
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
          <div className="text-center">
            <p className="text-sm text-muted-foreground">{`Didn't receive the code?`}</p>
            <p className="text-sm font-medium text-foreground">
              Resend in {formatCountdown(countdown)}
            </p>
          </div>
        )}
      </div>
    </form>
  );
}
