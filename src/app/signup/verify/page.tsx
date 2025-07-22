'use client';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { GlassFormWrapper } from '@/components/GlassFormWrapper';
import { OtpVerficationSkeleton } from '@/components/otp/OtpVerificationSkeleton';

const OtpVerificationForm = dynamic(
  () =>
    import('@/features/otp/OtpVerificationForm').then(
      (mod) => mod.OtpVerificationForm, //To get only this particular export
    ),
  { ssr: false, loading: () => <OtpVerficationSkeleton /> },
);

export default function OtpVerificationPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <GlassFormWrapper>
        <div className="flex flex-col items-center space-y-3 pt-3">
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
                Verify Your Account
              </h1>
            </div>

            <div className="space-y-3 px-2">
              <p className="text-sm text-foreground leading-relaxed">
                {`We've sent a `}
                <span className="font-semibold">6-digit verification code</span>
                {` to your email`}
              </p>

              <p className="text-xs text-muted-foreground leading-relaxed">
                <span className="font-medium">Can&apos;t find the email?</span>
                <br />
                Please check your spam or junk folder
              </p>
            </div>
          </div>
        </div>
        <OtpVerificationForm />
      </GlassFormWrapper>
    </div>
  );
}
