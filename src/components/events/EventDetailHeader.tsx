/**
 * EventDetailHeader Component
 *
 * Displays the main header/navbar for an event including:
 * - Event poster image
 * - Sticky navbar on desktop
 * - Event name and basic info
 */

'use client';

import { Star } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import type { EventDetails } from '@/types/eventTypes';

interface EventDetailHeaderProps {
  event: EventDetails;
  onStarToggle?: () => void;
  isStarLoading?: boolean;
}

export default function EventDetailHeader({
  event,
  onStarToggle,
  isStarLoading = false,
}: EventDetailHeaderProps) {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      const windowWidth = window.innerWidth;

      if (windowWidth >= 768) {
        // Desktop: sticky after scrolling past poster (400px)
        setIsSticky(scrollPos > 400);
      } else {
        // Mobile: sticky after scrolling past poster + tags (~600px)
        setIsSticky(scrollPos > 600);
      }
    };

    handleScroll(); // Initial check
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <>
      {/* Event Poster - A4 size on desktop */}
      <div className="relative w-full aspect-[1/1.414] md:aspect-[1/1.414] max-w-3xl mx-auto mb-6 rounded-lg overflow-hidden">
        <Image
          src={event.cover_image_url}
          alt={event.event_name}
          fill
          className="object-cover"
          priority
        />

        {/* Registration Status Badge */}
        {event.isRegistered && (
          <div className="absolute top-4 left-4 px-4 py-2 bg-green-500/90 backdrop-blur-sm rounded-full text-white text-sm font-medium">
            Registered
          </div>
        )}
      </div>

      {/* Navbar - Sticky on Desktop (always), Sticky on Mobile (on scroll) */}
      <div
        className={`w-full transition-all duration-300 ${
          isSticky
            ? 'fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-md'
            : ''
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          {/* Event Name */}
          <div className="flex-1">
            <h1
              className={`font-bold text-foreground transition-all ${
                isSticky ? 'text-xl md:text-2xl' : 'text-2xl md:text-4xl'
              }`}
            >
              {event.event_name}
            </h1>
            {event.blurb && !isSticky && (
              <p className="text-sm md:text-base text-foreground/80 mt-2">
                {event.blurb}
              </p>
            )}
          </div>

          {/* Star Button */}
          {onStarToggle && (
            <button
              type="button"
              onClick={onStarToggle}
              disabled={isStarLoading}
              className="p-3 bg-background/80 backdrop-blur-sm rounded-full hover:bg-muted transition-colors disabled:opacity-50 border border-border"
              aria-label={event.isStarred ? 'Unstar event' : 'Star event'}
            >
              <Star
                className={`w-5 h-5 ${
                  event.isStarred
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-foreground'
                }`}
              />
            </button>
          )}
        </div>
      </div>

      {/* Spacer for sticky navbar */}
      {isSticky && <div className="h-20 md:h-24" />}
    </>
  );
}
