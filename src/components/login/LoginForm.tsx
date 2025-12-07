import { Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import type { UseFormReturn } from 'react-hook-form';
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
  const [showPassword, setShowPassword] = useState(false);

  return (
    <GlassFormWrapper>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex items-center justify-center mb-2">
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
        </div>
        <h2 className="text-3xl font-bold text-center text-foreground">
          Login
        </h2>
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
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              {...register('password')}
              className="w-full bg-anokha-dark-400/50 border-anokha-blue/30 rounded-md placeholder:text-gray-400 pr-10"
            />
            <button
              type="button"
              tabIndex={-1}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.password && (
            <p className="text-sm text-destructive">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="flex justify-end">
          <Link
            href="/reset-password"
            className="text-sm text-primary hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Logging in…' : 'Log in'}
        </Button>

        <p className="text-center text-sm text-muted-foreground">
          Don't have an account?{' '}
          <Link href="/signup" className="text-primary hover:underline">
            Sign up
          </Link>
        </p>
      </form>
    </GlassFormWrapper>
  );
};
