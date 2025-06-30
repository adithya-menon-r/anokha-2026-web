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
  dates: string[];
  tags: string[];
  priceRange: [number, number];
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

  const tags = useMemo(() => {
    if (!events) return [];
    const allTags = events.flatMap((event) => event.tags.map((tag) => tag.tagName));
    return [...new Set(allTags)];
  }, [events]);

  const priceRange = useMemo(() => {
    if (!events || events.length === 0) return [0, 0] as [number, number];

    const prices = events.map((event) => event.eventPrice);
    return [Math.min(...prices), Math.max(...prices)] as [number, number];
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
    dates,
    tags,
    priceRange,
  };
}
