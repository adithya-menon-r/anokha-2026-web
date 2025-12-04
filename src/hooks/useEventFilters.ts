'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { filterAndSortEvents } from '@/lib/eventFilterUtils';
import { useEventFiltersStore } from '@/stores/useEventFiltersStore';
import { SortOption } from '@/types/eventFilterTypes';
import type { Event } from '@/types/eventTypes';

interface UseEventFiltersReturn {
  filteredEvents: Event[];
  showFilters: boolean;
  toggleFilters: () => void;
  resetFilters: () => void;
  categories: string[];
  dayOptions: { label: string; value: string }[];
  tags: string[];
  // Component state handlers
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedTags: string[];
  handleTagClick: (tag: string) => void;
  selectedDays: string[];
  handleDayClick: (day: string) => void;
  eventType: 'workshop' | 'event' | 'all';
  handleEventTypeChange: (type: 'workshop' | 'event' | 'all') => void;
  technicalType: 'technical' | 'non-technical' | 'all';
  handleTechnicalTypeChange: (
    type: 'technical' | 'non-technical' | 'all',
  ) => void;
  registrationStatus: 'registered' | 'not-registered' | 'all';
  handleRegistrationStatusChange: (
    status: 'registered' | 'not-registered' | 'all',
  ) => void;
  participationType: 'individual' | 'group' | 'all';
  handleParticipationTypeChange: (type: 'individual' | 'group' | 'all') => void;
  sortOption: SortOption;
  handleSortChange: (sort: SortOption) => void;
  showTagsDropdown: boolean;
  setShowTagsDropdown: (show: boolean) => void;
  showDaysDropdown: boolean;
  setShowDaysDropdown: (show: boolean) => void;
  clearFilters: () => void;
}

/**
 * Hook for filtering events on the client-side
 * Manages all filter state and side effects
 * @param events The original list of events to filter
 * @returns Filtered events and filter state management functions
 */
