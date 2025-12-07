/**
 * EventDetailView Component (Smart Component)
 *
 * Handles data fetching and state management for the event detail page.
 * Uses useEventById hook to fetch event data.
 * Manages star, register, and feedback actions.
 */

'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { ErrorBlock } from '@/components/ErrorBlock';
import EventDetail from '@/components/events/EventDetail';
import EventDetailSkeleton from '@/components/events/EventDetailSkeleton';
import { useEventById } from '@/hooks/useEventById';
import { useAuthStore } from '@/stores/auth.store';

interface EventDetailViewProps {
  eventId: string;
}

export default function EventDetailView({ eventId }: EventDetailViewProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { user } = useAuthStore();

  // Fetch event data
  const { data: event, isLoading, error } = useEventById(eventId);

  // Star/Unstar mutation
  // TODO: Implement actual star service call
  const starMutation = useMutation({
    mutationFn: async () => {
      // Placeholder - replace with actual API call
      // return EventService.toggleStar(eventId);
      await new Promise((resolve) => setTimeout(resolve, 500));
      return { success: true };
    },
    onSuccess: () => {
      toast.success(event?.isStarred ? 'Event unstarred' : 'Event starred');
      queryClient.invalidateQueries({ queryKey: ['event', eventId] });
      queryClient.invalidateQueries({ queryKey: ['events'] });
    },
    onError: () => {
      toast.error('Failed to update event star status');
    },
  });

  // Register mutation
  // TODO: Implement actual registration service call
  const registerMutation = useMutation({
    mutationFn: async () => {
      // Placeholder - replace with actual API call
      // For group events, this should open a registration form
      // For individual events, this should register directly
      // return EventService.registerForEvent(eventId, registrationData);
      await new Promise((resolve) => setTimeout(resolve, 500));
      return { success: true };
    },
    onSuccess: () => {
      toast.success('Successfully registered for event!');
      queryClient.invalidateQueries({ queryKey: ['event', eventId] });
      queryClient.invalidateQueries({ queryKey: ['events'] });
      queryClient.invalidateQueries({ queryKey: ['registeredEvents'] });
    },
    onError: () => {
      toast.error('Failed to register for event');
    },
  });

  // Handlers
  const handleStarToggle = () => {
    if (!user) {
      toast.error('You need to be logged in to star events.');
      router.push('/login');
      return;
    }
    starMutation.mutate();
  };

  const handleRegister = () => {
    if (!user) {
      toast.error('Please log in to register');
      router.push('/login');
      return;
    }

    // Check if group event - should open a team registration form
    if (event?.is_group) {
      // TODO: Open team registration modal/form
      toast('Team registration form coming soon', { icon: '🚧' });
      return;
    }

    // Individual event - register directly
    registerMutation.mutate();
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
        event={event}
        onStarToggle={user ? handleStarToggle : undefined}
        onRegister={user ? handleRegister : undefined}
        onFeedback={user && event.isRegistered ? handleFeedback : undefined}
        isStarLoading={starMutation.isPending}
        isRegisterLoading={registerMutation.isPending}
        isLoggedIn={!!user}
      />
    </main>
  );
}
