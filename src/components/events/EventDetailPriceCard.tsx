/**
 * EventDetailPriceCard Component
 *
 * Displays price and registration buttons with proper states:
 * - Shows price per person/team
 * - Red color when seats are filled
 * - Two button options: Register (if logged in) or Login to Register
 * - Expandable modal on desktop with "Show more" button
 * - Sticky on mobile while scrolling content
 */

'use client';

import { AlertCircle, ChevronDown, IndianRupee, Users2, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import type { EventDetails } from '@/types/eventTypes';

interface EventDetailPriceCardProps {
  event: EventDetails;
  onRegister?: () => void;
  isRegisterLoading?: boolean;
  isLoggedIn?: boolean;
}

export default function EventDetailPriceCard({
  event,
  onRegister,
  isRegisterLoading = false,
  isLoggedIn = false,
}: EventDetailPriceCardProps) {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);

  const isFull = event.seats_filled >= event.total_seats;
  const isAlmostFull = event.seats_filled / event.total_seats > 0.8;

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isExpanded) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isExpanded]);

  const CardContent = () => (
    <>
      {/* Price Section */}
      <div className="text-center pb-4 border-b border-border">
        <div className="flex items-center justify-center gap-2 text-foreground/80 mb-2">
          <IndianRupee className="w-5 h-5" />
          <span className="text-sm font-medium">
            {event.is_per_head ? 'Price per person' : 'Price per team'}
          </span>
        </div>
        <div
          className={`text-4xl font-bold ${
            isFull ? 'text-red-500' : 'text-foreground'
          }`}
        >
          {event.price === 0 ? 'Free' : `₹${event.price}`}
        </div>
      </div>

      {/* Team Size (for group events) */}
      {event.is_group && (
        <div className="flex items-center justify-between py-3 border-b border-border">
          <div className="flex items-center gap-2 text-foreground/80">
            <Users2 className="w-5 h-5" />
            <span className="font-medium">Team Size</span>
          </div>
          <span className="text-lg font-semibold text-foreground">
            {event.min_teamsize} - {event.max_teamsize}
          </span>
        </div>
      )}

      {/* Seats Information */}
      <div className="py-3 border-b border-border">
        <div className="flex items-center justify-between mb-2">
          <span className="font-medium text-foreground/80">
            Seats Available
          </span>
          <span
            className={`font-semibold ${
              isFull
                ? 'text-red-500'
                : isAlmostFull
                  ? 'text-yellow-500'
                  : 'text-green-500'
            }`}
          >
            {event.total_seats - event.seats_filled} / {event.total_seats}
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
          <div
            className={`h-full transition-all ${
              isFull
                ? 'bg-red-500'
                : isAlmostFull
                  ? 'bg-yellow-500'
                  : 'bg-green-500'
            }`}
            style={{
              width: `${Math.min((event.seats_filled / event.total_seats) * 100, 100)}%`,
            }}
          />
        </div>
      </div>

      {/* Event Status */}
      <div className="flex items-center justify-between py-3 border-b border-border">
        <div className="flex items-center gap-2 text-foreground/80">
          <AlertCircle className="w-5 h-5" />
          <span className="font-medium">Status</span>
        </div>
        <span
          className={`font-semibold ${
            event.event_status === 'ACTIVE'
              ? 'text-green-500'
              : event.event_status === 'CLOSED'
                ? 'text-red-500'
                : 'text-yellow-500'
          }`}
        >
          {event.event_status}
        </span>
      </div>

      {/* Registration ID (if already registered) */}
      {event.isRegistered && event.registrationId && (
        <div className="py-3 border-b border-border">
          <div className="text-sm text-foreground/80 mb-2">Registration ID</div>
          <code className="block w-full bg-muted px-3 py-2 rounded text-sm font-mono text-foreground break-all">
            {event.registrationId}
          </code>
        </div>
      )}

      {/* Registration Buttons */}
      <div className="space-y-2 pt-2">
        {event.isRegistered ? (
          <div className="text-center p-4 bg-green-500/10 rounded-lg">
            <p className="text-green-500 font-semibold">Already Registered</p>
          </div>
        ) : isFull || event.event_status === 'CLOSED' ? (
          <div
            className={`text-center p-4 rounded-lg ${
              isFull ? 'bg-red-500/10' : 'bg-yellow-500/10'
            }`}
          >
            <p
              className={`font-semibold ${
                isFull ? 'text-red-500' : 'text-yellow-500'
              }`}
            >
              {isFull ? 'Event Full' : 'Registration Closed'}
            </p>
          </div>
        ) : (
          <>
            {isLoggedIn ? (
              <button
                type="button"
                onClick={onRegister}
                disabled={isRegisterLoading}
                className="w-full py-3 px-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isRegisterLoading ? 'Registering...' : 'Register Now'}
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => router.push('/login')}
                  className="w-full py-3 px-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                >
                  Login to Register
                </button>
                <p className="text-xs text-center text-foreground/60">
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={() => router.push('/signup')}
                    className="text-primary hover:underline"
                  >
                    Sign up
                  </button>
                </p>
              </>
            )}
          </>
        )}
      </div>
    </>
  );

  return (
    <>
      {/* Compact Card (Desktop) - with Show more button */}
      <div className="hidden md:block w-full bg-card border border-border rounded-lg p-6 space-y-4 shadow-lg">
        <CardContent />

        {/* Show More Button */}
        <button
          type="button"
          onClick={() => setIsExpanded(true)}
          className="w-full flex items-center justify-center gap-2 py-3 text-primary hover:text-primary/80 transition-colors font-medium"
        >
          Show more <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      {/* Mobile Sticky Card */}
      <div className="md:hidden w-full bg-card border border-border rounded-lg p-6 space-y-4 shadow-lg">
        <CardContent />
      </div>

      {/* Expanded Modal (Desktop) */}
      {isExpanded && (
        <div className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-2xl bg-card border border-border rounded-lg p-8 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setIsExpanded(false)}
              className="absolute top-4 right-4 p-2 hover:bg-muted rounded-full transition-colors"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-2xl font-bold text-foreground mb-6">
              Registration Details
            </h2>

            <CardContent />
          </div>
        </div>
      )}
    </>
  );
}
