// src/components/LoginForm.tsx (or wherever it's located)
import Image from 'next/image';
import Link from 'next/link';
import type React from 'react';
import type { UseFormReturn } from 'react-hook-form';
// Import the new wrapper component
import { GlassFormWrapper } from '@/components/GlassFormWrapper';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { LoginFormValues } from '@/types/login';

interface LoginFormProps {
  form: UseFormReturn<LoginFormValues>;
  onSubmit: (values: LoginFormValues) => void;
  isSubmitting: boolean;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  form,
  onSubmit,
  isSubmitting,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <GlassFormWrapper>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex items-center justify-center mb-2">
          <Image
            src="/logo.png"
            alt="Anokha Logo"
            width={200}
            height={150}
            priority
          />
        </div>
        <h2 className="text-2xl font-bold text-center text-primary">Login</h2>
        <p className="text-center text-muted-foreground mb-6">Welcome back</p>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="email@example.com"
            {...register('email')}
            className="w-full bg-anokha-dark-400/50 border-anokha-blue/30 rounded-md placeholder:text-gray-400"
          />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            {...register('password')}
            className="w-full bg-anokha-dark-400/50 border-anokha-blue/30 rounded-md placeholder:text-gray-400"
          />
          {errors.password && (
            <p className="text-sm text-destructive">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="flex justify-end">
          <Link
            href="/forgot-password"
            className="text-sm text-primary hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Logging in…' : 'Log in'}
        </Button>

        <p className="text-center text-sm text-muted-foreground">
          Don’t have an account?{' '}
          <Link href="/register" className="text-primary hover:underline">
            Sign up
          </Link>
        </p>
      </form>
    </GlassFormWrapper>
  );
};
