import { create } from 'zustand';
import { EventFilterOptions, SortOption } from '@/types/eventFilterTypes';

/**
 * EventFilters UI Store
 * Manages UI-related state for event filtering features
 */
type EventFiltersStoreState = {
  // UI state
  showFilters: boolean;
  toggleFilters: () => void;

  // Filters state
  filters: EventFilterOptions;
  setFilters: (filters: EventFilterOptions) => void;
  resetFilters: () => void;

  // Sorting state
  sortOption: SortOption;
  setSortOption: (option: SortOption) => void;
};

export const useEventFiltersStore = create<EventFiltersStoreState>((set) => ({
  // UI state
  showFilters: false,
  toggleFilters: () => set((state) => ({ showFilters: !state.showFilters })),

  // Filters state
  filters: {},
  setFilters: (filters) =>
    set((state) => ({
      filters: { ...state.filters, ...filters },
    })),
  resetFilters: () => set({ filters: {} }),

  // Sorting state
  sortOption: SortOption.RELEVANCE,
  setSortOption: (option) => set({ sortOption: option }),
}));
