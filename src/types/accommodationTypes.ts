import { UseFormReturn } from 'react-hook-form';

export type AccommodationFormValues = {
  name: string;
  email: string;
  is_male: boolean;
  is_amrita_campus: boolean;
  college_name: string;
  is_hosteller: boolean;
  college_roll_number: string;
  check_in_date: string;
  check_in_time: string;
  check_out_date: string;
  check_out_time: string;
  room_preference: 'single' | '4 sharing' | 'dormitory';
  agree_rules: boolean;
};

export type AccommodationInstructionsProps = {
  instructions: string[];
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
