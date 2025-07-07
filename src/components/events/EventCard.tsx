import { CheckCheck, Clock, Lock, Star, Users } from 'lucide-react';
import type { Event } from '@/types/eventTypes';

interface EventCardProps {
  event: Event;
}

export const EventCard = ({ event }: EventCardProps) => {
  const {
    eventImageURL,
    eventName,
    eventStatus,
    eventDescription,
    eventDate,
    eventTime,
    isGroup,
    tags,
    eventPrice,
    isRegistered,
    isStarred,
    maxSeats,
    seatsFilled,
  } = event;

  // Format the date to get day and month
  const date = new Date(eventDate);
  const day = date.toLocaleDateString('en-IN', { day: '2-digit' });
  const month = date.toLocaleDateString('en-IN', { month: 'short' });

  // isClosed indicates if the event registration is closed
  const isClosed = eventStatus !== 'open';

  // Calculate the percentage of seats filled
  const percentFilled = Math.min((seatsFilled / maxSeats) * 100, 100);

  // Register button classname and content logic
  const getRegisterButtonProps = () => {
    const baseClasses =
      'w-full px-3 py-2 text-sm rounded-md font-medium flex items-center justify-center gap-2';
    const isDisabled = eventStatus !== 'open' || isRegistered;

    if (eventStatus === 'open') {
      if (isRegistered) {
        return {
          className: `${baseClasses} bg-muted text-muted-foreground cursor-not-allowed`,
          disabled: isDisabled,
          content: (
            <>
              <CheckCheck className="w-4 h-4" />
              Registered
            </>
          ),
        };
      } else {
        return {
          className: `${baseClasses} bg-primary text-primary-foreground`,
          disabled: isDisabled,
          content: 'Register Now',
        };
      }
    } else {
      return {
        className: `${baseClasses} bg-muted text-muted-foreground cursor-not-allowed`,
        disabled: isDisabled,
        content: (
          <>
            <Lock className="w-4 h-4" />
            Registration Locked
          </>
        ),
      };
    }
  };

  const registerButtonProps = getRegisterButtonProps();

  return (
    <div className="relative group rounded-2xl overflow-hidden border border-border shadow-sm bg-card text-card-foreground aspect-[3/5] min-w-[240px] sm:min-w-[260px] sm:mx-4">
      {/* Background Poster*/}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center transition-all duration-300 group-hover:blur-sm"
        style={{ backgroundImage: `url(${eventImageURL})` }}
      />

      {/* Registration Closed */}
      {isClosed && (
        <div className="absolute inset-0 bg-muted/80 z-10 flex items-center justify-center">
          <Lock className="w-5 h-5 text-muted-foreground mr-2" />
          <span className="text-sm font-semibold text-muted-foreground">
            Registration Closed
          </span>
        </div>
      )}

      {/* Top-left: Date and Time */}
      <div className="absolute top-3 left-3 z-20 space-y-1">
        <div className="bg-background/90 px-2 py-1 rounded-md text-xs font-bold text-foreground shadow text-center leading-tight">
          <div className="text-2xl">{day}</div>
          <div className="uppercase">{month}</div>
        </div>
        <div className="inline-flex items-center bg-background text-foreground text-xs font-medium px-2 py-1 rounded-md shadow">
          <Clock className="w-3.5 h-3.5 mr-1" />
          {eventTime}
        </div>
      </div>

      {/* Top-right: Is Starred */}
      <div className="absolute top-3 right-3 z-20 bg-background/90 rounded-full p-2 shadow cursor-pointer">
        <Star
          className={`w-6 h-6 ${isStarred ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'}`}
        />
      </div>

      {/* Title, 2-line Desc, Price and Register Button*/}
      <div className="absolute bottom-0 w-full px-4 py-3 z-20 bg-background group-hover:opacity-0 transition-opacity duration-300 shadow-lg">
        <div className="flex flex-col items-start gap-1 mb-2">
          <h3 className="font-semibold text-3xl truncate">{eventName}</h3>
          <p className="text-base text-muted-foreground line-clamp-2">
            {eventDescription}
          </p>
          <span className="text-base font-semibold text-foreground bg-primary/10 px-2 py-0.5 my-2 rounded">
            {eventPrice === 0 ? 'Free' : `₹${eventPrice}`}
          </span>
        </div>
        <button
          type="button"
          className={registerButtonProps.className}
          disabled={registerButtonProps.disabled}
        >
          {registerButtonProps.content}
        </button>
      </div>

      {/* Hover Menu :) */}
      <div className="absolute inset-0 z-30 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end">
        <div className="bg-background p-3 rounded-b-xl border border-border shadow-lg pointer-events-auto space-y-3">
          {/* Title */}
          <h3 className="font-semibold text-2xl">{eventName}</h3>

          {/* Description */}
          <p className="text-base text-muted-foreground">{eventDescription}</p>

          {/* Price */}
          <p className="text-lg font-medium">
            {eventPrice === 0 ? 'Free' : `₹${eventPrice}`}
          </p>

          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag.tagName}
                  className="inline-flex items-center text-xs px-2 py-1 bg-foreground/20 text-foreground rounded-full font-medium"
                >
                  {tag.tagName}
                </span>
              ))}
            </div>
          )}

          {/* Is Group */}
          {isGroup && (
            <div className="flex w-fit items-center text-sm font-semibold text-primary bg-primary/10 px-2 py-1 rounded-md shadow">
              <Users className="w-4 h-4 mr-1" />
              Group Event
            </div>
          )}

          {/* Registration Progress Bar */}
          <div>
            <div className="flex justify-between mb-1 text-xs text-muted-foreground">
              <span>Seats Filled</span>
              <span>{Math.round(percentFilled)}%</span>
            </div>
            <div className="w-full h-2 bg-input rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${percentFilled}%` }}
              />
            </div>
          </div>

          {/* Register Button */}
          <button
            type="button"
            className={registerButtonProps.className}
            disabled={registerButtonProps.disabled}
          >
            {registerButtonProps.content}
          </button>
        </div>
      </div>
    </div>
  );
};