export function useEventFilters(
  events: Event[] | undefined,
): UseEventFiltersReturn {
  const {
    filters,
    showFilters,
    toggleFilters,
    resetFilters,
    sortOption,
    setFilters,
    setSortOption,
  } = useEventFiltersStore();

  // Local component state
  const [searchQuery, setSearchQuery] = useState<string>(
    filters.searchQuery || '',
  );
  const [selectedTags, setSelectedTags] = useState<string[]>(
    filters.tags || [],
  );
  const [selectedDays, setSelectedDays] = useState<string[]>(
    filters.days || [],
  );
  const [eventType, setEventType] = useState<'workshop' | 'event' | 'all'>(
    filters.eventType || 'all',
  );
  const [technicalType, setTechnicalType] = useState<
    'technical' | 'non-technical' | 'all'
  >(filters.technicalType || 'all');
  const [registrationStatus, setRegistrationStatus] = useState<
    'registered' | 'not-registered' | 'all'
  >(filters.registrationStatus || 'all');
  const [participationType, setParticipationType] = useState<
    'individual' | 'group' | 'all'
  >(filters.participationType || 'all');
  const [showTagsDropdown, setShowTagsDropdown] = useState(false);
  const [showDaysDropdown, setShowDaysDropdown] = useState(false);

  // Extract unique categories from tags instead of eventStatus
  const categories = useMemo(() => {
    if (!events || !Array.isArray(events)) return [];
    const allTags = events.flatMap((event) =>
      event.tags.map((tag) => tag.tagName),
    );
    const uniqueTags = [...new Set(allTags)];
    // Return first 5 most common tags as categories
    return uniqueTags.slice(0, 5);
  }, [events]);

  // Map dates to day options - limit to 3 days only
  const dayOptions = useMemo(() => {
    if (!events) return [];
    const uniqueDates = [...new Set(events.map((event) => event.event_date))];
    // Limit to only 3 days maximum
    const limitedDates = uniqueDates.slice(0, 3);
    return limitedDates.map((date, index) => ({
      label: `Day ${index + 1}`,
      value: date,
    }));
  }, [events]);

  const tags = useMemo(() => {
    if (!events || !Array.isArray(events)) return [];
    const allTags = events.flatMap((event) =>
      event.tags.map((tag) => tag.tagName),
    );
    return [...new Set(allTags)];
  }, [events]);

  // Debounced search effect
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setFilters({ ...filters, searchQuery });
    }, 300); // 300ms debounce

    return () => clearTimeout(timeoutId);
  }, [searchQuery, setFilters, filters]);

  // Sync local state with store - this ensures UI stays in sync
  useEffect(() => {
    setSelectedTags(filters.tags || []);
    setSelectedDays(filters.days || []);
    setEventType(filters.eventType || 'all');
    setTechnicalType(filters.technicalType || 'all');
    setRegistrationStatus(filters.registrationStatus || 'all');
    setParticipationType(filters.participationType || 'all');
    setSearchQuery(filters.searchQuery || '');
  }, [filters]);

  // Force cleanup effect to ensure clear state
  useEffect(() => {
    if (!filters.eventType || filters.eventType === 'all') {
      setEventType('all');
    }
    if (!filters.technicalType || filters.technicalType === 'all') {
      setTechnicalType('all');
    }
    if (!filters.registrationStatus || filters.registrationStatus === 'all') {
      setRegistrationStatus('all');
    }
    if (!filters.participationType || filters.participationType === 'all') {
      setParticipationType('all');
    }
  }, [
    filters.eventType,
    filters.technicalType,
    filters.registrationStatus,
    filters.participationType,
  ]);
  filters.participationType;

  // Handlers
  const handleTagClick = useCallback(
    (tag: string) => {
      const newSelectedTags = selectedTags.includes(tag)
        ? selectedTags.filter((t) => t !== tag)
        : [...selectedTags, tag];

      setSelectedTags(newSelectedTags);
      setFilters({
        ...filters,
        tags: newSelectedTags.length > 0 ? newSelectedTags : undefined,
      });
    },
    [selectedTags, filters, setFilters],
  );

  const handleDayClick = useCallback(
    (day: string) => {
      const newSelectedDays = selectedDays.includes(day)
        ? selectedDays.filter((d) => d !== day)
        : [...selectedDays, day];

      setSelectedDays(newSelectedDays);
      setFilters({
        ...filters,
        days: newSelectedDays.length > 0 ? newSelectedDays : undefined,
      });
    },
    [selectedDays, filters, setFilters],
  );

  const handleEventTypeChange = useCallback(
    (type: 'workshop' | 'event' | 'all') => {
      setEventType(type);
      setFilters({ ...filters, eventType: type });
    },
    [filters, setFilters],
  );

  const handleTechnicalTypeChange = useCallback(
    (type: 'technical' | 'non-technical' | 'all') => {
      setTechnicalType(type);
      setFilters({ ...filters, technicalType: type });
    },
    [filters, setFilters],
  );

  const handleRegistrationStatusChange = useCallback(
    (status: 'registered' | 'not-registered' | 'all') => {
      setRegistrationStatus(status);
      setFilters({ ...filters, registrationStatus: status });
    },
    [filters, setFilters],
  );

  const handleParticipationTypeChange = useCallback(
    (type: 'individual' | 'group' | 'all') => {
      setParticipationType(type);
      setFilters({ ...filters, participationType: type });
    },
    [filters, setFilters],
  );

  const handleSortChange = useCallback(
    (sort: SortOption) => {
      setSortOption(sort);
    },
    [setSortOption],
  );

  const clearFilters = useCallback(() => {
    // Close any open dropdowns first
    setShowTagsDropdown(false);
    setShowDaysDropdown(false);

    // Clear store first to avoid conflicts
    resetFilters();
    setSortOption(SortOption.RELEVANCE);

    // Then immediately update local state
    setSelectedTags([]);
    setSelectedDays([]);
    setEventType('all');
    setTechnicalType('all');
    setRegistrationStatus('all');
    setParticipationType('all');
    setSearchQuery('');

    // Force a clean state in the store to ensure consistency
    setTimeout(() => {
      setFilters({
        eventType: 'all',
        technicalType: 'all',
        registrationStatus: 'all',
        participationType: 'all',
        searchQuery: '',
        tags: undefined,
        days: undefined,
      });
    }, 0);
  }, [resetFilters, setFilters, setSortOption]);

  // Apply filters to events
  const filteredEvents = useMemo(() => {
    if (!events || !Array.isArray(events)) return [];
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
    searchQuery,
    setSearchQuery,
    selectedTags,
    handleTagClick,
    selectedDays,
    handleDayClick,
    eventType,
    handleEventTypeChange,
    technicalType,
    handleTechnicalTypeChange,
    registrationStatus,
    handleRegistrationStatusChange,
    participationType,
    handleParticipationTypeChange,
    sortOption,
    handleSortChange,
    showTagsDropdown,
    setShowTagsDropdown,
    showDaysDropdown,
    setShowDaysDropdown,
    clearFilters,
  };
}
