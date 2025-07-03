'use client';

import { useMemo } from 'react';
import { Event } from '@/types/eventTypes';
import { useEventFiltersStore } from '@/stores/useEventFiltersStore';
import { filterAndSortEvents } from '@/lib/eventFilterUtils';

interface UseEventFiltersReturn {
  filteredEvents: Event[];
  showFilters: boolean;
  toggleFilters: () => void;
  resetFilters: () => void;
  categories: string[];
  dayOptions: { label: string; value: string }[];
  tags: string[];
}

/**
 * Hook for filtering events on the client-side
 * @param events The original list of events to filter
 * @returns Filtered events and filter state management functions
 */
export function useEventFilters(events: Event[] | undefined): UseEventFiltersReturn {
  const { filters, showFilters, toggleFilters, resetFilters, sortOption } = useEventFiltersStore();

  // Extract unique categories, dates, tags and price range from events
  const categories = useMemo(() => {
    if (!events) return [];
    return [...new Set(events.map((event) => event.eventStatus))];
  }, [events]);

  const dates = useMemo(() => {
    if (!events) return [];
    return [...new Set(events.map((event) => event.eventDate))];
  }, [events]);

  // Map dates to day options - limit to 3 days only
  const dayOptions = useMemo(() => {
    if (!events) return [];
    const uniqueDates = [...new Set(events.map((event) => event.eventDate))];
    // Limit to only 3 days maximum
    const limitedDates = uniqueDates.slice(0, 3);
    return limitedDates.map((date, index) => ({
      label: `Day ${index + 1}`,
      value: date,
    }));
  }, [events]);

  const tags = useMemo(() => {
    if (!events) return [];
    const allTags = events.flatMap((event) => event.tags.map((tag) => tag.tagName));
    return [...new Set(allTags)];
  }, [events]);

  // Apply filters to events
  const filteredEvents = useMemo(() => {
    if (!events) return [];
    return filterAndSortEvents(events, filters, sortOption);
  }, [events, filters, sortOption]);

  return {
    filteredEvents,
    showFilters,
    toggleFilters,
    resetFilters,
    categories,
    dayOptions,
    tags,
  };
}
