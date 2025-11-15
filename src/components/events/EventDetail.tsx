/**
 * EventDetail Component (Dumb Component)
 *
 * Main display component for individual event details.
 * Receives all data as props and renders the event page layout.
 * Combines header, info, description (markdown), and actions.
 */

import type { EventDetails } from '@/types/eventTypes';
import EventDetailActions from './EventDetailActions';
import EventDetailHeader from './EventDetailHeader';
import EventDetailInfo from './EventDetailInfo';
import MarkdownRenderer from './MarkdownRenderer';

interface EventDetailProps {
  event: EventDetails;
  onStarToggle?: () => void;
  onRegister?: () => void;
  onFeedback?: () => void;
  isStarLoading?: boolean;
  isRegisterLoading?: boolean;
}

export default function EventDetail({
  event,
  onStarToggle,
  onRegister,
  onFeedback,
  isStarLoading = false,
  isRegisterLoading = false,
}: EventDetailProps) {
  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Header Section */}
      <EventDetailHeader
        event={event}
        onStarToggle={onStarToggle}
        isStarLoading={isStarLoading}
      />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        {/* Left Column - Description */}
        <div className="lg:col-span-2 space-y-6">
          {/* Event Description (Markdown) */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              About This Event
            </h2>
            <MarkdownRenderer content={event.eventDescription} />
          </div>

          {/* Action Buttons (Mobile - Below Description) */}
          <div className="lg:hidden">
            <EventDetailActions
              event={event}
              onRegister={onRegister}
              onFeedback={onFeedback}
              isRegisterLoading={isRegisterLoading}
            />
          </div>
        </div>

        {/* Right Column - Info Card and Actions */}
        <div className="lg:col-span-1 space-y-6">
          {/* Event Info Card */}
          <EventDetailInfo event={event} />

          {/* Action Buttons (Desktop - Sidebar) */}
          <div className="hidden lg:block">
            <EventDetailActions
              event={event}
              onRegister={onRegister}
              onFeedback={onFeedback}
              isRegisterLoading={isRegisterLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
