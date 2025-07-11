'use client';
import dynamic from 'next/dynamic';
import { OtpVerficationSkeleton } from '@/components/otp/OtpVerificationSkeleton';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import Image from 'next/image';
const OtpVerificationForm = dynamic(
  () =>
    import('@/features/otp/OtpVerificationForm').then(
      (mod) => mod.OtpVerificationForm, //To get only this particular export
    ),
  { ssr: false, loading: () => <OtpVerficationSkeleton /> },
);

export default function OtpVerificationPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="flex flex-col items-center space-y-2">
          <Image
            src="/images/BLACK LOGO.png"
            alt="Anokha Logo"
            width={220}
            height={220}
            className="rounded-md"
            priority
          />
          <div className="space-y-3 text-center">
            <h2 className="text-2xl font-semibold tracking-tight">Verify OTP</h2>
            <p className="text-sm leading-relaxed max-w-sm">
              Enter the 6-digit code sent to your email address
            </p>
          </div>
        </CardHeader>
        <CardContent>
          <OtpVerificationForm />
        </CardContent>
      </Card>
    </div>
  );
}
