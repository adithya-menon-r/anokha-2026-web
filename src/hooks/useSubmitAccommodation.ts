'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { AccommodationService } from '@/services/AccommodationService';
import type {
  AccommodationFormValues,
  SubmitAccommodationPayload,
} from '@/types/accommodationTypes';

export function useSubmitAccommodation() {
  const router = useRouter();
  const queryClient = useQueryClient();

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
          "Amrita CBE Hostellers aren't eligible for accommodation.",
        );
      }

      return AccommodationService.submit(body);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accommodationStatus'] });
      toast.success('Accommodation request submitted successfully.', {
        style: { maxWidth: '500px' },
      });
      router.push('/events');
    },
    onError: (error: any) => {
      toast.error(error?.message || 'Failed to submit registration', {
        duration: 8000,
        style: { maxWidth: '600px' },
      });
    },
  });
}

export default useSubmitAccommodation;
