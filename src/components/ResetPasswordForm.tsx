import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export const resetPasswordSchema = z.object({
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
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

export function ResetPasswordForm({ onSubmit, isSubmitting, email, otp }: ResetPasswordFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
  });

  return (
    <form className="forgot-password-form" onSubmit={handleSubmit((values) => onSubmit({ password: values.password }))} noValidate>
      <div className="forgot-password-form-group">
        <Label htmlFor="password" className="forgot-password-label">New Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="Enter new password"
          {...register('password')}
          disabled={isSubmitting}
          className="forgot-password-input"
        />
        {errors.password && (
          <p className="forgot-password-error">{errors.password.message}</p>
        )}
      </div>
      <div className="forgot-password-form-group">
        <Label htmlFor="confirmPassword" className="forgot-password-label">Confirm New Password</Label>
        <Input
          id="confirmPassword"
          type="password"
          placeholder="Confirm new password"
          {...register('confirmPassword')}
          disabled={isSubmitting}
          className="forgot-password-input"
        />
        {errors.confirmPassword && (
          <p className="forgot-password-error">{errors.confirmPassword.message}</p>
        )}
      </div>
      <Button type="submit" className="forgot-password-submit" disabled={isSubmitting}>
        {isSubmitting ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
            </svg>
            Resetting...
          </span>
        ) : 'Reset Password'}
      </Button>
    </form>
  );
} 