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
    shortEventDescription,
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
    <div
      className={`bg-card text-card-foreground aspect-[4/6] relative rounded-2xl overflow-hidden border border-border shadow-sm transition-all duration-300 ${isClosed ? 'cursor-not-allowed' : 'cursor-pointer hover:border-primary hover:shadow-lg'}`}
    >
      {/* Event Poster as background */}
      <div
        className={`absolute inset-0 bg-cover bg-center transition-all duration-300 ${isClosed ? '' : 'hover:blur-sm'}`}
        style={{
          backgroundImage: `url(${eventImageURL})`,
        }}
      />

      {/* Registration closed */}
      {isClosed && (
        <div className="absolute inset-0 bg-muted/90 z-50 flex flex-col items-center justify-center cursor-not-allowed">
          <Lock className="w-10 h-10 text-foreground mb-2" />
          <span className="text-lg font-semibold text-foreground">
            Registration Closed
          </span>
        </div>
      )}

      {/* Hover overlay with description and button - only show for non-closed events */}
      {!isClosed && (
        <div className="absolute top-0 left-0 right-0 bottom-20 bg-muted/90 opacity-0 hover:opacity-100 transition-all duration-300 z-40 flex flex-col justify-center items-center p-6">
          <div className="text-center mb-6">
            <p className="text-base text-foreground leading-relaxed">
              {shortEventDescription}
            </p>
          </div>

          <button
            type="button"
            className={`px-6 py-3 rounded-full text-lg font-semibold transition-transform duration-200 ${
              isRegistered
                ? 'bg-green-500 text-white cursor-default flex items-center gap-2'
                : 'bg-primary text-primary-foreground hover:bg-primary/80 cursor-pointer hover:scale-105'
            }`}
          >
            {isRegistered ? (
              <>
                <CheckCircle className="h-5 w-5" />
                Registered
              </>
            ) : (
              'Register'
            )}
          </button>
        </div>
      )}

      {/* Title, Date, Time, Tags & Price */}
      <div className="absolute bottom-0 w-full max-w-full px-4 py-3 z-40 bg-background shadow-lg">
        <div className="flex flex-col items-start gap-1 mb-2 w-full">
          <div className="flex items-center justify-between w-full">
            <p className="font-semibold text-2xl max-w-full overflow-auto mb-1">
              {eventName}
            </p>
            <span className="bg-background/90 rounded-full p-2 shadow cursor-pointer ml-2 transition-transform duration-200 hover:scale-110">
              <Star
                className={`w-5 h-5 ${isStarred ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'}`}
              />
            </span>
          </div>
          <div className="flex items-center justify-between w-full text-foreground text-base font-medium mb-1">
            <span className="flex flex-row items-center gap-3">
              <span className="flex flex-col gap-1">
                {isGroup && (
                  <span className="flex items-center gap-1">
                    <Users className="w-5 h-5 mr-1" />
                    <span className="text-base font-medium">Group event</span>
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <Calendar className="w-5 h-5 mr-1" />
                  {formatDate(eventDate)}
                </span>
              </span>
            </span>
            <span className="flex flex-col items-end ml-2">
              <span className="font-bold text-xl">
                {eventPrice > 0 ? formatCurrency(eventPrice) : 'Free'}
              </span>
              {eventPrice > 0 && (
                <span className="text-xs text-muted-foreground">Incl. GST</span>
              )}
            </span>
          </div>
        </div>
        {tags && tags.length > 0 && (
          <div className="flex items-center gap-1 overflow-hidden">
            {tags.slice(0, 3).map((tag, idx) => (
              <span
                key={`${eventId}-${eventId + idx}`}
                className="text-foreground text-sm px-3 py-1 rounded-full shadow-sm border border-border whitespace-nowrap flex-shrink-0"
              >
                {tag.tagName}
              </span>
            ))}
            {tags.length > 3 && (
              <span className="text-foreground text-sm px-2 py-1 rounded-full shadow-sm border border-border whitespace-nowrap flex-shrink-0">
                +{tags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* <div className="flex items-center justify-between mt-4 px-1 align-middle">
          <span className="font-bold text-2xl">
            {eventPrice > 0 ? formatCurrency(eventPrice) : 'Free'}
            {eventPrice > 0 && (
              <span className="text-xs text-muted-foreground ml-2">
                Incl. GST
              </span>
            )}
          </span>
        </div> */}
      </div>
    </div>
  );
};

export default EventCard;
