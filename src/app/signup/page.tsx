// src/app/signup/page.tsx (or wherever your SignUpPage is located)

'use client';

import Image from 'next/image';
import Link from 'next/link'; // Import Link for navigation
import { GlassFormWrapper } from '@/components/GlassFormWrapper';
import { SignUpFormDesktop } from '@/components/signup/SignUpFormDesktop';
import { SignUpFormMobile } from '@/components/signup/SignUpFormMobile';
import { Form } from '@/components/ui/form';
import { useSignUp } from '@/hooks/useSignUp';

export default function SignUpPage() {
  const {
    form,
    step,
    nextStep,
    prevStep,
    isPending,
    is_amrita_student,
    onSubmit,
  } = useSignUp();

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <GlassFormWrapper className="max-w-xl">
        <div className="flex flex-col items-center pt-2 mb-4">
          <Link href="/" aria-label="Go to Home">
            <Image
              src="/logo_w.png"
              alt="Anokha Logo"
              width={120}
              height={90}
              priority
              className="cursor-pointer"
            />
          </Link>
          <h2 className="font-bold text-3xl text-foreground mt-2">Sign Up</h2>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="block md:hidden">
              <SignUpFormMobile
                form={form}
                step={step}
                nextStep={nextStep}
                prevStep={prevStep}
                isSubmitting={isPending}
                is_amrita_student={is_amrita_student}
              />
            </div>

            <div className="hidden md:block">
              <SignUpFormDesktop
                form={form}
                isSubmitting={isPending}
                is_amrita_student={is_amrita_student}
              />
            </div>
            <p className="text-center text-sm text-muted-foreground mt-6">
              Already have an account?{' '}
              <Link href="/login" className="text-primary hover:underline">
                Log in
              </Link>
            </p>
          </form>
        </Form>
      </GlassFormWrapper>
    </div>
  );
}
