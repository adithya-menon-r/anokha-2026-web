import type { AccommodationStatus } from '@/types/accommodationTypes';

export let MOCK_ACCOMMODATION_STATUS: AccommodationStatus = 'ELIGIBLE';

export const getMockAccommodationStatus =
  async (): Promise<AccommodationStatus> => {
    console.log(
      '[MOCK] getMockAccommodationStatus -> returning',
      MOCK_ACCOMMODATION_STATUS,
    );
    await new Promise((r) => setTimeout(r, 250));
    return MOCK_ACCOMMODATION_STATUS;
  };

export default getMockAccommodationStatus;
