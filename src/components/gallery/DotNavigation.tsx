'use client';
const DotNavigation = ({
  count,
  activeIndex,
  onClick,
}: {
  count: number;
  activeIndex: number;
  onClick: (i: number) => void;
}) => {
  return (
    <div className="flex justify-center gap-3 mt-12 relative z-10">
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
              index === activeIndex
                ? 'bg-gradient-to-r from-orange-500 to-yellow-500'
                : 'bg-border/40 hover:bg-orange-400/60'
            }`}
          ></div>
          {index === activeIndex && (
            <div className="absolute inset-0 w-3 h-3 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 blur-md animate-pulse"></div>
          )}
        </button>
      ))}
    </div>
  );
};

export default DotNavigation;
