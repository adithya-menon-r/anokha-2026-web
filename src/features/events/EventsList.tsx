'use client';

import { ErrorBlock } from '@/components/ErrorBlock';
import { EventCard } from '@/components/events/EventCard';
import { EventCardSkeleton } from '@/components/events/EventCardSkeleton';
import { EventFilters } from '@/components/events/EventFilters';
import { EventFiltersSkeleton } from '@/components/events/EventFiltersSkeleton';
import { useAllEvents } from '@/hooks/useAllEvents';
import { useEventFilters } from '@/hooks/useEventFilters';

export default function EventsList() {
  // Fetch all events
  const { data: allEvents, isLoading, isError } = useAllEvents();

  // Use the event filtering hook - all state management is here
  const {
    filteredEvents,
    showFilters,
    toggleFilters,
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
    participationType,
    handleParticipationTypeChange,
    registrationStatus,
    handleRegistrationStatusChange,
    sortOption,
    handleSortChange,
    showTagsDropdown,
    setShowTagsDropdown,
    showDaysDropdown,
    setShowDaysDropdown,
    clearFilters,
  } = useEventFilters(allEvents);

  // Loading state
  if (isLoading) {
    return (
      <div className="w-full">
        <EventFiltersSkeleton />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <EventCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  // Error state - no retry button as requested
  if (isError || !allEvents) {
    return (
      <ErrorBlock
        title="Unable to load events"
        message="Please try again later"
      />
    );
  }

  // Regular render with events
  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <p className="text-sm text-gray-600">
          Showing {filteredEvents.length} of {allEvents.length} events
        </p>
      </div>

      <div className="space-y-6">
        {/* Filters - Pass all props from hook */}
        <div className="w-full">
          <EventFilters
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedTags={selectedTags}
            handleTagClick={handleTagClick}
            selectedDays={selectedDays}
            handleDayClick={handleDayClick}
            eventType={eventType}
            handleEventTypeChange={handleEventTypeChange}
            technicalType={technicalType}
            participationType={participationType}
            handleParticipationTypeChange={handleParticipationTypeChange}
            handleTechnicalTypeChange={handleTechnicalTypeChange}
            registrationStatus={registrationStatus}
            handleRegistrationStatusChange={handleRegistrationStatusChange}
            sortOption={sortOption}
            handleSortChange={handleSortChange}
            showTagsDropdown={showTagsDropdown}
            setShowTagsDropdown={setShowTagsDropdown}
            showDaysDropdown={showDaysDropdown}
            setShowDaysDropdown={setShowDaysDropdown}
            clearFilters={clearFilters}
            categories={categories}
            dayOptions={dayOptions}
            tags={tags}
            showFilters={showFilters}
            toggleFilters={toggleFilters}
          />
        </div>

        {/* Events Grid - Full width */}
        <div className="w-full">
          {filteredEvents.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">
                No events match your current filters
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredEvents.map((event) => (
                <EventCard key={event.eventId} event={event} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
