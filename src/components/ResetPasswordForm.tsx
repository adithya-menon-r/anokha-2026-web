import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export const resetPasswordSchema = z
  .object({
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

interface ResetPasswordFormProps {
  onSubmit: (values: { password: string }) => void;
  isSubmitting: boolean;
  email: string;
  otp: string;
}

export function ResetPasswordForm({
  onSubmit,
  isSubmitting,
}: ResetPasswordFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
  });

  return (
    <form
      className="flex flex-col gap-5"
      onSubmit={handleSubmit((values) =>
        onSubmit({ password: values.password }),
      )}
      noValidate
    >
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="password" className="font-medium text-sm">
          New Password
        </Label>
        <Input
          id="password"
          type="password"
          placeholder="Enter new password"
          {...register('password')}
          disabled={isSubmitting}
          className="border border-input rounded-md px-3 py-2 text-sm bg-background text-foreground focus:border-primary outline-none transition"
        />
        {errors.password && (
          <p className="text-destructive text-sm">{errors.password.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="confirmPassword" className="font-medium text-sm">
          Confirm New Password
        </Label>
        <Input
          id="confirmPassword"
          type="password"
          placeholder="Confirm new password"
          {...register('confirmPassword')}
          disabled={isSubmitting}
          className="border border-input rounded-md px-3 py-2 text-sm bg-background text-foreground focus:border-primary outline-none transition"
        />
        {errors.confirmPassword && (
          <p className="text-destructive text-sm">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>
      <Button
        type="submit"
        className="w-full bg-primary text-primary-foreground rounded-md py-2.5 font-semibold flex items-center justify-center gap-2 transition disabled:bg-muted disabled:text-muted-foreground"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              />
            </svg>
            Resetting...
          </>
        ) : (
          'Reset Password'
        )}
      </Button>
    </form>
  );
}
