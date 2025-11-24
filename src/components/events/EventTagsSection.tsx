/**
 * EventTagsSection Component
 *
 * Displays event tags with a "Show more" expandable view
 */

'use client';

import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import type { EventDetails } from '@/types/eventTypes';

interface EventTagsSectionProps {
  event: EventDetails;
}

export default function EventTagsSection({ event }: EventTagsSectionProps) {
  const [showAllTags, setShowAllTags] = useState(false);

  if (!event.tags || event.tags.length === 0) {
    return null;
  }

  const displayedTags = showAllTags ? event.tags : event.tags.slice(0, 5);
  const hasMoreTags = event.tags.length > 5;

  return (
    <div className="w-full bg-card border border-border rounded-lg p-4 mt-6">
      <div className="flex flex-wrap gap-2 items-center">
        {displayedTags.map((tag, index) => (
          <span
            key={`${tag.tag_name}-${index}`}
            className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
            title={tag.tag_abbreviation}
          >
            {tag.tag_name}
          </span>
        ))}

        {hasMoreTags && (
          <button
            type="button"
            onClick={() => setShowAllTags(!showAllTags)}
            className="flex items-center gap-1 px-3 py-1 text-sm font-medium text-foreground/60 hover:text-foreground transition-colors"
          >
            {showAllTags ? (
              <>
                Show less <ChevronUp className="w-4 h-4" />
              </>
            ) : (
              <>
                Show more ({event.tags.length - 5} more){' '}
                <ChevronDown className="w-4 h-4" />
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
