import { type EventFilterOptions, SortOption } from '@/types/eventFilterTypes';
import type { Event } from '@/types/eventTypes'; // Make sure your Event type includes 'isGroup: boolean;'

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
export const filterEvents = (
  events: Event[],
  filters: EventFilterOptions,
): Event[] => {
  if (!events || events.length === 0) return [];
  if (!filters || Object.keys(filters).length === 0) return events;

  return events.filter((event) => {
    const getTagLabel = (tag: string) => tag || '';

    if (filters.category) {
      const eventTagNames = event.tags.map((tag) =>
        getTagLabel(tag).toLowerCase(),
      );
      if (!eventTagNames.includes(filters.category.toLowerCase())) {
        return false;
      }
    }

    // Filter by days (multi-select support)
    if (filters.days && filters.days.length > 0) {
      if (!filters.days.includes(event.event_date)) {
        return false;
      }
    }

    // Filter by tags
    if (filters.tags && filters.tags.length > 0) {
      const eventTagNames = event.tags.map((tag) =>
        getTagLabel(tag).toLowerCase(),
      );
      const filterTagsLower = filters.tags.map((tag) => tag.toLowerCase());

      // Check if any of the tags match
      if (!filterTagsLower.some((tag) => eventTagNames.includes(tag))) {
        return false;
      }
    }

    // Filter by registration status using event.isRegistered
    if (filters.registrationStatus && filters.registrationStatus !== 'all') {
      if (filters.registrationStatus === 'registered' && !event.is_registered) {
        return false;
      }
      if (
        filters.registrationStatus === 'not-registered' &&
        event.is_registered
      ) {
        return false;
      }
    }

    // Filter by event type (Workshop/Event)
    if (filters.eventType && filters.eventType !== 'all') {
      const backendType = event.event_type.toLowerCase();
      if (filters.eventType === 'workshop' && backendType !== 'workshop') {
        return false;
      }
      if (filters.eventType === 'event' && backendType !== 'event') {
        return false;
      }
    }

    // Filter by technical type
    if (filters.technicalType && filters.technicalType !== 'all') {
      if (filters.technicalType === 'technical' && !event.is_technical) {
        return false;
      }
      if (filters.technicalType === 'non-technical' && event.is_technical) {
        return false;
      }
    }

    // Add Filter by participation type (Individual/Group)
    if (filters.participationType && filters.participationType !== 'all') {
      if (filters.participationType === 'individual' && event.is_group) {
        return false; // If filter is 'individual', and event is group, exclude.
      }
      if (filters.participationType === 'group' && !event.is_group) {
        return false; // If filter is 'group', and event is individual, exclude.
      }
    }

    // Filter by search query (search in name and description)
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      const nameMatch = event.event_name.toLowerCase().includes(query);
      const descriptionMatch = event.event_description
        .toLowerCase()
        .includes(query);

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
export const sortEvents = (
  events: Event[],
  sortOption: SortOption,
): Event[] => {
  if (!events || events.length === 0) return [];

  const sortedEvents = [...events];

  const compareStarred = (a: Event, b: Event) => {
    if (a.isStarred && !b.isStarred) return -1;
    if (!a.isStarred && b.isStarred) return 1;
    return 0;
  };

  switch (sortOption) {
    case SortOption.DATE_EARLIEST:
      return sortedEvents.sort((a, b) => {
        const starredDiff = compareStarred(a, b);
        if (starredDiff !== 0) return starredDiff;

        // const dateA = new Date(`${a.eventDate} ${a.eventTime}`);
        // const dateB = new Date(`${b.eventDate} ${b.eventTime}`);
        const dateA = new Date(`${a.event_date}`);
        const dateB = new Date(`${b.event_date}`);
        return dateA.getTime() - dateB.getTime();
      });

    case SortOption.DATE_LATEST:
      return sortedEvents.sort((a, b) => {
        const starredDiff = compareStarred(a, b);
        if (starredDiff !== 0) return starredDiff;

        // const dateA = new Date(`${a.eventDate} ${a.eventTime}`);
        // const dateB = new Date(`${b.eventDate} ${b.eventTime}`);
        const dateA = new Date(`${a.event_date}`);
        const dateB = new Date(`${b.event_date}`);
        return dateB.getTime() - dateA.getTime();
      });

    default:
      // By default, do not change the order (assume the backend returns relevant results)
      return sortedEvents.sort((a, b) => compareStarred(a, b));
  }
};
