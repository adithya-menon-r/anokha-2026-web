/**
 * EventDetailInfo Component
 *
 * Displays organizers information in a card format
 */

import { Building2 } from 'lucide-react';
import type { EventDetails } from '@/types/eventTypes';

interface EventDetailInfoProps {
  event: EventDetails;
}

export default function EventDetailInfo({ event }: EventDetailInfoProps) {
  if (!event.organizers || event.organizers.length === 0) {
    return null;
  }

  return (
    <div className="w-full bg-card border border-border rounded-lg p-6">
      <div className="flex items-center gap-2 text-foreground/80 mb-4">
        <Building2 className="w-5 h-5" />
        <h2 className="text-xl font-semibold text-foreground">Organized By</h2>
      </div>
      <div className="space-y-2">
        {event.organizers.map((org, index) => (
          <div
            key={`${org.org_abbreviation}-${index}`}
            className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
          >
            <div>
              <div className="font-medium text-sm text-foreground">
                {org.organizer_name}
              </div>
              <div className="text-xs text-foreground/60">{org.org_type}</div>
            </div>
            <span className="text-xs font-mono text-foreground/80 bg-background px-2 py-1 rounded">
              {org.org_abbreviation}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
