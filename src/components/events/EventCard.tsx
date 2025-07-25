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
  const [isPressed, setIsPressed] = useState(false);

  const handleStarToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setStarred((prev) => !prev);
  };

  const handleCardPress = () => {
    if ('ontouchstart' in window) {
      setIsPressed(true);
      setTimeout(() => setIsPressed(false), 200);
    }
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
      onTouchStart={handleCardPress}
      onClick={() => {
        if (!isTrulyClosed) {
          console.log(`Navigating to event ${eventId}`);
        }
      }}
    >
      {/* Enhanced corner decorations - always visible on mobile */}
      <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-orange-400 z-20 transition-all duration-500 opacity-60 md:opacity-0 group-hover:opacity-100 group-hover:w-6 group-hover:h-6" />
      <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-yellow-400 z-20 transition-all duration-500 opacity-60 md:opacity-0 group-hover:opacity-100 group-hover:w-6 group-hover:h-6" />
      <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-yellow-400 z-20 transition-all duration-500 opacity-60 md:opacity-0 group-hover:opacity-100 group-hover:w-6 group-hover:h-6" />
      <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-orange-400 z-20 transition-all duration-500 opacity-60 md:opacity-0 group-hover:opacity-100 group-hover:w-6 group-hover:h-6" />

      {/* Main card with warm accent border */}
      <div
        className={`
          relative w-full h-full rounded-lg overflow-hidden
          bg-card/10 backdrop-blur-sm
          border transition-all duration-500 ease-out
          ${
            isHovered
              ? 'border-orange-400/60 shadow-2xl shadow-orange-500/20'
              : 'border-border/30'
          }
          ${isTrulyClosed ? 'opacity-60 grayscale' : ''}
        `}
      >
        {/* Image container with smooth gradient overlay */}
        <div className="relative top-0 left-0 right-0 h-[75%] overflow-hidden">
          {/* Main poster image */}
          <div
            className={`
              absolute inset-0 bg-cover bg-center transition-all duration-700 ease-out
              ${isHovered || isPressed ? 'scale-105' : 'scale-100'}
            `}
            style={{ backgroundImage: `url(${eventImageURL})` }}
          />

          {/* Smooth gradient overlays for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/20 via-transparent to-background/20" />

          {/* Animated warm glow effect on hover */}
          <div
            className={`
            absolute inset-0 bg-gradient-to-t from-orange-500/15 via-transparent to-yellow-500/10
            transition-opacity duration-700 ease-out
            ${isHovered || isPressed ? 'opacity-100' : 'opacity-0'}
          `}
          />
        </div>

        {/* Dark bottom background */}
        <div className="absolute bottom-0 left-0 right-0 h-[25%] bg-background" />

        {/* Hover overlay - always visible on small screens */}
        <div
          className={`
            absolute top-0 left-0 right-0 h-[80%] bg-background/95 backdrop-blur-sm
            flex flex-col justify-center items-center p-6
            transition-opacity duration-300 ease-out
            ${isHovered || isPressed ? 'opacity-100' : 'opacity-0 pointer-events-none'}
            sm:hidden
          `}
        >
          {/* Description with better typography */}
          <div className="text-center mb-6 max-w-full">
            <p className="text-sm text-foreground/90 leading-relaxed line-clamp-4 font-light">
              {shortEventDescription}
            </p>
          </div>

          {/* Enhanced action button with warm colors */}
          {isRegistered ? (
            <div className="px-6 py-3 rounded-lg bg-green-500/20 border border-green-500/50 text-green-400 flex items-center gap-2 text-sm font-medium backdrop-blur-sm">
              <CheckCircle className="h-4 w-4" />
              Registered
            </div>
          ) : isTrulyClosed ? (
            <div className="px-6 py-3 rounded-lg bg-muted/50 border border-muted-foreground/30 text-muted-foreground flex items-center gap-2 text-sm font-medium backdrop-blur-sm">
              <Lock className="w-4 h-4" />
              Registration Closed
            </div>
          ) : (
            <button className="px-6 py-3 rounded-lg font-medium text-sm bg-gradient-to-r from-orange-500/20 to-yellow-500/20 border border-orange-400/50 text-orange-200 hover:from-orange-500/30 hover:to-yellow-500/30 hover:border-orange-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-300 backdrop-blur-sm">
              Register
            </button>
          )}
        </div>

        {/* Mobile-friendly status badge - only for registered/closed */}
        {(isRegistered || isTrulyClosed) && (
          <div className="sm:hidden absolute top-3 left-3 z-30">
            {isRegistered ? (
              <div className="px-3 py-1.5 rounded-md bg-green-800/90 backdrop-blur-md border border-green-500/50 text-green-100 flex items-center gap-1 text-xs font-medium shadow-lg">
                <CheckCircle className="h-3 w-3" />
                Registered
              </div>
            ) : (
              <div className="px-3 py-1.5 rounded-md bg-slate-800/90 backdrop-blur-md border border-slate-600/50 text-slate-200 flex items-center gap-1 text-xs font-medium shadow-lg">
                <Lock className="w-3 h-3" />
                Closed
              </div>
            )}
          </div>
        )}

        {/* Enhanced star button */}
        <button
          onClick={handleStarToggle}
          className={`
            absolute top-3 right-3 z-30 p-2 rounded-full backdrop-blur-md
            border transition-all duration-300 hover:scale-110 active:scale-95
            ${
              starred
                ? 'bg-yellow-500/20 border-yellow-400/60 shadow-lg shadow-yellow-500/25'
                : 'bg-background/80 border-border/50 hover:bg-background/90'
            }
          `}
        >
          <Star
            className={`w-4 h-4 transition-all duration-300 ${
              starred
                ? 'text-yellow-400 fill-yellow-400 drop-shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          />
        </button>

        {/* Enhanced footer with warm accent and better glass effect */}
        <div className="absolute bottom-0 left-0 right-0 p-4 z-10 bg-gradient-to-t from-background/95 via-background/80 to-transparent backdrop-blur-md border-t border-border/30">
          {/* Event name and price with better contrast */}
          <div className="flex items-start justify-between mb-3">
            <h3 className="font-bold text-lg text-foreground leading-tight flex-1 pr-2 drop-shadow-sm">
              {eventName}
            </h3>
            <div className="text-right flex-shrink-0">
              <div className="font-bold text-lg text-orange-200">
                {eventPrice > 0 ? formatCurrency(eventPrice) : 'Free'}
              </div>
              {eventPrice > 0 && (
                <div className="text-xs text-muted-foreground">Incl. GST</div>
              )}
            </div>
          </div>

          {/* Event details with warm accents */}
          <div className="flex items-center gap-4 mb-3 text-sm text-foreground/80">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4 text-orange-400" />
              <span>{formatDate(eventDate)}</span>
            </div>
            {isGroup && (
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4 text-yellow-400" />
                <span>Group</span>
              </div>
            )}
          </div>

          {/* Enhanced tags with warm colors */}
          {tags && tags.length > 0 && (
            <div className="flex items-center gap-2 overflow-hidden">
              {tags.slice(0, 2).map((tag, idx) => (
                <span
                  key={`${eventId}-${idx}`}
                  className="text-xs px-2 py-1 rounded-md bg-gradient-to-r from-orange-500/10 to-yellow-500/10 backdrop-blur-sm border border-orange-400/30 text-orange-200 whitespace-nowrap font-medium"
                >
                  {tag.tagName}
                </span>
              ))}
              {tags.length > 2 && (
                <span className="text-xs px-2 py-1 rounded-md bg-background/40 backdrop-blur-sm border border-border/50 text-foreground/70 font-medium">
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
