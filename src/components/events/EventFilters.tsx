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
              className="w-full bg-anokha-dark-400/50 border-anokha-blue/30 rounded-md placeholder:text-gray-400"
            />
          </div>
          <div className="flex gap-2">
            <div className="flex-shrink-0">
              <Select
                value={sortOption}
                onValueChange={(value: SortOption) => handleSortChange(value)}
              >
                <SelectTrigger className="w-[140px] bg-anokha-dark-400/50 border-anokha-blue/30 text-foreground">
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
                className="hidden sm:flex"
              >
                {showFilters ? 'Hide Filters' : 'More Filters'}
              </Button>
            )}
            {toggleFilters && (
              <Button
                variant="default"
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
          <Card className="p-4 overflow-visible">
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-8">
                {tags.length > 0 && (
                  <div className="relative">
                    <Button
                      variant="secondaryOutline"
                      size="sm"
                      onClick={() => {
                        setShowTagsDropdown(!showTagsDropdown);
                        setShowDaysDropdown(false);
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
                      <div className="absolute z-10 w-full mt-1 bg-anokha-dark-500 border border-anokha-blue/30 rounded-md shadow-lg max-h-60 overflow-y-auto text-foreground">
                        <div className="p-2 space-y-1">
                          {tags.map((tag) => (
                            <label
                              key={tag}
                              className="flex items-center space-x-2 p-2 hover:bg-anokha-dark-400 rounded cursor-pointer"
                            >
                              <input
                                type="checkbox"
                                checked={selectedTags.includes(tag)}
                                onChange={() => handleTagClick(tag)}
                                className="rounded accent-anokha-blue"
                              />
                              <span className="text-sm">{tag}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
                {dayOptions.length > 0 && (
                  <div className="relative">
                    <Button
                      variant="secondaryOutline"
                      size="sm"
                      onClick={() => {
                        setShowDaysDropdown(!showDaysDropdown);
                        setShowTagsDropdown(false);
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
                      <div className="absolute z-10 w-full mt-1 bg-anokha-dark-500 border border-anokha-blue/30 rounded-md shadow-lg text-foreground">
                        <div className="p-2 space-y-1">
                          {dayOptions.map((day) => (
                            <label
                              key={day.value}
                              className="flex items-center space-x-2 p-2 hover:bg-anokha-dark-400 rounded cursor-pointer"
                            >
                              <input
                                type="checkbox"
                                checked={selectedDays.includes(day.value)}
                                onChange={() => handleDayClick(day.value)}
                                className="rounded accent-anokha-blue"
                              />
                              <span className="text-sm">{day.label}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
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
                    className="inline-flex bg-anokha-dark-500 p-0.5 rounded-lg border border-anokha-blue/30 overflow-hidden"
                  >
                    <ToggleGroupItem
                      value="workshop"
                      size="sm"
                      className="border-0"
                    >
                      Workshop
                    </ToggleGroupItem>
                    <ToggleGroupItem
                      value="event"
                      size="sm"
                      className="border-0"
                    >
                      Event
                    </ToggleGroupItem>
                  </ToggleGroup>
                </div>
                {/* New ToggleGroup for Individual/Group */}
                <div>
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
                      className="border-0"
                    >
                      Individual
                    </ToggleGroupItem>
                    <ToggleGroupItem
                      value="group"
                      size="sm"
                      className="border-0"
                    >
                      Group
                    </ToggleGroupItem>
                  </ToggleGroup>
                </div>
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
                    className="inline-flex bg-anokha-dark-500 p-0.5 rounded-lg border border-anokha-blue/30 overflow-hidden"
                  >
                    <ToggleGroupItem
                      value="technical"
                      size="sm"
                      className="border-0"
                    >
                      Technical
                    </ToggleGroupItem>
                    <ToggleGroupItem
                      value="non-technical"
                      size="sm"
                      className="border-0 whitespace-nowrap"
                    >
                      Non-Tech
                    </ToggleGroupItem>
                  </ToggleGroup>
                </div>
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
                    className="inline-flex bg-anokha-dark-500 p-0.5 rounded-lg border border-anokha-blue/30 overflow-hidden"
                  >
                    <ToggleGroupItem
                      value="registered"
                      size="sm"
                      className="border-0"
                    >
                      Registered
                    </ToggleGroupItem>
                    <ToggleGroupItem
                      value="not-registered"
                      size="sm"
                      className="border-0 whitespace-nowrap"
                    >
                      Not Registered
                    </ToggleGroupItem>
                  </ToggleGroup>
                </div>
                <div className="flex items-center">
                  <Button
                    variant="destructiveOutline"
                    size="sm"
                    onClick={clearFilters}
                    className="w-full md:ml-8"
                  >
                    Clear All
                  </Button>
                </div>
              </div>
              {(selectedTags.length > 0 || selectedDays.length > 0) && (
                <div className="flex flex-wrap gap-1">
                  {selectedTags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="defaultOutline"
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
                        variant="defaultOutline"
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
    </div>
  );
}
