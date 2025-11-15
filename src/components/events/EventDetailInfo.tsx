/**
 * EventDetailInfo Component
 *
 * Displays additional event information in a card format:
 * - Price
 * - Status
 * - Team size requirements (for group events)
 * - Registration ID (if registered)
 */

import { AlertCircle, IndianRupee, Users2 } from 'lucide-react';
import type { EventDetails } from '@/types/eventTypes';

interface EventDetailInfoProps {
  event: EventDetails;
}

export default function EventDetailInfo({ event }: EventDetailInfoProps) {
  const isGroup =
    typeof event.isGroup === 'boolean'
      ? event.isGroup
      : event.isGroup === 'true';
  const isRegistered =
    typeof event.isRegistered === 'boolean'
      ? event.isRegistered
      : event.isRegistered === 'true';

  return (
    <div className="w-full bg-card border border-border rounded-lg p-6 space-y-4">
      <h2 className="text-xl font-semibold text-foreground mb-4">
        Event Information
      </h2>

      {/* Price */}
      <div className="flex items-center justify-between py-3 border-b border-border">
        <div className="flex items-center gap-2 text-foreground/80">
          <IndianRupee className="w-5 h-5" />
          <span className="font-medium">Price</span>
        </div>
        <span className="text-lg font-semibold text-foreground">
          {event.eventPrice === '0' || Number(event.eventPrice) === 0
            ? 'Free'
            : `₹${event.eventPrice}`}
        </span>
      </div>

      {/* Event Status */}
      <div className="flex items-center justify-between py-3 border-b border-border">
        <div className="flex items-center gap-2 text-foreground/80">
          <AlertCircle className="w-5 h-5" />
          <span className="font-medium">Status</span>
        </div>
        <span
          className={`font-semibold ${
            event.eventStatus === 'OPEN'
              ? 'text-green-500'
              : event.eventStatus === 'CLOSED'
                ? 'text-red-500'
                : 'text-yellow-500'
          }`}
        >
          {event.eventStatus}
        </span>
      </div>

      {/* Team Size (for group events) */}
      {isGroup && (
        <div className="flex items-center justify-between py-3 border-b border-border">
          <div className="flex items-center gap-2 text-foreground/80">
            <Users2 className="w-5 h-5" />
            <span className="font-medium">Min Team Size</span>
          </div>
          <span className="text-lg font-semibold text-foreground">
            {event.minTeamSize || 1} members
          </span>
        </div>
      )}

      {/* Registration ID (if registered) */}
      {isRegistered && event.registrationId && (
        <div className="py-3">
          <div className="flex items-center gap-2 text-foreground/80 mb-2">
            <span className="font-medium">Registration ID</span>
          </div>
          <code className="block w-full bg-muted px-3 py-2 rounded text-sm font-mono text-foreground break-all">
            {event.registrationId}
          </code>
        </div>
      )}

      {/* Seats Information */}
      <div className="py-3">
        <div className="flex items-center justify-between mb-2">
          <span className="font-medium text-foreground/80">
            Seats Available
          </span>
          <span className="font-semibold text-foreground">
            {event.maxSeats - event.seatsFilled} / {event.maxSeats}
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
          <div
            className={`h-full transition-all ${
              event.seatsFilled / event.maxSeats > 0.8
                ? 'bg-red-500'
                : event.seatsFilled / event.maxSeats > 0.5
                  ? 'bg-yellow-500'
                  : 'bg-green-500'
            }`}
            style={{ width: `${(event.seatsFilled / event.maxSeats) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
