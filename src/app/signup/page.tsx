'use client';

import Image from 'next/image';
import { SignUpFormDesktop } from '@/components/signup/SignUpFormDesktop';
import { SignUpFormMobile } from '@/components/signup/SignUpFormMobile';
import {
  SignUpFormDesktopSkeleton,
  SignUpFormMobileSkeleton,
} from '@/components/signup/SignUpFormSkeleton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { useSignUp } from '@/hooks/useSignUp';

export default function SignUpPage() {
  const { form, step, nextStep, prevStep, isPending, isAmritaCB, onSubmit } =
    useSignUp();

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-xl">
        <CardHeader className="flex flex-col items-center pt-2">
          <Image
            src="/logo.png"
            alt="Anokha Logo"
            width={200}
            height={80}
            className="object-contain"
          />
          <CardTitle className="font-bold text-3xl">Sign Up</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="block md:hidden">
                {isPending ? (
                  <SignUpFormMobileSkeleton />
                ) : (
                  <SignUpFormMobile
                    form={form}
                    step={step}
                    nextStep={nextStep}
                    prevStep={prevStep}
                    isSubmitting={isPending}
                    isAmritaCB={isAmritaCB}
                  />
                )}
              </div>

              <div className="hidden md:block">
                {isPending ? (
                  <SignUpFormDesktopSkeleton />
                ) : (
                  <SignUpFormDesktop
                    form={form}
                    isSubmitting={isPending}
                    isAmritaCB={isAmritaCB}
                  />
                )}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
