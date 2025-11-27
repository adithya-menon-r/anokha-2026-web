import { UseFormRegister, UseFormReset } from 'react-hook-form';
import { z } from 'zod';

export interface Profile {
  name: string;
  email: string;
  phone: string;
  collegeName: string;
  collegeCity: string;
  avatarUrl?: string;
}

export type PROFILE_CARD_PROPS = {
  avatarEmail: string;
  email: string;
  name: string;
  phone: string;
  collegeName: string;
  collegeCity: string;
  register: UseFormRegister<Record<EditableFields, string>>;
  reset: UseFormReset<Record<EditableFields, string>>;
  errors: {
    name?: string;
    phone?: string;
    collegeName?: string;
    collegeCity?: string;
  };
  onSubmit: () => void;
  isDirty: boolean;
};

export type UpdateProfilePayload = Omit<Profile, 'email' | 'avatarUrl'>;

export type EditableFields = 'name' | 'phone' | 'collegeName' | 'collegeCity';

export const profileFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least two characters')
    .max(747, 'Name cannot be longer than 747 characters'),
  phone: z.string().regex(/^[6-9]\d{9}$/, {
    message: 'Please enter a valid 10 digit phone number',
  }),
  collegeName: z
    .string()
    .min(1, 'College Name is required')
    .regex(/^[a-zA-Z\s]+$/, 'Only alphabets')
    .max(600, 'College Name cannot exceed 600 characters'),
  collegeCity: z
    .string()
    .min(1, 'City is required')
    .regex(/^[a-zA-Z\s]+$/, 'Only alphabets')
    .max(200, 'City Name cannot be longer than 200 characters'),
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;
