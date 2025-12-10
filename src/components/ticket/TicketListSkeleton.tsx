import { TicketSkeleton } from './TicketSkeleton';

export function TicketListSkeleton() {
  const placeholderCards = Array.from({ length: 3 });

  return (
    <div className="w-full h-full flex items-center justify-center md:block">
      <div className="w-full flex items-center justify-center md:block">
        <div className="flex flex-col md:flex-row md:flex-wrap gap-4 md:gap-6 px-2 py-2 items-center justify-center md:items-stretch md:justify-start w-full">
          {placeholderCards.map((_, index) => (
            <TicketSkeleton key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
