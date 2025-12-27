'use client';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { AccommodationService } from '@/services/AccommodationService';
import type { AccommodationFormValues } from '@/types/accommodationTypes';

export function useSubmitAccommodation() {
  return useMutation({
    mutationFn: async (payload: AccommodationFormValues) => {
      const body: AccommodationFormValues = {
        ...payload,
        college_roll_number: (payload.college_roll_number || '').toUpperCase(),
      } as AccommodationFormValues;

      const campusName = (body.college_name || '').trim();
      const isEttimadai =
        campusName === 'Amrita Vishwa Vidyapeetham - Ettimadai';
      if (isEttimadai && body.is_hosteller === true) {
        throw new Error(
          'Amrita CB Hostellers arent eleigible for accomodation',
        );
      }

      return AccommodationService.submit(body);
    },
    onSuccess: () => {
      toast.success('Registration submitted successfully');
    },
    onError: (error: any) => {
      toast.error(error?.message || 'Failed to submit registration');
    },
  });
}

export default useSubmitAccommodation;
