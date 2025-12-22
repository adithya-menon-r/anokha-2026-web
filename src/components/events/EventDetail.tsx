'use client';

import { format } from 'date-fns';
import {
  Building2,
  Calendar,
  Clock,
  MapPin,
  Star,
  User,
  Users2,
  X,
} from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import { applyGst, formatCurrency } from '@/lib/utilityFunctions';
import { useNavbarStore } from '@/stores/useNavbarStore';
import {
  EventDetailProps,
  EventOrganisersProps,
} from '@/types/eventDetailTypes';

function EventOrganisers({ event }: EventOrganisersProps) {
  if (!event.organizers || event.organizers.length === 0) {
    return null;
  }

  return (
    <div className="w-full bg-card border border-border rounded-lg p-4">
      <h2 className="text-base font-semibold text-foreground mb-2 flex items-center gap-2">
        <Building2 className="w-4 h-4 text-primary" />
        Organized By
      </h2>
      <div className="flex flex-wrap gap-1.5">
        {event.organizers.map((org, index) => (
          <div
            key={`${org.org_abbreviation}-${index}`}
            className="inline-flex items-center gap-1.5 px-2 py-1.5 bg-muted/50 rounded text-xs whitespace-nowrap"
          >
            <div>
              <div className="font-medium text-foreground">
                {org.organizer_name}
              </div>
              <div className="text-[10px] text-foreground/50 leading-tight">
                {org.org_type}
              </div>
            </div>
            <span className="text-[10px] font-mono text-foreground/70 bg-background/50 px-1.5 py-0.5 rounded">
              {org.org_abbreviation.toUpperCase()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function EventDetail({
  event,
  onStarToggle,
  onFeedback,
  isStarLoading = false,
  isRegisterLoading = false,
  isLoggedIn = false,
  onRegister,
  user,
}: EventDetailProps & {
  onRegister?: () => void;
  user?: { name: string; email: string };
}) {
  const router = useRouter();
  const [isMarkdownExpanded, setIsMarkdownExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const markdownRef = useRef<HTMLDivElement>(null);
  const priceSectionRef = useRef<HTMLDivElement>(null);
  const { setNavbarHidden } = useNavbarStore();

  // Use fallback image if cover_image_url is null, empty, or invalid
  const displayCoverImageUrl =
    event.cover_image_url && event.cover_image_url.trim() !== ''
      ? event.cover_image_url
      : '/images/comingsoon.jpg';

  const sortedSchedules = event.schedules
    ? [...event.schedules].sort(
        (a, b) =>
          new Date(a.event_date).getTime() - new Date(b.event_date).getTime(),
      )
    : [];

  const isFull = event.is_full;
  const isFree = event.price === 0;

  const combinedMarkdown = `${event.event_description}${
    event.rules ? `\n\n### Rules & Guidelines\n\n${event.rules}` : ''
  }`;

  useEffect(() => {
    const element = markdownRef.current;
    if (!element) return;

    const checkOverflow = () => {
      setIsOverflowing(element.scrollHeight > element.clientHeight + 2);
    };

    checkOverflow();
    const observer = new ResizeObserver(checkOverflow);
    observer.observe(element);

    return () => observer.disconnect();
  }, [combinedMarkdown]);

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

  useEffect(() => {
    const handleScroll = () => {
      if (!priceSectionRef.current) return;
      if (window.innerWidth >= 768) return;
      const rect = priceSectionRef.current.getBoundingClientRect();
      setNavbarHidden(rect.top <= 80);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      setNavbarHidden(false);
    };
  }, [setNavbarHidden]);

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
        <div className="flex items-baseline gap-2">
          <div className={`font-bold ${isMobile ? 'text-3xl' : 'text-5xl'}`}>
            {isFree ? 'Free' : formatCurrency(applyGst(event.price))}
          </div>
          <span
            className={`text-foreground/60 ${isMobile ? 'text-xs' : 'text-sm'} font-medium`}
          >
            {isFree || !event.is_group
              ? ''
              : event.is_per_head
                ? 'per head'
                : 'per team'}
          </span>
        </div>
      </div>

      {/* Team Size or Individual */}
      <div
        className={`flex items-center justify-between ${isMobile ? 'py-1' : 'py-2'} text-md`}
      >
        <div className="flex items-center gap-2 text-foreground/80">
          {event.is_group ? (
            <Users2 className="w-4 h-4" />
          ) : (
            <User className="w-4 h-4" />
          )}
          <span className={isMobile ? 'text-xs' : ''}>
            {event.is_group ? 'Team Size' : 'Participation'}
          </span>
        </div>
        <span
          className={`font-bold text-foreground ${isMobile ? 'text-xs' : ''}`}
        >
          {event.is_group
            ? `${event.min_teamsize} - ${event.max_teamsize}`
            : 'Individual'}
        </span>
      </div>

      {/* Registration Buttons */}
      <div className={`${isMobile ? 'pt-1' : 'pt-2'}`}>
        {event.is_registered ? (
          <div
            className={`text-center ${isMobile ? 'p-2' : 'p-3'} bg-green-500/10 rounded-lg`}
          >
            <p
              className={`text-green-500 font-semibold ${isMobile ? 'text-xs' : 'text-sm'}`}
            >
              Already Registered
            </p>
          </div>
        ) : event.event_status === 'COMPLETED' ? (
          <div
            className={`text-center ${isMobile ? 'p-2' : 'p-3'} bg-muted rounded-lg`}
          >
            <p
              className={`text-muted-foreground font-semibold ${isMobile ? 'text-xs' : 'text-sm'}`}
            >
              Event Completed
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
            onClick={() => {
              if (onRegister) onRegister();
            }}
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
        <div className="relative w-full aspect-[4/5] rounded-lg overflow-hidden">
          <Image
            src={displayCoverImageUrl}
            alt={event.event_name}
            fill
            className="object-cover"
            priority
          />
          {event.is_registered && (
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
        <div className="flex flex-wrap gap-2">
          <span className="px-2.5 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
            {event.event_type.toUpperCase()}
          </span>
          <span className="px-2.5 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
            {event.is_technical ? 'TECHNICAL' : 'NON-TECHNICAL'}
          </span>
          {event.tags &&
            event.tags.length > 0 &&
            event.tags.slice(0, 5).map((tag, index) => (
              <span
                key={`${tag}-${index}`}
                className="px-2.5 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium"
              >
                {tag}
              </span>
            ))}
        </div>

        {/* Price Section */}
        <div ref={priceSectionRef} className="sticky top-0 z-40 pt-2">
          <PriceSection isMobile={true} className="shadow-lg" />
        </div>

        {/* Schedules and Organizers */}
        <div className="space-y-3">
          {/* Event Schedule */}
          {sortedSchedules.length > 0 && (
            <div className="bg-card border border-border rounded-lg p-4">
              <h2 className="text-base font-semibold text-foreground mb-2 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                Event Schedule
              </h2>
              <div className="space-y-1.5">
                {sortedSchedules.map((schedule, index) => (
                  <div
                    key={`schedule-mobile-${index}`}
                    className="flex flex-wrap items-center gap-x-3 gap-y-0.5 py-1.5 px-2 bg-muted/20 rounded text-xs"
                  >
                    <div className="flex items-center gap-1 text-foreground font-medium whitespace-nowrap">
                      <Calendar className="w-3 h-3" />
                      <span>
                        {format(new Date(schedule.event_date), 'MMM dd, yyyy')}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-foreground/70 whitespace-nowrap">
                      <Clock className="w-3 h-3" />
                      <span>
                        {format(new Date(schedule.start_time), 'h:mm a')} -{' '}
                        {format(new Date(schedule.end_time), 'h:mm a')}
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
          <EventOrganisers event={event} />
        </div>

        {/* Markdown Content */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            About This Event
          </h2>
          <MarkdownRenderer content={combinedMarkdown} />
        </div>
      </div>

      {/* ========== DESKTOP LAYOUT ========== */}
      <div className="hidden md:grid md:grid-cols-12 md:gap-8">
        <div className="col-span-4 space-y-6">
          <div className="relative w-full aspect-[4/5] rounded-lg overflow-hidden bg-muted">
            <Image
              src={displayCoverImageUrl}
              alt={event.event_name}
              fill
              className="object-cover"
              priority
            />
            {event.is_registered && (
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

          {/* Price Section */}
          <div className="top-24 self-start" id="price-card-desktop">
            <PriceSection />
          </div>
        </div>

        {/* RIGHT COLUMN - Content (8 columns) */}
        <div className="col-span-8 space-y-6 flex flex-col">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-3">
              {event.event_name}
            </h1>
            {event.blurb && (
              <p className="text-md text-foreground/80">{event.blurb}</p>
            )}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
              {event.event_type.toUpperCase()}
            </span>
            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
              {event.is_technical ? 'TECHNICAL' : 'NON-TECHNICAL'}
            </span>
            {event.tags &&
              event.tags.length > 0 &&
              event.tags.map((tag, index) => (
                <span
                  key={`${tag}-${index}`}
                  className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
          </div>

          {/* Schedule and Organizers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:justify-start">
            {/* Event Schedule */}
            {sortedSchedules.length > 0 && (
              <div className="bg-card border border-border rounded-lg p-4 w-full">
                <h2 className="text-base font-semibold text-foreground mb-2 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary" />
                  Event Schedule
                </h2>
                <div className="space-y-1.5">
                  {sortedSchedules.map((schedule, index) => (
                    <div
                      key={`schedule-${index}`}
                      className="flex flex-wrap items-center gap-x-3 gap-y-0.5 py-1.5 px-2 bg-muted/40 rounded text-xs"
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
                          {format(new Date(schedule.start_time), 'h:mm a')} -{' '}
                          {format(new Date(schedule.end_time), 'h:mm a')}
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
            <EventOrganisers event={event} />
          </div>

          {/* Markdown Section - With Expandable Modal */}
          <div className="bg-card border border-border rounded-lg p-6 relative flex-1 flex flex-col">
            <h2 className="text-3xl font-semibold text-foreground mb-4">
              About This Event
            </h2>
            <div className="relative">
              <div ref={markdownRef} className="overflow-hidden max-h-[350px]">
                <MarkdownRenderer
                  content={combinedMarkdown}
                  className="[&>*:last-child]:mb-0"
                />
              </div>
              {isOverflowing && (
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-card via-card/80 to-transparent pointer-events-none" />
              )}
            </div>

            {isOverflowing && (
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={() => setIsMarkdownExpanded(true)}
                  className="px-6 py-1.5 text-sm text-primary hover:text-primary/80 transition-colors font-medium border border-primary/20 rounded-full bg-card shadow-sm hover:bg-primary/5"
                >
                  Show more
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Expanded Markdown Modal */}
      {isMarkdownExpanded && (
        <div
          className="fixed inset-0 z-[100] bg-background/65 backdrop-blur-sm flex items-center justify-center"
          onClick={() => setIsMarkdownExpanded(false)}
        >
          <div
            className="relative w-full max-w-5xl bg-card border border-border rounded-xl px-16 py-8 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto hide-scrollbar"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setIsMarkdownExpanded(false)}
              className="absolute top-4 right-4 p-2 bg-red-600/10 hover:bg-red-600/20 rounded-full transition-colors"
              aria-label="Close"
            >
              <X className="w-6 h-6 text-red-500" />
            </button>

            <h2 className="text-3xl font-bold text-foreground mb-6 pr-12">
              {event.event_name}
            </h2>

            <div className="border border-1 w-full my-1" />

            <div>
              <div className="prose prose-lg max-w-none">
                <MarkdownRenderer content={combinedMarkdown} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
