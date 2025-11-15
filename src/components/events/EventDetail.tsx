/**
 * EventDetail Component (Dumb Component)
 *
 * Main display component for individual event details.
 * Receives all data as props and renders the event page layout.
 * Combines header, info, description (markdown), schedules, rules, and actions.
 */

import { format } from 'date-fns';
import { Calendar, Clock, MapPin } from 'lucide-react';
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
        {/* Left Column - Description, Schedules, Rules */}
        <div className="lg:col-span-2 space-y-6">
          {/* Event Description (Markdown) */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              About This Event
            </h2>
            <MarkdownRenderer content={event.event_description} />
          </div>

          {/* Event Schedules */}
          {event.schedules && event.schedules.length > 0 && (
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Event Schedule
              </h2>
              <div className="space-y-4">
                {event.schedules.map((schedule, index) => (
                  <div
                    key={`schedule-${index}`}
                    className="flex gap-4 p-4 bg-muted/50 rounded-lg"
                  >
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2 text-foreground/80">
                        <Calendar className="w-4 h-4" />
                        <span className="font-medium">
                          {format(
                            new Date(schedule.event_date),
                            'MMMM dd, yyyy',
                          )}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-foreground/80">
                        <Clock className="w-4 h-4" />
                        <span>
                          {schedule.start_time} - {schedule.end_time}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-foreground/80">
                        <MapPin className="w-4 h-4" />
                        <span>{schedule.venue}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Rules (if available) */}
          {event.rules && (
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Rules & Guidelines
              </h2>
              <MarkdownRenderer content={event.rules} />
            </div>
          )}

          {/* Action Buttons (Mobile - Below Content) */}
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
