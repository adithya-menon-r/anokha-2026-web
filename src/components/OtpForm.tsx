import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from 'react-hot-toast';

const otpSchema = z.object({
  otp: z.string().length(6, 'OTP must be 6 digits'),
});

export type OtpFormValues = z.infer<typeof otpSchema>;

interface OtpFormProps {
  onSubmit: (values: OtpFormValues) => void;
  isSubmitting: boolean;
  email: string;
}

export const OtpForm: React.FC<OtpFormProps> = ({ onSubmit, isSubmitting, email }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OtpFormValues>({
    resolver: zodResolver(otpSchema),
  });

  React.useEffect(() => {
    if (errors.otp) {
      toast.error(errors.otp.message as string);
    }
  }, [errors.otp]);

  return (
    <form className="forgot-password-form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="forgot-password-form-group">
        <Label htmlFor="email" className="forgot-password-label">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          readOnly
          className="forgot-password-input"
        />
      </div>
      <div className="forgot-password-form-group">
        <Label htmlFor="otp" className="forgot-password-label">OTP</Label>
        <Input
          id="otp"
          type="text"
          placeholder="Enter 6-digit OTP"
          maxLength={6}
          {...register('otp')}
          disabled={isSubmitting}
          className="forgot-password-input"
        />
      </div>
      <Button type="submit" className="forgot-password-submit" disabled={isSubmitting}>
        {isSubmitting ? 'Verifying...' : 'Verify OTP'}
      </Button>
    </form>
  );
}; 