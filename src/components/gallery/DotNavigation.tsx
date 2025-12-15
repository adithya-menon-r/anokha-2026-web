'use client';
const DotNavigation = ({
  count,
  activeIndex,
  onClick,
  className = 'mt-12',
  noGlow = false,
  activeColorClass = 'bg-gradient-to-r from-orange-500 to-yellow-500',
  inactiveColorClass = 'bg-border/40 hover:bg-orange-400/60',
}: {
  count: number;
  activeIndex: number;
  onClick: (i: number) => void;
  className?: string;
  noGlow?: boolean;
  activeColorClass?: string;
  inactiveColorClass?: string;
}) => {
  return (
    <div className={`flex justify-center gap-3 relative z-10 ${className}`}>
      <div className="bg-black/30 px-4 py-2 rounded-full backdrop-blur-md border border-border/30 shadow-lg flex gap-3">
        {Array.from({ length: count }).map((_, index) => (
          <button
            key={index}
            onClick={() => onClick(index)}
            className={`relative transition-all duration-300 ${
              index === activeIndex ? 'scale-125' : 'scale-100 hover:scale-110'
            }`}
            aria-label={`Go to image ${index + 1}`}
          >
            <div
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === activeIndex ? activeColorClass : inactiveColorClass
              }`}
            ></div>
            {index === activeIndex && !noGlow && (
              <div
                className={`absolute inset-0 w-3 h-3 rounded-full blur-md animate-pulse ${activeColorClass}`}
              ></div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DotNavigation;
