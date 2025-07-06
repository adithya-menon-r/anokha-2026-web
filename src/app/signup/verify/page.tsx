'use client';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { OtpVerficationSkeleton } from '@/components/otp/OtpVerificationSkeleton';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
const OtpVerificationForm = dynamic(
  () =>
    import('@/components/otp/OtpVerificationForm').then(
      (mod) => mod.OtpVerificationForm, //To get only this particular export
    ),
  { ssr: false },
);

export default function OtpVerificationPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Verify OTP</CardTitle>
          <CardDescription>Enter the 6-digit code sent to your email</CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<OtpVerficationSkeleton />}>
            <OtpVerificationForm />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}
