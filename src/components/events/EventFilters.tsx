import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useEventFiltersStore } from '@/stores/useEventFiltersStore';
import { EventFilterOptions, SortOption } from '@/types/eventFilterTypes';
import { Card } from '@/components/ui/card';

interface EventFiltersProps {
  categories: string[];
  dayOptions: { label: string; value: string }[];
  tags: string[];
  showMobileFilters?: boolean;
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
    const newCategory = selectedCategory === category ? undefined : category;
    setSelectedCategory(newCategory);
    setFilters({ ...filters, category: newCategory });
  };

  const handleDateClick = (date: string) => {
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
      {/* Always visible search bar */}
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

          {/* Mobile "More Filters" button */}
          <Button
            variant="outline"
            className="sm:hidden"
            onClick={() => setShowMoreFilters(!showMoreFilters)}
          >
            More Filters
          </Button>
        </div>
      </div>

      {/* Filter panel - hidden on mobile unless showMoreFilters is true */}
      <Card className={`p-4 bg-gray-50 ${showMoreFilters ? 'block' : 'hidden sm:block'}`}>
        <div className="space-y-4">
          {/* Category toggle group */}
          {categories.length > 0 && (
            <div>
              <Label className="text-sm font-medium mb-2 block">Category</Label>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleCategoryClick(category)}
                    className="h-8 text-xs"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Day toggle group */}
          {dayOptions.length > 0 && (
            <div>
              <Label className="text-sm font-medium mb-2 block">Event Day</Label>
              <div className="flex flex-wrap gap-2">
                {dayOptions.map((day) => (
                  <Button
                    key={day.value}
                    variant={selectedDate === day.value ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleDateClick(day.value)}
                    className="h-8 text-xs"
                  >
                    {day.label}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Registration status toggle group */}
          <div>
            <Label className="text-sm font-medium mb-2 block">Registration Status</Label>
            <div className="flex flex-wrap gap-2">
              {[
                { label: 'All', value: 'all' },
                { label: 'Registered', value: 'registered' },
                { label: 'Not Registered', value: 'not-registered' },
              ].map((status) => (
                <Button
                  key={status.value}
                  variant={registrationStatus === status.value ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleRegistrationStatusChange(status.value)}
                  className="h-8 text-xs"
                >
                  {status.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Tags multiselect dropdown */}
          {tags.length > 0 && (
            <div>
              <Label className="text-sm font-medium mb-2 block">Tags</Label>
              <div className="relative">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowTagsDropdown(!showTagsDropdown)}
                  className="w-full justify-between h-10"
                >
                  {selectedTags.length > 0 ? `${selectedTags.length} tags selected` : 'Select tags'}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

              {/* Selected tags display */}
              {selectedTags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
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
            </div>
          )}

          {/* Clear filters button */}
          <div className="flex justify-end pt-2">
            <Button variant="outline" size="sm" onClick={handleClearFilters}>
              Clear All Filters
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
