import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef, useState } from 'react';
import { TicketListProps } from '@/types/ticketTypes';
import DotNavigation from '../gallery/DotNavigation';
import TicketDesktop from './TicketDesktop';
import TicketMobile from './TicketMobile';

export function TicketList({ listOftickets, userEmail }: TicketListProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollTo = (index: number) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const width = container.clientWidth;
      container.scrollTo({
        left: width * index,
        behavior: 'smooth',
      });
      setActiveIndex(index);
    }
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const width = container.clientWidth;
      const index = Math.round(container.scrollLeft / width);
      if (index !== activeIndex) {
        setActiveIndex(index);
      }
    }
  };

  const handlePrev = () => {
    if (activeIndex > 0) {
      scrollTo(activeIndex - 1);
    }
  };

  const handleNext = () => {
    if (activeIndex < listOftickets.length - 1) {
      scrollTo(activeIndex + 1);
    }
  };

  if (listOftickets.length === 0) return null;

  return (
    <div className="w-full max-w-7xl mx-auto relative group px-0 lg:px-10 md:px-10">
      {/* Navigation Buttons */}
      {listOftickets.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            disabled={activeIndex === 0}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-1.5 rounded-full bg-gray-600/30 backdrop-blur-md border border-white/10 text-white hover:bg-gray-600/60 disabled:opacity-0 transition-all hidden lg:block"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={handleNext}
            disabled={activeIndex === listOftickets.length - 1}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-1.5 rounded-full bg-gray-600/30 backdrop-blur-md border border-white/10 text-white hover:bg-gray-600/60 disabled:opacity-0 transition-all hidden lg:block"
          >
            <ChevronRight size={20} />
          </button>
        </>
      )}

      {/* Scrollable Container */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="w-full overflow-x-auto flex snap-x snap-mandatory scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {listOftickets.map((ticket) => (
          <div
            key={ticket.event_id}
            className="min-w-full flex justify-center p-1 snap-center"
          >
            <div className="hidden lg:block w-full max-w-5xl">
              <TicketDesktop ticket={ticket} userEmail={userEmail} />
            </div>
            <div className="block lg:hidden w-full mt-4">
              <TicketMobile ticket={ticket} userEmail={userEmail} />
            </div>
          </div>
        ))}
      </div>

      {/* Dot Navigation */}
      {listOftickets.length > 1 && (
        <div className="mt-0">
          <DotNavigation
            count={listOftickets.length}
            activeIndex={activeIndex}
            onClick={scrollTo}
            className="mt-2"
            noGlow={true}
            activeColorClass="bg-gray-300"
            inactiveColorClass="bg-gray-600 hover:bg-gray-500"
          />
        </div>
      )}
    </div>
  );
}
