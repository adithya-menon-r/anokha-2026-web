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
    <div className="w-fit bg-card border border-border rounded-lg p-4">
      <h2 className="text-base font-semibold text-foreground mb-2 flex items-center gap-2">
        <Building2 className="w-4 h-4 text-primary" />
        Organized By
      </h2>
      <div className="flex flex-wrap gap-1.5">
        {event.organizers.map((org, index) => (
          <div
            key={`${org.org_abbreviation}-${index}`}
            className="inline-flex items-center gap-1.5 px-2 py-1.5 bg-muted/50 rounded text-xs whitespace-nowrap"
          >
            <div>
              <div className="font-medium text-foreground">
                {org.organizer_name}
              </div>
              <div className="text-[10px] text-foreground/50 leading-tight">
                {org.org_type}
              </div>
            </div>
            <span className="text-[10px] font-mono text-foreground/70 bg-background/50 px-1.5 py-0.5 rounded">
              {org.org_abbreviation}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
