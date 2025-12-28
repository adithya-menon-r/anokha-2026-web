'use client';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { AccommodationService } from '@/services/AccommodationService';
import type {
  AccommodationFormValues,
  SubmitAccommodationPayload,
} from '@/types/accommodationTypes';

export function useSubmitAccommodation() {
  return useMutation({
    mutationFn: async (payload: AccommodationFormValues) => {
      const { name, email, agree_rules, ...rest } = payload;

      const body: SubmitAccommodationPayload = {
        ...rest,
        college_roll_number: (rest.college_roll_number || '').toUpperCase(),
      };

      const campusName = (body.college_name || '').trim();
      const isEttimadai =
        campusName === 'Amrita Vishwa Vidyapeetham - Ettimadai';
      if (isEttimadai && body.is_hosteller === false) {
        throw new Error(
          'Amrita CBE Day Scholars must directly contact anokhahosp@cb.amrita.edu for accommodation.',
        );
      }

      if (isEttimadai && body.is_hosteller === true) {
        throw new Error(
          "Amrita CBE Hostellers aren't eligible for accommodation",
        );
      }

      return AccommodationService.submit(body);
    },
    onSuccess: () => {
      toast.success('Registration submitted successfully');
    },
    onError: (error: any) => {
      toast.error(error?.message || 'Failed to submit registration', {
        duration: 8000,
      });
    },
  });
}

export default useSubmitAccommodation;
