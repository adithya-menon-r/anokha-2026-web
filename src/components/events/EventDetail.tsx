/**
 * EventDetail Component (Production Version)
 *
 * Best production-ready layout:
 * - Desktop: Small left-aligned poster + price below | Tags + Markdown on right
 * - Mobile: Full-width poster → Sticky price section → Content below
 */

'use client';

import { format } from 'date-fns';
import {
  AlertCircle,
  Calendar,
  ChevronDown,
  ChevronUp,
  Clock,
  IndianRupee,
  MapPin,
  Star,
  Users2,
  X,
} from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import type { EventDetails } from '@/types/eventTypes';
import EventDetailInfo from './EventDetailInfo';
import MarkdownRenderer from './MarkdownRenderer';

interface EventDetailProps {
  event: EventDetails;
  onStarToggle?: () => void;
  onRegister?: () => void;
  onFeedback?: () => void;
  isStarLoading?: boolean;
  isRegisterLoading?: boolean;
  isLoggedIn?: boolean;
}

export default function EventDetail({
  event,
  onStarToggle,
  onRegister,
  onFeedback,
  isStarLoading = false,
  isRegisterLoading = false,
  isLoggedIn = false,
}: EventDetailProps) {
  const router = useRouter();
  const [isMarkdownExpanded, setIsMarkdownExpanded] = useState(false);
  const [isPriceSticky, setIsPriceSticky] = useState(false);

  const isFull = event.seats_filled >= event.total_seats;
  const isAlmostFull = event.seats_filled / event.total_seats > 0.8;

  // Mobile price sticky behavior
  useEffect(() => {
    const handleScroll = () => {
      // Only on mobile
      if (window.innerWidth < 768) {
        const scrollPos = window.scrollY;
        // Price becomes sticky after scrolling past poster + tags (~500px)
        // Use requestAnimationFrame for smoother updates
        requestAnimationFrame(() => {
          setIsPriceSticky(scrollPos > 500 && scrollPos < 10000);
        });
      } else {
        setIsPriceSticky(false);
      }
    };

    handleScroll(); // Initial check

    // Use passive event listener for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  // Prevent scroll when modal is open
  useEffect(() => {
    if (isMarkdownExpanded) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMarkdownExpanded]);

  // Price Section Component (reused in both layouts)
  const PriceSection = ({
    className = '',
    isMobile = false,
  }: {
    className?: string;
    isMobile?: boolean;
  }) => (
    <div
      className={`bg-card border border-border rounded-lg ${isMobile ? 'p-4' : 'p-6'} space-y-3 ${className}`}
    >
      {/* Price Display - Left aligned, stylized */}
      <div className={`${isMobile ? 'pb-3' : 'pb-4'} border-b border-border`}>
        <div className="flex items-baseline gap-3">
          <div
            className={`font-bold ${
              isFull ? 'text-red-500' : 'text-foreground'
            } ${isMobile ? 'text-3xl' : 'text-5xl'}`}
          >
            {event.price === 0 ? 'Free' : `₹${event.price}`}
          </div>
          <span
            className={`text-foreground/60 ${isMobile ? 'text-xs' : 'text-sm'} font-medium`}
          >
            {event.is_per_head ? 'per person' : 'per team'}
          </span>
        </div>
      </div>

      {/* Team Size (for group events) */}
      {event.is_group && (
        <div
          className={`flex items-center justify-between ${isMobile ? 'py-1' : 'py-2'} text-sm`}
        >
          <div className="flex items-center gap-2 text-foreground/80">
            <Users2 className="w-4 h-4" />
            <span className={isMobile ? 'text-xs' : ''}>Team Size</span>
          </div>
          <span
            className={`font-semibold text-foreground ${isMobile ? 'text-xs' : ''}`}
          >
            {event.min_teamsize} - {event.max_teamsize}
          </span>
        </div>
      )}

      {/* Seats - Only show if almost full or full */}
      {isAlmostFull && (
        <div className={isMobile ? 'py-1' : 'py-2'}>
          <div className={`text-center ${isMobile ? 'mb-1' : 'mb-2'}`}>
            <span
              className={`font-semibold ${
                isFull ? 'text-red-500' : 'text-yellow-500'
              } ${isMobile ? 'text-xs' : 'text-sm'}`}
            >
              {isFull ? '🔴 Event Full!' : '⚠️ Almost Full'}
            </span>
          </div>
          <div
            className={`w-full bg-muted rounded-full overflow-hidden ${isMobile ? 'h-1.5' : 'h-2'}`}
          >
            <div
              className={`h-full transition-all ${
                isFull ? 'bg-red-500' : 'bg-yellow-500'
              }`}
              style={{
                width: `${Math.min((event.seats_filled / event.total_seats) * 100, 100)}%`,
              }}
            />
          </div>
        </div>
      )}

      {/* Registration Buttons */}
      <div className={`${isMobile ? 'pt-1' : 'pt-2'}`}>
        {event.isRegistered ? (
          <div
            className={`text-center ${isMobile ? 'p-2' : 'p-3'} bg-green-500/10 rounded-lg`}
          >
            <p
              className={`text-green-500 font-semibold ${isMobile ? 'text-xs' : 'text-sm'}`}
            >
              Already Registered
            </p>
          </div>
        ) : isFull || event.event_status === 'CLOSED' ? (
          <div
            className={`text-center ${isMobile ? 'p-2' : 'p-3'} rounded-lg ${
              isFull ? 'bg-red-500/10' : 'bg-yellow-500/10'
            }`}
          >
            <p
              className={`font-semibold ${
                isFull ? 'text-red-500' : 'text-yellow-500'
              } ${isMobile ? 'text-xs' : 'text-sm'}`}
            >
              {isFull ? 'Event Full' : 'Registration Closed'}
            </p>
          </div>
        ) : isLoggedIn ? (
          <button
            type="button"
            onClick={onRegister}
            disabled={isRegisterLoading}
            className={`w-full ${isMobile ? 'py-2' : 'py-3'} px-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 ${isMobile ? 'text-sm' : ''}`}
          >
            {isRegisterLoading ? 'Registering...' : 'Register Now'}
          </button>
        ) : (
          <button
            type="button"
            onClick={() => router.push('/login')}
            className={`w-full ${isMobile ? 'py-2' : 'py-3'} px-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors ${isMobile ? 'text-sm' : ''}`}
          >
            Login to Register
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* ========== MOBILE LAYOUT ========== */}
      <div className="md:hidden space-y-4">
        {/* Poster - Portrait aspect ratio (optimal for vertical phone screens) */}
        <div className="relative w-full aspect-[4/5] rounded-lg overflow-hidden">
          <Image
            src={event.cover_image_url}
            alt={event.event_name}
            fill
            className="object-cover"
            priority
          />
          {event.isRegistered && (
            <div className="absolute top-4 left-4 px-3 py-1 bg-green-500/90 backdrop-blur-sm rounded-full text-white text-xs font-medium">
              Registered
            </div>
          )}
        </div>
        {/* Event Name */}
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-1">
            {event.event_name}
          </h1>
          {event.blurb && (
            <p className="text-sm text-foreground/80">{event.blurb}</p>
          )}
        </div>
        {/* Tags */}
        {event.tags && event.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {event.tags.slice(0, 5).map((tag, index) => (
              <span
                key={`${tag.tag_name}-${index}`}
                className="px-2.5 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium"
                title={tag.tag_abbreviation}
              >
                {tag.tag_name}
              </span>
            ))}
          </div>
        )}
        {/* Price Section - Compact mobile version, becomes sticky on scroll */}
        <div
          className={`transition-all duration-200 ease-out ${
            isPriceSticky
              ? 'fixed top-0 left-0 right-0 z-40 p-3 bg-background/98 backdrop-blur-md border-b border-border shadow-lg animate-in slide-in-from-top-2'
              : ''
          }`}
          style={{
            transform: isPriceSticky ? 'translateZ(0)' : 'none',
            willChange: isPriceSticky ? 'transform' : 'auto',
          }}
        >
          <div className={isPriceSticky ? 'max-w-7xl mx-auto' : ''}>
            <PriceSection isMobile={true} />
          </div>
        </div>
        {isPriceSticky && <div className="h-28" />} {/* Compact spacer */}
        {/* Markdown Content */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            About This Event
          </h2>
          <MarkdownRenderer content={event.event_description} />

          {/* Rules Section */}
          {event.rules && (
            <>
              <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">
                Rules & Guidelines
              </h3>
              <MarkdownRenderer content={event.rules} />
            </>
          )}
        </div>
        {/* Schedules - Mobile */}
        {event.schedules && event.schedules.length > 0 && (
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Event Schedule
            </h2>
            <div className="space-y-4">
              {event.schedules.map((schedule, index) => (
                <div
                  key={`schedule-mobile-${index}`}
                  className="flex gap-4 p-4 bg-muted/50 rounded-lg"
                >
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2 text-foreground/80">
                      <Calendar className="w-4 h-4" />
                      <span className="font-medium">
                        {format(new Date(schedule.event_date), 'MMMM dd, yyyy')}
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
        {/* Rules - Mobile */}
        {/* Organizers - Mobile */}
        {/* Organizers - Mobile */}
        <EventDetailInfo event={event} />
      </div>

      {/* ========== DESKTOP LAYOUT ========== */}
      <div className="hidden md:grid md:grid-cols-12 md:gap-8">
        {/* LEFT COLUMN - Poster + Price (4 columns) */}
        <div className="col-span-4 space-y-6">
          {/* Poster - Smaller, Left-aligned */}
          <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden bg-muted">
            <Image
              src={event.cover_image_url}
              alt={event.event_name}
              fill
              className="object-cover"
              priority
            />
            {event.isRegistered && (
              <div className="absolute top-4 left-4 px-3 py-2 bg-green-500/90 backdrop-blur-sm rounded-full text-white text-sm font-medium">
                Registered
              </div>
            )}
            {onStarToggle && (
              <button
                type="button"
                onClick={onStarToggle}
                disabled={isStarLoading}
                className="absolute top-4 right-4 p-2 bg-background/80 backdrop-blur-sm rounded-full hover:bg-background transition-colors border border-border"
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

          {/* Price Section Below Poster - Sticky and aligned */}
          <div className="sticky top-24 self-start" id="price-card-desktop">
            <PriceSection />
          </div>
        </div>

        {/* RIGHT COLUMN - Content (8 columns) */}
        <div className="col-span-8 space-y-6 flex flex-col">
          {/* Event Name */}
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-3">
              {event.event_name}
            </h1>
            {event.blurb && (
              <p className="text-lg text-foreground/80">{event.blurb}</p>
            )}
          </div>

          {/* Tags */}
          {event.tags && event.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {event.tags.map((tag, index) => (
                <span
                  key={`${tag.tag_name}-${index}`}
                  className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                  title={tag.tag_abbreviation}
                >
                  {tag.tag_name}
                </span>
              ))}
            </div>
          )}

          {/* Schedule and Organizers - Side by Side */}
          <div className="grid grid-cols-1 md:grid-cols-[auto_auto] gap-3 md:justify-start">
            {/* Event Schedule */}
            {event.schedules && event.schedules.length > 0 && (
              <div className="bg-card border border-border rounded-lg p-4 w-fit">
                <h2 className="text-base font-semibold text-foreground mb-2 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary" />
                  Event Schedule
                </h2>
                <div className="space-y-1.5">
                  {event.schedules.map((schedule, index) => (
                    <div
                      key={`schedule-${index}`}
                      className="flex flex-wrap items-center gap-x-3 gap-y-0.5 py-1.5 px-2 bg-muted/20 rounded text-xs"
                    >
                      <div className="flex items-center gap-1 text-foreground font-medium whitespace-nowrap">
                        <Calendar className="w-3 h-3" />
                        <span>
                          {format(
                            new Date(schedule.event_date),
                            'MMM dd, yyyy',
                          )}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-foreground/70 whitespace-nowrap">
                        <Clock className="w-3 h-3" />
                        <span>
                          {schedule.start_time} - {schedule.end_time}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-foreground/70 whitespace-nowrap">
                        <MapPin className="w-3 h-3" />
                        <span>{schedule.venue}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Organizers */}
            <EventDetailInfo event={event} />
          </div>

          {/* Markdown Section - With Expandable Modal */}
          <div className="bg-card border border-border rounded-lg p-6 relative flex-1 flex flex-col">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              About This Event
            </h2>
            <div className="prose prose-sm max-w-none line-clamp-[6] mb-4">
              <MarkdownRenderer content={event.event_description} />
            </div>

            {/* Rules Section */}
            {event.rules && (
              <>
                <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">
                  Rules & Guidelines
                </h3>
                <div className="prose prose-sm max-w-none line-clamp-[3]">
                  <MarkdownRenderer content={event.rules} />
                </div>
              </>
            )}

            {/* Show More Button - Bottom Right Corner */}
            <div className="flex justify-end mt-auto pt-4">
              <button
                type="button"
                onClick={() => setIsMarkdownExpanded(true)}
                className="flex items-center gap-2 px-4 py-2 text-sm text-primary hover:text-primary/80 transition-colors font-medium border border-primary/20 rounded-lg hover:bg-primary/5"
              >
                Show more <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Expanded Markdown Modal (Desktop) */}
      {isMarkdownExpanded && (
        <div className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-5xl bg-card border border-border rounded-lg p-8 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setIsMarkdownExpanded(false)}
              className="absolute top-4 right-4 p-2 hover:bg-muted rounded-full transition-colors"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-3xl font-bold text-foreground mb-6 pr-12">
              {event.event_name}
            </h2>

            {/* About This Event */}
            <div>
              <h3 className="text-2xl font-semibold text-foreground mb-4">
                About This Event
              </h3>
              <div className="prose prose-lg max-w-none">
                <MarkdownRenderer content={event.event_description} />
              </div>
            </div>

            {/* Rules & Guidelines */}
            {event.rules && (
              <div>
                <h3 className="text-2xl font-semibold text-foreground mb-4">
                  Rules & Guidelines
                </h3>
                <div className="prose prose-lg max-w-none">
                  <MarkdownRenderer content={event.rules} />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
