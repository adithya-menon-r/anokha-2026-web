'use client';

import { useAllEvents } from '@/hooks/useAllEvents';
import { useEventFilters } from '@/hooks/useEventFilters';
import { EventCard } from '@/components/events/EventCard';
import { EventCardSkeleton } from '@/components/events/EventCardSkeleton';
import { EventFilters } from '@/components/events/EventFilters';
import { EventFiltersSkeleton } from '@/components/events/EventFiltersSkeleton';
import { Button } from '@/components/ui/button';

export default function EventsList() {
  // Fetch all events
  const { data: allEvents, isLoading, isError } = useAllEvents();

  // Use the event filtering hook
  const { filteredEvents, showFilters, toggleFilters, categories, dates, tags, priceRange } =
    useEventFilters(allEvents);

  // Loading state
  if (isLoading) {
    return (
      <div className="w-full">
        <div className="flex justify-between items-center mb-6">
          <div></div>
          <Button variant="outline" disabled className="opacity-50">
            Show Filters
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Skeleton - Hidden by default */}
          {false && (
            <div className="lg:col-span-1">
              <EventFiltersSkeleton />
            </div>
          )}

          {/* Events Grid Skeleton */}
          <div className="lg:col-span-4">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
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
      <div className="text-center py-10">
        <h2 className="text-xl font-semibold text-red-500 mb-2">Unable to load events</h2>
        <p className="text-gray-600">Please try again later</p>
      </div>
    );
  }

  // Empty state
  if (allEvents.length === 0) {
    return (
      <div className="text-center py-10">
        <h2 className="text-xl font-semibold mb-2">No events found</h2>
        <p className="text-gray-600">Check back later for upcoming events</p>
      </div>
    );
  }

  // Empty search results
  if (filteredEvents.length === 0) {
    return (
      <div className="w-full">
        <div className="flex justify-between items-center mb-6">
          <div></div>
          <Button variant="outline" onClick={toggleFilters}>
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </Button>
        </div>

        <div className="space-y-6">
          {/* Filters - Now horizontal */}
          {showFilters && (
            <div className="w-full">
              <EventFilters
                categories={categories}
                dates={dates}
                tags={tags}
                priceRange={priceRange}
              />
            </div>
          )}

          {/* No results message */}
          <div className="text-center py-10">
            <h2 className="text-xl font-semibold mb-2">No events match your filters</h2>
            <p className="text-gray-600 mb-4">Try adjusting your filter criteria</p>
            <Button onClick={() => toggleFilters()} variant="default">
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Regular render with events
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <p className="text-sm text-gray-600">
          Showing {filteredEvents.length} of {allEvents.length} events
        </p>
        <Button variant="outline" onClick={toggleFilters}>
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </Button>
      </div>

      <div className="space-y-6">
        {/* Filters - Now horizontal */}
        {showFilters && (
          <div className="w-full">
            <EventFilters
              categories={categories}
              dates={dates}
              tags={tags}
              priceRange={priceRange}
            />
          </div>
        )}

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
