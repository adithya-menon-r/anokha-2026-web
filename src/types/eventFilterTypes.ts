/**
 * Event Filters Types
 */

export type EventFilterOptions = {
  category?: string;
  days?: string[]; // Changed to support multi-select
  tags?: string[];
  searchQuery?: string;
  isRegistrationOpen?: boolean;
  registrationStatus?: 'registered' | 'not-registered' | 'all';
  eventType?: 'workshop' | 'event' | 'all';
  technicalType?: 'technical' | 'non-technical' | 'all';
  participationType?: 'individual' | 'group' | 'all';
};

export type FilterChangeHandler = (filters: EventFilterOptions) => void;

export enum SortOption {
  RELEVANCE = 'relevance',
  DATE_EARLIEST = 'dateEarliest',
  DATE_LATEST = 'dateLatest',
}
