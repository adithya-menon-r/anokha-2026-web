import type { ReactNode } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

const requiredString = (message: string) => z.string().trim().min(1, message);

const requiredBoolean = (message: string) =>
  z.boolean({ required_error: message, invalid_type_error: message });

export const accommodationFormSchema = z
  .object({
    name: requiredString('Name is required'),
    email: z
      .string()
      .trim()
      .min(1, 'Email is required')
      .email('Enter a valid email'),
    is_male: requiredBoolean('Select your gender'),
    is_amrita_campus: requiredBoolean('Select an option'),
    college_name: requiredString('College name is required'),
    is_hosteller: z.boolean().optional(),
    college_roll_number: requiredString('College roll number is required'),
    check_in_date: requiredString('Arrival-in date is required'),
    check_in_time: requiredString('Arrival-in time is required'),
    check_out_date: requiredString('Departure date is required'),
    check_out_time: requiredString('Departure time is required'),
    room_preference: z.enum(['single', '4 sharing', 'dormitory'], {
      required_error: 'Select a room preference',
      invalid_type_error: 'Select a room preference',
    }),
    agree_rules: z
      .boolean({
        required_error: 'Please read and agree to the rules before continuing.',
        invalid_type_error:
          'Please read and agree to the rules before continuing.',
      })
      .refine((value) => value === true, {
        message: 'Please read and agree to the rules before continuing.',
      }),
  })
  .superRefine((data, ctx) => {
    if (
      data.is_amrita_campus === true &&
      typeof data.is_hosteller !== 'boolean'
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Select hosteller or day scholar',
        path: ['is_hosteller'],
      });
    }
  });

export type AccommodationFormValues = z.infer<typeof accommodationFormSchema>;

export const accommodationFormDefaultValues: Partial<AccommodationFormValues> =
  {
    name: '',
    email: '',
    is_male: undefined,
    is_amrita_campus: undefined,
    college_name: '',
    is_hosteller: undefined,
    college_roll_number: '',
    check_in_date: '',
    check_in_time: '',
    check_out_date: '',
    check_out_time: '',
    room_preference: undefined,
    agree_rules: false,
  };

export type AccommodationInstructionsProps = {
  instructions: ReactNode[];
  checked: boolean[];
  toggle: (i: number) => void;
  onNext: () => void;
  allChecked: boolean;
};

export type AccommodationFormComponentProps = {
  form: UseFormReturn<AccommodationFormValues>;
  estimatedPrice: number | null;
  agreeWatch: boolean;
  onSubmit: (data: any) => void;
  AMRITA_CAMPUSES: string[];
  checkInMinDate: string;
  checkInMaxDate: string;
  checkOutMinDate: string;
  checkOutMaxDate: string;
};

export type AccommodationStatus =
  | 'NOT_REGISTERED'
  | 'FILLED_ACCOMMODATION'
  | 'ELIGIBLE';
