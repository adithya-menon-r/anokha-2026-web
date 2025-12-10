import { TicketSkeleton } from './TicketSkeleton';

export function TicketListSkeleton() {
  const placeholderCards = Array.from({ length: 2 });

  return (
    <div className="w-full space-y-6">
      {placeholderCards.map((_, index) => (
        <TicketSkeleton key={index} />
      ))}
    </div>
  );
}
