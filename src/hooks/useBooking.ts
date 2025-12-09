'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { BookingService } from '@/services/BookingService';
import type {
  BookingResponse,
  GroupBookingPayload,
} from '@/types/bookingTypes';

/**
 * Hook to fetch CSRF token for event booking
 * Should be called when the form/modal is opened
 */
export function useBookingCsrfToken(eventId: string, enabled: boolean = true) {
  return useQuery({
    queryKey: ['bookingCsrf', eventId],
    queryFn: () => BookingService.getCsrfToken(eventId),
    enabled,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Hook for individual event booking
 */
export function useBookIndividualEvent() {
  return useMutation({
    mutationFn: async ({
      eventId,
      csrfToken,
    }: {
      eventId: string;
      csrfToken: string;
    }): Promise<BookingResponse> => {
      return BookingService.bookIndividualEvent(eventId, csrfToken);
    },
    onSuccess: (data) => {
      toast.success(data.message || 'Successfully registered for event!');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to register for event');
    },
  });
}

/**
 * Hook for group event booking
 */
export function useBookGroupEvent() {
  return useMutation({
    mutationFn: async ({
      eventId,
      payload,
      csrfToken,
    }: {
      eventId: string;
      payload: GroupBookingPayload;
      csrfToken: string;
    }): Promise<BookingResponse> => {
      return BookingService.bookGroupEvent(eventId, payload, csrfToken);
    },
    onSuccess: (data) => {
      toast.success(data.message || 'Team registered successfully!');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to register team');
    },
  });
}
