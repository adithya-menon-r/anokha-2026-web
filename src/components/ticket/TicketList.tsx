import { TicketListProps } from '@/types/ticketTypes';
import Ticket from './Ticket';

export function TicketList({ listOftickets, userEmail }: TicketListProps) {
  return (
    <div className="w-full space-y-6">
      {listOftickets.map((ticket) => (
        <Ticket key={ticket.event_id} ticket={ticket} userEmail={userEmail} />
      ))}
    </div>
  );
}
