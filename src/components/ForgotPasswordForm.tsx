import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
});

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

interface ForgotPasswordFormProps {
  onSubmit: (values: ForgotPasswordFormValues) => void;
  isSubmitting: boolean;
}

export const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  onSubmit,
  isSubmitting,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  return (
    <form className="forgot-password-form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="forgot-password-form-group">
        <Label htmlFor="email" className="forgot-password-label">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="email@example.com"
          {...register('email')}
          disabled={isSubmitting}
          className="forgot-password-input"
        />
        {errors.email && (
          <p className="forgot-password-error">{errors.email.message}</p>
        )}
      </div>
      <Button type="submit" className="forgot-password-submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </Button>
    </form>
  );
};
 