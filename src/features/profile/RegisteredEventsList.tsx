/*
  Registered Events Tab - displays the user's registered events  
*/

import { ErrorBlock } from '@/components/ErrorBlock';
import { RegisteredEventList } from '@/components/events/RegisteredEvents';
import { RegisteredEventListSkeleton } from '@/components/events/RegisteredEventsSkeleton';
import { useRegisteredEvents } from '@/hooks/useRegisteredEvents';

export default function RegisteredEvents() {
  // TODO : TANSTACK HOOK CALL
  const { data, isLoading, error } = useRegisteredEvents();

  if (isLoading) {
    return <RegisteredEventListSkeleton />;
  }

  if (error) {
    return (
      <ErrorBlock
        title="Unable to load Registered Events"
        message="Please try again later"
      />
    );
  }

  if (!data) {
    return (
      <div className="w-full flex justify-center items-center py-10">
        <p className="text-gray-500 text-center">No Registered Events.</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <RegisteredEventList listOfEvents={data} />
    </div>
  );
}
