import { apiGet, apiPost } from '@/lib/api';
import { API_ROUTES } from '@/lib/routes';
// import getMockAccommodationStatus from '@/mocks/mockAccommodation';
import type {
  AccommodationFormValues,
  AccommodationStatus,
} from '@/types/accommodationTypes';

export const AccommodationService = {
  getEligibility: async (): Promise<AccommodationStatus> => {
    const res = await apiGet<{ accommodation_status: string }>(
      API_ROUTES.ACCOMMODATION.ELIGIBILITY_CHECK,
    );
    return res.accommodation_status as AccommodationStatus;

    // return getMockAccommodationStatus();
  },

  submit: async (payload: AccommodationFormValues) => {
    try {
      const csrfData = await apiGet<{ key: string }>(
        API_ROUTES.ACCOMMODATION.SUBMIT,
      );
      const csrfToken = csrfData.key;

      // console.log('[AccommodationService] payload to submit:', payload);
      // return Promise.resolve({ message: 'mocked', data: payload });

      const res = await apiPost<{ message: string }>(
        API_ROUTES.ACCOMMODATION.SUBMIT,
        payload,
        {
          headers: {
            'X-Csrf-Token': csrfToken || '',
          },
        },
      );

      return res;
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error.message ||
        'Failed to submit accommodation request.';
      throw new Error(message);
    }
  },
};

export default AccommodationService;
