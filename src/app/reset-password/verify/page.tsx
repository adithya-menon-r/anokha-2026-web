'use client';
import dynamic from 'next/dynamic';
import { OtpVerficationSkeleton } from '@/components/otp/OtpVerificationSkeleton';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { OtpAuthService } from '@/services/OtpAuthService';

const OtpVerificationForm = dynamic(
  () =>
    import('@/features/otp/OtpVerificationForm').then(
      (mod) => mod.OtpVerificationForm,
    ),
  { ssr: false, loading: () => <OtpVerficationSkeleton /> },
);

export default function ResetPasswordOtpVerificationPage() {
  const router = useRouter();
  const verifyOtpMutation = useMutation({
    mutationFn: OtpAuthService.verifyOtp,
    onSuccess: () => {
      router.push('/reset-password');
    },
    onError: () => {
      router.push('/login');
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="flex flex-col items-center space-y-3 pt-3">
          <Image
            src="/images/BLACK LOGO.png"
            alt="Anokha Logo"
            width={200}
            height={150}
            className="rounded-md"
            priority
          />
          <div className="space-y-4 text-center">
            <div className="space-y-1">
              <h1 className="text-3xl font-bold tracking-tight text-foreground">
                Reset Password - Verify OTP
              </h1>
            </div>
            <div className="space-y-3 px-2">
              <p className="text-sm text-foreground leading-relaxed">
                {`We've sent a `}
                <span className="font-semibold">6-digit verification code</span>
                {` to your email`}
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                <span className="font-medium">Can't find the email?</span>
                <br />
                Please check your spam or junk folder
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pb-6">
          <OtpVerificationForm />
        </CardContent>
      </Card>
    </div>
  );
}
