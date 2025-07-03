import { Event } from '@/types/eventTypes';
import { EventFilterOptions, SortOption } from '@/types/eventFilterTypes';

/**
 * Filter and sort events based on the provided filter options
 * @param events The list of events to filter and sort
 * @param filters The filter options
 * @param sortOption The sort option
 * @returns The filtered and sorted events
 */
export const filterAndSortEvents = (
  events: Event[],
  filters: EventFilterOptions,
  sortOption: SortOption = SortOption.RELEVANCE,
): Event[] => {
  if (!events || events.length === 0) return [];

  // First apply filters
  const filteredEvents = filterEvents(events, filters);

  // Then sort the filtered results
  return sortEvents(filteredEvents, sortOption);
};

/**
 * Filter events based on the provided filter options
 * @param events The list of events to filter
 * @param filters The filter options
 * @returns The filtered events
 */
export const filterEvents = (events: Event[], filters: EventFilterOptions): Event[] => {
  if (!events || events.length === 0) return [];
  if (!filters || Object.keys(filters).length === 0) return events;

  return events.filter((event) => {
    // Filter by category
    if (filters.category && event.eventStatus !== filters.category) {
      return false;
    }

    // Filter by date
    if (filters.date && event.eventDate !== filters.date) {
      return false;
    }

    // Filter by tags
    if (filters.tags && filters.tags.length > 0) {
      const eventTagNames = event.tags.map((tag) => tag.tagName.toLowerCase());
      const filterTagsLower = filters.tags.map((tag) => tag.toLowerCase());

      // Check if any of the tags match
      if (!filterTagsLower.some((tag) => eventTagNames.includes(tag))) {
        return false;
      }
    }

    // Filter by registration status
    if (filters.registrationStatus && filters.registrationStatus !== 'all') {
      // This would need to be implemented based on user registration data
      // For now, we'll assume this data is available on the event object
      // You may need to modify this based on your actual data structure
    }

    // Filter by registration status
    if (filters.isRegistrationOpen !== undefined) {
      // Assuming eventStatus "open" means registration is open
      const isOpen = event.eventStatus.toLowerCase() === 'open';
      if (isOpen !== filters.isRegistrationOpen) {
        return false;
      }
    }

    // Filter by search query (search in name and description)
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      const nameMatch = event.eventName.toLowerCase().includes(query);
      const descriptionMatch = event.eventDescription.toLowerCase().includes(query);

      if (!nameMatch && !descriptionMatch) {
        return false;
      }
    }

    return true;
  });
};

/**
 * Sort events based on the provided sort option
 * @param events The list of events to sort
 * @param sortOption The sort option
 * @returns The sorted events
 */
export const sortEvents = (events: Event[], sortOption: SortOption): Event[] => {
  if (!events || events.length === 0) return [];

  const sortedEvents = [...events];

  switch (sortOption) {
    case SortOption.PRICE_LOW_TO_HIGH:
      return sortedEvents.sort((a, b) => a.eventPrice - b.eventPrice);

    case SortOption.PRICE_HIGH_TO_LOW:
      return sortedEvents.sort((a, b) => b.eventPrice - a.eventPrice);

    case SortOption.DATE_EARLIEST:
      return sortedEvents.sort((a, b) => {
        const dateA = new Date(a.eventDate + ' ' + a.eventTime);
        const dateB = new Date(b.eventDate + ' ' + b.eventTime);
        return dateA.getTime() - dateB.getTime();
      });

    case SortOption.DATE_LATEST:
      return sortedEvents.sort((a, b) => {
        const dateA = new Date(a.eventDate + ' ' + a.eventTime);
        const dateB = new Date(b.eventDate + ' ' + b.eventTime);
        return dateB.getTime() - dateA.getTime();
      });

    case SortOption.RELEVANCE:
    default:
      // By default, do not change the order (assume the backend returns relevant results)
      return sortedEvents;
  }
};
