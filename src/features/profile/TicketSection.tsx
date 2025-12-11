import { Ticket } from 'lucide-react';
import { ErrorBlock } from '@/components/ErrorBlock';
import { TicketDesktopSkeleton } from '@/components/ticket/TicketDesktopSkeleton';
import { TicketList } from '@/components/ticket/TicketList';
import { TicketMobileSkeleton } from '@/components/ticket/TicketMobileSkeleton';
import { useTickets } from '@/hooks/useTickets';
import { useAuthStore } from '@/stores/auth.store';

export default function TicketSection() {
  const { data, isLoading, error } = useTickets();
  const userEmail = useAuthStore((state) => state.user?.email);

  if (isLoading) {
    return (
      <>
        <div className="hidden lg:block">
          <TicketDesktopSkeleton />
        </div>
        <div className="block lg:hidden">
          <TicketMobileSkeleton />
        </div>
      </>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="text-center pb-12 pt-20">
        <div className="text-muted-foreground">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-orange-500/20 to-yellow-500/20 flex items-center justify-center">
            <Ticket className="w-8 h-8 text-orange-400" size={24} />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            No Tickets Found
          </h3>
          <p>You haven't registered for any events or workshops yet.</p>
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
    <div className="p-0 lg:p-4">
      <TicketList listOftickets={data} userEmail={userEmail || ''} />
    </div>
  );
}
