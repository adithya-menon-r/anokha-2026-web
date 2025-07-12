import { Calendar, CheckCircle, Lock, Star, Users } from 'lucide-react';
import { formatCurrency, formatDate } from '@/lib/utilityFunctions';
import type { Event } from '@/types/eventTypes';

interface EventCardProps {
  event: Event;
}

export const EventCard = ({ event }: EventCardProps) => {
  const {
    eventId,
    eventImageURL,
    eventName,
    eventStatus,
    // eventDescription,
    eventDate,
    // eventTime,
    isGroup,
    tags,
    eventPrice,
    isRegistered,
    isStarred,
    maxSeats,
    seatsFilled,
  } = event;

  const isClosed = eventStatus === 'closed' || maxSeats <= seatsFilled;

  return (
    <div className="bg-card text-card-foreground aspect-[3/5] relative rounded-2xl overflow-hidden border border-border shadow-sm">
      {/* Event Poster as background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${eventImageURL})`,
        }}
      />

      {/* Registration closed */}
      {isClosed && (
        <div className="absolute inset-0 bg-muted/50 z-50 flex items-center justify-center cursor-not-allowed">
          <Lock className="w-5 h-5 text-foreground mr-2" />
          <span className="text-lg font-semibold text-foreground">
            Registration Closed
          </span>
        </div>
      )}

      {/* Group Event */}
      {isGroup && (
        <div className="absolute top-2 left-2 z-30 flex items-center gap-2">
          <span className="bg-background/90 rounded-full p-2 shadow flex items-center gap-1">
            <Users className="w-5 h-5" />
            <span className="text-sm font-semibold">Group Event</span>
          </span>
        </div>
      )}

      {/* Registered & Starred */}
      <div className={`absolute top-2 right-2 z-30 flex items-center gap-2`}>
        <span className="bg-background/90 rounded-full p-2 shadow cursor-pointer">
          <Star
            className={`w-5 h-5 ${isStarred ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'}`}
          />
        </span>
      </div>

      {/* Title, Date, Time, Tags & Price */}
      <div className="absolute bottom-0 w-full max-w-full px-4 py-3 z-20 bg-background group-hover:opacity-0 transition-opacity duration-300 shadow-lg">
        <div className="flex flex-col items-start gap-1 mb-2">
          <p className="font-semibold text-4xl max-w-full line-clamp-2 mb-1">
            {eventName}
          </p>
          <div className="flex items-center gap-3 text-foreground text-base font-semibold mb-1">
            <span className="flex items-center gap-1">
              <Calendar className="w-5 h-5 mr-1" />
              {formatDate(eventDate)}
            </span>
          </div>
        </div>
        {tags && tags.length > 0 && (
          <div className="flex items-center gap-1 overflow-hidden">
            {tags.slice(0, 4).map((tag, _) => (
              <span
                key={eventId}
                className="text-foreground text-sm px-3 py-1 rounded-full shadow-sm border border-border whitespace-nowrap flex-shrink-0"
              >
                {tag.tagName}
              </span>
            ))}
            {tags.length > 4 && (
              <span className="text-foreground text-sm px-2 py-1 rounded-full shadow-sm border border-border whitespace-nowrap flex-shrink-0">
                +{tags.length - 4}
              </span>
            )}
          </div>
        )}

        <div className="flex items-center justify-between mt-4 px-1 align-middle">
          <span className="font-bold text-2xl">
            {eventPrice > 0 ? formatCurrency(eventPrice) : 'Free'}
            {eventPrice > 0 && (
              <span className="text-xs text-muted-foreground ml-2">
                Incl. GST
              </span>
            )}
          </span>

          <button
            type="button"
            disabled={isClosed || isRegistered}
            className={`px-4 py-2 rounded-full font-semibold transition-colors ${
              isRegistered
                ? 'bg-green-500 text-white cursor-default flex items-center gap-2'
                : isClosed
                  ? 'bg-muted text-muted-foreground cursor-not-allowed'
                  : 'bg-primary text-primary-foreground hover:bg-primary/80 cursor-pointer'
            }`}
          >
            {isRegistered ? (
              <>
                <CheckCircle className="h-5 w-5" />
                Registered
              </>
            ) : isClosed ? (
              'Closed'
            ) : (
              'Register'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
