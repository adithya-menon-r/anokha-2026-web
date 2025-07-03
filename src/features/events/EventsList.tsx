'use client';

import { useAllEvents } from '@/hooks/useAllEvents';
import { useEventFilters } from '@/hooks/useEventFilters';
import { EventCard } from '@/components/events/EventCard';
import { EventCardSkeleton } from '@/components/events/EventCardSkeleton';
import { EventFilters } from '@/components/events/EventFilters';
import { EventFiltersSkeleton } from '@/components/events/EventFiltersSkeleton';
import { ErrorBlock } from '@/components/ErrorBlock';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function EventsList() {
  // Mobile filters state
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Fetch all events
  const { data: allEvents, isLoading, isError, refetch } = useAllEvents();

  // Use the event filtering hook
  const { filteredEvents, showFilters, toggleFilters, categories, dayOptions, tags } =
    useEventFilters(allEvents);

  // Loading state
  if (isLoading) {
    return (
      <div className="w-full">
        <div className="flex justify-between items-center mb-6">
          <p className="text-sm text-gray-600">Loading events...</p>
        </div>

        <div className="space-y-6">
          {/* Filters Skeleton */}
          <div className="w-full">
            <EventFiltersSkeleton />
          </div>

          {/* Events Grid Skeleton */}
          <div className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <EventCardSkeleton key={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (isError || !allEvents) {
    return (
      <ErrorBlock
        title="Unable to load events"
        message="Please try again later"
        onRetry={() => refetch()}
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
        {/* Filters - Always visible on desktop, toggleable on mobile */}
        <div className="w-full">
          <EventFilters
            categories={categories}
            dayOptions={dayOptions}
            tags={tags}
            showMobileFilters={showMobileFilters}
            showFilters={showFilters}
            toggleFilters={toggleFilters}
          />
        </div>

        {/* Events Grid - Full width */}
        <div className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredEvents.map((event) => (
              <EventCard key={event.eventId} event={event} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
