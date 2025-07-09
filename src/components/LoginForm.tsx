import React from 'react';
import Link from 'next/link';
import { UseFormReturn } from 'react-hook-form';
import { LoginFormValues } from '@/types/login';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Image from 'next/image';

interface LoginFormProps {
  form: UseFormReturn<LoginFormValues>;
  onSubmit: (values: LoginFormValues) => void;
  isSubmitting: boolean;
}

export const LoginForm: React.FC<LoginFormProps> = ({ form, onSubmit, isSubmitting }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md"
    >
      <div className="flex items-center justify-center gap-4 mb-4">
        <Image src="/logo.png" alt="Anokha Logo" width={200} height={150} priority />
      </div>
      <h2 className="text-2xl font-bold text-center text-primary">Welcome Back</h2>
      <p className="text-center text-muted-foreground mb-6">Log in to your Anokha 2025 account</p>

      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="email@example.com" {...register('email')} />
        {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
      </div>

      {/* Password */}
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" placeholder="••••••••" {...register('password')} />
        {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
      </div>

      <div className="flex justify-end">
        <Link href="/forgot-password" className="text-sm text-primary hover:underline">
          Forgot password?
        </Link>
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Logging in…' : 'Log in'}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Don’t have an account?{' '}
        <Link href="/register" className="text-primary hover:underline">
          Sign up
        </Link>
      </p>
    </form>
  );
};
