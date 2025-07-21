import { z } from 'zod';

export const SignUpSchema = z
  .object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
    phone: z.string().regex(/^\d{10}$/, 'Phone number must be 10 digits'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().min(8, 'Please confirm your password'),
    collegeName: z.string().min(1, 'College name is required'),
    collegeCity: z.string().min(1, 'College city is required'),
    isAmritaCB: z.boolean().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  })
  .refine(
    (data) =>
      !data.isAmritaCB || data.collegeName === 'Amrita Vishwa Vidyapeetham',
    {
      path: ['collegeName'],
      message:
        'College name must be Amrita Vishwa Vidyapeetham if you are from Amrita Coimbatore',
    },
  )
  .refine((data) => !data.isAmritaCB || data.collegeCity === 'Coimbatore', {
    path: ['collegeCity'],
    message:
      'College city must be Coimbatore if you are from Amrita Coimbatore',
  });

export type SignUpFormValues = z.infer<typeof SignUpSchema>;
