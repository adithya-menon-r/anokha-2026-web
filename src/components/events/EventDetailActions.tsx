/**
 * EventDetailActions Component
 *
 * Displays action buttons for the event:
 * - Register button (for non-registered users)
 * - Feedback button (for registered users)
 * - Handles different states based on event status and registration
 */

import { Button } from '@/components/ui/button';
import type { EventDetails } from '@/types/eventTypes';

interface EventDetailActionsProps {
  event: EventDetails;
  onRegister?: () => void;
  onFeedback?: () => void;
  isRegisterLoading?: boolean;
}

export default function EventDetailActions({
  event,
  onRegister,
  onFeedback,
  isRegisterLoading = false,
}: EventDetailActionsProps) {
  const isFull = event.seats_filled >= event.total_seats;
  const isClosed = event.event_status === 'CLOSED';

  // Show feedback button if registered
  if (event.isRegistered && onFeedback) {
    return (
      <div className="w-full">
        <Button
          onClick={onFeedback}
          className="w-full md:w-auto px-8 py-6 text-lg"
          variant="default"
        >
          Give Feedback
        </Button>
      </div>
    );
  }

  // Show register button if not registered
  return (
    <div className="w-full space-y-4">
      {isClosed && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-center">
          Registration is closed for this event
        </div>
      )}

      {isFull && !isClosed && (
        <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg text-yellow-500 text-center">
          This event is full. No more seats available.
        </div>
      )}

      {onRegister && (
        <Button
          onClick={onRegister}
          disabled={isClosed || isFull || isRegisterLoading}
          className="w-full md:w-auto px-8 py-6 text-lg"
          variant="default"
        >
          {isRegisterLoading ? 'Registering...' : 'Register for Event'}
        </Button>
      )}

      {!onRegister && !isClosed && !isFull && (
        <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg text-blue-500 text-center">
          Please log in to register for this event
        </div>
      )}
    </div>
  );
}
