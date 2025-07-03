/**
 * Event Filters Types
 */

export type EventFilterOptions = {
  category?: string;
  date?: string;
  tags?: string[];
  searchQuery?: string;
  isRegistrationOpen?: boolean;
  registrationStatus?: 'registered' | 'not-registered' | 'all';
};

export type FilterChangeHandler = (filters: EventFilterOptions) => void;

export enum SortOption {
  RELEVANCE = 'relevance',
  PRICE_LOW_TO_HIGH = 'priceLowToHigh',
  PRICE_HIGH_TO_LOW = 'priceHighToLow',
  DATE_EARLIEST = 'dateEarliest',
  DATE_LATEST = 'dateLatest',
}
