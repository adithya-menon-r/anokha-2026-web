import { z } from 'zod';

export const loginFormSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export type LoginFormValues = z.infer<typeof loginFormSchema>;

export interface User {
  email: string;
  name: string;
}

export interface LoginResponse {
  message: string;
  name: string;
  email: string;
}
