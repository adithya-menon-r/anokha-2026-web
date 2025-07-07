import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { SortOption } from '@/types/eventFilterTypes';

interface EventFiltersProps {
  // All state and handlers from the hook
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
  sortOption: SortOption;
  handleSortChange: (sort: SortOption) => void;
  showTagsDropdown: boolean;
  setShowTagsDropdown: (show: boolean) => void;
  showDaysDropdown: boolean;
  setShowDaysDropdown: (show: boolean) => void;
  clearFilters: () => void;

  // Component props
  categories: string[];
  dayOptions: { label: string; value: string }[];
  tags: string[];
  showFilters?: boolean;
  toggleFilters?: () => void;
}

/**
 * Pure presentational EventFilters component
 * All state management is handled by useEventFilters hook
 */
export function EventFilters({
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
  sortOption,
  handleSortChange,
  showTagsDropdown,
  setShowTagsDropdown,
  showDaysDropdown,
  setShowDaysDropdown,
  clearFilters,
  dayOptions,
  tags,
  showFilters = false,
  toggleFilters,
}: EventFiltersProps) {
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
              value={sortOption}
              onChange={(e) => handleSortChange(e.target.value as SortOption)}
              className="p-2 border rounded-md bg-white min-w-[140px]"
            >
              <option value={SortOption.RELEVANCE}>Relevance</option>
              <option value={SortOption.DATE_EARLIEST}>Date (Earliest)</option>
              <option value={SortOption.DATE_LATEST}>Date (Latest)</option>
            </select>
          </div>

          {/* Desktop More Filters Button */}
          {toggleFilters && (
            <Button
              variant="outline"
              onClick={toggleFilters}
              className="hidden sm:flex"
            >
              {showFilters ? 'Hide Filters' : 'More Filters'}
            </Button>
          )}

          {/* Mobile "More Filters" button */}
          {toggleFilters && (
            <Button
              variant="outline"
              className="sm:hidden"
              onClick={toggleFilters}
            >
              {showFilters ? 'Hide Filters' : 'More Filters'}
            </Button>
          )}
        </div>
      </div>

      {/* Row 2: Filter Controls - visible based on showFilters */}
      {showFilters && (
        <Card className="p-4 bg-gray-50">
          <div className="space-y-4">
            {/* Row 2 Layout - Responsive grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {/* Tags Multi-select Dropdown */}
              {tags.length > 0 && (
                <div className="relative">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setShowTagsDropdown(!showTagsDropdown);
                      setShowDaysDropdown(false); // Close other dropdown
                    }}
                    className="w-full justify-between h-10"
                  >
                    {selectedTags.length > 0
                      ? `${selectedTags.length} tags`
                      : 'Tags'}
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <title>Dropdown arrow</title>
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
              )}

              {/* Days Multi-select Dropdown */}
              {dayOptions.length > 0 && (
                <div className="relative">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setShowDaysDropdown(!showDaysDropdown);
                      setShowTagsDropdown(false); // Close other dropdown
                    }}
                    className="w-full justify-between h-10"
                  >
                    {selectedDays.length > 0
                      ? `${selectedDays.length} days`
                      : 'Event Days'}
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <title>Dropdown arrow</title>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </Button>

                  {showDaysDropdown && (
                    <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg">
                      <div className="p-2 space-y-1">
                        {dayOptions.map((day) => (
                          <label
                            key={day.value}
                            className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              checked={selectedDays.includes(day.value)}
                              onChange={() => handleDayClick(day.value)}
                              className="rounded"
                            />
                            <span className="text-sm">{day.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Workshop/Event Toggle Group */}
              <div>
                <ToggleGroup
                  key={`eventType-${eventType}-clear`}
                  type="single"
                  value={eventType === 'all' ? undefined : eventType}
                  onValueChange={(value) =>
                    handleEventTypeChange(
                      (value as 'workshop' | 'event') || 'all',
                    )
                  }
                  className="inline-flex bg-muted/50 p-0.5 rounded-lg border border-border/50 overflow-hidden"
                >
                  <ToggleGroupItem
                    value="workshop"
                    size="sm"
                    className="rounded-none border-0 data-[state=on]:bg-background data-[state=on]:shadow-sm data-[state=on]:scale-100 transition-all duration-200"
                  >
                    Workshop
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="event"
                    size="sm"
                    className="rounded-none border-0 data-[state=on]:bg-background data-[state=on]:shadow-sm data-[state=on]:scale-100 transition-all duration-200"
                  >
                    Event
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>

              {/* Technical/Non-technical Toggle Group */}
              <div>
                <ToggleGroup
                  key={`technicalType-${technicalType}-clear`}
                  type="single"
                  value={technicalType === 'all' ? undefined : technicalType}
                  onValueChange={(value) =>
                    handleTechnicalTypeChange(
                      (value as 'technical' | 'non-technical') || 'all',
                    )
                  }
                  className="inline-flex bg-muted/50 p-0.5 rounded-lg border border-border/50 overflow-hidden"
                >
                  <ToggleGroupItem
                    value="technical"
                    size="sm"
                    className="rounded-none border-0 data-[state=on]:bg-background data-[state=on]:shadow-sm data-[state=on]:scale-100 transition-all duration-200"
                  >
                    Technical
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="non-technical"
                    size="sm"
                    className="rounded-none border-0 data-[state=on]:bg-background data-[state=on]:shadow-sm data-[state=on]:scale-100 transition-all duration-200"
                  >
                    Non-Tech
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>

              {/* Registration Status Toggle Group */}
              <div>
                <ToggleGroup
                  key={`registrationStatus-${registrationStatus}-clear`}
                  type="single"
                  value={
                    registrationStatus === 'all'
                      ? undefined
                      : registrationStatus
                  }
                  onValueChange={(value) =>
                    handleRegistrationStatusChange(
                      (value as 'registered' | 'not-registered') || 'all',
                    )
                  }
                  className="inline-flex bg-muted/50 p-0.5 rounded-lg border border-border/50 overflow-hidden"
                >
                  <ToggleGroupItem
                    value="registered"
                    size="sm"
                    className="rounded-none border-0 data-[state=on]:bg-background data-[state=on]:shadow-sm data-[state=on]:scale-100 transition-all duration-200"
                  >
                    Registered
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="not-registered"
                    size="sm"
                    className="rounded-none border-0 data-[state=on]:bg-background data-[state=on]:shadow-sm data-[state=on]:scale-100 transition-all duration-200"
                  >
                    Not Registered
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>

              {/* Clear Filters Button - inline */}
              <div className="flex items-center">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearFilters}
                  className="w-full transition-all duration-200 hover:bg-red-50 hover:border-red-200 hover:text-red-700 active:scale-95 active:transition-transform active:duration-75"
                >
                  Clear All
                </Button>
              </div>
            </div>

            {/* Selected filters badges */}
            {(selectedTags.length > 0 || selectedDays.length > 0) && (
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
                {selectedDays.map((day) => {
                  const dayOption = dayOptions.find((d) => d.value === day);
                  return (
                    <Badge
                      key={day}
                      variant="secondary"
                      className="text-xs cursor-pointer"
                      onClick={() => handleDayClick(day)}
                    >
                      {dayOption?.label || day} ✕
                    </Badge>
                  );
                })}
              </div>
            )}
          </div>
        </Card>
      )}
    </div>
  );
}
