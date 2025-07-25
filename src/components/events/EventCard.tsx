import { Calendar, CheckCircle, Lock, Star, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
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
    eventDate,
    isGroup,
    tags,
    eventPrice,
    isRegistered,
    isStarred,
    maxSeats,
    seatsFilled,
  } = event;

  const isTrulyClosed =
    !isRegistered && (eventStatus === 'closed' || maxSeats <= seatsFilled);

  const [starred, setStarred] = useState(isStarred);
  const [isHovered, setIsHovered] = useState(false);

  const handleStarToggle = () => {
    setStarred((prev) => !prev);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      console.log(`Star status changed for event ${eventId}: ${starred}`);
    }, 1000);
    return () => clearTimeout(handler);
  }, [starred, eventId]);

  return (
    <div
      className="group relative w-full aspect-[4/6] cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => {
        if (!isTrulyClosed) {
          console.log(`Navigating to event ${eventId}`);
        }
      }}
    >
      {/* Corner decorations */}
      <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-primary opacity-60 z-20 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-secondary opacity-60 z-20 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-secondary opacity-60 z-20 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-primary opacity-60 z-20 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Main card */}
      <div
        className={`
          relative w-full h-full rounded-lg overflow-hidden
          bg-card/10 backdrop-blur-sm
          border border-border/30
          transition-all duration-300 ease-out
          ${isHovered ? 'border-primary/50 shadow-lg shadow-primary/10' : ''}
          ${isTrulyClosed ? 'opacity-60 grayscale' : ''}
        `}
      >
        {/* Poster image */}
        <div
          className={`
            absolute top-0 left-0 right-0 h-[75%] bg-cover bg-center transition-all duration-300
            ${isHovered ? 'scale-105 blur-sm' : 'scale-100'}
          `}
          style={{ backgroundImage: `url(${eventImageURL})` }}
        />

        {/* Dark bottom background */}
        <div className="absolute bottom-0 left-0 right-0 h-[25%] bg-background" />

        {/* Hover overlay */}
        <div
          className={`
            absolute top-0 left-0 right-0 h-[80%] bg-background/95 backdrop-blur-sm
            flex flex-col justify-center items-center p-6
            transition-all duration-300 ease-out
            ${isHovered ? 'opacity-100' : 'opacity-0'}
          `}
        >
          {/* Description */}
          <div className="text-center mb-6 max-w-full">
            <p className="text-sm text-foreground/90 leading-relaxed line-clamp-4">
              {shortEventDescription}
            </p>
          </div>

          {/* ✅ Action button with proper registered/full logic */}
          {isRegistered ? (
            <div
              className="
                px-6 py-3 rounded-lg bg-green-500/20 border border-green-500/50 text-green-400
                flex items-center gap-2 text-sm font-medium
              "
            >
              <CheckCircle className="h-4 w-4" />
              Registered
            </div>
          ) : isTrulyClosed ? (
            <div className="px-6 py-3 rounded-lg bg-muted/50 border border-muted-foreground/30 text-muted-foreground flex items-center gap-2 text-sm font-medium">
              <Lock className="w-4 h-4" />
              Registration Closed
            </div>
          ) : (
            <button
              className="
                px-6 py-3 rounded-lg font-medium text-sm bg-primary/20 border border-primary/50 text-primary
                hover:bg-primary/30 hover:border-primary hover:scale-105 transition-all duration-200
              "
            >
              Register
            </button>
          )}
        </div>

        {/* Star button */}
        <button
          onClick={handleStarToggle}
          className="absolute top-3 right-3 z-30 p-2 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 transition-all duration-200 hover:bg-background/90 hover:scale-110"
        >
          <Star
            className={`w-4 h-4 transition-colors duration-200 ${
              starred
                ? 'text-yellow-400 fill-yellow-400'
                : 'text-muted-foreground'
            }`}
          />
        </button>

        {/* Footer section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 z-10 bg-background/20 backdrop-blur-md border-t border-border/30 glass-text-bg">
          {/* Event name and price */}
          <div className="flex items-start justify-between mb-3">
            <h3 className="font-bold text-lg text-foreground leading-tight flex-1 pr-2">
              {eventName}
            </h3>
            <div className="text-right flex-shrink-0">
              <div className="font-bold text-lg text-foreground">
                {eventPrice > 0 ? formatCurrency(eventPrice) : 'Free'}
              </div>
              {eventPrice > 0 && (
                <div className="text-xs text-muted-foreground">Incl. GST</div>
              )}
            </div>
          </div>

          {/* Event details */}
          <div className="flex items-center gap-4 mb-3 text-sm text-foreground/80">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(eventDate)}</span>
            </div>
            {isGroup && (
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>Group</span>
              </div>
            )}
          </div>

          {/* Tags */}
          {tags && tags.length > 0 && (
            <div className="flex items-center gap-2 overflow-hidden">
              {tags.slice(0, 2).map((tag, idx) => (
                <span
                  key={`${eventId}-${idx}`}
                  className="text-xs px-2 py-1 rounded-md bg-background/40 backdrop-blur-sm border border-border/50 text-foreground/70 whitespace-nowrap"
                >
                  {tag.tagName}
                </span>
              ))}
              {tags.length > 2 && (
                <span className="text-xs px-2 py-1 rounded-md bg-background/40 backdrop-blur-sm border border-border/50 text-foreground/70">
                  +{tags.length - 2}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCard;
