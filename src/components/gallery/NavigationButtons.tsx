'use client';
const NavigationButtons = ({
  onPrev,
  onNext,
}: {
  onPrev: () => void;
  onNext: () => void;
}) => {
  return (
    <>
      <button
        onClick={onPrev}
        className="absolute left-8 max-md:left-4 top-1/2 -translate-y-1/2 z-50 w-14 h-14 max-md:w-12 max-md:h-12 rounded-full bg-gradient-to-br from-card/30 to-card/10 backdrop-blur-md border border-orange-400/30 text-foreground flex items-center justify-center hover:border-orange-400 hover:bg-gradient-to-br hover:from-orange-500/20 hover:to-yellow-500/20 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-orange-500/50 group"
        aria-label="Previous"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
          className="w-6 h-6 text-orange-400 group-hover:text-orange-300 transition-colors"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </button>
      <button
        onClick={onNext}
        className="absolute right-8 max-md:right-4 top-1/2 -translate-y-1/2 z-50 w-14 h-14 max-md:w-12 max-md:h-12 rounded-full bg-gradient-to-br from-card/30 to-card/10 backdrop-blur-md border border-orange-400/30 text-foreground flex items-center justify-center hover:border-orange-400 hover:bg-gradient-to-br hover:from-orange-500/20 hover:to-yellow-500/20 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-orange-500/50 group"
        aria-label="Next"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
          className="w-6 h-6 text-orange-400 group-hover:text-orange-300 transition-colors"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>
    </>
  );
};

export default NavigationButtons;
