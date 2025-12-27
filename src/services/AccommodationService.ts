import { apiGet, apiPost } from '@/lib/api';
import { API_ROUTES } from '@/lib/routes';
import type { AccommodationFormValues } from '@/types/accommodationTypes';

export const AccommodationService = {
  submit: async (payload: AccommodationFormValues) => {
    try {
      const csrfData = await apiGet<{ key: string }>(
        API_ROUTES.ACCOMMODATION.SUBMIT,
      );
      const csrfToken = csrfData.key;

      // console.log('[AccommodationService] payload to submit:', payload);
      // return Promise.resolve({ message: 'mocked', data: payload });

      const res = await apiPost<any>(API_ROUTES.ACCOMMODATION.SUBMIT, payload, {
        headers: {
          'X-Csrf-Token': csrfToken || '',
        },
      });

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
