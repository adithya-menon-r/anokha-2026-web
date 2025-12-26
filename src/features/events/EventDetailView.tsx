/**
 * EventDetailView Component (Smart Component)
 *
 * Handles data fetching and state management for the event detail page.
 * Uses useEventById hook to fetch event data.
 * Manages star, register, and feedback actions.
 */

'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React from 'react';
import toast from 'react-hot-toast';
import { ErrorBlock } from '@/components/ErrorBlock';
import CheckoutSummaryDialog from '@/components/events/CheckoutSummaryDialog';
import EventDetail from '@/components/events/EventDetail';
import EventDetailSkeleton from '@/components/events/EventDetailSkeleton';
import { GroupRegistrationForm } from '@/components/events/GroupRegistrationForm';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useBookGroupEvent, useBookIndividualEvent } from '@/hooks/useBooking';
import { useEventById } from '@/hooks/useEventById';
import { usePaymentFromBooking } from '@/hooks/usePaymentFromBooking';
import { useStarEvent } from '@/hooks/useStarEvent';
import { useAuthStore } from '@/stores/auth.store';
import type { GroupBookingPayload } from '@/types/bookingTypes';

interface EventDetailViewProps {
  eventId: string;
}

export default function EventDetailView({ eventId }: EventDetailViewProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { user } = useAuthStore();

  // Fetch event data
  const { data: event, isLoading, error } = useEventById(eventId);

  const {
    isStarred,
    toggleStar,
    isLoading: isStarLoading,
  } = useStarEvent(eventId, event?.isStarred || false);

  // Payment redirect handler
  const { redirectToPayment } = usePaymentFromBooking();

  // Handlers
  const handleStarToggle = () => {
    if (!user) {
      toast.error('You need to be logged in to star events.');
      router.push('/login');
      return;
    }
    toggleStar();
  };

  // State to show/hide group registration form
  const [showGroupForm, setShowGroupForm] = React.useState(false);

  // State for CheckoutSummary Dialog
  const [pendingBooking, setPendingBooking] = React.useState<{
    type: 'individual' | 'group';
    groupPayload?: GroupBookingPayload;
  } | null>(null);

  // Booking mutations
  const bookIndividualMutation = useBookIndividualEvent();
  const bookGroupMutation = useBookGroupEvent();

  const handleCheckoutSummaryConfirm = () => {
    if (!pendingBooking || !event) return;

    if (pendingBooking.type === 'individual') {
      console.log(
        '[EventDetailView] Starting individual event booking for:',
        eventId,
      );

      bookIndividualMutation.mutate(eventId, {
        onSuccess: (bookingData) => {
          console.log('[EventDetailView] Booking successful:', bookingData);
          setPendingBooking(null);
          // Invalidate queries
          queryClient.invalidateQueries({ queryKey: ['event', eventId] });
          queryClient.invalidateQueries({ queryKey: ['events'] });
          queryClient.invalidateQueries({ queryKey: ['registeredEvents'] });

          // Redirect to payment if payment data is present
          if (bookingData.hash && bookingData.txnId) {
            // Small delay to show success message before redirect
            setTimeout(() => {
              redirectToPayment(bookingData);
            }, 1000);
          }
        },
        onError: (error: Error) => {
          console.error('Booking error:', error);
          // Error toast is already shown by the hook
          setPendingBooking(null);
        },
      });
    } else if (pendingBooking.type === 'group' && pendingBooking.groupPayload) {
      bookGroupMutation.mutate(
        { eventId, payload: pendingBooking.groupPayload },
        {
          onSuccess: (bookingData) => {
            setPendingBooking(null);
            // Invalidate queries
            queryClient.invalidateQueries({
              queryKey: ['event', eventId],
            });
            queryClient.invalidateQueries({ queryKey: ['events'] });
            queryClient.invalidateQueries({
              queryKey: ['registeredEvents'],
            });

            // Redirect to payment if payment data is present
            if (bookingData.hash && bookingData.txnId) {
              // Small delay to show success message before redirect
              setTimeout(() => {
                redirectToPayment(bookingData);
              }, 1000);
            }
          },
          onError: () => {
            setPendingBooking(null);
          },
        },
      );
    }
  };

  const handleRegister = () => {
    console.log('[EventDetailView] Register button clicked');

    if (!user) {
      console.log('[EventDetailView] No user logged in');
      toast.error('Please log in to register');
      router.push('/login');
      return;
    }

    // Check if group event - should open a team registration form
    if (event?.is_group) {
      console.log('[EventDetailView] Group event - opening form');
      setShowGroupForm(true);
      return;
    }

    // Validate eventId before making the call
    if (!eventId) {
      console.log('[EventDetailView] No eventId');
      toast.error('Invalid event ID');
      return;
    }

    setPendingBooking({ type: 'individual' });
  };

  const handleFeedback = () => {
    // TODO: Navigate to feedback page or open feedback modal
    toast('Feedback feature coming soon', { icon: '🚧' });
  };

  // Loading state
  if (isLoading) {
    return (
      <main className="p-6 flex flex-col items-center min-h-screen">
        <EventDetailSkeleton />
      </main>
    );
  }

  // Error state
  if (error || !event) {
    const errorMessage = error?.message || '';
    const isNetworkError =
      errorMessage.includes('Network Error') ||
      errorMessage.includes('timeout');
    const is404 =
      errorMessage.includes('404') || errorMessage.includes('Not Found');

    return (
      <main className="p-6 flex flex-col items-center min-h-screen">
        <div className="w-full max-w-7xl">
          <ErrorBlock
            title={
              isNetworkError
                ? 'Network Error'
                : is404
                  ? 'Event Not Found'
                  : 'Error Loading Event'
            }
            message={
              isNetworkError
                ? 'Oops!! Unable to connect to the server. Please try again later'
                : is404
                  ? 'The event you are looking for does not exist or has been removed.'
                  : error?.message ||
                    'Something went wrong while loading the event.'
            }
          />
          <div className="mt-4 space-y-2 justify-center items-center flex flex-col">
            <button
              type="button"
              onClick={() => router.push('/events')}
              className="w-full md:w-1/4 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              Back to Events
            </button>
            {isNetworkError && (
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="w-full md:w-1/4 px-6 py-3 border border-border text-foreground rounded-lg hover:bg-muted transition-colors"
              >
                Try Again
              </button>
            )}
          </div>

          {/* Debug info in development
          {process.env.NODE_ENV === 'development' && error && (
            <div className="mt-4 p-4 bg-muted rounded-lg">
              <p className="text-sm text-foreground/60 font-mono">
                Debug: {error.message}
              </p>
              <p className="text-xs text-foreground/40 mt-2">
                Backend URL: {process.env.NEXT_PUBLIC_BACKEND_URL}/api/events/
                {eventId}
              </p>
            </div>
          )} */}
        </div>
      </main>
    );
  }

  // Render event detail
  return (
    <main className="p-6 flex flex-col items-center min-h-screen">
      <EventDetail
        event={{ ...event, isStarred }}
        onStarToggle={user ? handleStarToggle : undefined}
        onRegister={user ? handleRegister : undefined}
        onFeedback={user && event.is_registered ? handleFeedback : undefined}
        isStarLoading={isStarLoading}
        isRegisterLoading={
          bookIndividualMutation.isPending || bookGroupMutation.isPending
        }
        isLoggedIn={!!user}
      />

      {/* Group Registration Form Modal for group events */}
      <Dialog open={showGroupForm} onOpenChange={setShowGroupForm}>
        <DialogContent className="w-full max-w-[calc(100%-2rem)] max-h-[90vh] sm:max-w-3xl rounded-lg overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Team Registration</DialogTitle>
          </DialogHeader>
          <GroupRegistrationForm
            leaderName={user?.name || ''}
            leaderEmail={user?.email || ''}
            minTeamSize={event?.min_teamsize ?? 2}
            maxTeamSize={event?.max_teamsize ?? 10}
            onSubmit={(formData: GroupBookingPayload) => {
              setShowGroupForm(false);
              setPendingBooking({
                type: 'group',
                groupPayload: formData,
              });
            }}
          />
        </DialogContent>
      </Dialog>

      {/* CheckoutSummary Dialog */}
      <CheckoutSummaryDialog
        open={!!pendingBooking}
        onOpenChange={(open) => {
          if (!open) setPendingBooking(null);
        }}
        eventName={event?.event_name || ''}
        unitPrice={event?.price || 0}
        quantity={
          pendingBooking?.type === 'group' && pendingBooking.groupPayload
            ? event?.is_per_head
              ? pendingBooking.groupPayload.team_members.length + 1
              : 1
            : 1
        }
        unit={
          event?.is_group
            ? event?.is_per_head
              ? 'Member'
              : 'Team'
            : 'Individual'
        }
        onConfirm={handleCheckoutSummaryConfirm}
      />
    </main>
  );
}
