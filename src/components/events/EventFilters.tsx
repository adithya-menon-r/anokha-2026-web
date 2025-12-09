'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
  participationType: 'individual' | 'group' | 'all';
  handleParticipationTypeChange: (type: 'individual' | 'group' | 'all') => void;

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
  participationType,
  handleParticipationTypeChange,
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
  // data-[state=on] forces the blue background when selected
  const toggleItemClasses =
    'border-0 data-[state=on]:bg-anokha-blue data-[state=on]:text-white hover:bg-white/5 transition-colors';

  return (
    <div className="flex flex-col justify-center">
      <div className="w-full space-y-4 mx-auto">
        {/* Row 1: Search, Sort, and Toggle Filters Button */}
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <div className="flex-1 w-full">
            <Input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-anokha-dark-400/50 border-anokha-blue/30 rounded-md placeholder:text-gray-400 focus:border-anokha-blue"
            />
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <Select
                value={sortOption}
                onValueChange={(value: SortOption) => handleSortChange(value)}
              >
                <SelectTrigger className="w-[140px] bg-anokha-dark-400/50 border-anokha-blue/30 text-foreground focus:ring-anokha-blue">
                  <SelectValue placeholder="Relevance" />
                </SelectTrigger>
                <SelectContent className="bg-anokha-dark-500 border-anokha-blue/30 text-foreground">
                  <SelectItem value={SortOption.RELEVANCE}>
                    Relevance
                  </SelectItem>
                  <SelectItem value={SortOption.DATE_EARLIEST}>
                    Date (Earliest)
                  </SelectItem>
                  <SelectItem value={SortOption.DATE_LATEST}>
                    Date (Latest)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            {toggleFilters && (
              <Button
                variant="default"
                onClick={toggleFilters}
                className="hidden sm:flex bg-anokha-blue hover:bg-anokha-blue/80 text-white"
              >
                {showFilters ? 'Hide Filters' : 'More Filters'}
              </Button>
            )}
            {toggleFilters && (
              <Button
                variant="default"
                className="sm:hidden bg-anokha-blue hover:bg-anokha-blue/80 text-white"
                onClick={toggleFilters}
              >
                {showFilters ? 'Hide Filters' : 'More Filters'}
              </Button>
            )}
          </div>
        </div>

        {/* Row 2: Filter Controls - visible based on showFilters */}
        {showFilters && (
          <Card className="p-4 overflow-visible bg-anokha-dark-400/30 border-anokha-blue/20">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                {/* Tags Dropdown */}
                {tags.length > 0 && (
                  <div className="relative w-full md:w-1/6">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setShowTagsDropdown(!showTagsDropdown);
                        setShowDaysDropdown(false);
                      }}
                      className="w-full justify-between h-10 border-anokha-blue/30 hover:bg-anokha-blue/10 hover:text-anokha-blue"
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
                      <div className="absolute z-10 w-full mt-1 bg-anokha-dark-500 border border-anokha-blue/30 rounded-md shadow-lg max-h-60 overflow-y-auto text-foreground">
                        <div className="p-2 space-y-1">
                          {tags.map((tag) => (
                            <label
                              key={tag}
                              className="flex items-center space-x-2 p-2 hover:bg-anokha-dark-400 rounded cursor-pointer transition-colors"
                            >
                              <input
                                type="checkbox"
                                checked={selectedTags.includes(tag)}
                                onChange={() => handleTagClick(tag)}
                                className="rounded accent-anokha-blue bg-transparent border-gray-500"
                              />
                              <span className="text-sm">{tag}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Days Dropdown */}
                {dayOptions.length > 0 && (
                  <div className="relative w-full md:w-fit">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setShowDaysDropdown(!showDaysDropdown);
                        setShowTagsDropdown(false);
                      }}
                      className="w-full justify-between h-10 border-anokha-blue/30 hover:bg-anokha-blue/10 hover:text-anokha-blue"
                    >
                      {selectedDays.length > 0
                        ? `${selectedDays.length} days`
                        : 'Event Days'}
                      <svg
                        className="w-4 h-4 ml-2"
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
                      <div className="absolute z-10 w-full mt-1 bg-anokha-dark-500 border border-anokha-blue/30 rounded-md shadow-lg text-foreground">
                        <div className="p-2 space-y-1">
                          {dayOptions.map((day) => (
                            <label
                              key={day.value}
                              className="flex items-center space-x-2 p-2 hover:bg-anokha-dark-400 rounded cursor-pointer transition-colors"
                            >
                              <input
                                type="checkbox"
                                checked={selectedDays.includes(day.value)}
                                onChange={() => handleDayClick(day.value)}
                                className="rounded accent-anokha-blue bg-transparent border-gray-500"
                              />
                              <span className="text-sm">{day.label}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Event Type Filter */}
                <div className="w-full sm:w-auto">
                  <ToggleGroup
                    key={`eventType-${eventType}-clear`}
                    type="single"
                    value={eventType === 'all' ? undefined : eventType}
                    onValueChange={(value) =>
                      handleEventTypeChange(
                        (value as 'workshop' | 'event') || 'all',
                      )
                    }
                    className="inline-flex bg-anokha-dark-500 p-0.5 rounded-lg border border-anokha-blue/30 overflow-hidden"
                  >
                    <ToggleGroupItem
                      value="workshop"
                      size="sm"
                      className={toggleItemClasses}
                    >
                      Workshop
                    </ToggleGroupItem>
                    <div className="border-l border-anokha-blue/30 h-6 mx-1" />
                    <ToggleGroupItem
                      value="event"
                      size="sm"
                      className={toggleItemClasses}
                    >
                      Event
                    </ToggleGroupItem>
                  </ToggleGroup>
                </div>

                {/* Participation Type Filter */}
                <div className="w-full sm:w-auto">
                  <ToggleGroup
                    key={`participationType-${participationType}-clear`}
                    type="single"
                    value={
                      participationType === 'all'
                        ? undefined
                        : participationType
                    }
                    onValueChange={(value) =>
                      handleParticipationTypeChange(
                        (value as 'individual' | 'group') || 'all',
                      )
                    }
                    className="inline-flex bg-anokha-dark-500 p-0.5 rounded-lg border border-anokha-blue/30 overflow-hidden"
                  >
                    <ToggleGroupItem
                      value="individual"
                      size="sm"
                      className={toggleItemClasses}
                    >
                      Individual
                    </ToggleGroupItem>
                    <div className="border-l border-anokha-blue/30 h-6 mx-1" />
                    <ToggleGroupItem
                      value="group"
                      size="sm"
                      className={toggleItemClasses}
                    >
                      Group
                    </ToggleGroupItem>
                  </ToggleGroup>
                </div>

                {/* Technical Type Filter */}
                <div className="w-full sm:w-auto">
                  <ToggleGroup
                    key={`technicalType-${technicalType}-clear`}
                    type="single"
                    value={technicalType === 'all' ? undefined : technicalType}
                    onValueChange={(value) =>
                      handleTechnicalTypeChange(
                        (value as 'technical' | 'non-technical') || 'all',
                      )
                    }
                    className="inline-flex bg-anokha-dark-500 p-0.5 rounded-lg border border-anokha-blue/30 overflow-hidden"
                  >
                    <ToggleGroupItem
                      value="technical"
                      size="sm"
                      className={toggleItemClasses}
                    >
                      Technical
                    </ToggleGroupItem>
                    <div className="border-l border-anokha-blue/30 h-6 mx-1" />
                    <ToggleGroupItem
                      value="non-technical"
                      size="sm"
                      className={`whitespace-nowrap ${toggleItemClasses}`}
                    >
                      Non-Technical
                    </ToggleGroupItem>
                  </ToggleGroup>
                </div>

                {/* Registration Status Filter */}
                <div className="w-full sm:w-auto">
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
                    className="inline-flex bg-anokha-dark-500 p-0.5 rounded-lg border border-anokha-blue/30 overflow-hidden"
                  >
                    <ToggleGroupItem
                      value="registered"
                      size="sm"
                      className={toggleItemClasses}
                    >
                      Registered
                    </ToggleGroupItem>
                    <div className="border-l border-anokha-blue/30 h-6 mx-1" />
                    <ToggleGroupItem
                      value="not-registered"
                      size="sm"
                      className={`whitespace-nowrap ${toggleItemClasses}`}
                    >
                      Not Registered
                    </ToggleGroupItem>
                  </ToggleGroup>
                </div>

                {/* Clear All Button */}
                <div className="w-full sm:w-auto flex items-center">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearFilters}
                    className="w-full border-red-500/30 text-red-400 hover:text-red-300 hover:bg-red-500/10 hover:border-red-500/50 bg-transparent"
                  >
                    Clear All
                  </Button>
                </div>
              </div>

              {/* Selected Filters Badges */}
              {(selectedTags.length > 0 || selectedDays.length > 0) && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {selectedTags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="text-xs cursor-pointer border-anokha-blue text-anokha-blue hover:bg-anokha-blue hover:text-white transition-colors"
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
                        variant="outline"
                        className="text-xs cursor-pointer border-anokha-blue text-anokha-blue hover:bg-anokha-blue hover:text-white transition-colors"
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
    </div>
  );
}
