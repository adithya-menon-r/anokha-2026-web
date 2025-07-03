import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { useEventFiltersStore } from '@/stores/useEventFiltersStore';
import { EventFilterOptions, SortOption } from '@/types/eventFilterTypes';
import { Card } from '@/components/ui/card';

interface EventFiltersProps {
  categories: string[];
  dayOptions: { label: string; value: string }[];
  tags: string[];
  showMobileFilters?: boolean;
  showFilters?: boolean;
  toggleFilters?: () => void;
}

/**
 * Reusable EventFilters component with improved UI
 * Features reactive search, toggle groups for better UX, and registration status filtering
 */
export function EventFilters({
  categories,
  dayOptions,
  tags,
  showMobileFilters = false,
  showFilters = false,
  toggleFilters,
}: EventFiltersProps) {
  // Get filter state from store
  const { filters, setFilters, resetFilters, sortOption, setSortOption } = useEventFiltersStore();

  // Local form state
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(filters.category);
  const [selectedDate, setSelectedDate] = useState<string | undefined>(filters.date);
  const [selectedTags, setSelectedTags] = useState<string[]>(filters.tags || []);
  const [searchQuery, setSearchQuery] = useState<string>(filters.searchQuery || '');
  const [selectedSort, setSelectedSort] = useState<SortOption>(sortOption);
  const [registrationStatus, setRegistrationStatus] = useState<string>(
    filters.registrationStatus || 'all',
  );
  const [showTagsDropdown, setShowTagsDropdown] = useState(false);
  const [showMoreFilters, setShowMoreFilters] = useState(false);

  // Update local form state when filters change in store
  useEffect(() => {
    setSelectedCategory(filters.category);
    setSelectedDate(filters.date);
    setSelectedTags(filters.tags || []);
    setSearchQuery(filters.searchQuery || '');
    setRegistrationStatus(filters.registrationStatus || 'all');
  }, [filters]);

  // Update local form state when sortOption changes in store
  useEffect(() => {
    setSelectedSort(sortOption);
  }, [sortOption]);

  // Reactive search - update filters as user types
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setFilters({ ...filters, searchQuery });
    }, 300); // 300ms debounce

    return () => clearTimeout(timeoutId);
  }, [searchQuery, setFilters, filters]);

  const handleCategoryClick = (category: string) => {
    // If clicking the same category, deselect it
    const newCategory = selectedCategory === category ? undefined : category;
    setSelectedCategory(newCategory);
    setFilters({ ...filters, category: newCategory });
  };

  const handleDateClick = (date: string) => {
    // If clicking the same date, deselect it
    const newDate = selectedDate === date ? undefined : date;
    setSelectedDate(newDate);
    setFilters({ ...filters, date: newDate });
  };

  const handleTagClick = (tag: string) => {
    const newSelectedTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];

    setSelectedTags(newSelectedTags);
    setFilters({ ...filters, tags: newSelectedTags.length > 0 ? newSelectedTags : undefined });
  };

  const handleRegistrationStatusChange = (status: string) => {
    setRegistrationStatus(status);
    setFilters({
      ...filters,
      registrationStatus: status as 'registered' | 'not-registered' | 'all',
    });
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSort = e.target.value as SortOption;
    setSelectedSort(newSort);
    setSortOption(newSort);
  };

  const handleClearFilters = () => {
    setSelectedCategory(undefined);
    setSelectedDate(undefined);
    setSelectedTags([]);
    setSearchQuery('');
    setRegistrationStatus('all');
    resetFilters();
  };

  return (
    <div className="w-full space-y-4">
      {/* Row 1: Search, Sort, and Toggle Filters Button */}
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <div className="flex-1 w-full">
          <Input
            type="text"
            placeholder="Search events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>

        <div className="flex gap-2">
          <div className="flex-shrink-0">
            <select
              value={selectedSort}
              onChange={handleSortChange}
              className="p-2 border rounded-md bg-white min-w-[140px]"
            >
              <option value={SortOption.RELEVANCE}>Relevance</option>
              <option value={SortOption.DATE_EARLIEST}>Date (Earliest)</option>
              <option value={SortOption.DATE_LATEST}>Date (Latest)</option>
              <option value={SortOption.PRICE_LOW_TO_HIGH}>Price (Low to High)</option>
              <option value={SortOption.PRICE_HIGH_TO_LOW}>Price (High to Low)</option>
            </select>
          </div>

          {/* Desktop Show/Hide Filters Button */}
          {toggleFilters && (
            <Button variant="outline" onClick={toggleFilters} className="hidden sm:flex">
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </Button>
          )}

          {/* Mobile "More Filters" button */}
          <Button
            variant="outline"
            className="sm:hidden"
            onClick={() => setShowMoreFilters(!showMoreFilters)}
          >
            {showMoreFilters ? 'Hide Filters' : 'More Filters'}
          </Button>
        </div>
      </div>

      {/* Row 2: Filter Controls - visible based on showFilters (desktop) or showMoreFilters (mobile) */}
      {(showFilters || showMoreFilters) && (
        <Card className="p-4 bg-gray-50">
          <div className="space-y-4">
            {/* Row 2 Layout - Grid for desktop, stack for mobile */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Tags */}
              {tags.length > 0 && (
                <div>
                  <div className="relative">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowTagsDropdown(!showTagsDropdown)}
                      className="w-full justify-between h-10"
                    >
                      {selectedTags.length > 0 ? `${selectedTags.length} tags` : 'Tags'}
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </Button>

                    {showTagsDropdown && (
                      <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-y-auto">
                        <div className="p-2 space-y-1">
                          {tags.map((tag) => (
                            <label
                              key={tag}
                              className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded cursor-pointer"
                            >
                              <input
                                type="checkbox"
                                checked={selectedTags.includes(tag)}
                                onChange={() => handleTagClick(tag)}
                                className="rounded"
                              />
                              <span className="text-sm">{tag}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Categories */}
              {categories.length > 0 && (
                <div>
                  <ToggleGroup
                    type="single"
                    value={selectedCategory || ''}
                    onValueChange={(value) => {
                      // If same value is clicked, deselect it
                      const newCategory = value === selectedCategory ? undefined : value;
                      setSelectedCategory(newCategory);
                      setFilters({ ...filters, category: newCategory });
                    }}
                  >
                    {categories.map((category) => (
                      <ToggleGroupItem key={category} value={category} variant="outline" size="sm">
                        {category}
                      </ToggleGroupItem>
                    ))}
                  </ToggleGroup>
                </div>
              )}

              {/* Event Days */}
              {dayOptions.length > 0 && (
                <div>
                  <ToggleGroup
                    type="single"
                    value={selectedDate || ''}
                    onValueChange={(value) => {
                      // If same value is clicked, deselect it
                      const newDate = value === selectedDate ? undefined : value;
                      setSelectedDate(newDate);
                      setFilters({ ...filters, date: newDate });
                    }}
                  >
                    {dayOptions.map((day) => (
                      <ToggleGroupItem
                        key={day.value}
                        value={day.value}
                        variant="outline"
                        size="sm"
                      >
                        {day.label}
                      </ToggleGroupItem>
                    ))}
                  </ToggleGroup>
                </div>
              )}

              {/* Registration Status */}
              <div>
                <ToggleGroup
                  type="single"
                  value={registrationStatus}
                  onValueChange={(value) => {
                    const newStatus = value || 'all';
                    setRegistrationStatus(newStatus);
                    setFilters({
                      ...filters,
                      registrationStatus: newStatus as 'registered' | 'not-registered' | 'all',
                    });
                  }}
                >
                  <ToggleGroupItem value="all" variant="outline" size="sm">
                    All
                  </ToggleGroupItem>
                  <ToggleGroupItem value="registered" variant="outline" size="sm">
                    Registered
                  </ToggleGroupItem>
                  <ToggleGroupItem value="not-registered" variant="outline" size="sm">
                    Not Registered
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>
            </div>

            {/* Selected tags display */}
            {selectedTags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {selectedTags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="text-xs cursor-pointer"
                    onClick={() => handleTagClick(tag)}
                  >
                    {tag} ✕
                  </Badge>
                ))}
              </div>
            )}

            {/* Clear filters button */}
            <div className="flex justify-end">
              <Button variant="outline" size="sm" onClick={handleClearFilters}>
                Clear All Filters
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
