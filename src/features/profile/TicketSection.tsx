import { ErrorBlock } from '@/components/ErrorBlock';
import { TicketList } from '@/components/ticket/TicketList';
import { TicketListSkeleton } from '@/components/ticket/TicketListSkeleton';
import { useTickets } from '@/hooks/useTickets';
import { useAuthStore } from '@/stores/auth.store';

export default function TicketSection() {
  const { data, isLoading, error } = useTickets();
  const userEmail = useAuthStore((state) => state.user?.email);

  if (isLoading) {
    return <TicketListSkeleton />;
  }

  if (!data || data.length === 0) {
    return (
      <div className="text-center pb-12 pt-20">
        <div className="text-muted-foreground">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-orange-500/20 to-yellow-500/20 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-orange-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            No Tickets Found
          </h3>
          <p>You haven't registered for any events yet.</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <ErrorBlock
        title="Unable to load Registered Events"
        message="Please try again later"
      />
    );
  }

  return (
    <div className="p-4">
      <TicketList listOftickets={data} userEmail={userEmail || ''} />
    </div>
  );
}
