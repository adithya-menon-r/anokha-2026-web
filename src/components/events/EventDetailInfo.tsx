/**
 * EventDetailInfo Component
 *
 * Displays additional event information in a card format:
 * - Price
 * - Status
 * - Team size requirements (for group events)
 * - Registration ID (if registered)
 * - Organizers
 */

import { AlertCircle, Building2, IndianRupee, Users2 } from 'lucide-react';
import type { EventDetails } from '@/types/eventTypes';

interface EventDetailInfoProps {
  event: EventDetails;
}

export default function EventDetailInfo({ event }: EventDetailInfoProps) {
  return (
    <div className="w-full bg-card border border-border rounded-lg p-6 space-y-4">
      <h2 className="text-xl font-semibold text-foreground mb-4">
        Event Information
      </h2>

      {/* Price */}
      <div className="flex items-center justify-between py-3 border-b border-border">
        <div className="flex items-center gap-2 text-foreground/80">
          <IndianRupee className="w-5 h-5" />
          <span className="font-medium">
            {event.is_per_head ? 'Price per person' : 'Price per team'}
          </span>
        </div>
        <span className="text-lg font-semibold text-foreground">
          {event.price === 0 ? 'Free' : `₹${event.price}`}
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
            event.event_status === 'OPEN'
              ? 'text-green-500'
              : event.event_status === 'CLOSED'
                ? 'text-red-500'
                : 'text-yellow-500'
          }`}
        >
          {event.event_status}
        </span>
      </div>

      {/* Team Size (for group events) */}
      {event.is_group && (
        <div className="flex items-center justify-between py-3 border-b border-border">
          <div className="flex items-center gap-2 text-foreground/80">
            <Users2 className="w-5 h-5" />
            <span className="font-medium">Team Size</span>
          </div>
          <span className="text-lg font-semibold text-foreground">
            {event.min_teamsize} - {event.max_teamsize} members
          </span>
        </div>
      )}

      {/* Registration ID (if registered) */}
      {event.isRegistered && event.registrationId && (
        <div className="py-3 border-b border-border">
          <div className="flex items-center gap-2 text-foreground/80 mb-2">
            <span className="font-medium">Registration ID</span>
          </div>
          <code className="block w-full bg-muted px-3 py-2 rounded text-sm font-mono text-foreground break-all">
            {event.registrationId}
          </code>
        </div>
      )}

      {/* Seats Information */}
      <div className="py-3 border-b border-border">
        <div className="flex items-center justify-between mb-2">
          <span className="font-medium text-foreground/80">
            Seats Available
          </span>
          <span className="font-semibold text-foreground">
            {event.total_seats - event.seats_filled} / {event.total_seats}
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
          <div
            className={`h-full transition-all ${
              event.seats_filled / event.total_seats > 0.8
                ? 'bg-red-500'
                : event.seats_filled / event.total_seats > 0.5
                  ? 'bg-yellow-500'
                  : 'bg-green-500'
            }`}
            style={{
              width: `${(event.seats_filled / event.total_seats) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Organizers */}
      {event.organizers && event.organizers.length > 0 && (
        <div className="py-3">
          <div className="flex items-center gap-2 text-foreground/80 mb-3">
            <Building2 className="w-5 h-5" />
            <span className="font-medium">Organized By</span>
          </div>
          <div className="space-y-2">
            {event.organizers.map((org, index) => (
              <div
                key={`${org.org_abbreviation}-${index}`}
                className="flex items-center justify-between p-2 bg-muted/50 rounded"
              >
                <div>
                  <div className="font-medium text-sm text-foreground">
                    {org.organizer_name}
                  </div>
                  <div className="text-xs text-foreground/60">
                    {org.org_type}
                  </div>
                </div>
                <span className="text-xs font-mono text-foreground/80 bg-background px-2 py-1 rounded">
                  {org.org_abbreviation}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
